"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scale = 4;
    let width = 0;
    let height = 0;
    let animId: number;
    let frame = 0;

    function resize() {
      width = Math.ceil(window.innerWidth / scale);
      height = Math.ceil(window.innerHeight / scale);
      canvas!.width = width;
      canvas!.height = height;
    }
    resize();
    window.addEventListener("resize", resize);

    document.documentElement.classList.add("grain-active");

    function renderGrain() {
      const imageData = ctx!.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx!.putImageData(imageData, 0, 0);
    }

    if (prefersReduced) {
      renderGrain();
      return () => {
        window.removeEventListener("resize", resize);
        document.documentElement.classList.remove("grain-active");
      };
    }

    function animate() {
      frame++;
      if (frame % 3 === 0) {
        renderGrain();
      }
      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("grain-active");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[2]"
      style={{ opacity: 0.035, imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
