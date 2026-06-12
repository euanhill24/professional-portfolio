"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import MagneticElement from "./MagneticElement";
import AnimatedRule from "./AnimatedRule";

gsap.registerPlugin(ScrollTrigger);

function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block contact-word">
          {word}
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;
    const heading = headingRef.current;
    if (!section || !contentEl || !heading) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    // Background color transition on scroll
    const colorTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        const r = Math.round(245 - p * (245 - 30));
        const g = Math.round(240 - p * (240 - 25));
        const b = Math.round(232 - p * (232 - 20));
        section.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        const tr = Math.round(30 + p * (245 - 30));
        const tg = Math.round(25 + p * (240 - 25));
        const tb = Math.round(20 + p * (232 - 20));
        section.style.color = `rgb(${tr}, ${tg}, ${tb})`;
      },
    });

    // Word-by-word heading reveal with copper glow
    const words = heading.querySelectorAll(".contact-word");
    gsap.set(words, { opacity: 0, y: 60, rotateX: -15 });

    const wordTl = gsap.timeline({
      scrollTrigger: {
        trigger: contentEl,
        start: "top 70%",
        once: true,
      },
    });

    wordTl.to(words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.4)",
    });

    // Copper glow pulse after words land
    wordTl.fromTo(
      words,
      { textShadow: "0 0 0px rgba(212,165,116,0)" },
      {
        textShadow: "0 0 20px rgba(212,165,116,0.6)",
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.in",
      },
      "-=0.3"
    );
    wordTl.to(words, {
      textShadow: "0 0 0px rgba(212,165,116,0)",
      duration: 1,
      stagger: 0.08,
      ease: "power2.out",
    });

    // Rest of content reveal (email, links, copyright)
    const restElements = contentEl.querySelectorAll(".contact-rest");
    gsap.fromTo(
      restElements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentEl,
          start: "top 60%",
          once: true,
        },
      }
    );

    return () => {
      colorTrigger.kill();
      wordTl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === contentEl) t.kill();
      });
    };
  }, []);

  const headingLines = content.contact.heading.split("\n");

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-44 px-6 md:px-10 bg-cream transition-colors"
      aria-labelledby="contact-heading"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8"
      >
        <h2
          ref={headingRef}
          id="contact-heading"
          className="text-display"
          style={{ perspective: "600px" }}
        >
          {headingLines.map((line, i) => (
            <span key={i} className="block">
              <SplitWords text={line} />
            </span>
          ))}
        </h2>

        <AnimatedRule className="w-16 mx-auto" delay={0.3} />

        <a
          href={`mailto:${content.contact.email}`}
          className="contact-rest text-subheading hover:opacity-70 transition-opacity duration-300 border-b border-current pb-1"
          data-cursor="Send"
        >
          {content.contact.email}
        </a>

        <div className="contact-rest flex flex-wrap justify-center gap-4 mt-4">
          {content.contact.links.map((link, i) => (
            <MagneticElement key={i} strength={0.3}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label border border-current px-5 py-2.5 rounded-full hover:opacity-70 transition-opacity duration-300"
              >
                {link.label}
              </a>
            </MagneticElement>
          ))}
          <MagneticElement strength={0.3}>
            <a
              href={`mailto:${content.contact.email}`}
              className="text-label border border-current px-5 py-2.5 rounded-full hover:opacity-70 transition-opacity duration-300"
            >
              Email
            </a>
          </MagneticElement>
        </div>

        <p className="contact-rest text-label opacity-40 mt-12" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Euan Hill
        </p>
      </div>
    </footer>
  );
}
