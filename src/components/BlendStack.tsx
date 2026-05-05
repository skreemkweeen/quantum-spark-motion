import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BlendImage {
  src: string;
  alt: string;
  /** aspect ratio in width/height, e.g. 16/10. Defaults to 16/10 */
  ratio?: number;
  /** object-position e.g. "center top" */
  position?: string;
}

interface BlendStackProps {
  images: BlendImage[];
  className?: string;
  /** vertical overlap in vh, default 12 */
  overlap?: number;
}

/**
 * Vertically stacked, edge-blended cinematic image stack.
 * Each image fades to black at its bottom and the next image emerges from black,
 * with a transition zone containing grain, scanline streaks and faint RGB split.
 */
export const BlendStack = ({ images, className, overlap = 12 }: BlendStackProps) => {
  return (
    <div className={cn("relative w-full bg-black", className)}>
      {images.map((img, i) => {
        const ratio = img.ratio ?? 16 / 10;
        const isFirst = i === 0;
        const isLast = i === images.length - 1;
        return (
          <BlendItem
            key={i}
            image={img}
            ratio={ratio}
            isFirst={isFirst}
            isLast={isLast}
            overlap={overlap}
            index={i}
          />
        );
      })}
    </div>
  );
};

const BlendItem = ({
  image,
  ratio,
  isFirst,
  isLast,
  overlap,
  index,
}: {
  image: BlendImage;
  ratio: number;
  isFirst: boolean;
  isLast: boolean;
  overlap: number;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

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
        el.style.setProperty("--py", `${(-offset * 24).toFixed(2)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Mask: fade top (unless first) and bottom (unless last) into black
  const topFade = isFirst ? "0%" : "18%";
  const bottomFade = isLast ? "100%" : "82%";
  const mask = `linear-gradient(to bottom, transparent 0%, black ${topFade}, black ${bottomFade}, transparent 100%)`;

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: `${ratio}`,
        marginTop: isFirst ? 0 : `-${overlap}vh`,
        zIndex: 10 + index,
      }}
    >
      {/* Image with mask + parallax */}
      <div
        ref={ref}
        className="absolute inset-0 will-tx"
        style={{
          transform: "translate3d(0, var(--py, 0px), 0)",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading={index === 0 ? "eager" : "lazy"}
          className="h-full w-full object-cover"
          style={{ objectPosition: image.position ?? "center" }}
        />
      </div>

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Top transition zone (only if not first) */}
      {!isFirst && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28%] overflow-hidden"
        >
          {/* fog */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent" />
          {/* scanline streaks */}
          <div className="absolute inset-0 scanlines opacity-[0.08]" />
          {/* RGB split slivers */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[hsl(0_70%_55%/0.1)] -translate-y-px" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[hsl(180_70%_55%/0.1)] translate-y-px" />
          {/* drifting particles */}
          <DriftParticles seed={index} />
        </div>
      )}

      {/* Bottom transition zone (only if not last) */}
      {!isLast && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
      )}
    </div>
  );
};

const DriftParticles = ({ seed }: { seed: number }) => {
  // Deterministic-ish random per item
  const dots = Array.from({ length: 8 }, (_, i) => {
    const x = ((seed * 37 + i * 53) % 100);
    const delay = ((seed * 11 + i * 7) % 50) / 10;
    const dur = 6 + ((seed + i) % 5);
    return { x, delay, dur, i };
  });
  return (
    <>
      {dots.map((d) => (
        <span
          key={d.i}
          className="absolute block h-[2px] w-[2px] rounded-full bg-white/30 animate-drift"
          style={{
            left: `${d.x}%`,
            bottom: `-2px`,
            animationDelay: `-${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </>
  );
};

export default BlendStack;