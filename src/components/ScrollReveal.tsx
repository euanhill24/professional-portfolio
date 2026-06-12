"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "clipReveal" | "fadeIn";
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  className = "",
  as: Tag = "div" as keyof HTMLElementTagNameMap,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const animations = {
      fadeUp: { y: 30, opacity: 0 },
      clipReveal: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
      fadeIn: { opacity: 0 },
    };

    gsap.set(el, animations[animation]);

    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      clipPath: animation === "clipReveal" ? "inset(0% 0 0 0)" : undefined,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animation, delay, duration]);

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
