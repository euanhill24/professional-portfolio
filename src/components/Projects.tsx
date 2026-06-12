"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { content } from "@/data/content";
import ScrollReveal from "./ScrollReveal";

function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
  status,
}: {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  status: string;
}) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-3">
        <h3
          className="text-body font-semibold text-brown"
          style={{ fontSize: "clamp(1.1rem, 1.5vw + 0.5rem, 1.35rem)" }}
        >
          {title}
        </h3>
        <span className="text-label text-copper bg-copper/10 px-2.5 py-0.5 rounded-full ml-3 shrink-0">
          {status}
        </span>
      </div>

      <p className="text-body text-brown-light mb-4 text-sm">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, i) => (
          <span
            key={i}
            className="text-label text-copper-light border border-copper-muted/40 px-2.5 py-1 text-[0.65rem]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-copper hover:text-brown transition-colors duration-300"
          >
            GitHub
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-copper hover:text-brown transition-colors duration-300"
          >
            Live Site
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

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
      wipeTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-cream-dark"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            id="projects-heading"
            className="text-heading text-brown mb-4"
          >
            {content.projects.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-body text-brown-light mb-12 md:mb-16 max-w-xl">
            Side projects I build to learn new tools and solve real problems.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-4xl">
          {content.projects.entries.map((entry, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <ProjectCard
                title={entry.title}
                description={entry.description}
                tech={entry.tech}
                github={entry.github}
                live={entry.live}
                status={entry.status}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
