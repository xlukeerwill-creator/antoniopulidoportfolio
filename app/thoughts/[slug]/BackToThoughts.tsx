"use client";
import Link from "next/link";

export default function BackToThoughts() {
  return (
    <Link
      href="/thoughts"
      prefetch={true}
      className="fixed top-6 left-6 md:top-8 md:left-10 z-40 group font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted hover:text-accent active:text-accent transition-colors duration-500 flex items-center gap-2"
    >
      <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1 group-active:-translate-x-1">
        ←
      </span>
      Back to thoughts
    </Link>
  );
}