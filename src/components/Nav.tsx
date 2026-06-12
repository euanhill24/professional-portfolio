"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [visible]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 opacity-0"
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
      </div>

      <div className="md:hidden">
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
