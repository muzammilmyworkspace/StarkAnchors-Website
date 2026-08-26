import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { mission, vision } from "@/data/site";

const STATEMENTS = [
  { id: "mission", index: "03", label: "Mission", body: mission },
  { id: "vision", index: "04", label: "Vision", body: vision },
];

/**
 * MISSION AND VISION
 *
 * Two monumental typographic blocks on a tonal band. No panels, no
 * icons, no side-by-side cards — each statement gets the full width of
 * the page and a rule of its own, because these are the two longest
 * sentences on the site and they need the room.
 *
 * The label hangs in the left margin at meta scale so the eye starts
 * on the statement itself rather than on a heading announcing it.
 */
export function MissionVision() {
  return (
    <Section
      id="mandate"
      surface="band"
      className="border-y border-line"
      labelledBy="mandate-title"
    >
      <h2 id="mandate-title" className="sr-only">
        Mission and vision
      </h2>

      <div className="space-y-16 lg:space-y-24">
        {STATEMENTS.map((statement) => (
          <div key={statement.id} id={statement.id} className="grid-12">
            <div className="col-span-12 lg:col-span-2">
              <div className="flex items-center gap-3 lg:block">
                <span className="t-meta-sm text-titanium-faint">{statement.index}</span>
                <span className="t-meta text-titanium lg:mt-3 lg:block">
                  {statement.label}
                </span>
              </div>
            </div>

            <div className="col-span-12 mt-6 lg:col-span-9 lg:col-start-4 lg:mt-0">
              <Reveal>
                <p className="t-lead text-titanium">{statement.body}</p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
