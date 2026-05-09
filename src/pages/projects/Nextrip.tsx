import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import heroJet from "@/assets/nextrip/hero-jet-top.png";
import phoneSearch from "@/assets/nextrip/phone-search.png";
import splashTrio from "@/assets/nextrip/splash-trio.jpg";
import phoneMercedes from "@/assets/nextrip/phone-mercedes.png";
import bali from "@/assets/nextrip/bali.jpg";
import clouds from "@/assets/nextrip/clouds.png";
import phonesRow from "@/assets/nextrip/phones-row.jpg";
import { NMark, NWordmark } from "@/components/nextrip/NMark";
import { UserFlowDiagram } from "@/components/nextrip/UserFlowDiagram";

/* =========================================================================
   NEXTRIP — cinematic luxury aviation case study
   ========================================================================= */

const ease = [0.16, 1, 0.3, 1] as const;

const fontDisplay = "'Cormorant Garamond', serif";
const fontMono = "'DM Mono', ui-monospace, monospace";

const label: React.CSSProperties = {
  fontFamily: fontMono,
  textTransform: "uppercase",
  letterSpacing: "0.32em",
  fontSize: "10px",
  color: "rgba(240,237,232,0.45)",
};

const labelXS: React.CSSProperties = {
  ...label,
  fontSize: "8px",
  letterSpacing: "0.45em",
  color: "rgba(240,237,232,0.35)",
};

/* ---------- Reveal ---------- */
const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
}: { children: ReactNode; delay?: number; y?: number; className?: string }) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Cursor ambient glow ---------- */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0, tx = innerWidth/2, ty = innerHeight/2, cx = tx, cy = ty;
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx-360}px, ${cy-360}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[720px] w-[720px] rounded-full mix-blend-screen"
      style={{
        background: "radial-gradient(circle, rgba(220,228,240,0.10), rgba(180,195,220,0.05) 40%, transparent 70%)",
        filter: "blur(60px)",
        willChange: "transform",
      }}
    />
  );
};

/* ---------- Top scroll progress ---------- */
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left"
      style={{
        scaleX: sx,
        background: "linear-gradient(90deg, transparent, rgba(220,228,240,0.95), transparent)",
        boxShadow: "0 0 12px rgba(220,228,240,0.6)",
      }}
    />
  );
};

/* ---------- Atmosphere layers (per section) ---------- */
const Atmos = ({
  variant = "ambient",
}: { variant?: "hero" | "ambient" | "wide" | "stage" }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {variant === "hero" && (
      <>
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(ellipse 55% 70% at 50% 40%, rgba(220,228,240,0.10), transparent 65%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(20,30,50,0.5), transparent 70%)",
        }} />
        <div className="absolute -inset-x-1/4 top-1/3 h-2/3 -rotate-12 opacity-[0.05]" style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          filter: "blur(80px)",
        }} />
      </>
    )}
    {variant === "ambient" && (
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 50% 60% at 18% 30%, rgba(220,228,240,0.07), transparent 65%), radial-gradient(ellipse 50% 60% at 82% 70%, rgba(180,195,220,0.05), transparent 70%)",
      }} />
    )}
    {variant === "stage" && (
      <>
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(ellipse 65% 70% at 50% 45%, rgba(220,228,240,0.12), transparent 65%)",
        }} />
        <div className="absolute inset-0" style={{
          boxShadow:
            "inset 0 200px 200px -120px rgba(0,0,0,0.95), inset 0 -200px 200px -120px rgba(0,0,0,0.95), inset 200px 0 200px -160px rgba(0,0,0,0.9), inset -200px 0 200px -160px rgba(0,0,0,0.9)",
        }} />
      </>
    )}
    {variant === "wide" && (
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(210,220,235,0.06), transparent 70%)",
      }} />
    )}
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }} />
  </div>
);

/* ---------- Bezel divider ---------- */
const Bezel = () => (
  <div aria-hidden className="relative h-16 w-full overflow-hidden md:h-24">
    <svg className="absolute inset-x-0 bottom-0 h-full w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bz-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0f" />
          <stop offset="38%" stopColor="#2a2a32" />
          <stop offset="62%" stopColor="#14141a" />
          <stop offset="100%" stopColor="#040408" />
        </linearGradient>
        <linearGradient id="bz-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.32)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path d="M0,0 L0,40 C240,80 520,80 720,52 C920,30 1200,80 1440,40 L1440,0 Z" fill="url(#bz-fill)" />
      <path d="M0,40 C240,80 520,80 720,52 C920,30 1200,80 1440,40" stroke="url(#bz-shine)" strokeWidth="1" fill="none" />
    </svg>
  </div>
);

/* ---------- Section index header ---------- */
const SectionMark = ({ index, title }: { index: string; title: string }) => (
  <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 pt-14">
    <div className="flex items-center gap-5">
      <span
        className="grid h-9 w-9 place-items-center rounded-full border text-[10px]"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          color: "rgba(240,237,232,0.75)",
          fontFamily: fontMono,
          letterSpacing: "0.1em",
        }}
      >
        {index}
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-40">
        <path d="M2 16l20-7-9 13-2-6-9 0z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="hidden h-px w-32 bg-gradient-to-r from-white/15 to-transparent md:block" />
    </div>
    <div className="flex items-center gap-5">
      <span style={label}>{title}</span>
      <span style={{ ...labelXS, color: "rgba(255,255,255,0.2)" }}>• • •</span>
    </div>
  </div>
);

