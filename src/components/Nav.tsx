"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useLenis } from "./LenisProvider";
import MagneticElement from "./MagneticElement";

const sections = [
  { label: "About", id: "about" },
  { label: "Career", id: "career" },
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis();

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || prefersReducedMotion()) return;

    // Hide before first paint, then fade in once the hero animation has landed
    const tween = gsap.fromTo(
      nav,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 2.4 }
    );

    return () => {
      tween.kill();
      gsap.set(nav, { opacity: 1, y: 0 });
    };
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = id === "top" ? 0 : `#${id}`;
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(target);
    } else if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
      aria-label="Main navigation"
    >
      <MagneticElement strength={0.4}>
        <a
          href="#"
          className="text-label text-brown hover:text-copper transition-colors duration-300"
          aria-label="Back to top"
          onClick={(e) => scrollTo(e, "top")}
        >
          EH
        </a>
      </MagneticElement>

      <div className="hidden md:flex items-center gap-1">
        {sections.map((s) => (
          <MagneticElement key={s.id} strength={0.3}>
            <a
              href={`#${s.id}`}
              onClick={(e) => scrollTo(e, s.id)}
              className="text-label text-brown hover:text-copper transition-colors duration-300 px-3 py-1.5 rounded-full border border-transparent hover:border-copper-muted/40"
            >
              {s.label}
            </a>
          </MagneticElement>
        ))}
        <MagneticElement strength={0.3}>
          <Link
            href="/cv"
            className="text-label text-copper hover:text-brown transition-colors duration-300 px-3 py-1.5 rounded-full border border-copper-muted/40 hover:border-copper"
          >
            CV
          </Link>
        </MagneticElement>
      </div>

      <div className="md:hidden flex items-center gap-3">
        <MagneticElement strength={0.4}>
          <Link
            href="/cv"
            className="text-label text-copper hover:text-brown transition-colors duration-300"
          >
            CV
          </Link>
        </MagneticElement>
        <MagneticElement strength={0.4}>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "contact")}
            className="text-label text-brown hover:text-copper transition-colors duration-300"
          >
            Contact
          </a>
        </MagneticElement>
      </div>
    </nav>
  );
}
