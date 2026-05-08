import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "WORK", href: "/#work" },
  { label: "SERVICES", href: "/#services" },
  { label: "ARCHIVE", href: "/#archive" },
  { label: "PROCESS", href: "/#process" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "mailto:hello@elementux.studio" },
];

const SOCIALS = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

export const CinematicFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        }) + " UTC",
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      ref={ref}
      id="contact"
      className="cf-root relative isolate overflow-hidden bg-[#050507] text-white"
    >
      <style>{cfCss}</style>

      {/* Atmospheric layers */}
      <div aria-hidden className="cf-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="cf-fog pointer-events-none absolute inset-0" />
      <div aria-hidden className="cf-vignette pointer-events-none absolute inset-0" />
      <div aria-hidden className="cf-particles pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} style={{ ["--i" as any]: i }} />
        ))}
      </div>
      <div aria-hidden className="cf-noise pointer-events-none absolute inset-0" />

      {/* Top hairline + telemetry */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 pt-8 md:px-12">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/40">
          <span className="cf-pulse-dot" />
          <span>Live Signal</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-white/40">
          {time || "—— UTC"}
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-6 h-px max-w-[1400px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Editorial 3-column grid */}
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 pt-20 md:grid-cols-12 md:gap-10 md:px-12 md:pt-28">
        {/* LEFT */}
        <div className="md:col-span-4 space-y-8">
          <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>EST. 2026</span>
            <span>System Active</span>
            <span>Digital Environment Online</span>
          </div>
          <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-white/85">
            Digital Design Studio
          </h3>
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            Motion · Identity · Interface
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-white/55">
            Building immersive digital experiences for modern brands.
            Strategy-driven systems engineered with intention.
          </p>
        </div>

        {/* CENTER NAV */}
        <nav className="md:col-span-4 md:px-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Index</p>
          <ul className="mt-6 space-y-3">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="cf-nav group inline-flex items-center gap-3 text-[15px] uppercase tracking-[0.22em] text-white/70 transition-colors duration-500 hover:text-white"
                >
                  <span className="cf-nav-line" />
                  <span className="cf-nav-text" data-text={n.label}>{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT */}
        <div className="md:col-span-4 space-y-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Transmission</p>
          <a
            href="mailto:hello@elementux.studio"
            className="block text-base text-white/90 transition-opacity hover:opacity-70"
          >
            hello@elementux.studio
          </a>
          <div className="h-px w-full bg-white/10" />
          <div className="space-y-2 text-xs uppercase tracking-[0.25em] text-white/45">
            <div className="flex items-center gap-2">
              <span className="cf-pulse-dot" />
              <span>Available Worldwide</span>
            </div>
            <div>Currently accepting select projects</div>
          </div>
          <div className="h-px w-full bg-white/10" />
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.3em] text-white/45">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cf-social transition-colors duration-500 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Massive ELEMENT UX type */}
      <div
        className="relative z-10 mx-auto mt-24 max-w-[1600px] px-6 md:px-12"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={`cf-mega ${hover ? "is-hover" : ""}`} aria-label="ELEMENT UX">
          <span className="cf-mega-base" data-text="ELEMENT UX">ELEMENT UX</span>
          <span aria-hidden className="cf-mega-r" data-text="ELEMENT UX">ELEMENT UX</span>
          <span aria-hidden className="cf-mega-c" data-text="ELEMENT UX">ELEMENT UX</span>
          <span aria-hidden className="cf-mega-scan" />
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="relative z-10 mx-auto mt-12 h-px max-w-[1400px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-6 py-6 text-[10px] uppercase tracking-[0.32em] text-white/35 md:flex-row md:items-center md:px-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>Element UX Studio</span>
          <span className="hidden md:inline text-white/15">/</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2"><span className="cf-pulse-dot" /> Signal Active</span>
          <span className="hidden md:inline text-white/15">/</span>
          <span>Live Interface</span>
          <span className="hidden md:inline text-white/15">/</span>
          <span>Digital System Online</span>
        </div>
      </div>
    </footer>
  );
};

