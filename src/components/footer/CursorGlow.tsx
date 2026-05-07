import { useEffect, type RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CursorGlowProps {
  containerRef: RefObject<HTMLElement>;
  color?: string;
  size?: number;
  opacity?: number;
}

export function CursorGlow({
  containerRef,
  color = "140, 80, 255",
  size = 800,
  opacity = 0.13,
}: CursorGlowProps) {
  const mx = useMotionValue(-size * 2);
  const my = useMotionValue(-size * 2);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.7 });
  const tx = useTransform(sx, (v) => v - size / 2);
  const ty = useTransform(sy, (v) => v - size / 2);
  const coreSize = size * 0.22;
  const coreTx = useTransform(sx, (v) => v - coreSize / 2);
  const coreTy = useTransform(sy, (v) => v - coreSize / 2);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    const onLeave = () => {
      mx.set(-size * 2);
      my.set(-size * 2);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, mx, my, size]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute rounded-full mix-blend-screen"
        style={{
          width: size,
          height: size,
          x: tx,
          y: ty,
          background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, rgba(${color}, ${opacity * 0.4}) 35%, transparent 65%)`,
          filter: "blur(20px)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full mix-blend-screen"
        style={{
          width: coreSize,
          height: coreSize,
          x: coreTx,
          y: coreTy,
          background: `radial-gradient(circle, rgba(${color}, ${Math.min(opacity * 3, 0.6)}) 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
