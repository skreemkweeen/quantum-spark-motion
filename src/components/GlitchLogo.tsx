import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

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
        "relative inline-block select-none font-semibold tracking-[0.18em] text-foreground outline-none",
        className
      )}
      aria-label={text}
    >
      <span className="relative z-10">{text}</span>
      <span aria-hidden className={cn("glitch-layer text-[hsl(0_85%_60%)]", active && "animate-glitch-r")} style={{ opacity: 0 }}>{text}</span>
      <span aria-hidden className={cn("glitch-layer text-[hsl(180_85%_55%)]", active && "animate-glitch-c")} style={{ opacity: 0 }}>{text}</span>
      <span aria-hidden className={cn("glitch-layer text-foreground", active && "animate-glitch-slice")}>{text}</span>
      <span aria-hidden className={cn("glitch-layer scanlines transition-opacity duration-200", active ? "opacity-30" : "opacity-0")} />
    </span>
  );
};
