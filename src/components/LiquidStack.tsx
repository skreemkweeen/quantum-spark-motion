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
  /** vertical overlap in px between adjacent images (80–120 recommended) */
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
  overlap = 100,
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
          isFirst={i === 0}
          isLast={i === images.length - 1}
          overlap={overlap}
          index={i}
        />
      ))}
    </div>
  );
};

const LiquidItem = ({
  image,
  isFirst,
  isLast,
  overlap,
  index,
}: {
  image: LiquidImage;
  isFirst: boolean;
  isLast: boolean;
  overlap: number;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const ratio = image.ratio ?? 16 / 10;

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

  // True crossfade: each image fades out its bottom and the next fades in its top.
  // Adjacent images overlap by `overlap` px so the masks blend into one continuous image.
  const topStop = isFirst ? "0%" : "20%";
  const bottomStop = isLast ? "100%" : "80%";
  const mask = `linear-gradient(to bottom, transparent 0%, black ${topStop}, black ${bottomStop}, transparent 100%)`;

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: `${ratio}`,
        marginTop: isFirst ? 0 : `-${overlap}px`,
        zIndex: 10 + index,
      }}
    >
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

      {/* Optional: very subtle product-color tint inside the image, low opacity */}
      {image.tone && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `hsl(${image.tone} / 0.05)`,
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
      )}
    </div>
  );
};

export default LiquidStack;