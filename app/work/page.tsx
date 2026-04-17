"use client";
import { useRef } from "react";
import BackToIndex from "@/components/layout/BackToIndex";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const experiences = [
  {
    roman: "I",
    year: "2025",
    role: "Government Relations & Data Research",
    org: "NVA Hispanic Chamber of Commerce",
    location: "Tysons Corner, VA",
    description:
      "Led a project connecting 20+ Washington, D.C. embassies with the chamber, fostering international business opportunities. Directed policy strategies for 15+ clients including Amazon, the Virginia Secretary of Commerce, and Maryland government.",
  },
  {
    roman: "II",
    year: "2024",
    role: "International Business Development Associate",
    org: "Advanced Leadership Foundation",
    location: "Washington, D.C.",
    description:
      "Collaborated with an 8-time Emmy-winning director, assisting in meetings with policymakers and business leaders. Oversaw contract negotiations for cross-border partnerships in Latin America and Europe.",
  },
  {
    roman: "III",
    year: "2024",
    role: "Junior Associate",
    org: "BBC Law Firm",
    location: "Seville, Spain",
    description:
      "Advised on commercial law for €30M+ firms. Participated in high-level investment meetings reviewing proposals and legal documentation. Drafted shareholder agreements and incorporation deeds.",
  },
  {
    roman: "IV",
    year: "2020 — 2024",
    role: "Event Coordinator",
    org: "Fundación Cajasol",
    location: "Seville, Spain",
    description:
      "Coordinated large-scale events with 400+ attendees, including the Latin Grammy Awards in Seville. Handled candidate assessments, interviews, and client reports.",
  },
];

export default function WorkPage() {
  const pageRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
  if (!pageRef.current) return;
  const ctx = gsap.context(() => {
    gsap.set("[data-work-el]", { opacity: 0, y: 30 });
    gsap.to("[data-work-el]", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, pageRef);
  return () => ctx.revert();
}, []);

  return (
    <>
      <BackToIndex />
      <main
        ref={pageRef}
        className="min-h-screen bg-bg-primary text-text-primary container-x pt-20 md:pt-24 pb-20"
      >
        <div
          className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-16 md:mb-24"
          data-work-el
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
            02 — Work
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
            Selected experiences
          </p>
        </div>

        <h1
          className="font-serif text-display-md leading-[0.95] max-w-5xl mb-16 md:mb-24"
          data-work-el
        >
          Four chapters. Four{" "}
          <span className="italic text-accent">cities</span>. One throughline.
        </h1>

        <div className="flex flex-col" data-work-el>
          {experiences.map((exp) => (
            <div
              key={exp.roman}
              className="group grid grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-baseline py-8 md:py-10 border-t border-rule transition-colors duration-500 hover:bg-bg-secondary cursor-default px-2 -mx-2"
            >
              <span className="font-serif italic text-[clamp(2rem,5vw,4rem)] text-text-dim leading-none group-hover:text-accent transition-colors duration-500 min-w-[2rem]">
                {exp.roman}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl md:text-3xl lg:text-4xl leading-tight text-text-primary">
                  {exp.role}
                </h3>
                <p className="font-sans text-sm md:text-base text-text-muted">
                  {exp.org} — {exp.location}
                </p>
                <p className="font-sans text-sm text-text-muted max-w-2xl mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-4 transition-all duration-500 ease-out">
                  {exp.description}
                </p>
              </div>

              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-text-muted text-right whitespace-nowrap">
                {exp.year}
              </span>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>
      </main>
    </>
  );
}
