import Link from "next/link";
import BackToIndex from "@/components/layout/BackToIndex";
import { getAllThoughtsMeta, formatDate } from "@/lib/thoughts";
import ThoughtsAnimations from "./ThoughtsAnimations";

function toRoman(num: number): string {
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
  return romans[num - 1] || String(num);
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughtsMeta();
  const hasThoughts = thoughts.length > 0;

  return (
    <>
      <BackToIndex />
      <main className="min-h-screen bg-bg-primary text-text-primary container-x pt-20 md:pt-24 pb-20">
        <ThoughtsAnimations />

        <div
          className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-12 md:mb-24"
          data-thoughts-el
        >
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted">
            03 — Thoughts
          </p>
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
            {hasThoughts ? `${thoughts.length} ${thoughts.length === 1 ? "essay" : "essays"}` : "Coming soon"}
          </p>
        </div>

        <h1
          className="font-serif text-display-sm md:text-display-md leading-[0.95] max-w-5xl mb-12 md:mb-20"
          data-thoughts-el
        >
          Writing, <span className="italic text-accent">thinking</span>, learning.
        </h1>

        <p
          className="font-sans text-text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-16 md:mb-24"
          data-thoughts-el
        >
          Short essays on how AI, international business, and law are colliding. Reflections from a lawyer learning to code, and a business student learning to think in models. Early thoughts, not polished conclusions.
        </p>

        {hasThoughts ? (
          <div className="flex flex-col" data-thoughts-el>
            {thoughts.map((thought, index) => (
              <Link
                key={thought.slug}
                href={`/thoughts/${thought.slug}`}
                prefetch={true}
                className="group grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-x-6 md:gap-x-12 gap-y-1 items-start py-10 md:py-16 border-t border-rule transition-colors duration-500 lg:hover:bg-bg-secondary lg:px-2 lg:-mx-2"
              >
                <span className="font-serif italic text-[clamp(1.75rem,4vw,3rem)] text-text-dim leading-none lg:group-hover:text-accent transition-colors duration-500 min-w-[2rem] md:min-w-[3rem] pt-2">
                  {toRoman(index + 1)}
                </span>

                <div className="flex flex-col gap-3 md:gap-4 max-w-3xl">
                  <span className="lg:hidden font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    {formatDate(thought.date)}
                  </span>

                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-text-primary">
                    {thought.title}
                  </h2>

                  {thought.subtitle && (
                    <p className="font-serif text-lg md:text-xl text-text-muted italic leading-[1.3]">
                      {thought.subtitle}
                    </p>
                  )}

                  {thought.pullquote && (
                    <blockquote className="mt-3 md:mt-5 pl-5 border-l-2 border-accent font-serif italic text-base md:text-lg text-text-primary leading-[1.5] max-w-2xl">
                      &ldquo;{thought.pullquote}&rdquo;
                    </blockquote>
                  )}

                  <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-4 md:mt-6">
                    {thought.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
                      · {thought.readingTime}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ml-auto md:ml-0">
                      Read essay →
                    </span>
                  </div>
                </div>

                <span className="hidden lg:block font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted whitespace-nowrap pt-2">
                  {formatDate(thought.date)}
                </span>
              </Link>
            ))}
            <div className="border-t border-rule" />
          </div>
        ) : (
          <div className="flex items-center gap-4 pt-8 border-t border-rule" data-thoughts-el>
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Launching soon
            </span>
          </div>
        )}
      </main>
    </>
  );
}