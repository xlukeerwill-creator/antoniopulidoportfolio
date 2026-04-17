"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const pendingScrollRef = useRef<
    { type: "top" } | { type: "hash"; id: string } | null
  >(null);

  useEffect(() => {
    // 🔥 reactiva interacción
    document.body.style.pointerEvents = "auto";

    setIsTransitioning(false);

    const pending = pendingScrollRef.current;
    if (!pending) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (pending.type === "hash") {
          const target = document.getElementById(pending.id);
          if (target) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
          } else {
            window.scrollTo({ top: 0 });
          }
        } else {
          window.scrollTo({ top: 0 });
        }
        pendingScrollRef.current = null;
      });
    });
  }, [pathname]);

  const transitionTo = (href: string) => {
    // 🔥 bloquea interacción durante transición
    document.body.style.pointerEvents = "none";

    setIsTransitioning(true);

    const hashIndex = href.indexOf("#");

    if (hashIndex !== -1) {
      const id = href.substring(hashIndex + 1);
      const basePath = href.substring(0, hashIndex);

      if (basePath === pathname || basePath === "") {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }
        document.body.style.pointerEvents = "auto";
        setIsTransitioning(false);
        return;
      }

      pendingScrollRef.current = { type: "hash", id };
      router.push(href);
    } else {
      pendingScrollRef.current = { type: "top" };
      router.push(href);
    }
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
  [key: string]: any;
}) {
  const { transitionTo } = useTransition();
  const router = useRouter();

  const handlePrefetch = () => {
    const hashIndex = href.indexOf("#");
    const path = hashIndex !== -1 ? href.substring(0, hashIndex) : href;
    if (path) router.prefetch(path);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        transitionTo(href);
      }}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      {...rest}
    >
      {children}
    </a>
  );
}