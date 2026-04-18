"use client";
import { ReactNode } from "react";
import Link from "next/link";

// Componente wrapper que solo existe por compatibilidad — ya no hace transiciones.
// Mantiene el TransitionLink exportado pero ahora es un <Link> de Next.js.
export default function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// TransitionLink = alias de Next.js <Link>. Misma API para no tocar el resto del código.
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
  return (
    <Link href={href} className={className} prefetch={true} {...rest}>
      {children}
    </Link>
  );
}