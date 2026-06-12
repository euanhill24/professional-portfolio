"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

gsap.registerPlugin(ScrollTrigger);

function WorkCard({
  number,
  title,
  tag,
  description,
  outcomes,
  index,
}: {
  number: string;
  title: string;
  tag: string;
  description: string;
  outcomes: string[];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(card, { clipPath: "inset(0% 0 0 0)", opacity: 1 });
      return;
    }

    gsap.set(card, { clipPath: "inset(100% 0 0 0)", opacity: 1 });

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(card, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index]);

  useEffect(() => {
    isDesktop.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const inner = innerRef.current;
    const glow = glowRef.current;
    if (!inner || !glow || !isDesktop.current) return;

    const rect = inner.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(inner, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.4,
      ease: "power2.out",
    });

    glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(139,115,85,0.06), transparent 60%)`;
    glow.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    const inner = innerRef.current;
    const glow = glowRef.current;
    if (!inner || !isDesktop.current) return;

    gsap.to(inner, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    if (glow) glow.style.opacity = "0";
  };

  return (
    <div ref={cardRef} className="relative" style={{ opacity: 0 }}>
      <div
        style={{ perspective: "800px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={innerRef}
          className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Copper glow overlay */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none rounded-sm transition-opacity duration-300 opacity-0"
            aria-hidden="true"
          />

          {/* Large editorial numeral */}
          <div className="md:col-span-2">
            <span className="text-editorial-numeral">{number}</span>
          </div>

          {/* Card content */}
          <div className="md:col-span-10">
            <div className="flex flex-wrap items-baseline gap-4 mb-4">
              <h3
                className="text-heading text-brown"
                style={{ fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)" }}
              >
                {title}
              </h3>
              <span className="text-label text-copper bg-copper/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            </div>

            <p className="text-body text-brown-light mb-6 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-3">
              {outcomes.map((outcome, i) => (
                <span
                  key={i}
                  className="text-label text-copper-light border border-copper-muted/40 px-3 py-1.5"
                >
                  {outcome}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <AnimatedRule className="w-full" delay={index * 0.1} />
    </div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-6 md:px-10"
      aria-labelledby="work-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            id="work-heading"
            className="text-heading text-brown mb-4"
          >
            {content.work.heading}
          </h2>
        </ScrollReveal>

        <AnimatedRule className="w-full mb-0" />

        {content.work.entries.map((entry, i) => (
          <WorkCard
            key={i}
            number={entry.number}
            title={entry.title}
            tag={entry.tag}
            description={entry.description}
            outcomes={entry.outcomes}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
