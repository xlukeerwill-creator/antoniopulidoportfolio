"use client";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const thoughtCards = [
  { num: "01", title: "How LLMs are reshaping legal research" },
  { num: "02", title: "The international lawyer's guide to prompting" },
  { num: "03", title: "Notes from my first month learning to code" },
];

export default function Thoughts() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-thoughts-title]", { opacity: 0, y: 40 });
      gsap.set("[data-thoughts-body]", { opacity: 0, y: 30 });
      gsap.set("[data-thoughts-grid] article", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.to("[data-thoughts-title]", { opacity: 1, y: 0, duration: 1 }, 0)
        .to("[data-thoughts-body]", { opacity: 1, y: 0, duration: 0.9 }, 0.1)
        .to("[data-thoughts-grid] article", {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
        }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative container-x py-24 md:py-32 lg:py-40 border-t border-rule overflow-hidden"
      id="thoughts"
    >
      <div className="grid grid-cols-2 items-baseline pb-6 border-b border-rule mb-12 md:mb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
          03 — Thoughts
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
          In progress
        </p>
      </div>

      <div
        className="relative -mx-6 md:-mx-10 lg:-mx-16 mb-20 md:mb-32 overflow-hidden"
        data-thoughts-marquee
      >
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_40s_linear_infinite] font-serif text-[clamp(3rem,8vw,7rem)] leading-none text-text-primary">
          {[...Array(2)].map((_, iteration) => (
            <div key={iteration} className="flex gap-12 items-center shrink-0">
              <span>AI × Law</span>
              <span className="text-accent italic">Generative AI</span>
              <span>LLMs</span>
              <span className="italic text-text-dim">Product Strategy</span>
              <span>Coding</span>
              <span className="text-accent">Emerging Tech</span>
              <span className="italic">International Business</span>
              <span className="text-text-dim">—</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-baseline mb-16 md:mb-20">
        <h2
          className="font-serif text-display-md leading-[0.95]"
          data-thoughts-title
        >
          Writing, <span className="italic text-accent">eventually</span>.
        </h2>
        <p
          className="font-sans text-text-muted text-base md:text-lg max-w-xl"
          data-thoughts-body
        >
          A space for short essays on how AI, law, and business are colliding.
          Early thoughts, not polished conclusions. Launching soon.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
        data-thoughts-grid
      >
        {thoughtCards.map((t, i) => (
          <article
            key={i}
            className="group flex flex-col gap-6 p-6 md:p-8 border border-rule hover:border-rule-strong transition-colors duration-500 bg-bg-secondary/40 cursor-default aspect-[5/6]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim">
                {t.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Coming soon
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl leading-[1.1] text-text-primary mt-auto">
              {t.title}
            </h3>
            <div className="flex items-center gap-3 pt-4 border-t border-rule">
              <div className="w-6 h-px bg-text-muted group-hover:bg-accent transition-colors duration-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Essay
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
