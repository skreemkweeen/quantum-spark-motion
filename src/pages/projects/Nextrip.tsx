import { motion, useScroll, useSpring } from "framer-motion";
import { ReactNode } from "react";

import heroJet from "@/assets/nextrip/hero-jet-top.png";
import splashTrio from "@/assets/nextrip/splash-trio.jpg";
import phoneMercedes from "@/assets/nextrip/phone-mercedes.png";
import bali from "@/assets/nextrip/bali.jpg";
import phonesRow from "@/assets/nextrip/phones-row.jpg";

const ease = [0.16, 1, 0.3, 1];

const label = {
  textTransform: "uppercase" as const,
  letterSpacing: "0.32em",
  fontSize: "10px",
  color: "rgba(240,237,232,0.45)",
};

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

function Atmosphere() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at center, rgba(80,90,140,0.18), transparent 65%)",
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
    </>
  );
}

function Glass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-xl ${className}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.03), 0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export default function Nextrip() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <main className="relative overflow-hidden bg-[#040408] text-white">
      {/* Progress */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-px origin-left bg-white"
        style={{
          scaleX,
          width: "100%",
        }}
      />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden px-8 pt-32">
        <Atmosphere />

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center justify-between">
              <span style={label}>NexTrip</span>
              <span style={label}>Travel Platform</span>
            </div>
          </Reveal>

          <div className="relative flex min-h-[80vh] items-center justify-center">
            <div className="absolute text-[18vw] font-black uppercase tracking-[-0.08em] text-white/[0.03]">
              nextrip
            </div>

            <Reveal delay={0.2}>
              <img
                src={heroJet}
                alt=""
                className="relative z-10 w-[42vw] min-w-[320px]"
                style={{
                  filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(255,255,255,0.12))",
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* IDENTITY */}
      <section className="relative px-8 py-40">
        <Atmosphere />

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <Glass className="p-10">
            <div style={label}>Identity</div>

            <div className="mt-20 flex justify-center">
              <img src={heroJet} alt="" className="w-[220px]" />
            </div>
          </Glass>

          <Glass className="p-10">
            <div style={label}>Mark</div>

            <div className="mt-20 flex items-center justify-center">
              <div
                className="text-8xl font-black"
                style={{
                  background: "linear-gradient(180deg,#ffffff,#8b8b95)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                N
              </div>
            </div>
          </Glass>

          <div className="flex flex-col gap-8">
            <Glass className="p-10">
              <div style={label}>Palette</div>

              <div className="mt-8 flex gap-2">
                {["#040408", "#1b1b22", "#4b4b58", "#9f9faa", "#ffffff"].map((c) => (
                  <div key={c} className="h-16 flex-1 rounded-lg" style={{ background: c }} />
                ))}
              </div>
            </Glass>

            <Glass className="flex-1 p-10">
              <div style={label}>Typography</div>

              <div className="mt-10 text-7xl">Aa</div>

              <div className="mt-6 text-white/70">Cormorant + DM Mono</div>
            </Glass>
          </div>
        </div>
      </section>

      {/* SPLASH */}
      <section className="relative px-8 py-40">
        <Atmosphere />

        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex items-end justify-between">
            <div>
              <div style={label}>Splash Screens</div>

              <h2 className="mt-6 max-w-xl text-5xl leading-tight text-white/95">One identity unfolding in motion.</h2>
            </div>

            <div className="hidden text-right md:block">
              <div style={label}>Studio Light · Cool</div>
            </div>
          </div>

          <Glass className="p-12">
            <div className="relative overflow-hidden rounded-[28px] bg-black py-20">
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />

              <img
                src={splashTrio}
                alt=""
                className="relative z-10 mx-auto w-full max-w-6xl"
                style={{
                  filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(255,255,255,0.08))",
                }}
              />
            </div>
          </Glass>
        </div>
      </section>

      {/* MERCEDES */}
      <section className="relative px-8 py-40">
        <Atmosphere />

        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
          <div>
            <div style={label}>Traveler Flow</div>

            <h2 className="mt-8 max-w-lg text-6xl leading-[1.05] tracking-[-0.04em]">
              Premium transportation designed for modern travelers.
            </h2>
          </div>

          <div className="flex justify-center">
            <img
              src={phoneMercedes}
              alt=""
              className="w-[420px]"
              style={{
                filter: "drop-shadow(0 80px 120px rgba(0,0,0,0.95))",
              }}
            />
          </div>
        </div>
      </section>

      {/* BALI */}
      <section className="relative px-8 py-40">
        <Atmosphere />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.4fr_0.8fr]">
          <div>
            <div style={label}>Destination</div>

            <h2 className="mt-8 text-5xl leading-none">
              Bali —<span className="block text-white/40">Indonesia</span>
            </h2>
          </div>

          <Glass className="overflow-hidden">
            <img src={bali} alt="" className="h-full w-full object-cover" />
          </Glass>

          <Glass className="p-8">
            <p className="text-xl leading-relaxed text-white/80">
              “An unforgettable trip. NexTrip created one of the smoothest luxury travel experiences.”
            </p>
          </Glass>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="relative py-32">
        <Atmosphere />

        <img
          src={phonesRow}
          alt=""
          className="w-full"
          style={{
            filter: "drop-shadow(0 80px 120px rgba(0,0,0,0.95))",
          }}
        />
      </section>
    </main>
  );
}
