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
      gsap.from("[data-index-header]", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
      gsap.from("[data-index-item]", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen container-x py-24 md:py-32 border-t border-rule flex flex-col justify-center"
    >
      <div
        className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-16 md:mb-24"
        data-index-header
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
          Index
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
          Navigate ↓
        </p>
      </div>

      <nav className="flex flex-col">
        {entries.map((entry) => (
          <TransitionLink
            key={entry.num}
            href={entry.href}
            className="group relative grid grid-cols-[auto_1fr_auto] gap-8 md:gap-16 items-baseline py-6 md:py-8 border-t border-rule transition-colors duration-500"
            data-index-item
          >
            <span className="font-mono text-sm md:text-base text-text-dim group-hover:text-accent transition-colors duration-500">
              {entry.num}
            </span>
            <span
              className={`font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-text-primary group-hover:text-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:group-hover:translate-x-8${entry.italic ? " italic" : ""}`}
            >
              {entry.title}
            </span>
            <span className="font-serif text-xl md:text-3xl text-text-dim group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
              →
            </span>
          </TransitionLink>
        ))}
        <div className="border-t border-rule" />
      </nav>
    </section>
  );
}
