"use client";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const letterARef = useRef<HTMLSpanElement>(null);
  const letterPRef = useRef<HTMLSpanElement>(null);
  const letterSRef = useRef<HTMLSpanElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterNumberRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
        onCompleteRef.current();
      }, 200);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const ctx = gsap.context(() => {
      const letters = [letterARef.current, letterPRef.current, letterSRef.current];
      const corners = [topMetaRef.current, yearRef.current, counterRef.current, statusRef.current];

      // Initial states
      gsap.set(letters, { opacity: 0, y: 40, filter: "blur(10px)" });
      gsap.set(corners, { opacity: 0, y: -10 });
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(scannerRef.current, { width: 0 });

      // Dot blink — independent, loops until panel exit
      const dotTween = gsap.to(dotRef.current, {
        opacity: 0.2,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
      });

      const counter = { val: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          dotTween.kill();
          document.body.style.overflow = "";
          onCompleteRef.current();
        },
      });

      // Act 1 — Entrance (0 → ~1.04s)
      tl.to(
        letters,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
        },
        0
      );
      tl.to(
        corners,
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      );

      // Act 2 — Progress (0.9 → 2.6s)
      tl.to(
        counter,
        {
          val: 100,
          duration: 1.7,
          ease: "none",
          onUpdate() {
            if (counterNumberRef.current) {
              counterNumberRef.current.textContent = String(
                Math.round(counter.val)
              ).padStart(3, "0");
            }
          },
        },
        0.9
      );
      tl.to(
        progressLineRef.current,
        { scaleX: 1, duration: 1.7, ease: "none" },
        0.9
      );

      // Act 3 — Antesala (2.6 → 3.2s)
      tl.to(
        [counterRef.current, statusRef.current],
        { opacity: 0, y: 8, duration: 0.4 },
        2.6
      );
      tl.to(
        letters,
        { scale: 0.96, duration: 0.3, ease: "power2.inOut" },
        2.6
      );

      // Act 4 — Cinematic cut (3.2 → 4.55s)
      tl.to(
        scannerRef.current,
        { width: "100vw", duration: 0.35, ease: "power3.inOut" },
        3.2
      );
      tl.to(
        letters,
        { y: -60, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.05 },
        3.3
      );
      tl.to(
        progressLineRef.current,
        { scaleX: 0, transformOrigin: "right center", duration: 0.3, ease: "none" },
        3.3
      );
      tl.to(
        [topMetaRef.current, yearRef.current],
        { opacity: 0, duration: 0.3 },
        3.3
      );
      // Scanner exits right
      tl.to(
        scannerRef.current,
        { x: "100vw", width: 0, duration: 0.25, ease: "power2.in" },
        3.55
      );
      // Panels split open
      tl.to(
        panelTopRef.current,
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        3.45
      );
      tl.to(
        panelBottomRef.current,
        { yPercent: 100, duration: 1, ease: "power4.inOut" },
        3.45
      );
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-bg-primary flex items-center justify-center overflow-hidden"
    >
      {/* Curtain panels */}
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-bg-primary z-30"
      />
      <div
        ref={panelBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg-primary z-30"
      />

      {/* Letters APS */}
      <div className="relative z-40 flex items-baseline gap-2 md:gap-4">
        <span
          ref={letterARef}
          className="font-serif text-text-primary leading-none font-normal select-none"
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
        >
          A
        </span>
        <span
          className="font-serif text-accent opacity-60 italic select-none"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          ·
        </span>
        <span
          ref={letterPRef}
          className="font-serif text-text-primary leading-none font-normal select-none"
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
        >
          P
        </span>
        <span
          className="font-serif text-accent opacity-60 italic select-none"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          ·
        </span>
        <span
          ref={letterSRef}
          className="font-serif text-text-primary leading-none italic select-none"
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
        >
          S
        </span>
      </div>

      {/* Top-left: mark */}
      <div
        ref={topMetaRef}
        className="absolute top-6 left-6 md:top-8 md:left-10 z-40 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted"
      >
        A. Pulido Saez — Portfolio
      </div>

      {/* Top-right: year */}
      <div
        ref={yearRef}
        className="absolute top-6 right-6 md:top-8 md:right-10 z-40 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted"
      >
        MMXXVI
      </div>

      {/* Bottom-left: counter */}
      <div
        ref={counterRef}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-40 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted tabular-nums"
      >
        <span ref={counterNumberRef}>000</span>
      </div>

      {/* Bottom-right: status */}
      <div
        ref={statusRef}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-40 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted flex items-center gap-2"
      >
        <span
          ref={dotRef}
          className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
        />
        Loading Experience
      </div>

      {/* Progress track + fill */}
      <div
        className="absolute left-6 right-6 md:left-10 md:right-10 z-40 h-px"
        style={{ top: "60%", backgroundColor: "var(--color-rule)" }}
      >
        <div
          ref={progressLineRef}
          className="h-full bg-accent"
        />
      </div>

      {/* Scanner bar */}
      <div
        ref={scannerRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent z-40"
        style={{ width: 0 }}
      />
    </div>
  );
}
