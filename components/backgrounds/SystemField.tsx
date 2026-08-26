"use client";

import { useCallback, useEffect, useRef } from "react";
import { useCanvasStage } from "@/hooks/useCanvasStage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  buildScene,
  drawScene,
  drawStaticScene,
  stepScene,
  type FieldInput,
  type FieldScene,
} from "@/lib/field/engine";
import type { FieldVariant } from "@/types";

type SystemFieldProps = {
  variant: FieldVariant;
  className?: string;
};

/**
 * React binding for the field engine.
 *
 * The component holds no state. Pointer position and scroll focus are
 * written into refs by passive listeners and read during the draw
 * call, so moving the mouse across the page never triggers a React
 * render — the canvas is the only thing that updates.
 */
export function SystemField({ variant, className }: SystemFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<FieldScene | null>(null);
  const inputRef = useRef<FieldInput>({ pointerX: null, pointerY: null, focus: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const input = inputRef.current;

    const onPointerMove = (event: PointerEvent) => {
      // Touch drives scroll, not exploration — ignore it entirely.
      if (event.pointerType !== "mouse") return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      input.pointerX = event.clientX - rect.left;
      input.pointerY = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      input.pointerX = null;
      input.pointerY = null;
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      input.focus = scrollable > 0 ? window.scrollY / scrollable : 0;
    };

    onScroll();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const setup = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      sceneRef.current = buildScene(width, height, variant);
    },
    [variant],
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, frame: { delta: number }) => {
      const scene = sceneRef.current;
      if (!scene) return;

      if (reducedMotion) {
        drawStaticScene(ctx, scene);
        return;
      }

      stepScene(scene, frame.delta, inputRef.current);
      drawScene(ctx, scene, inputRef.current);
    },
    [reducedMotion],
  );

  // `animate: false` under reduced motion means no RAF loop is ever
  // started — the stage draws a single static frame and stops.
  useCanvasStage(canvasRef, { setup, draw, animate: !reducedMotion });

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      // The field is decoration in the accessibility tree and load-
      // bearing in the art direction. Both statements are true.
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default SystemField;
