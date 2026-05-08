import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/element-ux-logo.png";

interface GlitchLogoProps {
  text?: string;
  className?: string;
}

export const GlitchLogo = ({ text = "ELEMENT UX", className }: GlitchLogoProps) => {
  const [active, setActive] = useState(false);
  const trigger = useCallback(() => {
    setActive((a) => {
      if (a) return a;
      window.setTimeout(() => setActive(false), 360);
      return true;
    });
  }, []);

  return (
    <span
      onMouseEnter={trigger}
      onFocus={trigger}
      tabIndex={0}
      className={cn(
        "relative inline-block select-none align-middle outline-none",
        className
      )}
      aria-label={text}
    >
      <img
        src={logoUrl}
        alt={text}
        className="relative z-10 block h-9 w-auto md:h-11"
        draggable={false}
      />
      <img
        aria-hidden
        src={logoUrl}
        alt=""
        className={cn(
          "glitch-layer h-full w-full object-contain",
          active && "animate-glitch-r"
        )}
        style={{ opacity: 0, filter: "brightness(0) saturate(100%) invert(28%) sepia(99%) saturate(7480%) hue-rotate(355deg)" }}
        draggable={false}
      />
      <img
        aria-hidden
        src={logoUrl}
        alt=""
        className={cn(
          "glitch-layer h-full w-full object-contain",
          active && "animate-glitch-c"
        )}
        style={{ opacity: 0, filter: "brightness(0) saturate(100%) invert(82%) sepia(58%) saturate(2480%) hue-rotate(140deg)" }}
        draggable={false}
      />
      <img
        aria-hidden
        src={logoUrl}
        alt=""
        className={cn(
          "glitch-layer h-full w-full object-contain",
          active && "animate-glitch-slice"
        )}
        draggable={false}
      />
      <span
        aria-hidden
        className={cn(
          "glitch-layer scanlines transition-opacity duration-200",
          active ? "opacity-30" : "opacity-0"
        )}
      />
    </span>
  );
};
