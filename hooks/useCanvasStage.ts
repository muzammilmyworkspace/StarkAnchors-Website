"use client";

import { useEffect, useRef, type RefObject } from "react";

export type StageFrame = {
  /** CSS pixels. The context is pre-scaled, so draw in these units. */
  width: number;
  height: number;
  dpr: number;
  /** Seconds since the loop started. */
  time: number;
  /** Seconds since the previous frame, clamped to avoid tab-switch jumps. */
  delta: number;
};

type StageOptions = {
  /** Called on mount and on every resize, before the next draw. */
  setup?: (frame: Omit<StageFrame, "time" | "delta">) => void;
  draw: (ctx: CanvasRenderingContext2D, frame: StageFrame) => void;
  /** When false, exactly one frame is drawn and no loop is started. */
  animate: boolean;
  /** Upper bound on device pixel ratio. 2 is the point of diminishing return. */
  maxDpr?: number;
};

/**
 * Canvas lifecycle: sizing, device-pixel-ratio scaling, and a render
 * loop that only runs when it can actually be seen.
 *
 * The loop is suspended when the element scrolls out of view and when
 * the tab is hidden. This is the difference between a background that
 * costs nothing and a background that is the largest single consumer
 * of main-thread time on the page.
 *
 * When `animate` is false the hook draws one static frame — which is
 * how every visualisation satisfies `prefers-reduced-motion` without
 * a separate code path or a separate component.
 */
export function useCanvasStage(
  ref: RefObject<HTMLCanvasElement | null>,
  { setup, draw, animate, maxDpr = 2 }: StageOptions,
) {
  // Held in refs so that changing a callback identity never restarts
  // the loop or resets the scene.
  const drawRef = useRef(draw);
  const setupRef = useRef(setup);

  // Synced in an effect rather than during render: writing to a ref
  // while rendering is not safe under concurrent rendering. This effect
  // is declared before the one that starts the loop, and effects run in
  // declaration order, so the refs are always current by the time the
  // first frame is drawn.
  useEffect(() => {
    drawRef.current = draw;
    setupRef.current = setup;
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let start = 0;
    let last = 0;
    let visible = true;
    let running = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextDpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));

      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      setupRef.current?.({ width, height, dpr });
    };

    const renderOnce = (time: number, delta: number) => {
      ctx.clearRect(0, 0, width, height);
      drawRef.current(ctx, { width, height, dpr, time, delta });
    };

    const loop = (now: number) => {
      if (!running) return;
      if (!start) start = now;
      if (!last) last = now;

      // A tab restored after minutes must not integrate one huge step.
      const delta = Math.min((now - last) / 1000, 1 / 20);
      last = now;

      renderOnce((now - start) / 1000, delta);
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (running || !animate) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!animate) renderOnce(0, 0);
    });
    resizeObserver.observe(canvas);

    if (!animate) {
      renderOnce(0, 0);
      return () => resizeObserver.disconnect();
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) startLoop();
        else stopLoop();
      },
      { rootMargin: "128px" },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (visible) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref, animate, maxDpr]);
}
