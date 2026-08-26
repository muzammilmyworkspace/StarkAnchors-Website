import type { LogBlock } from "@/types";
import { LogFigure } from "./LogFigure";

/**
 * Article renderer.
 *
 * Content arrives as a small typed block union rather than as a
 * markdown string. The trade is deliberate: authoring is slightly more
 * verbose, but every block that can appear in an article is enumerated
 * in the type system, figures are real components rather than embedded
 * HTML, and moving the archive to a CMS later means writing one
 * adapter rather than re-styling a markdown pipeline.
 */
export function LogBody({ blocks }: { blocks: LogBlock[] }) {
  return (
    <div className="prose-log">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={block.id} id={block.id}>
                {block.text}
              </h2>
            );

          case "h3":
            return <h3 key={`${block.text}-${index}`}>{block.text}</h3>;

          case "ul":
            return (
              <ul key={`ul-${index}`}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );

          case "quote":
            return <blockquote key={`quote-${index}`}>{block.text}</blockquote>;

          case "figure":
            return (
              <LogFigure
                key={`figure-${index}`}
                kind={block.diagram}
                caption={block.caption}
              />
            );

          case "p":
          default:
            return <p key={`p-${index}`}>{block.text}</p>;
        }
      })}
    </div>
  );
}
