"use client";
import { useRef } from "react";
import Image from "next/image";
import BackToIndex from "@/components/layout/BackToIndex";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-about-el]", { opacity: 0, y: 30 });
      gsap.to("[data-about-el]", {
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
          className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-12 md:mb-24"
          data-about-el
        >
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted">
            01 — About
          </p>
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
            The person behind the work
          </p>
        </div>

        {/* Foto + ficha biográfica — solo en móvil (en desktop ya está en el Hero) */}
        <div className="lg:hidden mb-12" data-about-el>
          <div className="relative w-full max-w-[320px] mx-auto mb-8">
            <div
              className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[75%] aspect-square rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(235,229,214,0.12) 0%, rgba(139,46,31,0.08) 35%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <div
              className="relative aspect-[3/4] w-full"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 88% at 50% 42%, #000 55%, rgba(0,0,0,0.85) 72%, transparent 93%)",
                maskImage:
                  "radial-gradient(ellipse 80% 88% at 50% 42%, #000 55%, rgba(0,0,0,0.85) 72%, transparent 93%)",
              }}
            >
              <Image
                src="/images/antonio-hero.png"
                alt="Antonio Pulido Sáez"
                fill
                sizes="320px"
                className="object-cover object-top"
                style={{ mixBlendMode: "lighten" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Path</span>
              <span className="font-sans text-xs text-text-primary">Sevilla · Madrid · Bologna · D.C.</span>
            </div>
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Focus</span>
              <span className="font-sans text-xs text-text-primary">Int'l Business · AI · Tech</span>
            </div>
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Background</span>
              <span className="font-sans text-xs text-text-primary">LL.B · Bar-certified · MSc</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Langs</span>
              <span className="font-sans text-xs text-text-primary">EN · ES · IT</span>
            </div>
          </div>
        </div>

        <h1
          className="font-serif text-display-sm md:text-display-md leading-[0.95] max-w-5xl mb-12 md:mb-24"
          data-about-el
        >
          A <span className="italic text-accent">bridge</span> between worlds.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-24 items-start mb-16 md:mb-32">
          <div
            className="space-y-5 font-sans text-text-muted max-w-md leading-relaxed text-base md:text-lg"
            data-about-el
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

          <div className="lg:sticky lg:top-24" data-about-el>
            <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.15] text-text-primary">
              <span className="text-accent font-serif italic">&ldquo;</span>
              I grew up studying the rules. Now I&apos;m studying how{" "}
              <span className="italic">technology</span> is rewriting them.
              <span className="text-accent font-serif italic">&rdquo;</span>
            </blockquote>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-8 h-px bg-text-muted" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
                Personal note, 2026
              </span>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 pt-10 border-t border-rule"
          data-about-el
        >
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim mb-2">Education</p>
            <div className="flex items-baseline gap-4 pb-2 border-b border-rule">
              <span className="font-mono text-xs text-text-muted w-16 md:w-20 shrink-0">2026</span>
              <span className="font-sans text-sm text-text-primary">MSc International Business — The George Washington University</span>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b border-rule">
              <span className="font-mono text-xs text-text-muted w-16 md:w-20 shrink-0">2025</span>
              <span className="font-sans text-sm text-text-primary">LL.M Bar-Certified — University of Nebrija, Madrid</span>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b border-rule">
              <span className="font-mono text-xs text-text-muted w-16 md:w-20 shrink-0">2024</span>
              <span className="font-sans text-sm text-text-primary">LL.B Law — University of Seville</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-text-muted w-16 md:w-20 shrink-0">2023</span>
              <span className="font-sans text-sm text-text-primary">Study abroad — Università di Bologna</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim mb-2">Elsewhere</p>
            <div className="flex items-baseline gap-4 pb-2 border-b border-rule">
              <span className="font-mono text-xs text-text-muted w-20 md:w-24 shrink-0">Leadership</span>
              <span className="font-sans text-sm text-text-primary">Oxford Certificate · Chief of Staff at MS IB</span>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b border-rule">
              <span className="font-mono text-xs text-text-muted w-20 md:w-24 shrink-0">Community</span>
              <span className="font-sans text-sm text-text-primary">Hispanic Bar Association D.C. · Volunteer in VA</span>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b border-rule">
              <span className="font-mono text-xs text-text-muted w-20 md:w-24 shrink-0">Sports</span>
              <span className="font-sans text-sm text-text-primary">Captain — University of Seville Soccer Team</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-text-muted w-20 md:w-24 shrink-0">Interests</span>
              <span className="font-sans text-sm text-text-primary">Soccer · Tennis · Travel · Skiing</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}