/* ---------- Glass card ---------- */
const Glass = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div
    className={`relative rounded-2xl backdrop-blur-2xl ${className}`}
    style={{
      background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
      border: "1px solid rgba(255,255,255,0.06)",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5), 0 50px 100px -40px rgba(0,0,0,0.95), 0 0 120px -40px rgba(220,228,240,0.10)",
      ...style,
    }}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
      style={{
        background: "radial-gradient(ellipse 70% 50% at 25% 0%, rgba(255,255,255,0.07), transparent 65%)",
      }}
    />
    <div className="relative">{children}</div>
  </div>
);

/* ---------- Device wrap with glow + floor pool ---------- */
const Device = ({ children, className = "", float = true }: { children: ReactNode; className?: string; float?: boolean }) => (
  <div className={`relative inline-block ${className}`}>
    <div
      aria-hidden
      className="pointer-events-none absolute inset-[-30%]"
      style={{
        background: "radial-gradient(ellipse 50% 55% at 50% 50%, rgba(230,236,248,0.16), transparent 65%)",
        filter: "blur(50px)",
      }}
    />
    <motion.div
      animate={float ? { y: [-6, 6, -6] } : {}}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      {children}
    </motion.div>
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-full -mt-10 h-[120px] w-[80%] -translate-x-1/2"
      style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,0,0,0.95), transparent 70%)",
        filter: "blur(28px)",
      }}
    />
  </div>
);

