"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { content } from "@/data/content";
import ScrollReveal from "./ScrollReveal";

export default function Career() {
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const line = timelineLineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    gsap.set(line, { scaleY: 0, transformOrigin: "top" });

    const lineTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(line, { scaleY: self.progress });
      },
    });

    const wipeTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 90%",
      end: "top 40%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        section.style.clipPath = `polygon(0 ${100 - p * 100}%, 100% ${100 - p * 100}%, 100% 100%, 0 100%)`;
      },
    });

    return () => {
      lineTrigger.kill();
      wipeTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="career"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-cream-dark"
      aria-labelledby="career-heading"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            id="career-heading"
            className="text-heading text-brown mb-16 md:mb-20 text-center"
          >
            {content.career.heading}
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Centre line */}
          <div
            ref={timelineLineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-copper-muted md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {content.career.entries.map((entry, i) => {
              const isLeft = i % 2 === 0;

              return (
                <ScrollReveal
                  key={i}
                  delay={i * 0.1}
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Dot on the line */}
                  <div
                    className="absolute left-[13px] md:left-1/2 top-1 w-[7px] h-[7px] rounded-full bg-copper md:-translate-x-[3px]"
                    aria-hidden="true"
                  />

                  {/* Content - alternating sides on desktop */}
                  <div
                    className={
                      isLeft
                        ? "md:text-right md:pr-12"
                        : "md:col-start-2 md:pl-12"
                    }
                  >
                    <p className="text-label text-copper mb-2">
                      {entry.period}
                    </p>
                    <h3 className="text-body font-semibold text-brown mb-1">
                      {entry.role}
                    </h3>
                    <p className="text-body text-copper mb-2">
                      {entry.company}
                    </p>
                    <p className="text-body text-brown-light text-sm">
                      {entry.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
