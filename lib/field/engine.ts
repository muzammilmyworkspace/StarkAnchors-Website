import type { FieldVariant } from "@/types";

/**
 * THE SYSTEM FIELD
 *
 * A single canvas engine that renders the background of every page.
 *
 * It is not a particle system. The scene is an infrastructure map:
 *
 *   nodes    endpoints, placed on a jittered structural lattice
 *   hubs     convergence points, drawn as the logo's diamond
 *   edges    connections, snapped toward 45-degree increments so the
 *            graph reads as a plan drawing rather than a cobweb
 *   signals  discrete packets that traverse an edge, activate the node
 *            they arrive at, and continue — so activity propagates
 *            through the topology instead of drifting at random
 *
 * Everything is deterministic from a seed. Two loads of the same page
 * at the same size produce the same lattice, which is what separates
 * a designed environment from noise.
 *
 * No React in this file. It is plain state plus a draw call, which is
 * what makes it cheap to test, cheap to reason about, and trivial to
 * render as a single static frame for reduced-motion users.
 */

/* ---------------------------------------------------------------- */
/* Deterministic randomness                                          */
/* ---------------------------------------------------------------- */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------------------------------------------------------- */
/* Scene types                                                       */
/* ---------------------------------------------------------------- */

type Node = {
  x: number;
  y: number;
  /** Convergence points are drawn as diamonds, echoing the mark. */
  hub: boolean;
  /** 0..1 activation, decays every frame. */
  energy: number;
  /** Indices into `edges` that touch this node. */
  links: number[];
};

type Edge = {
  a: number;
  b: number;
  length: number;
  /** 0..1 activation, decays every frame. */
  energy: number;
};

type Signal = {
  edge: number;
  /** Progress along the edge, 0..1. */
  t: number;
  /** 1 travels a -> b, -1 travels b -> a. */
  dir: 1 | -1;
  speed: number;
  /** Remaining hops before the packet is retired. */
  life: number;
};

export type FieldScene = {
  width: number;
  height: number;
  nodes: Node[];
  edges: Edge[];
  signals: Signal[];
  spawnAccumulator: number;
  config: FieldConfig;
};

export type FieldConfig = {
  /** Target area in CSS px per node. Lower is denser. */
  areaPerNode: number;
  /** Hard ceiling regardless of viewport. Protects low-end devices. */
  maxNodes: number;
  /** Connection search radius as a multiple of the lattice cell. */
  linkReach: number;
  maxDegree: number;
  /** Max degrees a connection may deviate from a 45-degree increment. */
  angleTolerance: number;
  /** Proportion of nodes promoted to hubs. */
  hubRatio: number;
  /** Probability a lattice cell is left empty, creating clusters. */
  voidChance: number;
  /** Packets spawned per second across the whole field. */
  spawnRate: number;
  signalSpeed: number;
  /** Hops a packet makes before retiring. */
  signalLife: number;
  /** Packets always travel left-to-right when true (data flow). */
  directional: boolean;
  edgeAlpha: number;
  nodeAlpha: number;
  /** Master opacity applied to the whole field. */
  intensity: number;
  /** Radius in px within which the pointer wakes nodes. */
  pointerReach: number;
};

/* ---------------------------------------------------------------- */
/* Per-route configuration                                           */
/* ---------------------------------------------------------------- */

const BASE: FieldConfig = {
  areaPerNode: 15000,
  maxNodes: 130,
  linkReach: 1.45,
  maxDegree: 3,
  angleTolerance: 17,
  hubRatio: 0.09,
  voidChance: 0.16,
  spawnRate: 1.6,
  signalSpeed: 0.42,
  signalLife: 4,
  directional: false,
  edgeAlpha: 0.032,
  nodeAlpha: 0.12,
  intensity: 0.72,
  pointerReach: 190,
};

/**
 * Each route gets a different state of the same system — the site is
 * one environment observed from different positions, not five
 * different backgrounds.
 */
