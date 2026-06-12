"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedRuleProps {
  className?: string;
  delay?: number;
}

export default function AnimatedRule({ className = "", delay = 0 }: AnimatedRuleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    gsap.set(el, { scaleX: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          scaleX: 1,
          duration: 0.8,
          delay,
          ease: "power2.inOut",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`editorial-rule ${className}`}
      aria-hidden="true"
    />
  );
}
