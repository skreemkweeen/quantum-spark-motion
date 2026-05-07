import { useRef } from "react";
import { GrainOverlay } from "./GrainOverlay";
import { CursorGlow } from "./CursorGlow";
import { FooterTransitionVeil } from "./FooterTransitionVeil";
import { HolographicRibbon } from "./HolographicRibbon";
import { DepthField } from "./DepthField";
import { FooterTypography } from "./FooterTypography";
import { FooterNavigation } from "./FooterNavigation";

export interface CinematicProjectFooterProps {
  projectTitle: string;
  ribbonPhrases: string[];
  ribbonColor?: "default" | "warm" | "cool";
  nextProject?: { title: string; slug: string };
  ctaText?: string;
  email?: string;
  location?: string;
  copyrightName?: string;
}

const ACCENT: Record<"default" | "warm" | "cool", string> = {
  default: "140, 80, 255",
  warm: "255, 130, 55",
  cool: "55, 140, 255",
};

export function CinematicProjectFooter({
  projectTitle,
  ribbonPhrases,
  ribbonColor = "default",
  nextProject,
  ctaText = "Start Something Exceptional.",
  email = "studio@elementux.co",
  location = "Lisbon · New York",
  copyrightName = "Elementux",
}: CinematicProjectFooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const accent = ACCENT[ribbonColor] ?? ACCENT.default;

  return (
    <>
      <FooterTransitionVeil accentColor={accent} />
      <section
        ref={containerRef}
        className="relative overflow-hidden text-white"
        style={{ background: "#000" }}
      >
        <DepthField containerRef={containerRef} count={58} />
        <CursorGlow containerRef={containerRef} color={accent} size={820} opacity={0.12} />
        <div className="relative z-10">
          <HolographicRibbon
            size="large"
            title={projectTitle}
            phrases={ribbonPhrases}
            accentColor={accent}
          />
          <FooterTypography ctaText={ctaText} accentColor={accent} />
          <HolographicRibbon
            size="small"
            title={projectTitle}
            phrases={ribbonPhrases}
            reverse
            accentColor={accent}
          />
          <FooterNavigation
            nextProject={nextProject}
            email={email}
            location={location}
            copyrightName={copyrightName}
            accentColor={accent}
          />
        </div>
        <GrainOverlay opacity={0.04} fps={20} />
      </section>
    </>
  );
}
