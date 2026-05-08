import { Link } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { ProjectFooterRibbon } from "@/components/ProjectFooterRibbon";
import { Section, Bezel } from "@/components/nextrip/SectionFrame";
import { NMark, NWordmark } from "@/components/nextrip/NMark";
import { UserFlowDiagram } from "@/components/nextrip/UserFlowDiagram";
import { Atmosphere, Device } from "@/components/nextrip/Atmosphere";

import heroJet from "@/assets/nextrip/hero-jet-top.png";
import phoneSearch from "@/assets/nextrip/phone-search.png";
import splashTrio from "@/assets/nextrip/splash-trio.jpg";
import phoneMercedes from "@/assets/nextrip/phone-mercedes.png";
import bali from "@/assets/nextrip/bali.jpg";
import clouds from "@/assets/nextrip/clouds.png";
import phonesRow from "@/assets/nextrip/phones-row.jpg";

const Ghost = ({
  children,
  className = "",
  align = "center",
}: {
  children: string;
  className?: string;
  align?: "left" | "center" | "right";
}) => (
  <div
    aria-hidden
    className={`pointer-events-none select-none absolute inset-x-0 font-medium tracking-[-0.04em] nx-chrome-text opacity-[0.06] ${
      align === "left" ? "text-left pl-[6%]" : align === "right" ? "text-right pr-[6%]" : "text-center"
    } ${className}`}
    style={{ fontSize: "clamp(5rem,18vw,18rem)", lineHeight: 0.82 }}
  >
    {children}
  </div>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 backdrop-blur-xl transition-all duration-700 hover:border-white/[0.16] ${className}`}
    style={{
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.02), 0 40px 80px -40px rgba(0,0,0,0.9), 0 0 120px -60px rgba(220,225,235,0.08)",
    }}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 20% 0%, rgba(255,255,255,0.06), transparent 60%)",
      }}
    />
    <div className="relative">{children}</div>
  </div>
);

const Hairline = ({ className = "" }: { className?: string }) => (
  <div className={`h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent ${className}`} />
);

const TierLabel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[9px] uppercase tracking-[0.4em] text-white/40 ${className}`}>{children}</p>
);

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[8px] uppercase tracking-[0.45em] text-white/35">{label}</div>
    <div className="mt-2 text-[11px] tracking-[0.05em] text-white/85">{value}</div>
  </div>
);

