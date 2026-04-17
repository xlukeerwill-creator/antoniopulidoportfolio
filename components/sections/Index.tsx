"use client";
import { useRef } from "react";
import { TransitionLink } from "@/components/layout/PageTransition";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const entries = [
  { num: "01", title: "About", href: "/about" },
  { num: "02", title: "Work", href: "/work" },
  { num: "03", title: "Thoughts", href: "/thoughts", italic: true },
  { num: "04", title: "Contact", href: "/contact" },
];

export default function Index() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const rect = sectionRef.current?.getBoundingClientRect();
      const alreadyVisible =
        rect && rect.top < window.innerHeight && rect.bottom > 0;

      if (alreadyVisible) {
        gsap.from("[data-index-header]", {
          opacity: 0,
          y: 15,
          duration: 0.7,
          delay: 0.1,
        });
        gsap.from("[data-index-item]", {
          opacity: 0,
          y: 50,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        });
      } else {
        gsap.from("[data-index-header]", {
          opacity: 0,
          y: 15,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        });
        gsap.from("[data-index-item]", {
          opacity: 0,
          y: 50,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="index"
      className="relative h-screen max-h-screen container-x border-t border-rule flex flex-col pt-8 md:pt-10 pb-8 md:pb-10"
    >
      <div
        className="grid grid-cols-2 items-baseline pb-4 border-b border-rule shrink-0"
        data-index-header
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
          Index
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
          Select a chapter
        </p>
      </div>

      <nav className="flex-1 min-h-0 flex flex-col justify-center">
        {entries.map((entry) => (
          <TransitionLink
            key={entry.num}
            href={entry.href}
            className="group relative grid grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-baseline py-4 md:py-5 border-t border-rule transition-colors duration-500 last:border-b"
            data-index-item
          >
            <span className="font-mono text-xs md:text-sm text-text-dim group-hover:text-accent transition-colors duration-500">
              {entry.num}
            </span>
            <span
              className={`font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-text-primary group-hover:text-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:group-hover:translate-x-6${entry.italic ? " italic" : ""}`}
            >
              {entry.title}
            </span>
            <span className="font-serif text-xl md:text-2xl text-text-dim group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
              →
            </span>
          </TransitionLink>
        ))}
      </nav>
    </section>
  );
}
