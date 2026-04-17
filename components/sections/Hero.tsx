"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

interface HeroProps {
  startAnimation: boolean;
}

export default function Hero({ startAnimation }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { yPercent: 110 });
      gsap.set("[data-hero-tag]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-bio]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-scroll]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-meta]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-photo]", { opacity: 0, x: 40, scale: 0.96 });
      gsap.set("[data-hero-glow]", { opacity: 0 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!startAnimation || !sectionRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-hero-line]", { yPercent: 0 });
        gsap.set(
          "[data-hero-tag],[data-hero-bio],[data-hero-scroll],[data-hero-meta],[data-hero-photo],[data-hero-glow]",
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline();

      tl.to(
        "[data-hero-line]",
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.14 },
        0.1
      );
      tl.to(
        "[data-hero-glow]",
        { opacity: 1, duration: 1.8, ease: "power2.out" },
        "-=0.8"
      );
      tl.to(
        "[data-hero-photo]",
        { opacity: 1, x: 0, scale: 1, duration: 1.4, ease: "power3.out" },
        "-=1.2"
      );
      tl.to(
        "[data-hero-tag]",
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );
      tl.to(
        "[data-hero-bio]",
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
      tl.to(
        "[data-hero-meta] > div",
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 },
        "-=0.5"
      );
      tl.to(
        "[data-hero-scroll]",
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    // CAMBIO 1: h-screen, padding mínimo arriba y abajo
    <section
      ref={sectionRef}
      className="relative h-screen max-h-screen flex flex-col container-x overflow-hidden pt-6 md:pt-8 pb-6 md:pb-8"
    >
      {/* CAMBIO 2: cabecera compacta con shrink-0 */}
      <div className="grid grid-cols-2 items-center pb-4 border-b border-rule shrink-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
          A. Pulido Sáez — Portfolio
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted text-right">
          Washington D.C. · MMXXVI
        </p>
      </div>

      {/* CAMBIO 3: grid compacto con min-h-0 */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-center pt-6 lg:pt-8">

        {/* CAMBIO 4: columna izquierda compacta */}
        <div className="flex flex-col gap-5 lg:gap-7">

          {/* Nombre — tamaño reducido, leading más ajustado */}
          <div
            className="flex flex-col font-serif font-normal leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 10.5vw, 9.5rem)" }}
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

          {/* Tagline — un nivel más pequeño */}
          <p
            className="font-serif text-xl md:text-2xl lg:text-3xl text-text-primary max-w-2xl leading-[1.15]"
            data-hero-tag
          >
            Bridging law, business and technology.
          </p>

          {/* Bio — compacta */}
          <p
            className="font-sans text-base text-text-muted max-w-md leading-relaxed"
            data-hero-bio
          >
            MSc International Business candidate at The George Washington
            University, with a legal background from Spain. Focused on how AI
            and emerging technology are reshaping global business, strategy, and
            the future of professional services.
          </p>

          {/* Scroll hint — sin mt-4 extra */}
          <div className="flex items-center gap-3" data-hero-scroll>
            <div className="w-8 h-px bg-text-muted" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Scroll to explore
            </span>
          </div>
        </div>

        {/* CAMBIO 5: columna derecha — foto flotante + ficha */}
        <div className="relative flex flex-col gap-5 w-full" data-hero-photo>

          {/* Foto con máscara radial — sin marco, sin bg */}
          <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">

            {/* Halo cinematográfico detrás de la cabeza */}
            <div
              data-hero-glow
              className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[75%] aspect-square rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(235,229,214,0.12) 0%, rgba(139,46,31,0.08) 35%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />

            {/* Foto flotante — sin marco, bordes fundidos con el fondo */}
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

          {/* Ficha biográfica — 4 filas tabulares compactas */}
          <div
            className="flex flex-col gap-2 max-w-[400px] mx-auto lg:mx-0 w-full"
            data-hero-meta
          >
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">
                Path
              </span>
              <span className="font-sans text-xs text-text-primary">
                Sevilla · Madrid · Bologna · Washington D.C.
              </span>
            </div>
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">
                Focus
              </span>
              <span className="font-sans text-xs text-text-primary">
                International Business · AI · Emerging Tech
              </span>
            </div>
            <div className="flex items-baseline gap-3 pb-1.5 border-b border-rule">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">
                Background
              </span>
              <span className="font-sans text-xs text-text-primary">
                LL.B · Bar-certified (Spain) · MSc (in progress)
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim w-24 shrink-0">
                Langs
              </span>
              <span className="font-sans text-xs text-text-primary">
                EN · ES · IT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
