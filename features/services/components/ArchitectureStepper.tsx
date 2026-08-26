"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { architectureStages } from "@/data/services";
import { EASE_OUT, viewportOnce } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";

/**
 * THE ENGAGEMENT ARCHITECTURE
 *
 * Seven stages from Input to Scale, as a selectable rail.
 *
 * A third diagram idiom, chosen so the site does not repeat itself:
 * the home page has a tapering band and a serpentine route, the
 * modules above have a block schematic, and this is a stepper. Same
 * drawing language — hairlines, squares, one diamond at the terminal —
 * arranged four different ways.
 *
 * Implemented as a real tab set: `tablist` / `tab` / `tabpanel`, a
 * roving tabindex, and Home/End/Arrow key support. Selection is
 * explicit (click or Enter) rather than following focus, because the
 * panel content is long enough that automatic activation while
 * arrowing through would be disorienting for a screen reader.
 */
export function ArchitectureStepper() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = architectureStages[selected];
  const count = architectureStages.length;

  const focusTab = (index: number) => {
    const next = (index + count) % count;
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(count - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* ---- Rail ------------------------------------------------ */}
      <div
        role="tablist"
        aria-label="Engagement architecture stages"
        aria-orientation="horizontal"
        className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
      >
        {/* Base rail, desktop only — on smaller screens the stages wrap
            and a single continuous rule would no longer be truthful. */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[46px] hidden h-px bg-line-strong lg:block"
        />
        <motion.span
          aria-hidden
          className="absolute left-0 top-[46px] hidden h-px bg-laser lg:block"
          initial={false}
          // Land the fill on the active node itself. Nodes sit after
          // the column padding, so the offset differs for the first one.
          animate={{
            width: `calc(${(selected / count) * 100}% + ${selected === 0 ? 5 : 25}px)`,
          }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />

        {architectureStages.map((item, index) => {
          const active = index === selected;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              id={`arch-tab-${item.id}`}
              aria-selected={active}
              aria-controls="arch-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="group relative border-l border-line py-5 pl-4 text-left first:border-l-0 first:pl-0 lg:pl-5"
            >
              <span
                className={cn(
                  "t-meta-sm block transition-colors duration-200",
                  active ? "text-laser" : "text-titanium-faint",
                )}
              >
                {item.index}
              </span>

              {/* Node sits on the rail. */}
              <span
                aria-hidden
                className={cn(
                  "mt-4 hidden h-[9px] w-[9px] transition-colors duration-200 lg:block",
                  index === count - 1 ? "rotate-45" : "",
                  active
                    ? "bg-laser"
                    : "bg-titanium-ghost group-hover:bg-titanium-faint",
                )}
              />

              <span
                className={cn(
                  "t-display-s mt-4 block transition-colors duration-200 lg:mt-6",
                  active ? "text-titanium" : "text-titanium-dim group-hover:text-titanium",
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---- Panel ----------------------------------------------- */}
      <div
        role="tabpanel"
        id="arch-panel"
        aria-labelledby={`arch-tab-${stage.id}`}
        tabIndex={0}
        className="mt-12 border-t border-line pt-10 lg:mt-16"
      >
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT }}
          className="grid-12"
        >
          <div className="col-span-12 lg:col-span-4">
            <p className="t-meta">
              Stage <span className="t-faint">/</span>{" "}
              <span className="text-laser">{stage.index}</span>
            </p>
            <h3 className="t-display-m mt-4 text-titanium">{stage.name}</h3>
            <p className="t-statement mt-4 max-w-[26ch] text-titanium-dim">
              {stage.summary}
            </p>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-5 lg:col-start-6 lg:mt-0">
            <p className="t-body-l">{stage.detail}</p>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-2 lg:col-start-11 lg:mt-0">
            <p className="t-meta-sm text-titanium-faint">Outputs</p>
            <ul className="mt-4 space-y-2.5">
              {stage.outputs.map((output) => (
                <li key={output} className="flex gap-3">
                  <span aria-hidden className="mt-[0.62em] h-px w-2.5 shrink-0 bg-laser" />
                  <span className="t-body-s text-titanium-dim">{output}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Progress readout — the same instrument language as the home
          status strip, at a smaller scale. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        className="mt-10 flex items-center gap-4 border-t border-line pt-5"
      >
        <span className="t-meta-sm text-titanium-faint">
          {String(selected + 1).padStart(2, "0")} <span className="px-1">/</span>{" "}
          {String(count).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span className="t-meta-sm text-titanium-faint">
          Sequence <span className="px-1">/</span> Input → Scale
        </span>
      </motion.div>
    </div>
  );
}
