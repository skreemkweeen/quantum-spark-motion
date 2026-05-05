import { GlitchLogo } from "./GlitchLogo";

export const Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--accent-line))] bg-background/70 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <a href="#top" className="text-sm"><GlitchLogo /></a>
      <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-fg))] md:flex">
        {["Work", "Studio", "Process", "Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="transition-opacity duration-200 hover:text-foreground">{l}</a>
        ))}
      </nav>
    </div>
  </header>
);