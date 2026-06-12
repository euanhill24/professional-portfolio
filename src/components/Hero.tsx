"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { content } from "@/data/content";
import ParticleField from "./ParticleField";

function SplitLetters({
  text,
  className,
  ariaLabel,
}: {
  text: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <span className={className} aria-label={ariaLabel || text} role="text">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block hero-letter"
          style={{ display: char === " " ? "inline" : "inline-block" }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  // Everything is visible in the server-rendered HTML; initial hidden states
  // are applied here, before first paint, only when we're going to animate.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const letters = sectionRef.current?.querySelectorAll(".hero-letter");

    const tl = gsap.timeline({ delay: 0.3 });

    // Label fade in
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );

    // Letter-by-letter spring animation
    if (letters?.length) {
      tl.fromTo(
        letters,
        { opacity: 0, y: 40, rotation: 8 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.06,
        },
        "-=0.2"
      );
    }

    // Horizontal line draws left to right
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
        transformOrigin: "left",
      },
      "-=0.2"
    );

    // Subtitle fades in
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll velocity skew on watermark
  useEffect(() => {
    const watermark = watermarkRef.current;
    if (!watermark || prefersReducedMotion()) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const v = self.getVelocity();
        const skew = gsap.utils.clamp(-3, 3, v / 500);
        gsap.to(watermark, { skewY: skew, duration: 0.3, ease: "power2.out" });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-10 noise-overlay overflow-hidden"
      aria-label="Introduction"
    >
      {/* Particle field background */}
      <ParticleField />

      {/* Corner brackets */}
      <div className="corner-bracket corner-bracket--top-right" aria-hidden="true" />
      <div className="corner-bracket corner-bracket--bottom-left" aria-hidden="true" />

      {/* Oversized faded initials as background texture */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          ref={watermarkRef}
          className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-light leading-none opacity-[0.03] will-change-transform"
          style={{ fontFamily: "var(--font-display)" }}
        >
          EH
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <p ref={labelRef} className="text-label text-copper mb-8">
          {content.hero.label}
        </p>

        <h1 className="text-display mb-6">
          <SplitLetters text={content.hero.name} />
        </h1>

        <div
          ref={lineRef}
          className="editorial-rule w-24 mx-auto mb-6"
          aria-hidden="true"
        />

        <p ref={subtitleRef} className="text-subheading text-brown-light">
          {content.hero.subtitle}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-label text-copper-muted text-[0.625rem] tracking-[0.2em]">
          Scroll
        </span>
        <div className="w-px h-8 bg-copper-muted animate-pulse" />
      </div>
    </section>
  );
}
