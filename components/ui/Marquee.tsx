"use client";
import { useRef, ReactNode, useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  contentClassName?: string;
}

export default function Marquee({
  children,
  speed = 60,
  pauseOnHover = true,
  className = "",
  contentClassName = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detectar si es dispositivo táctil
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const firstGroup = track.children[0] as HTMLElement;
      if (!firstGroup) return;

      const groupWidth = firstGroup.offsetWidth;
      const duration = groupWidth / speed;

      gsap.set(track, { x: 0 });

      tweenRef.current = gsap.to(track, {
        x: -groupWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(gsap.utils.wrap(-groupWidth, 0)),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  // Solo activamos hover handlers en dispositivos NO táctiles
  const shouldHandleHover = pauseOnHover && !isTouchDevice;

  const handleMouseEnter = () => {
    if (shouldHandleHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (shouldHandleHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className={`flex whitespace-nowrap ${contentClassName}`}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}