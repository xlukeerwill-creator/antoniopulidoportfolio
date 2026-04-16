"use client";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-about-title]", { opacity: 0, y: 40 });
      gsap.set("[data-about-body]", { opacity: 0, y: 30 });
      gsap.set("[data-about-quote]", { opacity: 0, y: 50 });
      gsap.set("[data-about-attrib]", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.to("[data-about-title]", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0)
        .to("[data-about-body]", { opacity: 1, y: 0, duration: 0.9 }, 0.15)
        .to("[data-about-quote]", { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, 0.25)
        .to("[data-about-attrib]", { opacity: 1, y: 0, duration: 0.7 }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative container-x py-24 md:py-32 lg:py-40 border-t border-rule"
      id="about"
    >
      <div className="grid grid-cols-2 items-baseline pb-6 border-b border-rule mb-12 md:mb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
          01 — About
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
          The person behind the work
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-start">
        <div className="flex flex-col gap-8">
          <h2
            className="font-serif text-display-md leading-[0.95]"
            data-about-title
          >
            A <span className="italic text-accent">bridge</span> between worlds.
          </h2>
          <div
            className="space-y-5 font-sans text-text-muted max-w-md leading-relaxed"
            data-about-body
          >
            <p>
              Trained as a lawyer in Seville, bar-certified in Madrid, and now
              immersed in international business at The George Washington
              University — my path has never followed a single discipline.
            </p>
            <p>
              I&apos;m drawn to the intersections: where legal thinking meets
              business strategy, where cross-cultural awareness meets emerging
              technology, where the precision of the courtroom meets the
              creativity of startups.
            </p>
            <p>
              Today, my curiosity is firmly focused on AI, coding, and how these
              tools are reshaping global professional services — including the
              one I was trained for.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <blockquote
            className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-text-primary"
            data-about-quote
          >
            <span className="text-accent font-serif italic">&ldquo;</span>
            I grew up studying the rules. Now I&apos;m studying how{" "}
            <span className="italic">technology</span> is rewriting them.
            <span className="text-accent font-serif italic">&rdquo;</span>
          </blockquote>
          <div className="flex items-center gap-4 mt-8" data-about-attrib>
            <div className="w-8 h-px bg-text-muted" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              Personal note, 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
