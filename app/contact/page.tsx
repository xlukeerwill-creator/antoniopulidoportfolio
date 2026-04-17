"use client";
import { useRef } from "react";
import BackToIndex from "@/components/layout/BackToIndex";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-el]", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <BackToIndex />
      <main
        ref={pageRef}
        className="min-h-screen bg-bg-primary text-text-primary container-x pt-20 md:pt-24 pb-10 overflow-hidden flex flex-col"
      >
        <div
          className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-16 md:mb-24"
          data-contact-el
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
            04 — Contact
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
            Open to conversations
          </p>
        </div>

        <div
          className="relative -mx-6 md:-mx-10 lg:-mx-16 mb-16 md:mb-24 overflow-hidden"
          data-contact-el
        >
          <div
            className="flex gap-16 whitespace-nowrap font-serif italic text-[clamp(4rem,12vw,12rem)] leading-[0.9] text-text-primary"
            style={{ animation: "marquee 30s linear infinite" }}
          >
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
          <div className="flex flex-col gap-6" data-contact-el>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
              Drop me a line
            </p>
            <a
              href="mailto:antonio.pulidosaez@gwu.edu"
              className="font-serif text-[clamp(1.75rem,5vw,4rem)] leading-[1] text-text-primary hover:text-accent transition-colors duration-500 break-all"
            >
              antonio.pulidosaez<span className="italic">@gwu.edu</span>
            </a>
            <p className="font-sans text-text-muted max-w-md text-base md:text-lg mt-4">
              Always open to conversations about international business, AI,
              emerging tech — or a good coffee in D.C.
            </p>
          </div>

          <div className="flex flex-col gap-4" data-contact-el>
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

        <footer
          className="grid grid-cols-2 items-baseline pt-8 border-t border-rule mt-auto"
          data-contact-el
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
            © MMXXVI — A. Pulido Saez
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim text-right">
            Designed & built with care
          </p>
        </footer>
      </main>
    </>
  );
}