const Nextrip = () => {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#050508" }}
    >
      {/* Atmospheric layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <Nav />

      <main className="relative z-10 pt-24">
        {/* ===== 01 HERO ===== */}
        <section className="relative overflow-hidden px-6 pb-48 pt-16 md:pb-56 lg:pb-72">
          <Atmosphere variant="hero" />
          {/* deeper cinematic light bloom behind jet */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 38% 55% at 47% 58%, rgba(220,228,240,0.10), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "70vw",
              height: "70vw",
              maxWidth: 1100,
              maxHeight: 1100,
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 60%)",
              filter: "blur(40px)",
            }}
          />
          {/* faint horizon line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[62%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-6 text-[9px] uppercase tracking-[0.4em] text-white/40">
                <Link to="/#work" className="transition-colors hover:text-white/90">← Work</Link>
                <div className="flex items-center gap-10 md:gap-14">
                  <Meta label="Name" value="NexTrip" />
                  <Meta label="Type" value="Travel Platform" />
                  <Meta label="Year" value="2024" />
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/[0.08] text-white/40">©</span>
                </div>
              </div>
            </Reveal>

            <div className="relative mt-28 flex min-h-[82vh] items-center justify-center md:mt-36">
              <Ghost align="center" className="top-1/2 -translate-y-1/2">nextrip</Ghost>
              {/* off-axis vertical guide */}
              <div className="pointer-events-none absolute left-[42%] top-[8%] h-[84%] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

              {/* concentric atmospheric rings */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "min(720px, 80vw)",
                  height: "min(720px, 80vw)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.04)",
                  boxShadow:
                    "inset 0 0 120px rgba(255,255,255,0.04), 0 0 200px -40px rgba(220,225,235,0.08)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "min(440px, 50vw)",
                  height: "min(440px, 50vw)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              />

              <Parallax speed={1.05} className="relative z-10 -translate-x-[4%]">
                <Device className="animate-float-y">
                  {/* aircraft glow halo */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[-30%]"
                    style={{
                      background:
                        "radial-gradient(ellipse 45% 55% at 50% 50%, rgba(235,240,250,0.16), transparent 65%)",
                      filter: "blur(50px)",
                    }}
                  />
                  <img
                    src={heroJet}
                    alt="NexTrip"
                    width={620}
                    height={620}
                    className="relative mx-auto h-auto w-[clamp(280px,42vw,620px)]"
                    style={{
                      filter:
                        "drop-shadow(0 30px 50px rgba(0,0,0,0.85)) drop-shadow(0 80px 120px rgba(0,0,0,0.9)) drop-shadow(0 0 60px rgba(220,230,245,0.18))",
                    }}
                  />
                  {/* under-aircraft floor pool */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-full mt-[-60px] h-[120px] w-[85%] -translate-x-1/2"
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,0,0,0.95), transparent 70%)",
                      filter: "blur(24px)",
                    }}
                  />
                </Device>
              </Parallax>

              {/* N badge — asymmetric counterweight */}
              <div className="absolute right-[10%] top-[62%] hidden md:block">
                <div
                  className="grid h-14 w-14 place-items-center rounded-xl border border-white/[0.08] backdrop-blur-md"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.10), 0 20px 40px -20px rgba(0,0,0,0.8), 0 0 40px -10px rgba(220,225,235,0.10)",
                  }}
                >
                  <NMark size={28} />
                </div>
              </div>

              {/* corner editorial markers */}
              <div className="absolute left-0 top-[12%] hidden text-[8px] uppercase tracking-[0.45em] text-white/25 md:block">
                <div>N 40°42′</div>
                <div className="mt-1 text-white/15">Altitude · 38,000 ft</div>
              </div>
              <div className="absolute bottom-[6%] right-0 hidden text-right text-[8px] uppercase tracking-[0.45em] text-white/25 md:block">
                <div>Mach 0.85</div>
                <div className="mt-1 text-white/15">Heading · 270°W</div>
              </div>
            </div>

            <div className="mt-24 flex items-center justify-between text-[9px] uppercase tracking-[0.4em] text-white/30">
              <span>40°42′46″N — 74°00′21″W</span>
              <Hairline className="mx-8 hidden flex-1 md:block" />
              <span>Est. 2024</span>
              <Hairline className="mx-8 hidden flex-1 md:block" />
              <span className="hidden md:inline">© NexTrip</span>
            </div>
          </div>
        </section>

        {/* ===== 02 INTRO ===== */}
        <Section index="01" rightMeta={<span>Overview</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-40 md:py-52 lg:py-64">
            <Atmosphere variant="editorial" />
            {/* layered gradient depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 60% at 78% 50%, rgba(220,228,240,0.07), transparent 70%), radial-gradient(ellipse 40% 50% at 8% 30%, rgba(180,195,220,0.04), transparent 65%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 hidden lg:block nx-grid-lines opacity-40" />

            {/* asymmetric editorial grid: 5 / 1 / 6 */}
            <div className="relative grid gap-x-8 gap-y-16 lg:grid-cols-12">
              {/* Left column — editorial copy stack */}
              <div className="relative lg:col-span-5 lg:pt-8">
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="h-px w-10 bg-white/30" />
                    <TierLabel>Application · 01</TierLabel>
                  </div>
                  <div className="mt-8">
                    <NWordmark />
                  </div>
                  <p className="mt-10 text-[10px] uppercase leading-[1.9] tracking-[0.32em] text-white/45" style={{ maxWidth: "30ch" }}>
                    An intelligent travel platform<br />composed for the modern traveler.
                  </p>
                </Reveal>

                <Reveal delay={220}>
                  <div className="mt-24 lg:mt-32">
                    <TierLabel className="mb-8">Main Task</TierLabel>
                    <p
                      className="font-light text-white/75"
                      style={{
                        maxWidth: "40ch",
                        fontSize: "13px",
                        lineHeight: 1.85,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Millions of travelers face scattered options and complex planning.
                      NexTrip brings everything together in one seamless experience — saving
                      time, offering clarity, and unlocking extraordinary journeys.
                    </p>
                    <Hairline className="mt-10 max-w-[14rem]" />
                  </div>
                </Reveal>
              </div>

              {/* Center column — vertical seam + ambient backdrop for the device */}
              <div className="relative hidden lg:col-span-2 lg:block">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-[8px] uppercase tracking-[0.6em] text-white/25 xl:block">
                  Composed · Considered · Calm
                </div>
              </div>

              {/* Right column — pull-quote + floating device */}
              <div className="relative lg:col-span-5">
                <Reveal delay={120}>
                  <div className="lg:max-w-[24ch] lg:translate-x-[-12%]">
                    <TierLabel className="mb-6">About</TierLabel>
                    <p
                      className="font-light tracking-[-0.015em] text-white"
                      style={{
                        fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                        lineHeight: 1.18,
                      }}
                    >
                      NexTrip redefines the way people discover, plan, and{" "}
                      <span
                        className="italic"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        experience
                      </span>{" "}
                      the world.
                    </p>
                    <Hairline className="mt-8 max-w-[6rem]" />
                    <p className="mt-6 text-[10px] uppercase leading-[1.9] tracking-[0.3em] text-white/40" style={{ maxWidth: "32ch" }}>
                      Cutting-edge technology &nbsp;·&nbsp; human insight &nbsp;·&nbsp; journeys that matter.
                    </p>
                  </div>
                </Reveal>

                {/* sculptural phone — overlaps onto center column for tension */}
                <Parallax speed={0.92} className="relative mt-20 flex justify-center lg:mt-28 lg:justify-end lg:translate-x-[8%]">
                  {/* aircraft-style ambient halo */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: "min(520px, 70%)",
                      height: "min(520px, 70%)",
                      borderRadius: "9999px",
                      background:
                        "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(230,235,245,0.12), transparent 65%)",
                      filter: "blur(40px)",
                    }}
                  />
                  <Device className="animate-float-y">
                    <img
                      src={phoneSearch}
                      alt="NexTrip search"
                      loading="lazy"
                      decoding="async"
                      width={420}
                      height={840}
                      className="relative h-auto w-[clamp(220px,28vw,380px)]"
                      style={{
                        filter:
                          "drop-shadow(0 30px 50px rgba(0,0,0,0.85)) drop-shadow(0 80px 120px rgba(0,0,0,0.95)) drop-shadow(0 0 60px rgba(220,230,245,0.14))",
                      }}
                    />
                  </Device>

                  {/* tiny coordinate marker beside the device */}
                  <div className="absolute -left-6 bottom-6 hidden text-[8px] uppercase tracking-[0.45em] text-white/25 lg:block">
                    <div>Iframe · 01</div>
                    <div className="mt-1 text-white/15">Search</div>
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== 03 ARCHITECTURE ===== */}
        <Section index="02" rightMeta={<span>Application Structure</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-40 lg:py-48">
            <div className="pointer-events-none absolute inset-0 hidden lg:block nx-grid-lines opacity-60" />
            <Atmosphere variant="editorial" />
            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-3">
                <div className="space-y-10">
                  <div>
                    <TierLabel className="mb-4">MVP</TierLabel>
                    <ul className="space-y-2.5 text-[12px] tracking-[0.05em] text-white/75">
                      <li>— Business flow</li>
                      <li>— Traveler flow</li>
                    </ul>
                  </div>
                  <Hairline />
                  <div>
                    <TierLabel className="mb-4">Coming</TierLabel>
                    <ul className="space-y-2.5 text-[12px] tracking-[0.05em] text-white/55">
                      <li>— Tours</li>
                      <li>— Hotel reservations</li>
                      <li>— Car reservation</li>
                      <li>— Concierge</li>
                      <li>— Integrations</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120} className="lg:col-span-6">
                <UserFlowDiagram />
              </Reveal>
              <Reveal delay={200} className="lg:col-span-3">
                <div>
                  <TierLabel className="mb-6">Architecture</TierLabel>
                  <p className="text-[14px] font-light leading-[1.7] text-white/80" style={{ maxWidth: "30ch" }}>
                    Application structure — the initial development phase of the architecture process.
                  </p>
                  <Hairline className="my-8" />
                  <p className="text-[11px] leading-[1.75] text-white/45" style={{ maxWidth: "36ch" }}>
                    A logic of interaction and connection between screens, providing the development team a clear
                    map of overall functionality before any interface element is designed.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ===== 04 IDENTITY ===== */}
        <Section index="03" rightMeta={<span>Identity</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-40 md:py-52 lg:py-64">
            <Atmosphere variant="editorial" />
            {/* cinematic ambient lighting layers */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 45% 60% at 18% 30%, rgba(220,228,240,0.08), transparent 65%), radial-gradient(ellipse 50% 60% at 82% 70%, rgba(180,195,220,0.06), transparent 70%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 hidden lg:block nx-grid-lines opacity-30" />

            <div className="relative grid gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
              {/* Card 1 — Identity */}
              <GlassCard className="aspect-[3/4] flex-col justify-between flex">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-white/30" />
                  <span className="text-[8px] uppercase tracking-[0.45em] text-white/40">Identity · 01</span>
                </div>
                <div className="relative my-auto flex justify-center">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(230,235,245,0.10), transparent 65%)",
                      filter: "blur(30px)",
                    }}
                  />
                  <img
                    src={heroJet}
                    alt=""
                    width={300}
                    height={300}
                    loading="lazy"
                    className="relative h-auto w-3/4"
                    style={{
                      filter:
                        "drop-shadow(0 30px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 30px rgba(220,230,245,0.12))",
                    }}
                  />
                </div>
                <div>
                  <Hairline className="mb-5 max-w-[5rem]" />
                  <div className="flex items-end justify-between">
                    <NWordmark />
                    <span className="text-[8px] uppercase tracking-[0.45em] text-white/30">Short Points</span>
                  </div>
                </div>
              </GlassCard>

              {/* Card 2 — Mark */}
              <GlassCard className="aspect-[3/4]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-white/30" />
                    <span className="text-[8px] uppercase tracking-[0.45em] text-white/40">Mark · 02</span>
                  </div>
                  <div className="relative my-auto flex flex-col items-center justify-center">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(235,240,250,0.14), transparent 60%)",
                        filter: "blur(28px)",
                      }}
                    />
                    <NMark size={200} className="relative drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" />
                  </div>
                  <div>
                    <Hairline className="mb-5 max-w-[5rem]" />
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] uppercase tracking-[0.45em] text-white/40">Scale</span>
                      <div className="flex items-center gap-3 text-white/30">
                        <NMark size={12} />
                        <span className="text-[8px]">·</span>
                        <NMark size={16} />
                        <span className="text-[8px]">·</span>
                        <NMark size={20} />
                        <span className="text-[8px]">·</span>
                        <NMark size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Right column — Palette + Typography */}
              <div className="flex aspect-[3/4] flex-col gap-8 md:gap-10">
                <GlassCard className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-white/30" />
                    <span className="text-[8px] uppercase tracking-[0.45em] text-white/40">Palette · 03</span>
                  </div>
                  <div className="mt-7 flex h-14 gap-1.5 overflow-hidden rounded-md">
                    {["#0D0D11", "#2A2A34", "#8A8A92", "#CDCDD3", "#F5F5F7"].map((c) => (
                      <div
                        key={c}
                        className="flex-1"
                        style={{
                          background: c,
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-[8px] uppercase tracking-[0.3em] text-white/30">
                    <span>0D0D11</span><span>2A2A34</span><span>8A8A92</span><span>CDCDD3</span><span>F5F5F7</span>
                  </div>
                  <Hairline className="mt-6 max-w-[5rem]" />
                  <div className="mt-5 text-[9px] uppercase tracking-[0.35em] text-white/45">
                    WCAG <span className="ml-2 text-white/85">Pass</span>
                  </div>
                </GlassCard>

                <GlassCard className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-white/30" />
                    <span className="text-[8px] uppercase tracking-[0.45em] text-white/40">Typography · 04</span>
                  </div>
                  <div className="mt-6 flex items-end gap-7">
                    <div
                      className="font-light leading-none text-white/95"
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "clamp(3.5rem, 6vw, 5rem)",
                        textShadow: "0 0 40px rgba(220,230,245,0.15)",
                      }}
                    >
                      Aa
                    </div>
                    <div className="pb-2">
                      <div className="text-[15px] tracking-[-0.01em] text-white">Satoshi</div>
                      <ul className="mt-3 space-y-1.5 text-[10px] uppercase tracking-[0.3em] text-white/55">
                        <li>Regular</li>
                        <li>Medium</li>
                        <li>SemiBold</li>
                        <li>Bold</li>
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== 05 SPLASH ===== */}
        <Section index="04" rightMeta={<span>Splash Screens</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44 lg:py-56">
            <Atmosphere variant="wide" />
            <Ghost align="left" className="top-1/2 -translate-y-1/2">NEXTRIP</Ghost>
            <Parallax speed={0.92} className="relative">
              <img
                src={splashTrio}
                alt="Splash screens"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1100}
                className="mx-auto h-auto w-full max-w-5xl drop-shadow-[0_80px_120px_rgba(0,0,0,0.95)]"
              />
            </Parallax>
          </div>
        </Section>

        {/* ===== 06 DESCRIPTION ===== */}
        <Section index="05" rightMeta={<span>Description</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-40 md:py-52 lg:py-64">
            <Atmosphere variant="wide" />
            <img
              src={clouds}
              alt=""
              loading="lazy"
              width={1920}
              height={800}
              className="pointer-events-none absolute -left-10 top-10 h-auto w-1/2 opacity-50 mix-blend-screen"
            />
            <img
              src={clouds}
              alt=""
              loading="lazy"
              width={1920}
              height={800}
              className="pointer-events-none absolute -right-10 bottom-10 h-auto w-1/2 -scale-x-100 opacity-35 mix-blend-screen"
            />
            <Reveal>
              <div className="relative mx-auto max-w-3xl text-center">
                <TierLabel className="mb-8">Description</TierLabel>
                <h3
                  className="font-light leading-[1.15] tracking-[-0.02em] text-white/95"
                  style={{ fontSize: "clamp(1.7rem,3.6vw,2.8rem)" }}
                >
                  Simplified and personalized experience provides the highest degree of comfort to users
                </h3>
                <Hairline className="mx-auto mt-10 max-w-[120px]" />
                <p className="mx-auto mt-8 max-w-md text-[12px] leading-[1.75] text-white/50">
                  We have done a lot of research on the leading applications in this industry, took into
                  account all their shortcomings and made the best solution.
                </p>
                <div className="mt-14 flex justify-center">
                  <NWordmark />
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===== 07 USERFLOW STATEMENT + CAR ===== */}
        <Section index="06" rightMeta={<span>Userflow</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44 lg:py-56">
            <Atmosphere variant="device" />
            <div className="relative grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-24">
              {/* Left: editorial caption stack */}
              <Reveal className="lg:col-span-5 lg:pl-6">
                <div>
                  <TierLabel className="mb-6">Userflow</TierLabel>
                  <h3
                    className="font-light leading-[1.15] tracking-[-0.02em] text-white/95"
                    style={{ fontSize: "clamp(1.6rem,3.2vw,2.4rem)" }}
                  >
                    Traveler version offers extensive functionality and offers, as well as great deals.
                  </h3>
                  <Hairline className="my-8 max-w-[120px]" />
                  <p className="text-[12px] leading-[1.75] text-white/50" style={{ maxWidth: "38ch" }}>
                    Choosing a travel option is now effortless — curated rides, transparent pricing, and a
                    flow that respects the user's time.
                  </p>
                </div>
              </Reveal>
              {/* Right: tilted phone */}
              <Parallax speed={0.92} className="lg:col-span-7">
                <Device className="block lg:translate-x-[6%]">
                  <img
                    src={phoneMercedes}
                    alt="Mercedes booking"
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={1400}
                    className="mx-auto h-auto w-[clamp(260px,38vw,520px)] -rotate-3 drop-shadow-[0_80px_100px_rgba(0,0,0,0.95)] transition-transform duration-[900ms] hover:rotate-0"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  />
                </Device>
              </Parallax>
            </div>
          </div>
        </Section>

        {/* ===== 08 BALI TOUR ===== */}
        <Section index="07" rightMeta={<span>Tour Screen</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-40 lg:py-48">
            <Atmosphere variant="editorial" />
            <div className="relative grid gap-12 md:grid-cols-[1fr_1.6fr_0.9fr] md:items-center md:gap-16">
              <Reveal>
                <div>
                  <TierLabel className="mb-4">Destination</TierLabel>
                  <h4 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-[1.05] tracking-[-0.02em]">
                    Bali —<br /><span className="text-white/55">Indonesia</span>
                  </h4>
                  <Hairline className="my-6 max-w-[80px]" />
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/55">
                    <span className="text-white/80">★★★★☆</span>
                    <span>2,450 REVIEWS</span>
                  </div>
                </div>
              </Reveal>
              <Parallax speed={0.95}>
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={bali}
                    alt="Bali"
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={800}
                    className="h-72 w-full object-cover opacity-90 md:h-80"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(5,5,8,0.85) 100%)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
                  />
                </div>
              </Parallax>
              <Reveal delay={150}>
                <GlassCard>
                  <div className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/50">★★★★★</div>
                  <p className="text-[12px] leading-[1.7] text-white/75">
                    An unforgettable trip! Bali is absolutely beautiful, the places we visited were
                    incredible. Highly recommend NexTrip for such amazing experiences.
                  </p>
                  <Hairline className="my-5" />
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/40">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                    SOPHIA MARTINEZ · 12.06.2024
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ===== 09 PROFILE / PERSONAS ===== */}
        <Section index="08" rightMeta={<span>Profile</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-40 lg:py-48">
            <Atmosphere variant="device" />
            <div className="relative grid gap-12 md:grid-cols-[1fr_1fr_1fr] md:items-center md:gap-16">
              <Reveal>
                <div>
                  <TierLabel className="mb-6">About</TierLabel>
                  <p className="text-[14px] font-light leading-[1.7] text-white/85" style={{ maxWidth: "32ch" }}>
                    The personal profile is equipped with additional settings, flight statistics, as
                    well as reminders about the upcoming flight.
                  </p>
                  <Hairline className="my-8 max-w-[80px]" />
                  <div className="space-y-3 text-[10px] tracking-[0.25em]">
                    {[
                      ["BEGINNER", "rgba(255,255,255,0.55)"],
                      ["TRAVELER", "rgba(140,160,255,0.85)"],
                      ["BUSINESSMAN", "rgba(180,140,255,0.85)"],
                    ].map(([label, color]) => (
                      <div key={label} className="flex items-center gap-3 text-white/65">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <GlassCard className="mx-auto w-full max-w-xs">
                  <div className="flex items-center justify-between text-[10px] text-white/35">
                    <span>≡</span>
                    <NWordmark />
                    <span>✎</span>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-white/25 to-white/5 ring-1 ring-white/10" />
                    <div className="mt-3 text-[13px] tracking-[0.02em]">Daniel Jackson</div>
                    <div className="mt-2 inline-block rounded border border-white/15 px-2 py-0.5 text-[9px] tracking-[0.3em] text-white/70">TRAVELER</div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center text-white/80">
                    {[["Flights", "5"], ["In air", "32h"], ["Flow", "2k km"]].map(([l, v]) => (
                      <div key={l} className="rounded-md border border-white/[0.07] bg-white/[0.02] py-3 backdrop-blur-sm">
                        <div className="text-[8px] uppercase tracking-[0.3em] text-white/35">{l}</div>
                        <div className="mt-1.5 text-[13px]">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-md border border-white/[0.07] bg-white/[0.02] p-3 text-[10px] text-white/60 backdrop-blur-sm">
                    <div className="text-[8px] uppercase tracking-[0.3em] text-white/35">Upcoming flight</div>
                    <div className="mt-2.5 flex justify-between text-[10px] tracking-[0.05em]"><span>24 May</span><span>12:30 — 18:00</span><span className="text-white/85">UA114</span></div>
                  </div>
                </GlassCard>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-[12px] leading-[1.75] text-white/55" style={{ maxWidth: "34ch" }}>
                  It is very interesting to know how many hours and distances you have covered over the
                  entire time. You can brag about this to your friends, or compete with them.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ===== 10 CLOSING SHELF ===== */}
        <section className="relative overflow-hidden">
          <Bezel />
          <div className="relative">
            <Atmosphere variant="wide" />
            <Parallax speed={0.85}>
              <img
                src={phonesRow}
                alt="NexTrip product showcase"
                loading="lazy"
                decoding="async"
                width={1920}
                height={1080}
                className="h-auto w-full"
              />
            </Parallax>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,5,8,0.7) 100%)",
              }}
            />
          </div>
        </section>
      </main>

      <ProjectFooterRibbon
        title="NEXTRIP"
        phrases={["TRAVEL PLATFORM", "MOBILE EXPERIENCE", "FLIGHT SYSTEM"]}
      />
      <Footer />
    </div>
  );
};

export default Nextrip;