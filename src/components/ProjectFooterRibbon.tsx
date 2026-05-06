import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Theme = "default" | "warm" | "cool";

interface ProjectFooterRibbonProps {
  title: string;
  phrases?: string[];
  speed?: number;
  theme?: Theme;
  className?: string;
}

const themeAccent: Record<Theme, string> = {
  default: "0 0% 100%",
  warm: "30 80% 88%",
  cool: "210 60% 90%",
};

export const ProjectFooterRibbon = ({
  title,
  phrases = [],
  speed = 60,
  theme = "default",
  className,
}: ProjectFooterRibbonProps) => {
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);

  const phrase = [title, ...phrases].join(" \u2014 ") + " \u2014 ";
  // duplicate enough times to fill at least 2x viewport — render 8 copies, the
  // animation loop snaps based on actual measured half-width.
  const repeats = 8;
  const accent = themeAccent[theme];

  useEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let last = performance.now();
    let xFront = 0;
    let xBack = 0;
    const backSpeed = speed * 0.45;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const mult = hoverRef.current ? 0.35 : 1;
      xFront -= speed * mult * dt;
      xBack += backSpeed * mult * dt;
      const halfF = front.scrollWidth / 2;
      const halfB = back.scrollWidth / 2;
      if (halfF > 0) xFront = ((xFront % halfF) + halfF) % halfF - halfF;
      if (halfB > 0) xBack = ((xBack % halfB) + halfB) % halfB - halfB;
      front.style.transform = `translate3d(${xFront}px,0,0)`;
      back.style.transform = `translate3d(${xBack}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, phrase]);

  const items = Array.from({ length: repeats });

  return (
    <section
      ref={wrapRef}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      aria-label={`${title} — themes`}
      className={cn(
        "group relative w-full overflow-hidden bg-black",
        "h-[80px] md:h-[130px]",
        className,
      )}
      style={{ ["--accent" as any]: accent }}
    >
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, hsl(var(--accent)/0.6) 0 1px, transparent 1px 3px)",
          animation: "scan-drift 8s linear infinite",
        }}
      />
      {/* light streaks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-0 right-0 h-px opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.18]"
          style={{
            top: "32%",
            background:
              "linear-gradient(to right, transparent, hsl(var(--accent)/0.9), transparent)",
            animation: "streak-drift 14s linear infinite",
          }}
        />
        <div
          className="absolute left-0 right-0 h-px opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.14]"
          style={{
            top: "68%",
            background:
              "linear-gradient(to right, transparent, hsl(var(--accent)/0.7), transparent)",
            animation: "streak-drift 22s linear infinite reverse",
          }}
        />
      </div>

      {/* back ribbon */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          ref={backRef}
          className="flex shrink-0 whitespace-nowrap will-change-transform"
          style={{ filter: "blur(6px)" }}
        >
          {items.map((_, i) => (
            <span
              key={i}
              className="select-none px-6 font-semibold uppercase tracking-[-0.02em] text-white/[0.07]"
              style={{ fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 1 }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>

      {/* front ribbon */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          ref={frontRef}
          className="flex shrink-0 whitespace-nowrap will-change-transform transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_18px_hsl(var(--accent)/0.55)]"
        >
          {items.map((_, i) => (
            <span
              key={i}
              className="select-none px-5 font-semibold uppercase tracking-[0.02em] text-white"
              style={{ fontSize: "clamp(18px, 2.6vw, 36px)", lineHeight: 1 }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>

      {/* film grain */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay"
      >
        <filter id="ribbon-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ribbon-noise)" />
      </svg>
    </section>
  );
};

export default ProjectFooterRibbon;