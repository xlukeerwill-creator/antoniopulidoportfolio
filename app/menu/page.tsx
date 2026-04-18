"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const entries = [
  { num: "01", title: "About", href: "/about" },
  { num: "02", title: "Work", href: "/work" },
  { num: "03", title: "Thoughts", href: "/thoughts", italic: true },
  { num: "04", title: "Contact", href: "/contact" },
];

export default function MenuPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/about");
    router.prefetch("/work");
    router.prefetch("/thoughts");
    router.prefetch("/contact");
  }, [router]);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-menu-el]", { opacity: 0, y: 30 });
      gsap.to("[data-menu-el]", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen lg:max-h-screen container-x border-t border-rule flex flex-col pt-20 md:pt-10 pb-10 md:pb-10 bg-bg-primary text-text-primary"
    >
      <Link
        href="/"
        className="absolute top-6 left-6 md:top-8 md:left-10 z-40 group font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted hover:text-accent transition-colors duration-500 flex items-center gap-2"
      >
        <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
          ←
        </span>
        Back to home
      </Link>

      <div
        className="grid grid-cols-2 items-baseline pb-4 border-b border-rule shrink-0 mt-8 md:mt-20"
        data-menu-el
      >
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted">
          Menu
        </p>
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted text-right">
          Select a chapter
        </p>
      </div>

      <nav className="flex-1 min-h-0 flex flex-col justify-start lg:justify-center pt-6 lg:pt-0">
        {entries.map((entry) => (
          <Link
            key={entry.num}
            href={entry.href}
            prefetch={true}
            className="group relative grid grid-cols-[auto_1fr_auto] gap-4 md:gap-12 items-baseline py-5 md:py-5 border-t border-rule transition-colors duration-500 last:border-b"
            data-menu-el
          >
            <span className="font-mono text-xs md:text-sm text-text-dim group-hover:text-accent transition-colors duration-500">
              {entry.num}
            </span>
            <span
              className={`font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] text-text-primary group-hover:text-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:group-hover:translate-x-6${entry.italic ? " italic" : ""}`}
            >
              {entry.title}
            </span>
            <span className="font-serif text-xl md:text-2xl text-text-dim group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
              →
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}