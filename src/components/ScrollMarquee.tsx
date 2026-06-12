"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollMarqueeProps {
  text: string;
}

export default function ScrollMarquee({ text }: ScrollMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(textEl, { xPercent: -50 * self.progress });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const repeated = `${text} — ${text} — ${text} — `;

  return (
    <div
      ref={containerRef}
      className="relative h-20 md:h-32 overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={textRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap text-copper opacity-[0.15]"
        style={{
          fontFamily: 'var(--font-display), "Cormorant Garamond", Georgia, serif',
          fontSize: "clamp(4rem, 8vw + 1rem, 8rem)",
          lineHeight: 1,
          fontWeight: 300,
          letterSpacing: "-0.02em",
        }}
      >
        {repeated}
      </div>
    </div>
  );
}
