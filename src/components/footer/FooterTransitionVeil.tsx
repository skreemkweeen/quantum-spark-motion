import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FooterTransitionVeilProps {
  accentColor?: string;
}

export function FooterTransitionVeil({ accentColor = "80, 50, 180" }: FooterTransitionVeilProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const mainOp = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const beamOp = useTransform(scrollYProgress, [0.1, 0.65], [0, 0.9]);
  const hazeOp = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const lineOp = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const beamY = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden bg-transparent pointer-events-none"
      style={{ height: 0, margin: 0, padding: 0, overflow: 'hidden' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: mainOp,
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 55%, #000 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: hazeOp,
          background: `radial-gradient(60% 80% at 50% 0%, rgba(${accentColor}, 0.18) 0%, transparent 70%)`,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2"
        style={{
          opacity: beamOp,
          y: beamY,
          background: `linear-gradient(180deg, rgba(${accentColor}, 0.6) 0%, transparent 100%)`,
          filter: "blur(1px)",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          opacity: lineOp,
          background: `linear-gradient(to right, transparent, rgba(${accentColor}, 0.55), transparent)`,
        }}
      />
    </div>
  );
}
