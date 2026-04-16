"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <Hero startAnimation={!isLoading} />

      <section className="min-h-screen bg-bg-secondary container-x py-32 flex flex-col justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted mb-4">
          Next sections
        </p>
        <h2
          className="font-serif text-text-primary leading-[0.95]"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
        >
          About. Work.{" "}
          <span className="italic text-accent">Thoughts.</span> Contact.
        </h2>
        <p className="font-sans text-text-muted mt-6 max-w-md leading-relaxed">
          Coming next. Built with the same editorial care.
        </p>
      </section>
    </main>
  );
}
