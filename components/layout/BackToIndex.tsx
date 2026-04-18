"use client";
import Link from "next/link";

export default function BackToIndex() {
  return (
    <Link
      href="/menu"
      prefetch={true}
      className="fixed top-6 left-6 md:top-8 md:left-10 z-40 group font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted hover:text-accent transition-colors duration-500 flex items-center gap-2"
    >
      <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
        ←
      </span>
      Back to menu
    </Link>
  );
}