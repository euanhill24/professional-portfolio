"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useMediaQuery } from "@/lib/motion";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticElement({
  children,
  strength = 0.3,
  className = "",
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    const el = ref.current;
    if (!el || !isDesktop || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [isDesktop, strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
