import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useEffect, useRef, useState } from "react";

/* =========================================================================
   NEXTRIPT — editorial cinematic case study
   Cormorant Garamond + DM Mono · Pure CSS visuals · Framer Motion reveals
   ========================================================================= */

const C = {
  black: "#080808",
  s1: "#111111",
  s2: "#191919",
  s3: "#222222",
  border: "rgba(255,255,255,0.06)",
  text: "#F0EDE8",
  muted: "#6B6B6B",
  ghost: "#2E2E2E",
  accent: "#C8B89A",
};

const display: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 900,
  letterSpacing: "-0.04em",
  lineHeight: 0.9,
  color: C.text,
};
const headline: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: "italic",
  fontWeight: 400,
  color: C.text,
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
};
const label: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  fontSize: "0.65rem",
  color: C.muted,
};
const body: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontWeight: 400,
  fontSize: "0.8rem",
  lineHeight: 1.8,
  color: C.muted,
};

const ease = [0.16, 1, 0.3, 1] as const;

/* ---------- Reveal helper ---------- */
const Reveal = ({
  children,
  delay = 0,
  className,
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Custom cursor ---------- */
const Cursor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.25;
      cy += (ty - cy) * 0.25;
      el.style.transform = `translate3d(${cx - 5}px, ${cy - 5}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 rounded-full"
      style={{ background: "#fff", mixBlendMode: "difference", willChange: "transform" }}
    />
  );
};

/* ---------- Grain overlay ---------- */
const Grain = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-[90]"
    style={{
      opacity: 0.03,
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }}
  />
);

/* ---------- Top scroll progress ---------- */
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[95] h-px origin-left"
      style={{ scaleX: sx, background: C.accent }}
    />
  );
};

/* ---------- Plane SVG ---------- */
const Plane = ({ size = 64, stroke = C.text }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
    <path
      d="M32 4 L34 28 L58 40 L58 44 L34 38 L33 54 L40 58 L40 60 L32 58 L24 60 L24 58 L31 54 L30 38 L6 44 L6 40 L30 28 Z"
      stroke={stroke}
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

/* ---------- Phone frame ---------- */
const Phone = ({
  w = 160,
  h = 320,
  children,
  className = "",
  scale = 1,
  shadow = false,
  style = {},
}: {
  w?: number;
  h?: number;
  children?: ReactNode;
  className?: string;
  scale?: number;
  shadow?: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    className={`relative ${className}`}
    style={{
      width: w,
      height: h,
      borderRadius: 40,
      border: "1.5px solid rgba(255,255,255,0.12)",
      background: "#111",
      transform: `scale(${scale})`,
      boxShadow: shadow ? "0 40px 80px rgba(0,0,0,0.8)" : "0 20px 40px rgba(0,0,0,0.6)",
      overflow: "hidden",
      willChange: "transform",
      transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
      ...style,
    }}
  >
    {/* notch */}
    <div
      className="absolute left-1/2 top-2 -translate-x-1/2"
      style={{ width: w * 0.32, height: 14, borderRadius: 999, background: "#080808" }}
    />
    <div className="absolute inset-0 p-4 pt-7">{children}</div>
  </div>
);

/* ---------- N logomark (outlined) ---------- */
const NMark = ({ size = 120, stroke = C.accent, sw = 2 }: { size?: number; stroke?: string; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
    <path d="M18 82 L18 18 L82 82 L82 18" stroke={stroke} strokeWidth={sw} strokeLinecap="square" />
  </svg>
);

/* =========================================================================
   PHONE SCREEN VARIANTS (pure CSS / SVG)
   ========================================================================= */

const ScreenHome = () => (
  <div className="flex h-full flex-col gap-2.5">
    <div className="flex items-center justify-between">
      <span style={{ ...label, fontSize: "0.5rem", color: C.muted }}>HOME</span>
      <Plane size={12} stroke={C.accent} />
    </div>
    <div
      className="rounded-[2px] p-3"
      style={{ background: C.s2, border: `1px solid ${C.border}` }}
    >
      <div style={{ ...label, fontSize: "0.45rem", color: C.muted }}>FLIGHT · NX 248</div>
      <div className="mt-1.5 flex items-baseline justify-between" style={{ ...display, fontSize: "0.95rem" }}>
        <span>JFK</span>
        <span className="mx-2 flex-1 border-t border-dashed" style={{ borderColor: C.muted, opacity: 0.4 }} />
        <span>CDG</span>
      </div>
      <div className="mt-2 h-px w-full" style={{ background: C.s3 }}>
        <div className="h-full" style={{ width: "62%", background: C.accent }} />
      </div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-1 rounded-sm" style={{ background: C.s2, width: `${100 - i * 12}%` }} />
    ))}
  </div>
);

const ScreenSearch = () => (
  <div className="flex h-full flex-col gap-2.5">
    <span style={{ ...label, fontSize: "0.5rem" }}>SEARCH</span>
    {[
      ["FROM", "JFK"],
      ["TO", "CDG"],
      ["DATE", "24 MAY"],
    ].map(([k, v]) => (
      <div key={k} className="rounded-[2px] p-2" style={{ background: C.s2, border: `1px solid ${C.border}` }}>
        <div style={{ ...label, fontSize: "0.42rem", color: C.muted }}>{k}</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.text, marginTop: 2 }}>{v}</div>
      </div>
    ))}
    <div
      className="mt-auto rounded-[2px] py-2 text-center"
      style={{ background: C.accent, color: C.black, ...label, fontSize: "0.55rem", letterSpacing: "0.2em" }}
    >
      SEARCH
    </div>
  </div>
);

const ScreenSeats = () => (
  <div className="flex h-full flex-col gap-2.5">
    <span style={{ ...label, fontSize: "0.5rem" }}>SEAT MAP</span>
    <div className="grid grid-cols-4 gap-2 mx-auto mt-3">
      {Array.from({ length: 20 }).map((_, i) => {
        const hl = [6, 11, 14].includes(i);
        return (
          <div
            key={i}
            className="h-3 w-3 rounded-[2px]"
            style={{
              background: hl ? C.accent : C.s3,
              border: `1px solid ${hl ? C.accent : C.border}`,
            }}
          />
        );
      })}
    </div>
    <div className="mt-auto" style={{ ...label, fontSize: "0.45rem", color: C.muted }}>SELECTED · 14C</div>
  </div>
);

const ScreenBoarding = () => (
  <div className="flex h-full flex-col gap-2">
    <span style={{ ...label, fontSize: "0.5rem" }}>BOARDING</span>
    <div className="mt-1 flex items-baseline justify-between" style={{ ...display, fontSize: "0.85rem" }}>
      <span>JFK</span>
      <span>CDG</span>
    </div>
    <div className="my-2 border-t border-dashed" style={{ borderColor: C.muted, opacity: 0.5 }} />
    <div style={{ ...label, fontSize: "0.45rem" }}>GATE · 22B · SEAT 14C</div>
    <div className="mt-auto flex h-8 items-end gap-[1.5px]">
      {Array.from({ length: 26 }).map((_, i) => (
        <div key={i} style={{ width: 2, height: `${30 + ((i * 13) % 70)}%`, background: C.text }} />
      ))}
    </div>
  </div>
);

const ScreenStatus = () => (
  <div className="flex h-full flex-col gap-2">
    <span style={{ ...label, fontSize: "0.5rem" }}>STATUS</span>
    <div className="relative mt-2 pl-5">
      <div className="absolute left-1.5 top-2 bottom-2 w-px" style={{ background: C.s3 }} />
      {["DEPARTED", "IN FLIGHT", "ARRIVING"].map((s, i) => (
        <div key={s} className="relative mb-4 last:mb-0">
          <span
            className="absolute -left-[18px] top-1 h-2 w-2 rounded-full"
            style={{ background: i === 1 ? C.accent : C.s3, border: `1px solid ${i === 1 ? C.accent : C.muted}` }}
          />
          <div style={{ ...label, fontSize: "0.45rem", color: i === 1 ? C.text : C.muted }}>{s}</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: C.muted, marginTop: 1 }}>
            {["09:42", "12:18", "16:05"][i]}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ScreenProfile = () => (
  <div className="flex h-full flex-col gap-3">
    <span style={{ ...label, fontSize: "0.5rem" }}>PROFILE</span>
    <div
      className="mx-auto h-12 w-12 rounded-full"
      style={{ background: `linear-gradient(135deg, ${C.s3}, ${C.s2})`, border: `1px solid ${C.border}` }}
    />
    <div className="mx-auto h-1.5 w-20 rounded-sm" style={{ background: C.s2 }} />
    {[100, 75, 60].map((w, i) => (
      <div key={i} className="h-1 rounded-sm" style={{ background: C.s2, width: `${w}%` }} />
    ))}
  </div>
);

const ScreenCalendar = () => (
  <div className="flex h-full flex-col gap-2">
    <span style={{ ...label, fontSize: "0.55rem" }}>MAY 2024</span>
    <div className="grid grid-cols-7 gap-1.5 mt-1">
      {["M","T","W","T","F","S","S"].map((d, i) => (
        <div key={i} style={{ ...label, fontSize: "0.4rem", textAlign: "center", color: C.muted }}>{d}</div>
      ))}
      {Array.from({ length: 28 }).map((_, i) => {
        const hl = [12, 13, 19].includes(i);
        return (
          <div
            key={i}
            className="grid aspect-square place-items-center rounded-[2px]"
            style={{
              background: hl ? C.accent : "transparent",
              color: hl ? C.black : C.muted,
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.5rem",
              border: hl ? "none" : `1px solid ${C.border}`,
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
    <div
      className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full px-2 py-1"
      style={{ border: `1px solid ${C.border}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#7ED957", boxShadow: "0 0 6px #7ED957" }} />
      <span style={{ ...label, fontSize: "0.4rem", color: C.text }}>OFFLINE READY</span>
    </div>
  </div>
);

/* ---------- Wireframe phone ---------- */
const Wireframe = ({ variant }: { variant: number }) => {
  const blocks: number[][] = [
    [60, 30, 80, 40],
    [40, 70, 50, 60],
    [80, 50, 30, 70],
    [50, 80, 60, 40],
    [70, 40, 80, 50],
    [40, 60, 70, 80],
    [60, 50, 40, 70],
    [80, 30, 60, 50],
  ];
  const b = blocks[variant % blocks.length];
  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="h-2 rounded-sm" style={{ background: C.s3, width: `${b[0]}%` }} />
      <div className="h-10 rounded-sm" style={{ background: C.s2 }} />
      <div className="h-1.5 rounded-sm" style={{ background: C.s3, width: `${b[1]}%` }} />
      <div className="h-1.5 rounded-sm" style={{ background: C.s3, width: `${b[2]}%` }} />
      <div className="mt-auto h-6 rounded-sm" style={{ background: C.s2, width: `${b[3]}%` }} />
    </div>
  );
};