const cfCss = `
.cf-root { --cf-line: rgba(255,255,255,0.08); }

.cf-grid {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px);
  background-size: 64px 64px;
  animation: cf-grid-drift 40s linear infinite;
  mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 85%);
}
@keyframes cf-grid-drift {
  from { background-position: 0 0, 0 0; }
  to   { background-position: 64px 64px, 64px 64px; }
}

.cf-fog {
  background:
    radial-gradient(60% 50% at 20% 0%, rgba(120,140,180,0.10), transparent 70%),
    radial-gradient(50% 60% at 90% 100%, rgba(80,100,140,0.10), transparent 70%),
    radial-gradient(80% 60% at 50% 50%, rgba(255,255,255,0.025), transparent 70%);
  animation: cf-breathe 12s ease-in-out infinite;
}
@keyframes cf-breathe {
  0%,100% { opacity: 0.85; }
  50%     { opacity: 1; }
}

.cf-vignette {
  background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.85) 100%);
}

.cf-noise {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.45'/></svg>");
  opacity: 0.06;
  mix-blend-mode: overlay;
}

.cf-particles span {
  position: absolute;
  width: 2px; height: 2px; border-radius: 9999px;
  background: rgba(255,255,255,0.55);
  box-shadow: 0 0 6px rgba(255,255,255,0.35);
  left: calc((var(--i) * 4.17%) + 2%);
  top: 100%;
  animation: cf-float 22s linear infinite;
  animation-delay: calc(var(--i) * -1.3s);
  opacity: 0;
}
@keyframes cf-float {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
}

.cf-pulse-dot {
  display: inline-block;
  width: 6px; height: 6px; border-radius: 9999px;
  background: #d4dce6;
  box-shadow: 0 0 10px rgba(200,220,255,0.8);
  animation: cf-pulse 2.4s ease-in-out infinite;
}
@keyframes cf-pulse {
  0%,100% { opacity: 0.55; transform: scale(1); }
  50%     { opacity: 1;    transform: scale(1.25); }
}

/* Nav */
.cf-nav .cf-nav-line {
  display: inline-block;
  width: 14px; height: 1px;
  background: rgba(255,255,255,0.35);
  transition: width 600ms cubic-bezier(0.16,1,0.3,1), background 400ms;
}
.cf-nav:hover .cf-nav-line { width: 44px; background: rgba(255,255,255,0.85); }
.cf-nav-text { position: relative; display: inline-block; }
.cf-nav-text::before, .cf-nav-text::after {
  content: attr(data-text);
  position: absolute; inset: 0;
  pointer-events: none; opacity: 0;
  transition: opacity 200ms;
}
.cf-nav-text::before { color: rgba(255,80,80,0.7); transform: translateX(-1px); }
.cf-nav-text::after  { color: rgba(80,200,255,0.7); transform: translateX(1px); }
.cf-nav:hover .cf-nav-text::before,
.cf-nav:hover .cf-nav-text::after { opacity: 0.55; animation: cf-microglitch 600ms steps(2,end); }
@keyframes cf-microglitch {
  0%   { transform: translateX(-1px); }
  20%  { transform: translateX(2px); }
  40%  { transform: translateX(-2px); }
  60%  { transform: translateX(1px); }
  100% { transform: translateX(0); }
}

.cf-social { position: relative; }
.cf-social:hover { text-shadow: 0 0 12px rgba(255,255,255,0.45); }

/* Mega type */
.cf-mega {
  position: relative;
  font-family: ui-sans-serif, system-ui, -apple-system, "Inter", sans-serif;
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 0.82;
  font-size: clamp(4.5rem, 18vw, 18rem);
  text-align: center;
  white-space: nowrap;
  background: linear-gradient(180deg, #ffffff 0%, #c9cfd6 55%, #6f7782 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  user-select: none;
}
.cf-mega-base { display: block; }
.cf-mega-r, .cf-mega-c {
  position: absolute; inset: 0;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 400ms;
}
.cf-mega-r { background: #ff3344; transform: translate(2px, 0); }
.cf-mega-c { background: #33d4ff; transform: translate(-2px, 0); }
.cf-mega.is-hover .cf-mega-r { opacity: 0.55; animation: cf-glitch-r 700ms steps(3,end); }
.cf-mega.is-hover .cf-mega-c { opacity: 0.55; animation: cf-glitch-c 700ms steps(3,end); }
@keyframes cf-glitch-r {
  0%   { transform: translate(2px,0); clip-path: inset(0 0 80% 0); }
  25%  { transform: translate(6px,0); clip-path: inset(40% 0 30% 0); }
  50%  { transform: translate(-3px,0); clip-path: inset(70% 0 5% 0); }
  75%  { transform: translate(4px,0); clip-path: inset(20% 0 60% 0); }
  100% { transform: translate(2px,0); clip-path: inset(0 0 0 0); }
}
@keyframes cf-glitch-c {
  0%   { transform: translate(-2px,0); clip-path: inset(80% 0 0 0); }
  25%  { transform: translate(-5px,0); clip-path: inset(20% 0 60% 0); }
  50%  { transform: translate(3px,0);  clip-path: inset(50% 0 30% 0); }
  75%  { transform: translate(-4px,0); clip-path: inset(10% 0 70% 0); }
  100% { transform: translate(-2px,0); clip-path: inset(0 0 0 0); }
}
.cf-mega-scan {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.08) 0 1px,
    transparent 1px 4px
  );
  mix-blend-mode: overlay;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms;
}
.cf-mega.is-hover .cf-mega-scan { opacity: 0.55; animation: cf-scan-move 700ms linear; }
@keyframes cf-scan-move {
  from { background-position: 0 -20px; }
  to   { background-position: 0 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .cf-grid, .cf-fog, .cf-particles span, .cf-pulse-dot { animation: none !important; }
}
`;

export default CinematicFooter;