const VARIANTS: Record<FieldVariant, Partial<FieldConfig>> = {
  /** HOME — the full live network. The signature. */
  network: {},

  /** ABOUT — structure, barely any traffic. The plan, not the flow. */
  structure: {
    areaPerNode: 20000,
    maxNodes: 96,
    linkReach: 1.6,
    angleTolerance: 11,
    voidChance: 0.08,
    hubRatio: 0.06,
    spawnRate: 0.35,
    signalSpeed: 0.24,
    edgeAlpha: 0.04,
    nodeAlpha: 0.1,
    intensity: 0.62,
  },

  /** SERVICES — topology with a consistent direction of travel. */
  topology: {
    areaPerNode: 22000,
    maxNodes: 88,
    linkReach: 1.9,
    angleTolerance: 24,
    voidChance: 0.22,
    spawnRate: 2.4,
    signalSpeed: 0.5,
    signalLife: 6,
    directional: true,
    edgeAlpha: 0.03,
    nodeAlpha: 0.11,
    intensity: 0.66,
  },

  /** PRICING + LOGS — almost still. Reading surfaces. */
  quiet: {
    areaPerNode: 34000,
    maxNodes: 52,
    linkReach: 1.7,
    angleTolerance: 9,
    voidChance: 0.3,
    hubRatio: 0.04,
    spawnRate: 0.14,
    signalSpeed: 0.2,
    edgeAlpha: 0.026,
    nodeAlpha: 0.08,
    intensity: 0.48,
    pointerReach: 0,
  },

  /** DIAGNOSTIC — sparse, but actively instrumented. */
  telemetry: {
    areaPerNode: 26000,
    maxNodes: 72,
    linkReach: 1.5,
    angleTolerance: 14,
    voidChance: 0.2,
    hubRatio: 0.14,
    spawnRate: 3.2,
    signalSpeed: 0.62,
    signalLife: 3,
    edgeAlpha: 0.028,
    nodeAlpha: 0.12,
    intensity: 0.6,
  },
};

/** Coarse-pointer and small-viewport budget. Never ship desktop density to a phone. */
function applyDeviceBudget(config: FieldConfig, width: number): FieldConfig {
  if (width >= 1024) return config;

  if (width >= 768) {
    return {
      ...config,
      areaPerNode: config.areaPerNode * 1.5,
      maxNodes: Math.round(config.maxNodes * 0.55),
      spawnRate: config.spawnRate * 0.6,
      maxDegree: 2,
      pointerReach: 0,
    };
  }

  return {
    ...config,
    areaPerNode: config.areaPerNode * 2.1,
    maxNodes: Math.round(config.maxNodes * 0.3),
    spawnRate: config.spawnRate * 0.4,
    maxDegree: 2,
    linkReach: config.linkReach * 1.15,
    pointerReach: 0,
  };
}

export function resolveConfig(variant: FieldVariant, width: number): FieldConfig {
  return applyDeviceBudget({ ...BASE, ...VARIANTS[variant] }, width);
}

/* ---------------------------------------------------------------- */
/* Construction                                                      */
/* ---------------------------------------------------------------- */

const SNAP = Math.PI / 4;

/** Deviation, in degrees, of an angle from the nearest 45-degree axis. */
function axisDeviation(dx: number, dy: number): number {
  const angle = Math.atan2(dy, dx);
  const snapped = Math.round(angle / SNAP) * SNAP;
  return Math.abs(angle - snapped) * (180 / Math.PI);
}

