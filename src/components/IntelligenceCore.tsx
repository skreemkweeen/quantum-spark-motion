import { useEffect, useRef, useState } from "react";
import emblem from "@/assets/element-ux-emblem.png";

export function IntelligenceCore() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = (e.clientX - cx) / (r.width / 2);
      target.y = (e.clientY - cy) / (r.height / 2);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      setTilt({
        x: -current.y * 9,
        y: current.x * 12,
        px: current.x * 18,
        py: current.y * 18,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const microLabel: React.CSSProperties = {
    fontSize: "8px",
    letterSpacing: "0.42em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.32)",
  };
  const microMuted: React.CSSProperties = {
    fontSize: "8px",
    letterSpacing: "0.42em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.18)",
  };

  return (
    <section
      ref={sectionRef}
      id="intelligence-core"
      className="relative w-full overflow-hidden"
      style={{ background: "#050508", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      {/* Infinite grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ic-grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage: "radial-gradient(ellipse 95% 75% at 50% 50%, #000 35%, transparent 92%)",
        }}
      />
      {/* Volumetric fog */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(120,140,200,0.07), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(40,60,100,0.10), transparent 70%)",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Top/bottom continuity fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, #050508, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, #050508, transparent)" }}
      />
      {/* Particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 ic-particles">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Section header */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p style={microLabel}>The Core</p>
            <h2
              style={{
                fontSize: "clamp(1.6rem,3.6vw,2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                color: "rgba(255,255,255,0.92)",
                marginTop: "0.75rem",
              }}
            >
              INTELLIGENCE / SIGNAL
            </h2>
          </div>
          <div className="hidden h-px w-40 md:block" style={{ background: "rgba(255,255,255,0.14)" }} />
        </div>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative mx-auto mt-10"
        style={{ height: "clamp(560px, 72vh, 760px)", maxWidth: "1600px", perspective: "1600px" }}
      >
        {/* LEFT MICRO TELEMETRY */}
        <div className="absolute left-6 md:left-10 top-10 flex flex-col gap-6" style={{ width: 220 }}>
          <div className="flex items-center gap-2">
            <span className="ic-pulse-dot" />
            <span style={microLabel}>Signal Active</span>
          </div>
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div>
            <p style={microMuted}>Studio</p>
            <p style={{ ...microLabel, marginTop: 6 }}>Element UX</p>
            <p style={{ ...microMuted, marginTop: 4 }}>Digital Design Studio</p>
          </div>
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div>
            <p style={microMuted}>Domain</p>
            <p style={{ ...microLabel, marginTop: 6 }}>Motion / Identity / Interface</p>
          </div>
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center justify-between">
            <span style={microMuted}>EST. 2026</span>
            <span style={microLabel}>SYS · 01</span>
          </div>
        </div>

        {/* RIGHT TELEMETRY */}
        <div className="absolute right-6 md:right-10 top-10 flex flex-col items-end gap-6" style={{ width: 220 }}>
          <div className="flex items-center gap-2">
            <span style={microLabel}>System Online</span>
            <span className="ic-pulse-dot" />
          </div>
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div className="text-right">
            <p style={microMuted}>Coordinates</p>
            <p style={{ ...microLabel, marginTop: 6, fontVariantNumeric: "tabular-nums" }}>
              48.8566° N · 2.3522° E
            </p>
          </div>
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="text-right">
            <p style={microMuted}>Channel</p>
            <p style={{ ...microLabel, marginTop: 6 }}>EUX · 026 · LIVE</p>
          </div>
        </div>

        {/* CENTERPIECE */}
        <div
          className="absolute left-1/2 top-1/2 ic-float"
          style={{
            transform: `translate(-50%,-50%) translate3d(${tilt.px}px, ${tilt.py}px, 0)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative"
            style={{
              width: "clamp(360px, 42vw, 540px)",
              height: "clamp(360px, 42vw, 540px)",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.18s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            {/* Outer rotating dotted ring */}
            <svg
              className="absolute inset-0 ic-ring-slow"
              viewBox="0 0 200 200"
              style={{ transform: "translateZ(60px)" }}
            >
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.4"
                strokeDasharray="0.6 3"
              />
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="0.3"
              />
            </svg>
            {/* Mid tick ring */}
            <svg
              className="absolute inset-0 ic-ring-rev"
              viewBox="0 0 200 200"
              style={{ transform: "translateZ(40px)" }}
            >
              {Array.from({ length: 96 }).map((_, i) => {
                const a = (i / 96) * Math.PI * 2;
                const r1 = 86;
                const r2 = i % 8 === 0 ? 80 : 83;
                const x1 = 100 + Math.cos(a) * r1;
                const y1 = 100 + Math.sin(a) * r1;
                const x2 = 100 + Math.cos(a) * r2;
                const y2 = 100 + Math.sin(a) * r2;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 8 === 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)"}
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
            {/* Inner ring with cardinal markers */}
            <svg
              className="absolute inset-0 ic-ring-slow2"
              viewBox="0 0 200 200"
              style={{ transform: "translateZ(20px)" }}
            >
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.4"
              />
              {[0, 90, 180, 270].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line
                    x1="100"
                    y1="28"
                    x2="100"
                    y2="34"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="0.7"
                  />
                </g>
              ))}
            </svg>

            {/* Glow halo */}
            <div
              className="absolute inset-0 rounded-full ic-breathe"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(160,190,255,0.18), transparent 55%)",
                filter: "blur(20px)",
                transform: "translateZ(0px)",
              }}
            />

            {/* Emblem center */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="relative" style={{ width: "55%", height: "55%" }}>
                <img
                  src={emblem}
                  alt="ELEMENT UX emblem"
                  className="absolute inset-0 w-full h-full object-contain ic-glitch-base"
                  style={{ filter: "drop-shadow(0 0 24px rgba(180,200,255,0.18))" }}
                />
                <img
                  src={emblem}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain ic-glitch-r"
                />
                <img
                  src={emblem}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain ic-glitch-c"
                />
              </div>
            </div>

            {/* Chromatic edge highlight */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 60px rgba(120,160,255,0.06), inset 0 0 120px rgba(255,80,80,0.03)",
              }}
            />
          </div>
        </div>

        {/* Bottom-left orbit label */}
        <div className="absolute bottom-10 left-6 md:left-10 flex items-center gap-3">
          <span className="ic-pulse-dot" />
          <span style={microLabel}>Core · 0001 · Streaming</span>
        </div>
      </div>

      {/* Editorial bottom-right */}
      <div className="relative mx-auto mt-8 max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4 md:col-start-1 flex flex-col justify-end">
            <div className="h-px w-24" style={{ background: "rgba(255,255,255,0.18)" }} />
            <p style={{ ...microMuted, marginTop: 14 }}>File · 026 / Studio Log</p>
            <p style={{ ...microLabel, marginTop: 8 }}>Intelligence Core</p>
          </div>
          <div className="md:col-span-7 md:col-start-6 md:text-right">
            <p style={microLabel}>Manifesto · 01</p>
            <h3
              style={{
                fontSize: "clamp(2.2rem, 5.4vw, 5rem)",
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 0.96,
                color: "#fff",
                marginTop: "1.25rem",
              }}
            >
              Designing presence
              <br />
              in the modern
              <br />
              digital world.
            </h3>
            <p
              style={{
                marginTop: "1.75rem",
                marginLeft: "auto",
                maxWidth: "34rem",
                fontSize: "13px",
                lineHeight: 1.85,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.42)",
              }}
            >
              We build immersive digital systems that merge strategy, identity, and interaction into
              experiences designed to resonate long after the screen fades. Strategy. Identity.
              Interface. Engineered with intention for the brands shaping what comes next.
            </p>
          </div>
        </div>
      </div>

      {/* Local styles */}
      <style>{`
        @keyframes ic-spin { to { transform: rotate(360deg) } }
        @keyframes ic-spin-rev { to { transform: rotate(-360deg) } }
        @keyframes ic-float { 0%,100% { transform: translate(-50%,-50%) translateY(-4px) } 50% { transform: translate(-50%,-50%) translateY(4px) } }
        @keyframes ic-breathe { 0%,100% { opacity: 0.55 } 50% { opacity: 1 } }
        @keyframes ic-pulse { 0%,100% { opacity: 0.35; transform: scale(1) } 50% { opacity: 1; transform: scale(1.4) } }
        @keyframes ic-glitch-r { 0%,92%,100% { transform: translate(0,0); opacity: 0.6 } 93% { transform: translate(2px,-1px); opacity: 0.7 } 95% { transform: translate(-3px,1px) } 97% { transform: translate(1px,2px) } }
        @keyframes ic-glitch-c { 0%,93%,100% { transform: translate(0,0); opacity: 0.5 } 94% { transform: translate(-2px,1px) } 96% { transform: translate(3px,-2px) } 98% { transform: translate(-1px,-1px) } }
        @keyframes ic-grid-drift { 0% { background-position: 0 0, 0 0 } 100% { background-position: 120px 120px, 120px 120px } }
        .ic-grid { animation: ic-grid-drift 60s linear infinite; }
        .ic-ring-slow { animation: ic-spin 80s linear infinite; transform-origin: 50% 50%; }
        .ic-ring-slow2 { animation: ic-spin 140s linear infinite; transform-origin: 50% 50%; }
        .ic-ring-rev { animation: ic-spin-rev 50s linear infinite; transform-origin: 50% 50%; }
        .ic-breathe { animation: ic-breathe 6s ease-in-out infinite; }
        .ic-float { animation: ic-float 9s ease-in-out infinite; will-change: transform; }
        .ic-pulse-dot { width: 6px; height: 6px; border-radius: 999px; background: rgba(180,210,255,0.85); box-shadow: 0 0 10px rgba(160,200,255,0.6); animation: ic-pulse 2.4s ease-in-out infinite; display: inline-block; }
        .ic-glitch-base { mix-blend-mode: screen; }
        .ic-glitch-r { mix-blend-mode: screen; filter: drop-shadow(2px 0 0 rgba(255,60,80,0.55)); animation: ic-glitch-r 7s steps(1) infinite; opacity: 0.6; }
        .ic-glitch-c { mix-blend-mode: screen; filter: drop-shadow(-2px 0 0 rgba(60,200,255,0.55)); animation: ic-glitch-c 9s steps(1) infinite; opacity: 0.5; }
        .ic-particles { mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, #000 40%, transparent 95%); }
        .ic-particles span { position: absolute; width: 2px; height: 2px; background: rgba(220,235,255,0.45); border-radius: 999px; top: calc((var(--i) * 37) % 100 * 1%); left: calc((var(--i) * 53) % 100 * 1%); opacity: 0.4; animation: ic-particle-drift calc(20s + (var(--i) * 1s)) linear infinite; box-shadow: 0 0 6px rgba(180,210,255,0.3); }
        @keyframes ic-particle-drift { 0% { transform: translateY(0) } 100% { transform: translateY(-200px) } }
      `}</style>
    </section>
  );
}