/* =========================================================================
   PAGE
   ========================================================================= */

const Nextrip = () => {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: C.black, color: C.text, scrollBehavior: "smooth", cursor: "none" }}
    >
      <style>{`html { scroll-behavior: smooth; } html::-webkit-scrollbar { display: none; } html { scrollbar-width: none; } a, button { cursor: none; }`}</style>
      <Cursor />
      <Grain />
      <ScrollBar />

      {/* ===== Flat top nav ===== */}
      <nav className="fixed left-0 right-0 top-0 z-[80] flex items-center justify-between px-8 py-6">
        <a href="/" style={{ ...label, color: C.text }}>← INDEX</a>
        <div style={{ ...label, color: C.text }}>NEXTRIPT</div>
        <div className="flex gap-6">
          <a href="#work" style={label}>WORK</a>
          <a href="#contact" style={label}>CONTACT</a>
        </div>
      </nav>

      {/* ============ 1 · HERO ============ */}
      <Section1Hero />

      {/* ============ 2 · METADATA ============ */}
      <Section2Meta />

      {/* ============ 3 · BRAND IDENTITY ============ */}
      <Section3Identity />

      {/* ============ 4 · FEATURE STATEMENT ============ */}
      <Section4Statement />

      {/* ============ 5 · SCREEN GRID ============ */}
      <Section5Screens />

      {/* ============ 6 · SPLIT CALLOUT ============ */}
      <Section6Split />

      {/* ============ 7 · COMPONENT LIBRARY ============ */}
      <Section7Components />

      {/* ============ 8 · WIREFRAME FLOW ============ */}
      <Section8Wireframes />

      {/* ============ 9 · HERO RENDERS ============ */}
      <Section9Renders />

      {/* ============ 10 · CLOSING ============ */}
      <Section10Closing />
    </div>
  );
};

