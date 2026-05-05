import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface LiquidImage {
  src: string;
  alt: string;
  ratio?: number;
  /** dominant tone in HSL, e.g. "60 90% 70%" (citrus). Used for blend zones. */
  tone?: string;
  position?: string;
}

interface LiquidStackProps {
  images: LiquidImage[];
  className?: string;
  /** vertical overlap in vh */
  overlap?: number;
  /** base background tone HSL (light/airy) */
  baseTone?: string;
}

/**
 * Editorial, liquid-blended image stack for bright/airy beverage aesthetics.
 * Each image fades into a soft color wash that harmonizes with the next image.
 */
export const LiquidStack = ({
  images,
  className,
  overlap = 12,
  baseTone = "40 30% 96%",
}: LiquidStackProps) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ background: `hsl(${baseTone})` }}
    >
      {images.map((img, i) => (
        <LiquidItem
          key={i}
          image={img}
          prevTone={images[i - 1]?.tone}
          nextTone={images[i + 1]?.tone}
          isFirst={i === 0}
          isLast={i === images.length - 1}
          overlap={overlap}
          index={i}
          baseTone={baseTone}
        />
      ))}
    </div>
  );
};

const LiquidItem = ({
  image,
  prevTone,
  nextTone,
  isFirst,
  isLast,
  overlap,
  index,
  baseTone,
}: {
  image: LiquidImage;
  prevTone?: string;
  nextTone?: string;
  isFirst: boolean;
  isLast: boolean;
  overlap: number;
  index: number;
  baseTone: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const ratio = image.ratio ?? 16 / 10;
  const tone = image.tone ?? baseTone;

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
        el.style.setProperty("--py", `${(-offset * 22).toFixed(2)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Soft mask - fade the edges of the image so the color wash takes over
  const topFade = isFirst ? "0%" : "20%";
  const bottomFade = isLast ? "100%" : "80%";
  const mask = `linear-gradient(to bottom, transparent 0%, black ${topFade}, black ${bottomFade}, transparent 100%)`;

  // Harmonized blend tones — meet in the middle of the overlap
  const topBlendTone = prevTone
    ? `hsl(${mix(prevTone, tone)} / 0.55)`
    : `hsl(${tone} / 0.0)`;
  const bottomBlendTone = nextTone
    ? `hsl(${mix(tone, nextTone)} / 0.55)`
    : `hsl(${tone} / 0.0)`;

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: `${ratio}`,
        marginTop: isFirst ? 0 : `-${overlap}vh`,
        zIndex: 10 + index,
      }}
    >
      {/* image with mask + parallax */}
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

      {/* Top color wash */}
      {!isFirst && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32%] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${topBlendTone} 0%, transparent 100%)`,
              filter: "blur(8px)",
            }}
          />
          {/* soft highlight bloom */}
          <div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: `hsl(${tone} / 0.35)`, filter: "blur(3px)" }}
          />
          <Bubbles seed={index} tone={tone} />
        </div>
      )}

      {/* Bottom color wash */}
      {!isLast && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${bottomBlendTone} 0%, transparent 100%)`,
              filter: "blur(8px)",
            }}
          />
          <Bubbles seed={index + 100} tone={tone} />
        </div>
      )}
    </div>
  );
};

/** Mix two HSL "h s% l%" strings by averaging hue/sat/lightness. */
function mix(a: string, b: string): string {
  const pa = parse(a);
  const pb = parse(b);
  if (!pa || !pb) return a;
  // hue: shortest path average
  let dh = pb.h - pa.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = (pa.h + dh / 2 + 360) % 360;
  const s = (pa.s + pb.s) / 2;
  const l = (pa.l + pb.l) / 2;
  return `${h.toFixed(0)} ${s.toFixed(0)}% ${l.toFixed(0)}%`;
}
function parse(s: string): { h: number; s: number; l: number } | null {
  const m = s.trim().match(/^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%$/);
  if (!m) return null;
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
}

const Bubbles = ({ seed, tone }: { seed: number; tone: string }) => {
  const dots = Array.from({ length: 10 }, (_, i) => {
    const x = (seed * 41 + i * 67) % 100;
    const size = 2 + ((seed + i) % 4);
    const delay = ((seed * 13 + i * 9) % 60) / 10;
    const dur = 7 + ((seed + i) % 6);
    return { x, size, delay, dur, i };
  });
  return (
    <>
      {dots.map((d) => (
        <span
          key={d.i}
          className="absolute block rounded-full animate-bubble"
          style={{
            left: `${d.x}%`,
            bottom: `-6px`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: `hsl(${tone} / 0.6)`,
            boxShadow: `0 0 6px hsl(${tone} / 0.4)`,
            animationDelay: `-${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </>
  );
};

export default LiquidStack;