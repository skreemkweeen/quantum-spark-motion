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
      window.setTimeout(() => setActive(false), 520);
      return true;
    });
  }, []);

  return (
    <span
      onMouseEnter={trigger}
      onFocus={trigger}
      tabIndex={0}
      data-active={active ? "true" : "false"}
      className={cn(
        "eux-logo relative inline-flex items-center select-none align-middle outline-none",
        className
      )}
      aria-label={text}
    >
      <span aria-hidden className="eux-mark"><i /></span>
      <span className="eux-text" data-text={text}>
        <span>{text}</span>
      </span>
      <span aria-hidden className="eux-tick" />
    </span>
  );
};