/* ====================== SECTION 1 ====================== */
const Section1Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease }}
      className="relative flex flex-col items-center"
    >
      <Plane size={72} stroke={C.text} />
      <div className="mt-3 w-px" style={{ height: "30vh", background: `linear-gradient(180deg, ${C.text}, transparent)` }} />
    </motion.div>

    <div className="relative mt-[-12vh] flex w-full justify-center">
      {/* ghost layer underneath */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 select-none text-center"
        style={{ ...display, fontSize: "12vw", color: C.ghost }}
      >
        nextript
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="relative text-center"
        style={{ ...display, fontSize: "12vw" }}
      >
        ne—trip
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease }}
      className="mt-10"
      style={{ ...label, color: C.text }}
    >
      CASE STUDY — TRAVEL APP DESIGN — 2024
    </motion.div>

    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-10"
      style={label}
    >
      ↓ SCROLL
    </motion.div>
  </section>
);

/* ====================== SECTION 2 ====================== */
const Section2Meta = () => {
  const items = [
    ["ROLE", "Lead Designer"],
    ["TYPE", "Mobile App"],
    ["YEAR", "2024"],
    ["PLATFORM", "iOS / Android"],
  ];
  return (
    <section
      className="w-full px-8 py-12"
      style={{ background: C.s1, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 md:grid-cols-4">
        {items.map(([k, v], i) => (
          <Reveal key={k} delay={i * 0.1}>
            <div style={label}>{k}</div>
            <div className="mt-3" style={{ fontFamily: "'DM Mono', monospace", color: C.text, fontSize: "0.95rem" }}>
              {v}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* ====================== SECTION 3 ====================== */
const Section3Identity = () => (
  <section className="px-8 py-32 md:py-48">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[2fr_3fr] md:gap-20">
      <Reveal>
        <h2 style={{ ...headline, fontSize: "clamp(2rem, 4vw, 4rem)" }}>
          A system built for<br />the traveler in motion.
        </h2>
        <p className="mt-10" style={{ ...body, maxWidth: "38ch" }}>
          Nextript is a quiet operating system for travel — composing the complexity of
          flight, identity, and time into a single, considered surface. Built for those
          who measure their journeys not in miles, but in moments.
        </p>
      </Reveal>

      <Reveal delay={0.2} y={40}>
        <div
          className="p-10"
          style={{ background: C.s2, border: `2px solid ${C.border}`, borderRadius: 4 }}
        >
          <div className="flex items-start justify-between">
            <NMark size={120} stroke={C.accent} sw={2} />
            <div className="text-right" style={label}>
              MARK<br /><span style={{ color: C.text, marginTop: 4, display: "block" }}>01 / 02</span>
            </div>
          </div>
          <div className="mt-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "2rem", color: C.text }}>
            nextript
          </div>
          <div className="mt-10" style={label}>PALETTE</div>
          <div className="mt-3 flex gap-2">
            {[
              ["#080808", "BLACK"],
              ["#191919", "S—2"],
              ["#6B6B6B", "MUTED"],
              ["#F0EDE8", "WHITE"],
              [C.accent, "SAND"],
            ].map(([c, n]) => (
              <div key={n} className="flex flex-col items-center">
                <div style={{ width: 10, height: 32, background: c, border: `1px solid ${C.border}` }} />
                <div className="mt-2" style={{ ...label, fontSize: "0.45rem" }}>{n}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-baseline gap-4">
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "72px", color: C.text, lineHeight: 1 }}>
              Aa
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", color: C.muted, fontSize: "0.85rem" }}>
              Bb Cc Dd Ee
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ====================== SECTION 4 ====================== */
const Section4Statement = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <section ref={ref} className="relative overflow-hidden px-8 py-40">
      {/* CSS clouds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 280px at 15% 30%, rgba(255,255,255,0.025), transparent 70%), radial-gradient(circle 360px at 80% 60%, rgba(255,255,255,0.02), transparent 70%), radial-gradient(circle 200px at 50% 85%, rgba(255,255,255,0.015), transparent 70%), radial-gradient(circle 240px at 60% 15%, rgba(255,255,255,0.018), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal><div style={label}>CORE EXPERIENCE</div></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-[18ch]" style={{ ...headline, fontSize: "clamp(2rem, 6vw, 5rem)" }}>
            Simplified transactions and instant awareness to provide the travel engine of your world.
          </h2>
        </Reveal>

        <div className="mt-24 flex items-end justify-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <Phone>
              <div className="grid h-full place-items-center"><NMark size={64} stroke={C.muted} sw={1.4} /></div>
            </Phone>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            <Phone scale={1.1} shadow>
              <div className="grid h-full place-items-center"><NMark size={72} stroke={C.accent} sw={1.6} /></div>
            </Phone>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <Phone>
              <div className="grid h-full place-items-center"><NMark size={64} stroke={C.muted} sw={1.4} /></div>
            </Phone>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ====================== SECTION 5 ====================== */
const Section5Screens = () => {
  const screens: { name: string; render: () => JSX.Element }[] = [
    { name: "HOME DASHBOARD", render: ScreenHome },
    { name: "FLIGHT SEARCH", render: ScreenSearch },
    { name: "SEAT MAP", render: ScreenSeats },
    { name: "BOARDING PASS", render: ScreenBoarding },
    { name: "FLIGHT STATUS", render: ScreenStatus },
    { name: "PROFILE", render: ScreenProfile },
  ];
  return (
    <section className="px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal><div style={label}>APP SCREENS</div></Reveal>
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
          {screens.map((s, i) => {
            const Render = s.render;
            return (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="group flex flex-col items-center">
                  <div className="transition-transform duration-200 group-hover:-translate-y-2">
                    <Phone><Render /></Phone>
                  </div>
                  <div className="mt-6" style={label}>{s.name}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ====================== SECTION 6 ====================== */
const Section6Split = () => (
  <section className="px-8 py-32" style={{ background: C.s1 }}>
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[55fr_45fr] md:gap-24">
      <Reveal>
        <div className="flex justify-center md:justify-start">
          <Phone w={220} h={440}><ScreenCalendar /></Phone>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div style={label}>TRAVELER SECTION</div>
        <h3 className="mt-6" style={{ ...headline, fontSize: "clamp(1.6rem,3vw,3rem)" }}>
          Calendar functionality with full offline use.
        </h3>
        <p className="mt-8" style={{ ...body, maxWidth: "42ch" }}>
          Plans persist beyond the network. Itineraries, boarding passes, and timing
          remain accessible on the ground — composed for the moments connectivity
          fails the traveler.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {["340MS AVG LOAD", "0 NETWORK CALLS"].map((p) => (
            <span
              key={p}
              className="rounded-full px-3 py-1.5"
              style={{ ...label, color: C.text, border: `1px solid ${C.border}` }}
            >
              {p}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ====================== SECTION 7 ====================== */
const Section7Components = () => {
  const tile = (children: ReactNode, label_: string) => (
    <div
      className="flex flex-col justify-between p-5"
      style={{ background: C.s2, border: `1px solid ${C.border}`, minHeight: 180 }}
    >
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <div className="mt-4" style={label}>{label_}</div>
    </div>
  );

  return (
    <section className="px-8 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal><div style={label}>DESIGN COMPONENTS</div></Reveal>
        <Reveal delay={0.1}>
          <div
            className="mt-12 grid gap-px"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              background: C.border,
              border: `1px solid ${C.border}`,
            }}
          >
            {tile(
              <button
                className="rounded-sm px-4 py-2"
                style={{ background: C.accent, color: C.black, ...label, fontSize: "0.55rem" }}
              >
                CONFIRM
              </button>,
              "PRIMARY BUTTON",
            )}
            {tile(
              <button
                className="rounded-sm px-4 py-2"
                style={{ ...label, fontSize: "0.55rem", color: C.text, border: `1px solid ${C.text}` }}
              >
                CANCEL
              </button>,
              "GHOST BUTTON",
            )}
            {tile(
              <div className="w-full">
                <div style={{ ...label, fontSize: "0.45rem" }}>EMAIL</div>
                <div className="mt-2 pb-1" style={{ borderBottom: `1px solid ${C.muted}`, color: C.muted, fontSize: "0.75rem", fontFamily: "'DM Mono', monospace" }}>
                  you@nextript.app
                </div>
              </div>,
              "INPUT FIELD",
            )}
            {tile(
              <div className="flex h-6 w-12 items-center rounded-full p-1" style={{ background: C.accent }}>
                <div className="ml-auto h-4 w-4 rounded-full" style={{ background: C.black }} />
              </div>,
              "TOGGLE",
            )}
            {tile(
              <div
                className="flex w-full items-center justify-around rounded-sm py-3"
                style={{ background: C.s3, border: `1px solid ${C.border}` }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 w-1 rounded-full"
                    style={{ background: i === 2 ? C.accent : C.muted, transform: i === 2 ? "scale(2)" : "scale(1.2)" }}
                  />
                ))}
              </div>,
              "BOTTOM NAV",
            )}
            {tile(
              <div className="relative">
                <div className="h-8 w-8 rounded-sm" style={{ background: C.s3, border: `1px solid ${C.border}` }} />
                <div className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full" style={{ background: C.accent, color: C.black, fontSize: "0.5rem", fontFamily: "'DM Mono', monospace" }}>3</div>
              </div>,
              "BADGE",
            )}
            {tile(
              <div className="w-full p-3" style={{ background: C.s3, border: `1px solid ${C.border}` }}>
                <div style={{ ...label, fontSize: "0.45rem" }}>AIR FRANCE · NX 248</div>
                <div className="mt-2 flex items-baseline justify-between" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", color: C.text }}>
                  <span>JFK</span><span>CDG</span>
                </div>
                <div className="mt-1 flex justify-between" style={{ ...label, fontSize: "0.42rem" }}>
                  <span>09:42</span><span>$842</span>
                </div>
              </div>,
              "FLIGHT CARD",
            )}
            {tile(
              <div className="flex w-full justify-around" style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                {["ALL", "UPCOMING", "PAST"].map((t, i) => (
                  <div key={t} className="relative pb-1.5" style={{ ...label, fontSize: "0.5rem", color: i === 0 ? C.text : C.muted }}>
                    {t}
                    {i === 0 && <div className="absolute -bottom-[7px] left-0 right-0 h-px" style={{ background: C.accent }} />}
                  </div>
                ))}
              </div>,
              "TAB BAR",
            )}
            {tile(
              <span
                className="rounded-full px-3 py-1"
                style={{ ...label, fontSize: "0.5rem", color: C.text, background: C.s3, border: `1px solid ${C.border}` }}
              >
                BUSINESS
              </span>,
              "CHIP / TAG",
            )}
            {tile(
              <div className="w-full space-y-2">
                {[100, 70, 50].map((w, i) => (
                  <div key={i} className="h-2 overflow-hidden rounded-sm" style={{ background: C.s3, width: `${w}%` }}>
                    <div className="nx-shimmer h-full w-full" />
                  </div>
                ))}
              </div>,
              "SKELETON",
            )}
          </div>
        </Reveal>
      </div>
      <style>{`
        .nx-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); background-size: 200% 100%; animation: nx-shimmer 1.6s linear infinite; }
        @keyframes nx-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </section>
  );
};

/* ====================== SECTION 8 ====================== */
const Section8Wireframes = () => (
  <section className="px-8 py-32" style={{ background: C.s1 }}>
    <div className="mx-auto max-w-6xl">
      <Reveal><div style={label}>USER FLOWS</div></Reveal>
      <Reveal delay={0.1}>
        <div className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Phone w={120} h={240}><Wireframe variant={i} /></Phone>
              <div className="mt-3" style={{ ...label, fontSize: "0.5rem" }}>STEP · 0{i + 1}</div>
            </div>
          ))}
          {/* Decorative arrows row 1 */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" aria-hidden>
            {[0, 1, 2].map((i) => (
              <g key={`a${i}`}>
                <line
                  x1={`${(i + 1) * 25 - 4}%`} y1="20%" x2={`${(i + 1) * 25 + 4}%`} y2="20%"
                  stroke={C.muted} strokeWidth="1" strokeDasharray="2 3"
                />
              </g>
            ))}
            {[0, 1, 2].map((i) => (
              <line
                key={`b${i}`}
                x1={`${(i + 1) * 25 - 4}%`} y1="72%" x2={`${(i + 1) * 25 + 4}%`} y2="72%"
                stroke={C.muted} strokeWidth="1" strokeDasharray="2 3"
              />
            ))}
          </svg>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ====================== SECTION 9 ====================== */
const Section9Renders = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <section ref={ref} className="relative overflow-hidden px-8 py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,184,154,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-4xl items-center justify-center gap-[-30px]">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ zIndex: 1, marginRight: -40 }}
        >
          <Phone w={260} h={520} shadow><ScreenHome /></Phone>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ zIndex: 2 }}
        >
          <Phone w={260} h={520} shadow><ScreenBoarding /></Phone>
        </motion.div>
      </div>
    </section>
  );
};

/* ====================== SECTION 10 ====================== */
const Section10Closing = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center px-8 py-32 text-center">
    <Reveal><div style={label}>PROJECT COMPLETE</div></Reveal>
    <Reveal delay={0.1}>
      <h2 className="mt-10" style={{ ...display, fontSize: "8vw" }}>Nextript.</h2>
    </Reveal>
    <Reveal delay={0.2}>
      <div className="mt-8" style={{ ...body, color: C.muted }}>
        Designed by Element UX — 2024
      </div>
    </Reveal>
    <div className="mt-20 h-px w-full max-w-5xl" style={{ background: C.border }} />
    <Reveal delay={0.3}>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
        {["FIGMA FILE", "PROTOTYPE", "CONTACT"].map((l) => (
          <a
            key={l}
            href="#"
            className="nx-underline relative"
            style={{ ...label, color: C.text }}
          >
            {l}
          </a>
        ))}
      </div>
    </Reveal>
    <style>{`
      .nx-underline { transition: color 200ms ease-out; }
      .nx-underline::after {
        content: ""; position: absolute; left: 0; right: 0; bottom: -6px;
        height: 1px; background: ${C.accent}; transform: scaleX(0); transform-origin: left;
        transition: transform 200ms ease-out;
      }
      .nx-underline:hover { color: ${C.accent}; }
      .nx-underline:hover::after { transform: scaleX(1); }
    `}</style>
  </section>
);

export default Nextrip;
