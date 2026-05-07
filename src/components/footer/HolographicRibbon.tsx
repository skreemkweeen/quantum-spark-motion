import { useState } from "react";
import { motion } from "framer-motion";

interface HolographicRibbonProps {
  title: string;
  phrases: string[];
  speed?: number;
  reverse?: boolean;
  size?: "large" | "small";
  accentColor?: string;
}

function buildSegment(title: string, phrases: string[]): string {
  return [title, ...phrases].join(" \u2014 ") + " \u2014 ";
}

export function HolographicRibbon({
  title,
  phrases,
  speed = 42,
  reverse = false,
  size = "large",
  accentColor = "120, 80, 255",
}: HolographicRibbonProps) {
  const [hovered, setHovered] = useState(false);
  const segment = buildSegment(title, phrases);
  const doubled = segment + segment;
  const baseDuration = 220 / (speed / 42);
  const duration = hovered ? baseDuration * 2.8 : baseDuration;
  const isLarge = size === "large";
  const animFrom = reverse ? "-50%" : "0%";
  const animTo = reverse ? "0%" : "-50%";
  const fontSize = isLarge ? "clamp(2.6rem, 6.5vw, 5.2rem)" : "clamp(0.75rem, 1.8vw, 1.4rem)";
  const fontWeight = isLarge ? 900 : 700;
  const letterSpacing = isLarge ? "-0.025em" : "0.18em";
  const glow = `rgba(${accentColor}, 0.7)`;
  const textShadow = isLarge
    ? `0 0 28px ${glow}, 0 0 70px rgba(${accentColor}, 0.28), 0 0 120px rgba(${accentColor}, 0.1)`
    : "none";

  return (
    <div
      className="relative w-full overflow-hidden whitespace-nowrap"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        padding: isLarge ? "1.5rem 0" : "1rem 0",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="inline-block whitespace-nowrap will-change-transform"
        animate={{ x: [animFrom, animTo] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{
          fontSize,
          fontWeight,
          letterSpacing,
          textTransform: "uppercase",
          color: "#fff",
          textShadow,
          lineHeight: 1,
        }}
      >
        {doubled}
      </motion.div>
    </div>
  );
}
