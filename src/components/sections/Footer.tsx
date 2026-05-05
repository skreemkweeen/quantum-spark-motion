import { GlitchLogo } from "@/components/GlitchLogo";
import { Reveal } from "@/components/Reveal";

export const Footer = () => (
  <footer id="contact" className="border-t border-[hsl(var(--accent-line))] px-6 py-20">
    <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-end md:justify-between">
      <Reveal>
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold leading-[0.95] tracking-tight">Start a<br />project.</h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="flex flex-col gap-3 text-sm text-[hsl(var(--muted-fg))]">
          <a href="mailto:studio@elementux.co" className="text-foreground transition-opacity hover:opacity-70">studio@elementux.co</a>
          <span>Lisbon · New York</span>
        </div>
      </Reveal>
    </div>
    <div className="mx-auto mt-20 flex max-w-7xl items-center justify-between border-t border-[hsl(var(--accent-line))] pt-6 text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">
      <GlitchLogo className="text-xs" />
      <span>© {new Date().getFullYear()}</span>
    </div>
  </footer>
);