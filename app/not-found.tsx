import Link from "next/link";
import { PageField } from "@/components/backgrounds/PageField";
import { ArrowLeft } from "@/components/ui/icons";
import { primaryNav } from "@/data/navigation";

export const metadata = {
  title: "System Not Found",
  description: "The requested node does not exist in this architecture.",
  robots: { index: false, follow: true },
};

/**
 * 404
 *
 * The mark, redrawn with its convergence node absent — the stays and
 * the spine still meet at a point that is no longer there. It states
 * the error in the brand's own geometry, which is a better use of the
 * page than an oversized numeral.
 */
export default function NotFound() {
  return (
    <>
      <PageField variant="quiet" />

      <section className="flex min-h-[78svh] items-center pt-32" aria-labelledby="notfound-title">
        <div className="shell">
          <div className="grid-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="t-meta text-titanium-faint">
                Error <span className="px-1.5">/</span> 404
              </p>

              <h1 id="notfound-title" className="t-display-xl mt-7 max-w-[10ch]">
                System not found.
              </h1>

              <p className="t-body-l mt-8 max-w-[38ch]">
                The requested node does not exist in this architecture. It may have been
                retired, or the address may be incorrect.
              </p>

              <Link href="/" className="btn mt-10 inline-flex">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to System</span>
              </Link>
            </div>

            {/* The mark with its node removed. */}
            <div className="col-span-12 mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-center">
              <svg viewBox="0 0 32 32" className="w-40 text-titanium-ghost lg:w-56" aria-hidden="true">
                <g stroke="currentColor" strokeWidth={0.9} strokeLinecap="square">
                  <path d="M5.5 6.5 L16 15 M26.5 6.5 L16 15" />
                  <path d="M16 17.4 V25.5" />
                  <path d="M7.5 25.5 H24.5" />
                </g>
                {/* Absent node */}
                <path
                  d="M16 12.6 L18.4 15 L16 17.4 L13.6 15 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.6}
                  strokeDasharray="1.2 1.2"
                />
              </svg>

              <p className="t-meta-sm mt-8 text-titanium-faint">
                Node <span className="px-1">/</span> Unresolved
              </p>
            </div>
          </div>

          {/* Available routes — more useful than a search box on a
              seven-page site. */}
          <nav aria-label="Available routes" className="mt-20 border-t border-line">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
              {primaryNav.map((item, index) => (
                <li
                  key={item.href}
                  className={`border-b border-line py-5 lg:border-b-0 ${
                    index > 0 ? "lg:border-l lg:pl-6" : ""
                  }`}
                >
                  <Link href={item.href} className="group block">
                    <span className="t-meta-sm text-titanium-faint transition-colors group-hover:text-laser">
                      {item.index}
                    </span>
                    <span className="t-display-s mt-3 block text-titanium-dim transition-colors group-hover:text-titanium">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
