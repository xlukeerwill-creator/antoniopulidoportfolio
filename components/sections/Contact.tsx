"use client";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-contact-cta] > *", { opacity: 0, y: 30 });
      gsap.set("[data-contact-links] > *", { opacity: 0, x: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.to("[data-contact-cta] > *", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
      }, 0)
        .to("[data-contact-links] > *", {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
        }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative container-x pt-24 md:pt-32 lg:pt-40 pb-10 border-t border-rule overflow-hidden"
      id="contact"
    >
      <div className="grid grid-cols-2 items-baseline pb-6 border-b border-rule mb-16 md:mb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
          04 — Contact
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
          Open to conversations
        </p>
      </div>

      <div
        className="relative -mx-6 md:-mx-10 lg:-mx-16 mb-20 md:mb-32 overflow-hidden"
        data-contact-marquee
      >
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite] font-serif italic text-[clamp(4rem,14vw,14rem)] leading-[0.9] text-text-primary">
          {[...Array(2)].map((_, iteration) => (
            <div key={iteration} className="flex gap-16 items-center shrink-0">
              <span>Let&apos;s talk.</span>
              <span className="text-accent">—</span>
              <span className="not-italic">Let&apos;s build.</span>
              <span className="text-accent">—</span>
              <span>Let&apos;s talk.</span>
              <span className="text-accent">—</span>
              <span className="not-italic">Let&apos;s build.</span>
              <span className="text-accent">—</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 items-end mb-16 md:mb-24">
        <div className="flex flex-col gap-6" data-contact-cta>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
            Drop me a line
          </p>
          <a
            href="mailto:antonio.pulidosaez@gwu.edu"
            className="font-serif text-[clamp(2rem,6vw,5rem)] leading-[1] text-text-primary hover:text-accent transition-colors duration-500 break-all"
          >
            antonio.pulidosaez<span className="italic">@gwu.edu</span>
          </a>
          <p className="font-sans text-text-muted max-w-md text-base md:text-lg mt-4">
            Always open to conversations about international business, AI,
            emerging tech — or a good coffee in D.C.
          </p>
        </div>

        <div className="flex flex-col gap-4" data-contact-links>
          <div className="flex items-center justify-between pb-3 border-b border-rule">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              LinkedIn
            </span>
            <a
              href="https://linkedin.com/in/antoniopulidosaez/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-text-primary hover:text-accent transition-colors"
            >
              antoniopulidosaez ↗
            </a>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-rule">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              GitHub
            </span>
            <span className="font-sans text-sm text-text-muted">
              Coming soon
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-rule">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              Based in
            </span>
            <span className="font-sans text-sm text-text-primary">
              Washington, D.C.
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              Phone
            </span>
            <a
              href="tel:+12025692838"
              className="font-sans text-sm text-text-primary hover:text-accent transition-colors"
            >
              +1 (202) 569-2838
            </a>
          </div>
        </div>
      </div>

      <footer className="grid grid-cols-2 items-baseline pt-8 border-t border-rule">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
          © MMXXVI — A. Pulido Sáez
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim text-right">
          Designed & built with care
        </p>
      </footer>
    </section>
  );
}
