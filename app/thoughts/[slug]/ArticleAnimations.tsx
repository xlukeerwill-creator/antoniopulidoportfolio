"use client";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export default function ArticleAnimations() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-article-el]", { opacity: 0, y: 30 });
      gsap.to("[data-article-el]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref} className="hidden" aria-hidden="true" />;
}