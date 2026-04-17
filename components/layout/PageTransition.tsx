"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
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
  const isTransitioningRef = useRef(false);
  const router = useRouter();

  const transitionTo = useCallback(
    (href: string) => {
      if (isTransitioningRef.current) return;
      const curtain = curtainRef.current;
      if (!curtain) {
        router.push(href);
        return;
      }

      isTransitioningRef.current = true;

      gsap.to(curtain, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
          setTimeout(() => {
            // Hash scroll while curtain covers — user sees no jump
            const hashIndex = href.indexOf("#");
            if (hashIndex !== -1) {
              const id = href.substring(hashIndex + 1);
              const target = document.getElementById(id);
              if (target) {
                target.scrollIntoView({ behavior: "auto", block: "start" });
              }
            } else {
              window.scrollTo({ top: 0, behavior: "auto" });
            }

            gsap.to(curtain, {
              yPercent: -100,
              duration: 0.45,
              ease: "power3.inOut",
              onComplete: () => {
                gsap.set(curtain, { yPercent: 100 });
                isTransitioningRef.current = false;
              },
            });
          }, 150);
        },
      });
    },
    [router]
  );

  const pathname = usePathname();
  useEffect(() => {
    if (!isTransitioningRef.current && curtainRef.current) {
      gsap.set(curtainRef.current, { yPercent: 100 });
    }
  }, [pathname]);

  const contextValue = useMemo(() => ({ transitionTo }), [transitionTo]);

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[100] bg-bg-primary pointer-events-none"
        style={{ transform: "translateY(100%)" }}
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