/* ---------- Ghost wordmark ---------- */
const Ghost = ({
  children,
  align = "center",
  className = "",
}: { children: string; align?: "left" | "center" | "right"; className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-x-0 select-none text-${align} ${className}`}
    style={{
      fontFamily: fontDisplay,
      fontWeight: 400,
      fontSize: "clamp(6rem, 18vw, 18rem)",
      lineHeight: 0.82,
      letterSpacing: "-0.04em",
      background: "linear-gradient(180deg, rgba(244,244,245,0.08) 0%, rgba(120,120,130,0.05) 50%, rgba(244,244,245,0.08) 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      paddingLeft: align === "left" ? "5%" : 0,
      paddingRight: align === "right" ? "5%" : 0,
    }}
  >
    {children}
  </div>
);

/* ---------- Hairline ---------- */
const Hairline = ({ className = "" }: { className?: string }) => (
  <div className={`h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`} />
);

/* ---------- Section index rail (right) ---------- */
const RAIL = [
  { id: "hero", label: "Hero" },
  { id: "overview", label: "Overview" },
  { id: "identity", label: "Identity" },
  { id: "splash", label: "Splash" },
  { id: "concept", label: "Concept" },
  { id: "userflow", label: "Userflow" },
  { id: "tour", label: "Tour" },
  { id: "profile", label: "Profile" },
  { id: "showcase", label: "Showcase" },
];
const SectionRail = () => {
  const [active, setActive] = (require as any) ? useStateActive() : [0, () => {}];
  return (
    <nav className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col items-end gap-3.5">
        {RAIL.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.id} className="pointer-events-auto">
              <a href={`#${it.id}`} className="flex items-center gap-3" style={{ color: on ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)" }}>
                <span
                  style={{ ...labelXS, color: "inherit", opacity: on ? 1 : 0, transform: on ? "translateX(0)" : "translateX(8px)", transition: "all .5s" }}
                >
                  {it.label}
                </span>
                <span
                  className="block h-px transition-all duration-500"
                  style={{
                    width: on ? 32 : 14,
                    background: on ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                    boxShadow: on ? "0 0 8px rgba(220,228,240,0.5)" : "none",
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
function useStateActive(): [number, (n: number) => void] {
  const { useState, useEffect } = require("react") as typeof import("react");
  const [a, s] = useState(0);
  useEffect(() => {
    const els = RAIL.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (e.isIntersecting) {
          const idx = els.indexOf(e.target as HTMLElement);
          if (idx >= 0) s(idx);
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return [a, s];
}

/* =========================================================================
   PAGE
   ========================================================================= */

const Nextrip = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -60]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{ background: "#040408" }}
    >
      {/* fixed atmospheric backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(40,55,90,0.22), transparent 65%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(30,40,70,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <ScrollBar />
      <CursorGlow />
      <SectionRail />

      {/* nav */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md" style={{ background: "linear-gradient(180deg, rgba(4,4,8,0.85), transparent)" }}>
        <Link to="/" style={{ ...label, color: "rgba(240,237,232,0.7)" }}>← Index</Link>
        <NWordmark />
        <div className="flex items-center gap-8">
          <a href="#showcase" style={label}>Work</a>
          <span style={{ ...labelXS, color: "rgba(255,255,255,0.25)" }}>© 2024</span>
        </div>
      </nav>

      <main className="relative z-10">

        {/* ============================== 01 HERO ============================== */}
        <section id="hero" className="relative overflow-hidden px-6 pt-32 pb-40 md:pb-56 lg:pb-72">
          <Atmos variant="hero" />

          {/* faint horizon */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[60%] h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }} />
          {/* central vertical guide */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
          }} />

          <div className="relative mx-auto max-w-7xl">
            {/* metadata strip */}
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div style={labelXS}>Name</div>
                  <div className="mt-2" style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "1rem", color: "rgba(240,237,232,0.95)", letterSpacing: "0.02em" }}>
                    NexTrip
                  </div>
                </div>
                <NWordmark className="hidden md:flex" />
                <div className="flex items-start gap-12">
                  <div>
                    <div style={labelXS}>Type</div>
                    <div className="mt-2" style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.02em" }}>Travel Platform</div>
                  </div>
                  <div>
                    <div style={labelXS}>Year</div>
                    <div className="mt-2" style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.02em" }}>2024</div>
                  </div>
                  <span className="grid h-7 w-7 place-items-center rounded-full border" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>©</span>
                </div>
              </div>
            </Reveal>

            {/* aircraft stage */}
            <div className="relative mt-32 flex min-h-[78vh] items-center justify-center">
              <Ghost align="center" className="top-1/2 -translate-y-1/2">nextrip</Ghost>

              {/* concentric atmospheric rings */}
              {[
                { s: "min(820px, 90vw)", op: 0.04 },
                { s: "min(540px, 60vw)", op: 0.05 },
                { s: "min(320px, 36vw)", op: 0.07 },
              ].map((r, i) => (
                <div key={i} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ width: r.s, height: r.s, border: `1px solid rgba(255,255,255,${r.op})` }}
                />
              ))}

              {/* tiny aircraft top marker */}
              <div className="absolute left-1/2 top-[6%] -translate-x-1/2 opacity-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M2 16l20-7-9 13-2-6-9 0z" stroke="currentColor" strokeWidth="1.2"/></svg>
              </div>

              <motion.div style={{ y: heroY }} className="relative z-10">
                <Device>
                  <img
                    src={heroJet}
                    alt="NexTrip aircraft"
                    width={620}
                    height={620}
                    className="relative mx-auto h-auto w-[clamp(280px,44vw,640px)]"
                    style={{
                      filter:
                        "drop-shadow(0 30px 50px rgba(0,0,0,0.9)) drop-shadow(0 80px 140px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(220,232,250,0.20))",
                    }}
                  />
                </Device>
              </motion.div>

              {/* N badge counterweight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease }}
                className="absolute right-[8%] top-[64%] hidden md:block"
              >
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl backdrop-blur-md"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 30px 50px -20px rgba(0,0,0,0.9), 0 0 50px -10px rgba(220,228,240,0.18)",
                  }}
                >
                  <NMark size={32} />
                </div>
              </motion.div>

              {/* corner coordinates */}
              <div className="absolute left-0 top-[10%] hidden md:block" style={labelXS}>
                <div>N 40°42′</div>
                <div className="mt-1" style={{ ...labelXS, color: "rgba(255,255,255,0.18)" }}>Altitude · 38,000 ft</div>
              </div>
              <div className="absolute bottom-[8%] right-0 hidden text-right md:block" style={labelXS}>
                <div>Mach 0.85</div>
                <div className="mt-1" style={{ ...labelXS, color: "rgba(255,255,255,0.18)" }}>Heading · 270°W</div>
              </div>
            </div>

            {/* footer rail */}
            <div className="mt-20 flex items-center justify-between">
              <span style={labelXS}>40°42′46″N — 74°00′21″W</span>
              <Hairline className="mx-8 hidden flex-1 md:block" />
              <span style={labelXS}>Est. 2024</span>
              <Hairline className="mx-8 hidden flex-1 md:block" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} style={labelXS}>↓ Scroll</motion.span>
            </div>
          </div>
        </section>

        {/* ============================== 02 OVERVIEW ============================== */}
        <section id="overview" className="relative">
          <Bezel />
          <SectionMark index="01" title="Overview" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="ambient" />

            <div className="relative grid gap-x-10 gap-y-20 lg:grid-cols-12">
              {/* L: editorial copy */}
              <div className="lg:col-span-5 lg:pt-6">
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="h-px w-12" style={{ background: "rgba(255,255,255,0.3)" }} />
                    <span style={labelXS}>Application · 01</span>
                  </div>
                  <div className="mt-10"><NWordmark /></div>
                  <p className="mt-12" style={{ ...labelXS, lineHeight: 1.9, color: "rgba(255,255,255,0.5)", maxWidth: "32ch" }}>
                    An intelligent travel platform<br />composed for the modern traveler.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="mt-24">
                    <div style={labelXS}>Main Task</div>
                    <p className="mt-8" style={{
                      fontFamily: fontDisplay, fontWeight: 400, fontSize: "1.5rem",
                      lineHeight: 1.45, color: "rgba(240,237,232,0.92)", letterSpacing: "-0.005em", maxWidth: "30ch",
                    }}>
                      Millions of travelers face scattered options and complex planning. NexTrip composes everything into one{" "}
                      <em style={{ fontStyle: "italic", color: "rgba(255,255,255,1)" }}>seamless experience</em>.
                    </p>
                    <Hairline className="mt-10 max-w-[14rem]" />
                  </div>
                </Reveal>
              </div>

              {/* C: vertical seam */}
              <div className="relative hidden lg:col-span-2 lg:block">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.10), transparent)" }} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap" style={{ ...labelXS, color: "rgba(255,255,255,0.22)" }}>
                  Composed · Considered · Calm
                </div>
              </div>

              {/* R: pull-quote + phone */}
              <div className="relative lg:col-span-5">
                <Reveal delay={0.15}>
                  <div className="lg:max-w-[28ch]">
                    <div style={labelXS}>About</div>
                    <p className="mt-6" style={{
                      fontFamily: fontDisplay, fontWeight: 400, fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                      lineHeight: 1.18, letterSpacing: "-0.015em", color: "rgba(255,255,255,0.96)",
                    }}>
                      NexTrip redefines the way people discover, plan, and{" "}
                      <em style={{ fontStyle: "italic" }}>experience</em>{" "}
                      the world.
                    </p>
                    <Hairline className="mt-8 max-w-[6rem]" />
                    <p className="mt-6" style={{ ...labelXS, lineHeight: 1.9, color: "rgba(255,255,255,0.4)", maxWidth: "32ch" }}>
                      Cutting-edge technology · human insight · journeys that matter.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.3} y={40}>
                  <div className="relative mt-20 flex justify-center lg:justify-end lg:translate-x-[6%]">
                    <Device>
                      <img
                        src={phoneSearch}
                        alt="NexTrip search"
                        loading="lazy"
                        width={420}
                        height={840}
                        className="relative h-auto w-[clamp(220px,28vw,400px)]"
                        style={{
                          filter:
                            "drop-shadow(0 30px 50px rgba(0,0,0,0.9)) drop-shadow(0 80px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 60px rgba(220,232,250,0.16))",
                        }}
                      />
                    </Device>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ============================== 03 IDENTITY ============================== */}
        <section id="identity" className="relative">
          <Bezel />
          <SectionMark index="02" title="Identity" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="ambient" />

            <Reveal>
              <div className="mb-16 max-w-2xl">
                <p style={{
                  fontFamily: fontDisplay, fontWeight: 400, fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                  lineHeight: 1.2, letterSpacing: "-0.015em",
                }}>
                  A system <em style={{ fontStyle: "italic" }}>built for the traveler</em> — sculpted in graphite, lit in silver.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {/* Card 1: Mark / Aircraft */}
              <Reveal delay={0.05}>
                <Glass className="flex aspect-[3/4] flex-col p-8">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6" style={{ background: "rgba(255,255,255,0.3)" }} />
                    <span style={labelXS}>Identity · 01</span>
                  </div>
                  <div className="relative my-auto flex justify-center">
                    <div aria-hidden className="pointer-events-none absolute inset-0" style={{
                      background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,236,248,0.12), transparent 65%)",
                      filter: "blur(30px)",
                    }} />
                    <img src={heroJet} alt="" loading="lazy" width={300} height={300} className="relative h-auto w-3/4"
                      style={{ filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(220,232,250,0.14))" }}
                    />
                  </div>
                  <div>
                    <Hairline className="mb-5 max-w-[5rem]" />
                    <div className="flex items-end justify-between">
                      <NWordmark />
                      <span style={labelXS}>Aircraft · A330</span>
                    </div>
                  </div>
                </Glass>
              </Reveal>
              {/* Card 2: N Mark */}
              <Reveal delay={0.15}>
                <Glass className="flex aspect-[3/4] flex-col p-8">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6" style={{ background: "rgba(255,255,255,0.3)" }} />
                    <span style={labelXS}>Mark · 02</span>
                  </div>
                  <div className="relative my-auto flex flex-col items-center justify-center">
                    <div aria-hidden className="pointer-events-none absolute h-[280px] w-[280px] rounded-full" style={{
                      background: "radial-gradient(circle, rgba(235,242,255,0.16), transparent 60%)",
                      filter: "blur(28px)",
                    }} />
                    <NMark size={200} className="relative drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]" />
                  </div>
                  <div>
                    <Hairline className="mb-5 max-w-[5rem]" />
                    <div className="flex items-center justify-between">
                      <span style={labelXS}>Scale</span>
                      <div className="flex items-end gap-2 opacity-60">
                        <NMark size={12} /><NMark size={16} /><NMark size={20} /><NMark size={24} />
                      </div>
                    </div>
                  </div>
                </Glass>
              </Reveal>

              {/* Card 3: Palette + Type stacked */}
              <div className="flex aspect-[3/4] flex-col gap-8">
                <Reveal delay={0.25}>
                  <Glass className="p-7">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-6" style={{ background: "rgba(255,255,255,0.3)" }} />
                      <span style={labelXS}>Palette · 03</span>
                    </div>
                    <div className="mt-6 flex h-14 gap-1.5 overflow-hidden rounded-md">
                      {["#040408", "#191921", "#3a3a44", "#9a9aa3", "#e5e5ea"].map((c) => (
                        <div key={c} className="flex-1" style={{
                          background: c,
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
                        }} />
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between" style={{ ...labelXS, fontSize: "7px", letterSpacing: "0.3em" }}>
                      <span>040408</span><span>191921</span><span>3A3A44</span><span>9A9AA3</span><span>E5E5EA</span>
                    </div>
                  </Glass>
                </Reveal>
                <Reveal delay={0.35}>
                  <Glass className="flex-1 p-7">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-6" style={{ background: "rgba(255,255,255,0.3)" }} />
                      <span style={labelXS}>Typography · 04</span>
                    </div>
                    <div className="mt-5 flex items-end gap-7">
                      <div style={{
                        fontFamily: fontDisplay, fontWeight: 400, lineHeight: 1,
                        fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "rgba(255,255,255,0.96)",
                        textShadow: "0 0 40px rgba(220,232,250,0.18)",
                      }}>
                        Aa
                      </div>
                      <div className="pb-2">
                        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.95)" }}>Cormorant</div>
                        <div className="mt-1" style={{ ...labelXS, fontFamily: fontMono }}>+ DM Mono</div>
                      </div>
                    </div>
                  </Glass>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ============================== 04 SPLASH ============================== */}
        <section id="splash" className="relative">
          <Bezel />
          <SectionMark index="03" title="Splash Screens" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="stage" />
            <Ghost align="left" className="top-1/2 -translate-y-1/2">NEXTRIP</Ghost>

            <div className="relative mb-20 flex items-end justify-between">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10" style={{ background: "rgba(255,255,255,0.3)" }} />
                  <span style={labelXS}>Splash · 03</span>
                </div>
                <p className="mt-6" style={{ ...labelXS, lineHeight: 1.9, maxWidth: "30ch" }}>
                  Three frames · one identity<br />unfolding in motion.
                </p>
              </Reveal>
              <div className="hidden text-right md:block" style={labelXS}>
                <div>Render · 1×</div>
                <div className="mt-1" style={{ ...labelXS, color: "rgba(255,255,255,0.18)" }}>Studio Light · Cool</div>
              </div>
            </div>

            <Reveal delay={0.15} y={40}>
              <div className="relative">
                {/* concentric stage */}
                {[
                  { s: "min(900px, 95%)", op: 0.04 },
                  { s: "min(600px, 70%)", op: 0.05 },
                ].map((r, i) => (
                  <div key={i} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ width: r.s, height: r.s, border: `1px solid rgba(255,255,255,${r.op})` }} />
                ))}
                <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[85%] -translate-x-1/2 -translate-y-1/2" style={{
                  background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(230,236,248,0.20), transparent 65%)",
                  filter: "blur(60px)",
                }} />
                <Device float={false}>
                  <img
                    src={splashTrio}
                    alt="Splash screens"
                    loading="lazy"
                    width={1600}
                    height={1100}
                    className="relative mx-auto h-auto w-full max-w-5xl"
                    style={{
                      filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.85)) drop-shadow(0 80px 140px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(220,232,250,0.18))",
                    }}
                  />
                </Device>
              </div>
            </Reveal>

            <div className="relative mt-24 flex items-center justify-between">
              <span style={labelXS}>Frame 01 · Welcome</span>
              <Hairline className="mx-8 hidden flex-1 md:block" />
              <span style={labelXS}>Frame 02 · Brand</span>
              <Hairline className="mx-8 hidden flex-1 md:block" />
              <span style={labelXS}>Frame 03 · Enter</span>
            </div>
          </div>
        </section>

        {/* ============================== 05 CONCEPT (cloud spread) ============================== */}
        <section id="concept" className="relative">
          <Bezel />
          <SectionMark index="04" title="Concept" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="wide" />
            <img src={clouds} alt="" loading="lazy" width={1920} height={800}
              className="pointer-events-none absolute -left-10 top-10 h-auto w-1/2 opacity-40 mix-blend-screen" />
            <img src={clouds} alt="" loading="lazy" width={1920} height={800}
              className="pointer-events-none absolute -right-10 bottom-10 h-auto w-1/2 -scale-x-100 opacity-30 mix-blend-screen" />

            <Reveal>
              <div className="relative mx-auto max-w-3xl text-center">
                <div style={labelXS}>Concept</div>
                <h3 className="mt-8" style={{
                  fontFamily: fontDisplay, fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                  lineHeight: 1.18, letterSpacing: "-0.015em", color: "rgba(255,255,255,0.96)",
                }}>
                  Simplified and personalized — composed for the highest degree of <em style={{ fontStyle: "italic" }}>comfort</em>.
                </h3>
                <Hairline className="mx-auto mt-10 max-w-[120px]" />
                <p className="mx-auto mt-8 max-w-md" style={{ ...labelXS, lineHeight: 1.9, fontSize: "11px" }}>
                  Researched against the leading applications in the industry — every shortcoming refined into the smallest, calmest gesture.
                </p>
                <div className="mt-12 flex justify-center"><NWordmark /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== 06 USERFLOW ============================== */}
        <section id="userflow" className="relative">
          <Bezel />
          <SectionMark index="05" title="Userflow" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="ambient" />
            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-3">
                <div style={labelXS}>MVP</div>
                <ul className="mt-5 space-y-2.5" style={{ fontFamily: fontMono, fontSize: "12px", color: "rgba(255,255,255,0.78)", letterSpacing: "0.05em" }}>
                  <li>— Business flow</li>
                  <li>— Traveler flow</li>
                </ul>
                <Hairline className="my-8" />
                <div style={labelXS}>Coming</div>
                <ul className="mt-5 space-y-2.5" style={{ fontFamily: fontMono, fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
                  <li>— Tours</li>
                  <li>— Hotel reservations</li>
                  <li>— Car reservations</li>
                  <li>— Concierge</li>
                  <li>— Integrations</li>
                </ul>
              </Reveal>
              <Reveal delay={0.15} className="lg:col-span-6">
                <UserFlowDiagram />
              </Reveal>
              <Reveal delay={0.25} className="lg:col-span-3">
                <div style={labelXS}>Architecture</div>
                <p className="mt-6" style={{
                  fontFamily: fontDisplay, fontStyle: "italic", fontSize: "1.4rem", lineHeight: 1.35,
                  color: "rgba(255,255,255,0.92)", letterSpacing: "-0.005em", maxWidth: "26ch",
                }}>
                  The initial development phase — a logic of interaction.
                </p>
                <Hairline className="my-8" />
                <p style={{ fontFamily: fontMono, fontSize: "11px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", maxWidth: "32ch" }}>
                  Connection between screens, providing the development team a clear map of overall functionality before any interface element is designed.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== 07 TRAVELER + MERCEDES ============================== */}
        <section className="relative">
          <Bezel />
          <SectionMark index="06" title="Traveler" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="ambient" />
            <div className="relative grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-24">
              <Reveal className="lg:col-span-5 lg:pl-4">
                <div style={labelXS}>Userflow</div>
                <h3 className="mt-6" style={{
                  fontFamily: fontDisplay, fontWeight: 400, fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  lineHeight: 1.2, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.96)",
                }}>
                  Traveler version — extensive functionality, exceptional <em style={{ fontStyle: "italic" }}>deals</em>.
                </h3>
                <Hairline className="my-8 max-w-[120px]" />
                <p style={{ fontFamily: fontMono, fontSize: "12px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", maxWidth: "40ch" }}>
                  Choosing a travel option becomes effortless — curated rides, transparent pricing, and a flow that respects the user's time.
                </p>
              </Reveal>
              <Reveal delay={0.2} y={40} className="lg:col-span-7">
                <Device>
                  <img
                    src={phoneMercedes}
                    alt="Mercedes booking"
                    loading="lazy"
                    width={900}
                    height={1400}
                    className="mx-auto h-auto w-[clamp(260px,38vw,520px)] -rotate-3 transition-transform duration-[900ms] hover:rotate-0"
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      filter: "drop-shadow(0 80px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(220,232,250,0.14))",
                    }}
                  />
                </Device>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== 08 BALI TOUR ============================== */}
        <section id="tour" className="relative">
          <Bezel />
          <SectionMark index="07" title="Tour Screen" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="ambient" />
            <div className="relative grid gap-12 md:grid-cols-[1fr_1.7fr_0.9fr] md:items-center md:gap-16">
              <Reveal>
                <div style={labelXS}>Destination</div>
                <h4 className="mt-5" style={{
                  fontFamily: fontDisplay, fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  lineHeight: 1.05, letterSpacing: "-0.02em",
                }}>
                  Bali —<br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>Indonesia</em>
                </h4>
                <Hairline className="my-7 max-w-[80px]" />
                <div className="flex items-center gap-3" style={{ ...labelXS, color: "rgba(255,255,255,0.65)", letterSpacing: "0.2em", fontSize: "10px" }}>
                  <span style={{ color: "rgba(255,255,255,0.85)" }}>★ ★ ★ ★ ☆</span>
                  <span>2,450 Reviews</span>
                </div>
              </Reveal>

              <Reveal delay={0.15} y={36}>
                <div className="relative overflow-hidden rounded-xl">
                  <img src={bali} alt="Bali" loading="lazy" width={1280} height={800}
                    className="h-80 w-full object-cover opacity-95 md:h-96" />
                  <div className="pointer-events-none absolute inset-0" style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 55%, rgba(4,4,8,0.92) 100%)",
                  }} />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
                    <span style={{ ...labelXS, color: "rgba(255,255,255,0.7)" }}>08°40′S · 115°12′E</span>
                    <span style={{ ...labelXS, color: "rgba(255,255,255,0.7)" }}>Tour · 07</span>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div style={labelXS}>
                      <div style={{ ...labelXS, color: "rgba(255,255,255,0.65)" }}>Curated · 7 Days</div>
                      <div className="mt-1" style={{ ...labelXS, color: "rgba(255,255,255,0.4)" }}>From $699 / Person</div>
                    </div>
                    <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.4)" }} />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <Glass className="p-6">
                  <div className="mb-3" style={{ ...labelXS, fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)" }}>★ ★ ★ ★ ★</div>
                  <p style={{ fontFamily: fontDisplay, fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.55, color: "rgba(255,255,255,0.88)" }}>
                    "An unforgettable trip — Bali is absolutely beautiful. Highly recommend NexTrip for such amazing experiences."
                  </p>
                  <Hairline className="my-5" />
                  <div className="flex items-center gap-3" style={{ ...labelXS, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
                    <div className="h-7 w-7 rounded-full" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))", border: "1px solid rgba(255,255,255,0.08)" }} />
                    Sophia Martinez · 12.06.2024
                  </div>
                </Glass>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== 09 PROFILE ============================== */}
        <section id="profile" className="relative">
          <Bezel />
          <SectionMark index="08" title="Profile" />
          <div className="relative mx-auto max-w-7xl px-8 py-32 md:py-48">
            <Atmos variant="ambient" />
            <div className="relative grid gap-12 md:grid-cols-3 md:items-center md:gap-16">
              <Reveal>
                <div style={labelXS}>About</div>
                <p className="mt-6" style={{
                  fontFamily: fontDisplay, fontWeight: 400, fontStyle: "italic", fontSize: "1.4rem",
                  lineHeight: 1.4, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.005em", maxWidth: "30ch",
                }}>
                  A personal profile equipped with statistics, settings, and quiet reminders.
                </p>
                <Hairline className="my-8 max-w-[80px]" />
                <div className="space-y-3" style={{ ...labelXS, fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)" }}>
                  {[
                    ["Beginner", "rgba(255,255,255,0.55)"],
                    ["Traveler", "rgba(180,200,255,0.85)"],
                    ["Businessman", "rgba(220,200,255,0.85)"],
                  ].map(([n, c]) => (
                    <div key={n} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
                      <span>{n}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15} y={36}>
                <Glass className="mx-auto w-full max-w-xs p-6">
                  <div className="flex items-center justify-between" style={{ ...labelXS, fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>
                    <span>≡</span>
                    <NWordmark />
                    <span>✎</span>
                  </div>
                  <div className="mt-7 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full" style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04))",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 20px rgba(0,0,0,0.6)",
                    }} />
                    <div className="mt-4" style={{ fontFamily: fontDisplay, fontSize: "1.1rem", letterSpacing: "0.02em" }}>Daniel Jackson</div>
                    <div className="mt-2 inline-block rounded border px-2.5 py-1" style={{ ...labelXS, fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.18)" }}>Traveler</div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    {[["Flights","5"],["In air","32h"],["Flow","2k km"]].map(([l,v]) => (
                      <div key={l} className="rounded-md py-3" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={labelXS}>{l}</div>
                        <div className="mt-1.5" style={{ fontFamily: fontDisplay, fontSize: "1rem", color: "rgba(255,255,255,0.92)" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-md p-3" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={labelXS}>Upcoming flight</div>
                    <div className="mt-2 flex justify-between" style={{ fontFamily: fontMono, fontSize: "10px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.78)" }}>
                      <span>24 May</span><span>12:30 — 18:00</span><span style={{ color: "rgba(255,255,255,0.95)" }}>UA114</span>
                    </div>
                  </div>
                </Glass>
              </Reveal>

              <Reveal delay={0.3}>
                <p style={{ fontFamily: fontMono, fontSize: "12px", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", maxWidth: "32ch" }}>
                  Hours and distances accumulated, quietly. Brag about them with friends — or measure yourself against the journey.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== 10 SHOWCASE ============================== */}
        <section id="showcase" className="relative">
          <Bezel />
          <div className="mx-auto flex max-w-7xl items-end justify-between px-8 pt-20 pb-12 md:pt-28">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10" style={{ background: "rgba(255,255,255,0.3)" }} />
                <span style={labelXS}>Showcase · 09</span>
              </div>
              <h3 className="mt-6 max-w-[22ch]" style={{
                fontFamily: fontDisplay, fontWeight: 400, fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
              }}>
                A complete <em style={{ fontStyle: "italic" }}>ecosystem</em>, staged as one continuous frame.
              </h3>
            </Reveal>
            <div className="hidden text-right md:block" style={labelXS}>
              <div>Final Cut · 04</div>
              <div className="mt-1" style={{ ...labelXS, color: "rgba(255,255,255,0.18)" }}>Studio Light · Cool</div>
            </div>
          </div>
          <div className="relative">
            <Atmos variant="wide" />
            <Reveal y={40}>
              <img
                src={phonesRow}
                alt="NexTrip product showcase"
                loading="lazy"
                width={1920}
                height={1080}
                className="h-auto w-full"
                style={{ filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(220,232,250,0.10))" }}
              />
            </Reveal>
            <div className="pointer-events-none absolute inset-0" style={{
              background: "linear-gradient(180deg, rgba(4,4,8,0.7), transparent 25%, transparent 75%, rgba(4,4,8,0.95))",
            }} />
            <div className="pointer-events-none absolute inset-0" style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(4,4,8,0.7) 100%)",
            }} />
          </div>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 pb-24 pt-10 md:pb-32">
            <span style={labelXS}>End · NexTrip</span>
            <Hairline className="mx-8 hidden flex-1 md:block" />
            <span style={labelXS}>Designed · Composed · Delivered</span>
            <Hairline className="mx-8 hidden flex-1 md:block" />
            <span style={labelXS}>© 2024</span>
          </div>
        </section>

        {/* ============================== closing ============================== */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-8 py-24 text-center">
          <Atmos variant="hero" />
          <div className="relative">
            <Reveal>
              <div style={labelXS}>Project Complete</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-10" style={{
                fontFamily: fontDisplay, fontWeight: 700, fontSize: "clamp(4rem, 12vw, 12rem)",
                lineHeight: 0.92, letterSpacing: "-0.04em",
                background: "linear-gradient(180deg, #f5f5f7 0%, #d4d4d8 30%, #71717a 60%, #f4f4f5 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              }}>
                NexTrip
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8" style={{ ...labelXS, color: "rgba(255,255,255,0.45)" }}>
                Designed by Element UX · 2024
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <Hairline className="mx-auto mt-16 max-w-3xl" />
              <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
                {["Figma File", "Prototype", "Contact"].map(l => (
                  <a key={l} href="#" className="group relative" style={{ ...labelXS, fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.4em" }}>
                    {l.toUpperCase()}
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: "rgba(220,232,250,0.9)" }} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Nextrip;
