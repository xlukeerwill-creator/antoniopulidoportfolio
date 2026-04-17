"use client";
import { useRef } from "react";
import BackToIndex from "@/components/layout/BackToIndex";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export default function ThoughtsPage() {
  const pageRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
  if (!pageRef.current) return;
  const ctx = gsap.context(() => {
    gsap.set("[data-thoughts-el]", { opacity: 0, y: 30 });
    gsap.to("[data-thoughts-el]", {
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
        className="min-h-screen bg-bg-primary text-text-primary container-x pt-20 md:pt-24 pb-20 flex flex-col"
      >
        <div
          className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-16 md:mb-24"
          data-thoughts-el
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
            03 — Thoughts
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
            Coming soon
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          <h1
            className="font-serif text-display-md leading-[0.95] mb-12"
            data-thoughts-el
          >
            A space for{" "}
            <span className="italic text-accent">writing</span>, soon.
          </h1>

          <p
            className="font-sans text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
            data-thoughts-el
          >
            Short essays on how AI, international business, and law are
            colliding. Reflections from a lawyer learning to code, and a
            business student learning to think in models. Early thoughts, not
            polished conclusions.
          </p>

          <div className="flex items-center gap-4" data-thoughts-el>
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Launching in Fase 2
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
