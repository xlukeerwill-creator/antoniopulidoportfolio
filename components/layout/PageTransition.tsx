"use client";
import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const transitionTo = (href: string) => {
    router.push(href);

    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const id = href.substring(hashIndex + 1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
          }
        });
      });
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    }
  };

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
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
