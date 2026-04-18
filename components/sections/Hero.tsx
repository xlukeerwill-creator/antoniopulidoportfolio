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

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (instantVisible) {
        gsap.set("[data-hero-line]", { yPercent: 0, opacity: 1 });
        gsap.set("[data-hero-glow]", { opacity: 1 });
        gsap.set("[data-hero-photo]", { opacity: 1, x: 0, scale: 1 });
        gsap.set("[data-hero-tag]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-bio]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-scroll]", { opacity: 1, y: 0 });
        return;
      }

      gsap.set("[data-hero-line]", { yPercent: 110 });
      gsap.set("[data-hero-glow]", { opacity: 0 });
      gsap.set("[data-hero-photo]", { opacity: 0, x: 30, scale: 0.96 });
      gsap.set("[data-hero-tag]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-bio]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-scroll]", { opacity: 0, y: 10 });

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
        .to("[data-hero-scroll]", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, [startAnimation, instantVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen lg:max-h-screen flex flex-col container-x overflow-hidden pt-6 md:pt-8 pb-8 md:pb-8"
    >
      <div className="grid grid-cols-2 items-center pb-4 border-b border-rule shrink-0">
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted">
          A. Pulido Sáez — Portfolio
        </p>
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text-muted text-right">
          Washington D.C. · MMXXVI
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-center pt-8 lg:pt-8">
        <div className="flex flex-col gap-5 lg:gap-7">
          <div
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
          </div>

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

          <Link
            href="/menu"
            prefetch={true}
            className="group relative inline-flex items-center justify-between gap-6 w-full sm:w-fit sm:min-w-[280px] mt-2 px-6 md:px-7 py-4 md:py-5 border border-text-muted hover:border-accent bg-transparent hover:bg-accent transition-all duration-500 overflow-hidden"
            data-hero-scroll
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.25em] text-text-primary group-hover:text-bg-primary transition-colors duration-500 relative z-10">
              Enter the portfolio
            </span>
            <span className="font-serif text-xl md:text-2xl text-text-primary group-hover:text-bg-primary group-hover:translate-x-1 transition-all duration-500 relative z-10">
              →
            </span>
          </Link>
        </div>

        {/* Foto — oculta en móvil, visible desde lg */}
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
                  "radial-gradient(circle, rgba(235,229,214,0.12) 0%, rgba(139,46,31,0.08) 35%, transparent 70%)",
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
    </section>
  );
}