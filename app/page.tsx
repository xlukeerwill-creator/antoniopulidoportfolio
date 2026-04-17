"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Index from "@/components/sections/Index";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), { ssr: false });

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Variable a nivel de módulo: se resetea al recargar la página, persiste en navegación client-side
let preloaderShownThisSession = false;

export default function Home() {
  const [phase, setPhase] = useState<"pending" | "preloader" | "post-preloader" | "returning">("pending");
  const mainRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#index") {
      document.documentElement.style.scrollBehavior = "auto";
      requestAnimationFrame(() => {
        const target = document.getElementById("index");
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }
      });
    }

    if (preloaderShownThisSession) {
      setPhase("returning");
    } else {
      setPhase("preloader");
    }
  }, []);

  useIsoLayoutEffect(() => {
    if (phase === "returning" && mainRef.current) {
      import("@/lib/gsap").then(({ gsap }) => {
        if (mainRef.current) {
          gsap.fromTo(
            mainRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }
      });
    }
  }, [phase]);

  const handlePreloaderComplete = () => {
    preloaderShownThisSession = true;
    setPhase("post-preloader");
  };

  return (
    <main ref={mainRef} className="min-h-screen bg-bg-primary text-text-primary">
      {phase === "preloader" && <Preloader onComplete={handlePreloaderComplete} />}
      {phase !== "pending" && phase !== "preloader" && (
        <>
          <Hero
            startAnimation={phase === "post-preloader"}
            instantVisible={phase === "returning"}
          />
          <Index />
        </>
      )}
    </main>
  );
}
