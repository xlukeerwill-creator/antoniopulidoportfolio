"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Thoughts from "@/components/sections/Thoughts";
import Contact from "@/components/sections/Contact";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Hero startAnimation={!isLoading} />
      <About />
      <Work />
      <Thoughts />
      <Contact />
    </main>
  );
}
