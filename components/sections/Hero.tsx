"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

interface HeroProps {
  startAnimation: boolean;
  instantVisible?: boolean;
}

export default function Hero({ startAnimation, instantVisible = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollToLatest = () => {
    const target = document.getElementById("latest-essay");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (instantVisible) {
        gsap.set("[data-hero-line]", { yPercent: 0, opacity: 1 });
        gsap.set("[data-hero-glow]", { opacity: 1 });
        gsap.set("[data-hero-photo]", { opacity: 1, x: 0, scale: 1 });
        gsap.set("[data-hero-tag]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-bio]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-scroll]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-whatsnew]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-bottomnav]", { opacity: 1, y: 0 });
        return;
      }

      gsap.set("[data-hero-line]", { yPercent: 110 });
      gsap.set("[data-hero-glow]", { opacity: 0 });
      gsap.set("[data-hero-photo]", { opacity: 0, x: 30, scale: 0.96 });
      gsap.set("[data-hero-tag]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-bio]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-scroll]", { opacity: 0, y: 10 });
      gsap.set("[data-hero-whatsnew]", { opacity: 0, y: 15 });
      gsap.set("[data-hero-bottomnav]", { opacity: 0, y: 30 });

      if (!startAnimation) return;

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to("[data-hero-line]", {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: "power4.out",
      })
        .to("[data-hero-glow]", { opacity: 1, duration: 1.8, ease: "power2.out" }, "-=0.8")
        .to("[data-hero-photo]", { opacity: 1, x: 0, scale: 1, duration: 1.4, ease: "power3.out" }, "-=1.6")
        .to("[data-hero-tag]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.9")
        .to("[data-hero-bio]", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to("[data-hero-scroll]", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to("[data-hero-whatsnew]", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .to("[data-hero-bottomnav]", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, [startAnimation, instantVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen lg:max-h-screen flex flex-col container-x overflow-hidden pt-6 md:pt-8 pb-28 md:pb-8 lg:pb-8"
    >
      {/* Gradiente vivo de fondo (solo móvil) */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-bg-gradient absolute inset-0" />
      </div>

      <div className="relative grid grid-cols-2 items-center pb-4 border-b border-rule shrink-0 z-10">
        <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
          A. Pulido Sáez — Portfolio
        </p>
        <span className="md:hidden" />
        <div className="text-right">
          <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            Washington D.C. · MMXXVI
          </p>
          <div className="md:hidden flex flex-col items-end gap-0.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted leading-tight">
              Washington D.C.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim leading-tight">
              MMXXVI
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-center pt-8 lg:pt-8">
        <div className="flex flex-col gap-5 lg:gap-7">
          <h1
            className="flex flex-col font-serif font-normal leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 10.5vw, 9.5rem)" }}
          >
            <div className="overflow-hidden">
              <span className="inline-block" data-hero-line>Antonio</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block" data-hero-line>Pulido</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block italic text-accent" data-hero-line>
                Sáez.
              </span>
            </div>
          </h1>

          <p
            className="font-serif text-lg md:text-2xl lg:text-3xl text-text-primary max-w-2xl leading-[1.2]"
            data-hero-tag
            style={{ opacity: 0 }}
          >
            Bridging law, business and technology.
          </p>

          <p
            className="font-sans text-sm md:text-base text-text-muted max-w-md leading-relaxed"
            data-hero-bio
            style={{ opacity: 0 }}
          >
            MSc International Business candidate at The George Washington
            University, with a legal background from Spain. Focused on how AI
            and emerging technology are reshaping global business, strategy, and
            the future of professional services.
          </p>

          {/* Botón "Enter the portfolio" — solo desktop */}
          <Link
            href="/menu"
            prefetch={true}
            className="hidden lg:inline-flex group relative items-center justify-between gap-6 w-full sm:w-fit sm:min-w-[280px] mt-2 px-6 md:px-7 py-4 md:py-5 border border-text-muted hover:border-accent active:border-accent bg-transparent hover:bg-accent active:bg-accent transition-all duration-500 overflow-hidden"
            data-hero-scroll
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.25em] text-text-primary group-hover:text-bg-primary group-active:text-bg-primary transition-colors duration-500 relative z-10">
              Enter the portfolio
            </span>
            <span className="font-serif text-xl md:text-2xl text-text-primary group-hover:text-bg-primary group-active:text-bg-primary group-hover:translate-x-1 group-active:translate-x-1 transition-all duration-500 relative z-10">
              →
            </span>
          </Link>

          {/* What's new — solo móvil — botón con caja burgundy */}
          <button
            onClick={handleScrollToLatest}
            className="lg:hidden mt-6 self-center group relative inline-flex items-center justify-center gap-3 px-7 py-4 border border-accent/40 bg-accent/5 active:bg-accent/15 active:border-accent transition-all duration-300"
            data-hero-whatsnew
            style={{ opacity: 0 }}
            aria-label="Scroll to latest essay"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.3em] text-accent">
              what&apos;s new
            </span>
            <span className="hero-arrow-pulse font-serif text-xl text-accent leading-none">↓</span>
          </button>
        </div>

        {/* Foto desktop — sin cambios */}
        <div
          className="hidden lg:flex relative flex-col gap-5 w-full"
          data-hero-photo
          style={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
            <div
              data-hero-glow
              className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[75%] aspect-square rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(235,229,214,0.12) 0%, rgba(168,55,31,0.08) 35%, transparent 70%)",
                filter: "blur(50px)",
                opacity: 0,
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
                priority
                sizes="(max-width: 1024px) 70vw, 400px"
                className="object-cover object-top"
                style={{ mixBlendMode: "lighten" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-[400px] mx-auto lg:mx-0 w-full">
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Path</span>
              <span className="font-sans text-xs text-text-primary">Sevilla · Madrid · Bologna · Washington D.C.</span>
            </div>
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Focus</span>
              <span className="font-sans text-xs text-text-primary">International Business · AI · Emerging Tech</span>
            </div>
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Background</span>
              <span className="font-sans text-xs text-text-primary">LL.B · Bar-certified (Spain) · MSc (in progress)</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">Langs</span>
              <span className="font-sans text-xs text-text-primary">EN · ES · IT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-nav fija — solo móvil, más generosa y con presencia */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-t border-rule"
        data-hero-bottomnav
        style={{ opacity: 0 }}
        aria-label="Quick navigation"
      >
        <div className="grid grid-cols-4 gap-0">
          <Link
            href="/about"
            prefetch={true}
            className="group flex flex-col items-center justify-center gap-1 py-4 active:bg-accent/10 transition-colors"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim group-active:text-accent transition-colors">01</span>
            <span className="font-serif text-base text-text-primary group-active:text-accent transition-colors">About</span>
          </Link>
          <Link
            href="/work"
            prefetch={true}
            className="group flex flex-col items-center justify-center gap-1 py-4 active:bg-accent/10 transition-colors border-l border-rule"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim group-active:text-accent transition-colors">02</span>
            <span className="font-serif text-base text-text-primary group-active:text-accent transition-colors">Work</span>
          </Link>
          <Link
            href="/thoughts"
            prefetch={true}
            className="group flex flex-col items-center justify-center gap-1 py-4 active:bg-accent/10 transition-colors border-l border-rule"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim group-active:text-accent transition-colors">03</span>
            <span className="font-serif italic text-base text-accent">Thoughts</span>
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            className="group flex flex-col items-center justify-center gap-1 py-4 active:bg-accent/10 transition-colors border-l border-rule"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim group-active:text-accent transition-colors">04</span>
            <span className="font-serif text-base text-text-primary group-active:text-accent transition-colors">Contact</span>
          </Link>
        </div>
      </nav>
    </section>
  );
}