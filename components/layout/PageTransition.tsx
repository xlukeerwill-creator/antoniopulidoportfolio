"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type TransitionContextType = {
  transitionTo: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within PageTransition");
  return ctx;
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = (href: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // navegación limpia
    router.push(href);

    // reset estado (rápido y fiable)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <TransitionContext.Provider value={{ transitionTo, isTransitioning }}>
      {children}
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