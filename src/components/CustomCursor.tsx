"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    setIsDesktop(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current || !trailRef.current) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const label = labelRef.current;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3" });
    const xTrail = gsap.quickTo(trail, "x", { duration: 0.15, ease: "power3" });
    const yTrail = gsap.quickTo(trail, "y", { duration: 0.15, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xTrail(e.clientX);
      yTrail(e.clientY);
    };

    let currentLabel = "";

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        if (text !== currentLabel) {
          currentLabel = text;
          if (label) label.textContent = text;
          gsap.to(cursor, {
            width: 60,
            height: 60,
            opacity: 0.9,
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(trail, { opacity: 0, duration: 0.2 });
        }
        return;
      }

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select'
      );
      if (interactive) {
        if (currentLabel !== "__interactive") {
          currentLabel = "__interactive";
          if (label) label.textContent = "";
          gsap.to(cursor, {
            width: 32,
            height: 32,
            opacity: 0.6,
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(trail, { scale: 1.5, opacity: 0.15, duration: 0.3 });
        }
        return;
      }

      if (currentLabel !== "") {
        currentLabel = "";
        if (label) label.textContent = "";
        gsap.to(cursor, {
          width: 12,
          height: 12,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(trail, { scale: 1, opacity: 0.4, duration: 0.3 });
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent =
      'a,button,[role="button"],input,textarea,select,[data-cursor]{cursor:none!important}';
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.style.cursor = "";
      style.remove();
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-copper pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-40"
        aria-hidden="true"
      />
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-copper pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="text-cream text-[0.6rem] font-medium tracking-wider uppercase select-none"
        />
      </div>
    </>
  );
}
