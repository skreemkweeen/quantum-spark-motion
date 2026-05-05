import { useEffect, useRef } from "react";

type Sub = { el: HTMLElement; speed: number; current: number; target: number };
const subs = new Set<Sub>();
let running = false;
let scrollY = typeof window !== "undefined" ? window.scrollY : 0;
let reduced = false;

if (typeof window !== "undefined") {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
}

function loop() {
  subs.forEach((s) => {
    const rect = s.el.getBoundingClientRect();
    const winH = window.innerHeight;
    // distance of element center from viewport center
    const offset = (rect.top + rect.height / 2) - winH / 2;
    s.target = -offset * (s.speed - 1);
    s.current += (s.target - s.current) * 0.1;
    s.el.style.transform = `translate3d(0, ${s.current.toFixed(2)}px, 0)`;
  });
  if (subs.size > 0) requestAnimationFrame(loop);
  else running = false;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 1) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (reduced || !ref.current) return;
    const sub: Sub = { el: ref.current, speed, current: 0, target: 0 };
    ref.current.style.willChange = "transform";
    subs.add(sub);
    if (!running) { running = true; requestAnimationFrame(loop); }
    return () => { subs.delete(sub); };
  }, [speed]);
  return ref;
}
