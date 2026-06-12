"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import Image from "next/image";
import { content } from "@/data/content";
import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (countRef.current) countRef.current.textContent = String(value);
      return;
    }

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = String(Math.round(obj.val));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return (
    <div ref={containerRef} className="text-center">
      <div className="text-heading text-copper">
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </div>
      <p className="text-label text-brown-light mt-1">{label}</p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const bgShape = bgShapeRef.current;
    if (!section || !photo || !bgShape || prefersReducedMotion()) return;

    const isMobile = window.innerWidth < 768;
    const photoY = isMobile ? -4 : -8;
    const shapeY = isMobile ? -8 : -15;

    const photoTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(photo, { yPercent: photoY * self.progress });
        gsap.set(bgShape, { yPercent: shapeY * self.progress });
      },
    });

    return () => {
      photoTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-10"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            id="about-heading"
            className="text-heading text-brown mb-12 md:mb-16"
          >
            {content.about.heading}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <ScrollReveal>
              <div className="relative w-full max-w-[280px]">
                {/* Offset background shape */}
                <div
                  ref={bgShapeRef}
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-[2rem_0.5rem_2rem_0.5rem] bg-copper/10 will-change-transform"
                  aria-hidden="true"
                />
                {/* Photo container */}
                <div
                  ref={photoRef}
                  className="relative aspect-[3/4] overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem] border border-copper-muted/40 will-change-transform"
                  style={{ minHeight: "320px" }}
                >
                  <Image
                    src="/euan-portrait.jpg"
                    alt="Euan Hill"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 280px"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-8 flex items-center">
            <ScrollReveal delay={0.15}>
              <p className="text-body text-brown-light text-lg leading-relaxed">
                {content.about.paragraph}
              </p>
            </ScrollReveal>
          </div>
        </div>

        <AnimatedRule className="w-full mb-12" />
        <div className="grid grid-cols-3 gap-8 mb-20">
          {content.about.stats.map((stat, i) => (
            <StatCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        <AnimatedRule className="w-full mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {content.skills.groups.map((group) => (
            <ScrollReveal key={group.label}>
              <h3 className="text-label text-copper mb-4">{group.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-label text-copper-light border border-copper-muted/40 px-2.5 py-1 text-[0.65rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
