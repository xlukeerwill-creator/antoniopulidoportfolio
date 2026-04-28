"use client";
import Link from "next/link";

export default function BackToIndex() {
  return (
    <>
      {/* Desktop: ← Back to menu */}
      <Link
        href="/menu"
        prefetch={true}
        aria-label="Back to menu"
        className="hidden md:flex fixed top-6 left-6 md:top-8 md:left-10 z-40 group font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted hover:text-accent transition-colors duration-500 items-center gap-2"
      >
        <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
          ←
        </span>
        Back to menu
      </Link>

      {/* Móvil: ✕ Close (vuelve a la home) */}
      <Link
        href="/"
        prefetch={true}
        aria-label="Close and return home"
        className="md:hidden fixed top-5 right-5 z-40 group flex items-center justify-center w-11 h-11 border border-rule bg-bg-primary/85 backdrop-blur-md active:bg-accent/15 active:border-accent transition-all duration-300"
      >
        <span className="font-sans text-xl text-text-primary group-active:text-accent leading-none transition-colors duration-300">
          ✕
        </span>
      </Link>
    </>
  );
}