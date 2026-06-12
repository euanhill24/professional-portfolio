"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollVelocity() {
  const velocity = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        velocity.current = self.getVelocity();
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return velocity;
}
