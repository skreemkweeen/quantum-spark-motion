import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CinematicProjectFooter } from "@/components/footer/CinematicProjectFooter";
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
   NEXTRIP — CINEMATIC CASE STUDY
   ========================================================================= */

const ease = [0.16, 1, 0.3, 1] as const;

const fontDisplay = "'Cormorant Garamond', serif";
const fontMono = "'DM Mono', monospace";

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
  letterSpacing: "0.42em",
  color: "rgba(240,237,232,0.32)",
};

/* =========================================================================
   REVEAL
   ========================================================================= */

function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        filter: "blur(8px)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 1.2,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   ATMOSPHERE
   ========================================================================= */

function Atmos({ variant = "ambient" }: { variant?: "hero" | "ambient" | "wide" | "stage" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "hero"
              ? `
              radial-gradient(circle at 50% 35%, rgba(220,228,240,0.14), transparent 35%),
              radial-gradient(circle at 50% 100%, rgba(40,55,90,0.30), transparent 60%)
            `
              : `
              radial-gradient(circle at 20% 30%, rgba(220,228,240,0.06), transparent 35%),
              radial-gradient(circle at 80% 70%, rgba(180,195,220,0.05), transparent 40%)
            `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
}

/* =========================================================================
   SECTION RAIL
   ========================================================================= */

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

function SectionRail() {
  return (
    <nav className="pointer-events-none fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col items-end gap-4">
        {RAIL.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="group pointer-events-auto flex items-center gap-3">
              <span
                className="translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                style={labelXS}
              >
                {item.label}
              </span>

              <span
                className="block h-px w-4 transition-all duration-500 group-hover:w-8"
                style={{
                  background: "rgba(255,255,255,0.25)",
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* =========================================================================
   GLASS
   ========================================================================= */

function Glass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl ${className}`}
      style={{
        boxShadow: "0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}

/* =========================================================================
   DEVICE
   ========================================================================= */

function Device({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        aria-hidden
        className="absolute inset-[-20%]"
        style={{
          background: "radial-gradient(circle, rgba(220,228,240,0.14), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* =========================================================================
   PAGE
   ========================================================================= */

export default function Nextrip() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  return (
    <main
      className="relative overflow-x-hidden bg-[#040408] text-white"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* BACKDROP */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(40,55,90,0.22), transparent 40%),
            radial-gradient(circle at 50% 100%, rgba(20,30,60,0.18), transparent 50%)
          `,
        }}
      />

      {/* PROGRESS */}
      <motion.div
        className="fixed left-0 top-0 z-[100] h-px origin-left"
        style={{
          scaleX,
          width: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
        }}
      />

      <SectionRail />

      {/* NAV */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-6"
        style={{
          background: "linear-gradient(180deg, rgba(4,4,8,0.9), transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link to="/" style={label}>
          ← Index
        </Link>

        <NWordmark />

        <div className="flex items-center gap-8">
          <a href="#showcase" style={label}>
            Work
          </a>

          <span style={labelXS}>© 2024</span>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-8 pt-32">
        <Atmos variant="hero" />

        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <div style={labelXS}>Name</div>
                <div
                  className="mt-2"
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: "1rem",
                  }}
                >
                  NexTrip
                </div>
              </div>

              <div className="hidden md:block">
                <NWordmark />
              </div>

              <div className="text-right">
                <div style={labelXS}>Type</div>

                <div
                  className="mt-2"
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: "1rem",
                  }}
                >
                  Travel Platform
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative mt-32 flex min-h-[70vh] items-center justify-center">
            <div aria-hidden className="absolute text-[18vw] font-black uppercase tracking-[-0.08em] text-white/[0.03]">
              nextrip
            </div>

            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.2}>
                <Device>
                  <img
                    src={heroJet}
                    alt="NexTrip Aircraft"
                    className="relative z-10 w-[42vw] min-w-[320px]"
                    style={{
                      filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(220,228,240,0.14))",
                    }}
                  />
                </Device>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="relative mx-auto max-w-7xl px-8 py-40">
        <Atmos />

        <div className="grid gap-20 lg:grid-cols-2">
          <Reveal>
            <div>
              <div style={labelXS}>Overview</div>

              <h2
                className="mt-10 max-w-lg"
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "clamp(2rem,4vw,4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                A luxury travel operating system designed for modern movement.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <Device>
                <img
                  src={phoneSearch}
                  alt="Search"
                  className="w-[380px]"
                  style={{
                    filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.95))",
                  }}
                />
              </Device>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPLASH */}
      <section id="splash" className="relative px-8 py-40">
        <Atmos variant="stage" />

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-20 flex items-end justify-between">
              <div>
                <div style={labelXS}>Splash Screens</div>

                <h2
                  className="mt-6"
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: "clamp(2rem,4vw,4rem)",
                    lineHeight: 1,
                  }}
                >
                  One identity unfolding in motion.
                </h2>
              </div>

              <div className="hidden md:block text-right">
                <div style={labelXS}>Studio Light · Cool</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative flex justify-center">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 60%)",
                  filter: "blur(80px)",
                }}
              />

              <Device>
                <img
                  src={splashTrio}
                  alt="Splash Screens"
                  className="relative z-10 w-full max-w-6xl"
                  style={{
                    filter: "drop-shadow(0 80px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(220,228,240,0.12))",
                  }}
                />
              </Device>
            </div>
          </Reveal>
        </div>
      </section>

      {/* USERFLOW */}
      <section id="userflow" className="relative mx-auto max-w-7xl px-8 py-40">
        <Atmos />

        <div className="grid gap-20 lg:grid-cols-2">
          <Reveal>
            <div>
              <div style={labelXS}>Architecture</div>

              <h2
                className="mt-8"
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "clamp(2rem,3vw,3rem)",
                  lineHeight: 1.1,
                }}
              >
                A seamless flow engineered around the traveler.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <UserFlowDiagram />
          </Reveal>
        </div>
      </section>

      {/* DESTINATION */}
      <section id="tour" className="relative px-8 py-40">
        <Atmos />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.5fr_0.8fr]">
          <Reveal>
            <div>
              <div style={labelXS}>Destination</div>

              <h2
                className="mt-8"
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "clamp(2rem,3vw,3rem)",
                  lineHeight: 1,
                }}
              >
                Bali —<span className="block text-white/40">Indonesia</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Glass className="overflow-hidden">
              <img src={bali} alt="Bali" className="h-full w-full object-cover" />
            </Glass>
          </Reveal>

          <Reveal delay={0.3}>
            <Glass className="p-8">
              <p
                style={{
                  fontFamily: fontDisplay,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                “An unforgettable luxury experience — calm, seamless, and beautifully curated.”
              </p>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="showcase" className="relative py-32">
        <Atmos variant="wide" />

        <Reveal y={40}>
          <img
            src={phonesRow}
            alt="Showcase"
            className="w-full"
            style={{
              filter: "drop-shadow(0 80px 140px rgba(0,0,0,0.95))",
            }}
          />
        </Reveal>
      </section>

      {/* FOOTER */}
      <CinematicProjectFooter
        projectTitle="NEXTRIP"
        ribbonPhrases={["LUXURY TRAVEL", "AVIATION UI", "FUTURISTIC BOOKING", "CINEMATIC EXPERIENCE"]}
        nextProject={{ title: "Vanta", slug: "vanta" }}
      />
    </main>
  );
}
