"use client";
import { createContext, useContext, useRef, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

type TransitionContextType = {
  transitionTo: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within PageTransition");
  return ctx;
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isTransitioning = useRef(false);

  const transitionTo = (href: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const curtain = curtainRef.current;
    if (!curtain) {
      router.push(href);
      isTransitioning.current = false;
      return;
    }

    gsap.to(curtain, {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);

        setTimeout(() => {
          const hashIndex = href.indexOf("#");
          if (hashIndex !== -1) {
            const id = href.substring(hashIndex + 1);
            const target = document.getElementById(id);
            if (target) {
              target.scrollIntoView({ behavior: "auto", block: "start" });
            } else {
              window.scrollTo({ top: 0, behavior: "auto" });
            }
          } else {
            window.scrollTo({ top: 0, behavior: "auto" });
          }

          gsap.to(curtain, {
            yPercent: -100,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(curtain, { yPercent: 100 });
              isTransitioning.current = false;
            },
          });
        }, 400);
      },
    });
  };

  const pathname = usePathname();
  useEffect(() => {
    const curtain = curtainRef.current;
    if (curtain && !isTransitioning.current) {
      gsap.set(curtain, { yPercent: 100 });
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[100] bg-bg-primary pointer-events-none"
        style={{ transform: "translateY(100%)", willChange: "transform" }}
      />
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const { transitionTo } = useTransition();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        transitionTo(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
