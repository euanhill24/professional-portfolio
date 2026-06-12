"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "clipReveal" | "fadeIn";
  delay?: number;
  duration?: number;
  stagger?: number;
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
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const animations = {
      fadeUp: { y: 30, opacity: 0 },
      clipReveal: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
      fadeIn: { opacity: 0 },
    };

    const from = animations[animation];

    gsap.set(el, from);

    gsap.to(el, {
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
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, delay, duration]);

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