export function buildScene(
  width: number,
  height: number,
  variant: FieldVariant,
  seed = 0x5a17,
): FieldScene {
  const config = resolveConfig(variant, width);
  const random = mulberry32(seed + Math.round(width) * 31 + Math.round(height));

  // Lattice: a grid whose cell size is derived from the node budget,
  // then perturbed. Perfect grids look mechanical; pure random looks
  // like noise. The jitter below is the difference.
  const target = Math.min(
    config.maxNodes,
    Math.max(14, Math.round((width * height) / config.areaPerNode)),
  );
  const cell = Math.sqrt((width * height) / target);
  const cols = Math.max(2, Math.ceil(width / cell) + 1);
  const rows = Math.max(2, Math.ceil(height / cell) + 1);

  const nodes: Node[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (random() < config.voidChance) continue;
      if (nodes.length >= config.maxNodes) break;

      nodes.push({
        x: col * cell + (random() - 0.5) * cell * 0.66,
        y: row * cell + (random() - 0.5) * cell * 0.66,
        hub: random() < config.hubRatio,
        energy: 0,
        links: [],
      });
    }
  }

  // Edges: nearest neighbours, filtered to near-orthogonal and
  // near-diagonal runs, capped by degree so no node becomes a star.
  const edges: Edge[] = [];
  const reach = cell * config.linkReach;
  const seen = new Set<string>();

  for (let i = 0; i < nodes.length; i += 1) {
    const a = nodes[i];

    const candidates: { index: number; distance: number }[] = [];
    for (let j = 0; j < nodes.length; j += 1) {
      if (i === j) continue;
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      if (distance > reach || distance < 4) continue;
      if (axisDeviation(dx, dy) > config.angleTolerance) continue;
      candidates.push({ index: j, distance });
    }

    candidates.sort((p, q) => p.distance - q.distance);

    for (const candidate of candidates) {
      if (a.links.length >= config.maxDegree) break;
      const b = nodes[candidate.index];
      if (b.links.length >= config.maxDegree) continue;

      const key = i < candidate.index ? `${i}:${candidate.index}` : `${candidate.index}:${i}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const edgeIndex = edges.length;
      edges.push({ a: i, b: candidate.index, length: candidate.distance, energy: 0 });
      a.links.push(edgeIndex);
      b.links.push(edgeIndex);
    }
  }

  return {
    width,
    height,
    nodes,
    edges,
    signals: [],
    spawnAccumulator: 0,
    config,
  };
}

/* ---------------------------------------------------------------- */
/* Simulation                                                        */
/* ---------------------------------------------------------------- */

export type FieldInput = {
  /** Pointer in CSS px relative to the canvas, or null when absent. */
  pointerX: number | null;
  pointerY: number | null;
  /**
   * Normalised scroll position of the page, 0..1. Nodes near the
   * corresponding band of the field sit slightly brighter, so moving
   * down the page moves the region of the system under observation.
   */
  focus: number;
};

function spawnSignal(scene: FieldScene, random: () => number) {
  if (scene.edges.length === 0) return;

  const { config } = scene;
  const edgeIndex = Math.floor(random() * scene.edges.length);
  const edge = scene.edges[edgeIndex];

  let dir: 1 | -1 = random() < 0.5 ? 1 : -1;
  if (config.directional) {
    // Left-to-right reading of the topology: pick the direction whose
    // endpoint is further right.
    dir = scene.nodes[edge.b].x >= scene.nodes[edge.a].x ? 1 : -1;
  }

  scene.signals.push({
    edge: edgeIndex,
    t: dir === 1 ? 0 : 1,
    dir,
    speed: config.signalSpeed * (0.7 + random() * 0.6),
    life: config.signalLife,
  });
}

/** Choose the next edge at a node, preferring to continue forward. */
function nextEdge(
  scene: FieldScene,
  nodeIndex: number,
  currentEdge: number,
  random: () => number,
): number | null {
  const node = scene.nodes[nodeIndex];
  const options = node.links.filter((index) => index !== currentEdge);
  if (options.length === 0) return null;

  if (scene.config.directional) {
    const forward = options.filter((index) => {
      const edge = scene.edges[index];
      const other = edge.a === nodeIndex ? edge.b : edge.a;
      return scene.nodes[other].x > node.x;
    });
    if (forward.length > 0) {
      return forward[Math.floor(random() * forward.length)];
    }
  }

  return options[Math.floor(random() * options.length)];
}

const random = mulberry32(0x1f2e3d);

export function stepScene(scene: FieldScene, delta: number, input: FieldInput) {
  const { config } = scene;

  // Decay. Energy is what makes activation propagate and then settle
  // rather than accumulate into a permanently lit graph.
  const nodeDecay = Math.exp(-delta * 1.25);
  const edgeDecay = Math.exp(-delta * 1.9);

  for (const node of scene.nodes) node.energy *= nodeDecay;
  for (const edge of scene.edges) edge.energy *= edgeDecay;

  // Pointer wakes a region. Not a cursor effect — a local survey.
  if (config.pointerReach > 0 && input.pointerX !== null && input.pointerY !== null) {
    const reach = config.pointerReach;
    for (const node of scene.nodes) {
      const distance = Math.hypot(node.x - input.pointerX, node.y - input.pointerY);
      if (distance > reach) continue;
      const falloff = 1 - distance / reach;
      node.energy = Math.max(node.energy, falloff * falloff * 0.72);
    }
  }

  // Spawn.
  scene.spawnAccumulator += delta * config.spawnRate;
  while (scene.spawnAccumulator >= 1) {
    scene.spawnAccumulator -= 1;
    if (scene.signals.length < 42) spawnSignal(scene, random);
  }

  // Advance packets; hand off at nodes.
  for (let i = scene.signals.length - 1; i >= 0; i -= 1) {
    const signal = scene.signals[i];
    const edge = scene.edges[signal.edge];
    if (!edge) {
      scene.signals.splice(i, 1);
      continue;
    }

    // Speed is expressed in edge-lengths per second normalised against
    // a reference length, so packets move at a consistent visual pace
    // regardless of how long the edge is.
    const rate = (signal.speed * 120) / Math.max(edge.length, 24);
    signal.t += rate * delta * signal.dir;
    edge.energy = Math.min(1, edge.energy + delta * 2.4);

    const arrived = signal.dir === 1 ? signal.t >= 1 : signal.t <= 0;
    if (!arrived) continue;

    const nodeIndex = signal.dir === 1 ? edge.b : edge.a;
    scene.nodes[nodeIndex].energy = 1;
    signal.life -= 1;

    if (signal.life <= 0) {
      scene.signals.splice(i, 1);
      continue;
    }

    const next = nextEdge(scene, nodeIndex, signal.edge, random);
    if (next === null) {
      scene.signals.splice(i, 1);
      continue;
    }

    const nextEdgeRef = scene.edges[next];
    signal.edge = next;
    signal.dir = nextEdgeRef.a === nodeIndex ? 1 : -1;
    signal.t = signal.dir === 1 ? 0 : 1;
  }
}

/* ---------------------------------------------------------------- */
/* Rendering                                                         */
/* ---------------------------------------------------------------- */

const INK = "226, 232, 240";
const SIGNAL = "0, 229, 255";

export function drawScene(
  ctx: CanvasRenderingContext2D,
  scene: FieldScene,
  input: FieldInput,
) {
  const { config, nodes, edges, signals } = scene;
  const master = config.intensity;

  // Scroll-linked band of interest. Wide and weak — it should read as
  // the field responding, never as a spotlight following the scrollbar.
  const focusY = input.focus * scene.height;
  const focusBand = scene.height * 0.55;
  const focusAt = (y: number) => {
    const distance = Math.abs(y - focusY);
    if (distance > focusBand) return 0;
    const falloff = 1 - distance / focusBand;
    return falloff * falloff * 0.5;
  };

  ctx.lineCap = "square";

  /* Edges ------------------------------------------------------- */
  ctx.lineWidth = 1;
  for (const edge of edges) {
    const a = nodes[edge.a];
    const b = nodes[edge.b];
    const local = focusAt((a.y + b.y) / 2);
    const heat = Math.max(edge.energy, a.energy * 0.55, b.energy * 0.55);

    const alpha = (config.edgeAlpha * (1 + local) + heat * 0.16) * master;
    if (alpha < 0.004) continue;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle =
      heat > 0.08
        ? `rgba(${SIGNAL}, ${Math.min(0.34, alpha + heat * 0.1)})`
        : `rgba(${INK}, ${alpha})`;
    ctx.stroke();
  }

  /* Nodes -------------------------------------------------------- */
  for (const node of nodes) {
    const local = focusAt(node.y);
    const alpha = (config.nodeAlpha * (1 + local * 1.2) + node.energy * 0.55) * master;
    if (alpha < 0.01) continue;

    const lit = node.energy > 0.12;
    ctx.fillStyle = lit
      ? `rgba(${SIGNAL}, ${Math.min(0.9, alpha + node.energy * 0.3)})`
      : `rgba(${INK}, ${alpha})`;

    if (node.hub) {
      // The mark's convergence diamond, repeated through the system.
      const radius = 3.1 + node.energy * 1.5;
      ctx.beginPath();
      ctx.moveTo(node.x, node.y - radius);
      ctx.lineTo(node.x + radius, node.y);
      ctx.lineTo(node.x, node.y + radius);
      ctx.lineTo(node.x - radius, node.y);
      ctx.closePath();
      ctx.fill();
    } else {
      const size = 1.8 + node.energy * 1.1;
      ctx.fillRect(node.x - size / 2, node.y - size / 2, size, size);
    }

    // Activation ring: a single square outline, drawn only while the
    // node is genuinely hot. No glow, no blur.
    if (node.energy > 0.45) {
      const ring = 6 + (1 - node.energy) * 9;
      ctx.strokeStyle = `rgba(${SIGNAL}, ${(node.energy - 0.45) * 0.5 * master})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(node.x - ring / 2, node.y - ring / 2, ring, ring);
    }
  }

  /* Signals ------------------------------------------------------ */
  for (const signal of signals) {
    const edge = edges[signal.edge];
    if (!edge) continue;
    const a = nodes[edge.a];
    const b = nodes[edge.b];

    const t = Math.min(1, Math.max(0, signal.t));
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;

    // Short trail, drawn as a line segment back along the edge.
    const trail = 0.16 * signal.dir;
    const tt = Math.min(1, Math.max(0, t - trail));
    ctx.beginPath();
    ctx.moveTo(a.x + (b.x - a.x) * tt, a.y + (b.y - a.y) * tt);
    ctx.lineTo(x, y);
    ctx.strokeStyle = `rgba(${SIGNAL}, ${0.24 * master})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = `rgba(${SIGNAL}, ${0.8 * master})`;
    ctx.fillRect(x - 1.4, y - 1.4, 2.8, 2.8);
  }
}

/**
 * Static frame for reduced-motion and for the first paint. Draws the
 * topology with a handful of nodes pre-activated so that the
 * composition still has a focal reading without any movement.
 */
export function drawStaticScene(ctx: CanvasRenderingContext2D, scene: FieldScene) {
  const seeded = mulberry32(0x77aa);
  for (const node of scene.nodes) {
    node.energy = seeded() < 0.1 ? 0.55 : 0;
  }
  for (const edge of scene.edges) {
    edge.energy = Math.max(scene.nodes[edge.a].energy, scene.nodes[edge.b].energy) * 0.5;
  }
  drawScene(ctx, scene, { pointerX: null, pointerY: null, focus: 0.35 });
}
