import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "soft" | "deep" | "asymmetric";

interface SectionDividerProps {
  variant?: Variant;
  height?: number; // base height in px (responsive via clamp)
  className?: string;
  flip?: boolean;
}

const PATHS: Record<Variant, string> = {
  // viewBox 1440x200
  soft:
    "M0,80 C240,140 480,140 720,100 C960,60 1200,60 1440,110 L1440,200 L0,200 Z",
  deep:
    "M0,40 C240,40 360,180 720,180 C1080,180 1200,40 1440,40 L1440,200 L0,200 Z",
  asymmetric:
    "M0,60 C300,180 520,20 820,90 C1080,150 1260,40 1440,120 L1440,200 L0,200 Z",
};

export const SectionDivider = ({
  variant = "soft",
  height = 180,
  className,
  flip = false,
}: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // subtle parallax on the SVG layer
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const winH = window.innerHeight;
        const offset = (r.top + r.height / 2 - winH / 2) / winH;
        el.style.setProperty("--py", `${(-offset * 16).toFixed(2)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const d = PATHS[variant];

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative -my-px w-full overflow-hidden pointer-events-none select-none",
        className
      )}
      style={{
        height: `clamp(120px, ${height / 10}vw, ${height + 60}px)`,
        background:
          "linear-gradient(to bottom, hsl(0 0% 0%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 6%) 100%)",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      {/* grain / noise */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* scanlines */}
      <div className="absolute inset-0 scanlines opacity-[0.06]" />

      {/* curve layer with parallax + RGB split */}
      <div
        className="absolute inset-0 will-tx"
        style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
      >
        {/* RGB split — barely visible */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ transform: "translateX(-1px)", opacity: 0.35, mixBlendMode: "screen" }}
        >
          <path d={d} fill="hsl(0 80% 12%)" />
        </svg>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ transform: "translateX(1px)", opacity: 0.35, mixBlendMode: "screen" }}
        >
          <path d={d} fill="hsl(180 70% 12%)" />
        </svg>

        {/* Main curve */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="div-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 0% 6%)" />
              <stop offset="100%" stopColor="hsl(0 0% 9%)" />
            </linearGradient>
            <filter id="div-blur" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>
          <path d={d} fill="url(#div-fill)" filter="url(#div-blur)" />
          {/* highlight along the curve */}
          <path
            d={d}
            fill="none"
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* horizontal distortion lines (glitch) */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.04]" />
      <div className="absolute inset-x-0 top-[58%] h-[1px] bg-white/[0.025]" />

      {/* soft inner shadow at edges to blend */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 24px 40px -24px hsl(0 0% 0% / 0.9), inset 0 -24px 40px -24px hsl(0 0% 0% / 0.9)",
        }}
      />
    </div>
  );
};

export default SectionDivider;