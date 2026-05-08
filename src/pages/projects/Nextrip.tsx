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
        <section className="relative overflow-hidden px-6 pb-40 pt-16 md:pb-48 lg:pb-56">
          <Atmosphere variant="hero" />
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

            <div className="relative mt-20 flex min-h-[72vh] items-center justify-center md:mt-28">
              <Ghost align="right" className="top-1/2 -translate-y-1/2">nextrip</Ghost>
              {/* off-axis vertical guide */}
              <div className="pointer-events-none absolute left-[42%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
              <Parallax speed={1.05} className="relative z-10 -translate-x-[6%]">
                <Device className="animate-float-y">
                  <img
                    src={heroJet}
                    alt="NexTrip"
                    width={620}
                    height={620}
                    className="mx-auto h-auto w-[clamp(280px,40vw,580px)] drop-shadow-[0_60px_100px_rgba(0,0,0,0.9)]"
                  />
                </Device>
              </Parallax>
              {/* N badge — repositioned for asymmetric balance */}
              <div className="absolute right-[14%] top-[58%] hidden md:block">
                <div
                  className="grid h-14 w-14 place-items-center rounded-xl border border-white/[0.08] backdrop-blur-md"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <NMark size={28} />
                </div>
              </div>
            </div>

            <div className="mt-20 flex items-center justify-between text-[9px] uppercase tracking-[0.4em] text-white/30">
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
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-20 grid gap-10 md:grid-cols-3">
              <Reveal>
                <div>
                  <p className="mb-6 text-[9px] uppercase tracking-[0.35em] text-white/40">Application</p>
                  <NWordmark />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div>
                  <p className="mb-6 text-[9px] uppercase tracking-[0.35em] text-white/40">About</p>
                  <p className="text-lg leading-relaxed text-white/85">
                    NexTrip is an intelligent travel platform that redefines the way people
                    discover, plan, and <em className="italic text-white">experience</em> the world.
                  </p>
                  <p className="mt-6 text-xs leading-relaxed text-white/45">
                    We combine cutting-edge technology with human insight to create journeys that matter.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div>
                  <p className="mb-6 text-[9px] uppercase tracking-[0.35em] text-white/40">Main Task</p>
                  <p className="text-sm leading-relaxed text-white/70">
                    Millions of travelers face scattered options and complex planning. NexTrip brings
                    everything together in one seamless experience — saving time, offering clarity, and
                    unlocking extraordinary journeys.
                  </p>
                </div>
              </Reveal>
            </div>

            <Parallax speed={0.9} className="flex justify-center">
              <div className="animate-float-y">
                <img
                  src={phoneSearch}
                  alt="NexTrip search"
                  loading="lazy"
                  width={420}
                  height={840}
                  className="h-auto w-[clamp(220px,28vw,380px)] drop-shadow-[0_60px_80px_rgba(0,0,0,0.9)]"
                />
              </div>
            </Parallax>
          </div>
        </Section>

        {/* ===== 03 ARCHITECTURE ===== */}
        <Section index="02" rightMeta={<span>Application Structure</span>}>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-10 md:grid-cols-3">
              <Reveal>
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/50">MVP</p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>◦ Business flow</li>
                      <li>◦ Traveler flow</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/50">Coming</p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>◦ Tours</li>
                      <li>◦ Hotel reservations</li>
                      <li>◦ Car reservation</li>
                      <li>◦ Concierge</li>
                      <li>◦ Integrations</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <UserFlowDiagram />
              </Reveal>
              <Reveal delay={200}>
                <div>
                  <p className="text-base leading-relaxed text-white/80">
                    Application structure — is an initial development phase of the application
                    architecture creating process.
                  </p>
                  <p className="mt-6 text-xs leading-relaxed text-white/45">
                    This step helps to create a logic of interaction and connection between the screens
                    without the description for interface elements. It provides an understanding of the
                    overall functionality for the application development team.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ===== 04 IDENTITY ===== */}
        <Section index="03" rightMeta={<span>Identity</span>}>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-6 md:grid-cols-3">
              <GlassCard className="aspect-[3/4] flex-col justify-between flex">
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/40">Identity</div>
                <div className="my-auto flex justify-center">
                  <img src={heroJet} alt="" width={300} height={300} loading="lazy" className="h-auto w-3/4 opacity-90" />
                </div>
                <div className="flex items-center justify-between">
                  <NWordmark />
                  <span className="text-[9px] tracking-[0.3em] text-white/30">SHORT POINTS</span>
                </div>
              </GlassCard>
              <GlassCard className="aspect-[3/4]">
                <div className="flex h-full flex-col items-center justify-center">
                  <NMark size={200} className="drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
                  <div className="mt-8 flex items-center gap-3 text-white/30">
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                    <span>→</span>
                    <NMark size={16} />
                    <span>→</span>
                    <NMark size={20} />
                    <span>→</span>
                    <NMark size={24} />
                  </div>
                </div>
              </GlassCard>
              <div className="flex aspect-[3/4] flex-col gap-6">
                <GlassCard className="flex-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">Palette</p>
                  <div className="mt-6 flex h-16 gap-2">
                    {["#0D0D11", "#2A2A34", "#8A8A92", "#CDCDD3", "#F5F5F7"].map((c) => (
                      <div key={c} className="flex-1 rounded-sm" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-[8px] uppercase tracking-[0.25em] text-white/30">
                    <span>0D0D11</span><span>2A2A34</span><span>8A8A92</span><span>CDCDD3</span><span>F5F5F7</span>
                  </div>
                  <div className="mt-6 text-[10px] tracking-[0.2em] text-white/50">WCAG Test: <span className="text-white/85 underline">Pass</span></div>
                </GlassCard>
                <GlassCard className="flex-1">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl font-light leading-none text-white/95" style={{ fontFamily: "Georgia, serif" }}>Aa</div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">Typography</p>
                      <div className="mt-1 text-base">Satoshi</div>
                      <ul className="mt-3 space-y-1 text-xs text-white/65">
                        <li>◦ Regular</li>
                        <li>◦ Medium</li>
                        <li>◦ SemiBold</li>
                        <li>◦ Bold</li>
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
          <div className="relative mx-auto max-w-7xl px-6 py-24">
            <Ghost className="top-1/2 -translate-y-1/2">NEXTRIP</Ghost>
            <Parallax speed={0.95} className="relative">
              <img
                src={splashTrio}
                alt="Splash screens"
                loading="lazy"
                width={1600}
                height={1100}
                className="mx-auto h-auto w-full max-w-5xl"
              />
            </Parallax>
          </div>
        </Section>

        {/* ===== 06 DESCRIPTION ===== */}
        <Section index="05" rightMeta={<span>Description</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-32">
            <img
              src={clouds}
              alt=""
              loading="lazy"
              width={1920}
              height={800}
              className="pointer-events-none absolute -left-10 top-10 h-auto w-1/2 opacity-70"
            />
            <img
              src={clouds}
              alt=""
              loading="lazy"
              width={1920}
              height={800}
              className="pointer-events-none absolute -right-10 bottom-10 h-auto w-1/2 -scale-x-100 opacity-50"
            />
            <Reveal>
              <div className="relative mx-auto max-w-3xl text-center">
                <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-white/40">• • • Description</p>
                <h3 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold leading-tight tracking-tight">
                  Simplified and personalized experience provides the highest degree of comfort to users
                </h3>
                <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-white/55">
                  We have done a lot of research on the leading applications in this industry, took into
                  account all their shortcomings and made the best solution.
                </p>
                <div className="mt-12 flex justify-center">
                  <NWordmark />
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===== 07 USERFLOW STATEMENT + CAR ===== */}
        <Section index="06" rightMeta={<span>Userflow</span>}>
          <div className="relative mx-auto max-w-7xl px-6 py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40">• • • Description</p>
                <h3 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight tracking-tight">
                  Traveler version offers extensive functionality and offers, as well as great deals
                </h3>
                <p className="mt-6 text-xs text-white/55">Choosing a travel option is now much easier and cheaper</p>
              </div>
            </Reveal>
            <Parallax speed={0.95}>
              <div className="mt-16 flex justify-center">
                <img
                  src={phoneMercedes}
                  alt="Mercedes booking"
                  loading="lazy"
                  width={900}
                  height={1400}
                  className="h-auto w-[clamp(260px,40vw,560px)] -rotate-6 drop-shadow-[0_60px_80px_rgba(0,0,0,0.9)] hover:rotate-0 transition-transform duration-700 ease-out"
                />
              </div>
            </Parallax>
          </div>
        </Section>

        {/* ===== 08 BALI TOUR ===== */}
        <Section index="07" rightMeta={<span>Tour Screen</span>}>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-12 md:grid-cols-[1fr_1.4fr_1fr] md:items-center">
              <Reveal>
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40">Type</p>
                  <h4 className="text-3xl font-semibold tracking-tight">Bali —<br />Indonesia</h4>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                    <span>★★★★☆</span>
                    <span>2,450 reviews</span>
                  </div>
                </div>
              </Reveal>
              <Parallax speed={0.95}>
                <div className="relative">
                  <img src={bali} alt="Bali" loading="lazy" width={1280} height={800} className="h-64 w-full rounded-lg object-cover opacity-90" />
                </div>
              </Parallax>
              <Reveal delay={150}>
                <GlassCard>
                  <div className="mb-3 flex items-center gap-2 text-[10px] text-white/50">★★★★★</div>
                  <p className="text-xs leading-relaxed text-white/75">
                    An unforgettable trip! Bali is absolutely beautiful, the places we visited were
                    incredible. Highly recommend NexTrip for such amazing experiences.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-white/45">
                    <div className="h-6 w-6 rounded-full bg-white/10" />
                    Sophia Martinez · 12.06.2024
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ===== 09 PROFILE / PERSONAS ===== */}
        <Section index="08" rightMeta={<span>Profile</span>}>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-12 md:grid-cols-[1fr_1fr_1fr] md:items-center">
              <Reveal>
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40">About</p>
                  <p className="text-base leading-relaxed text-white/80">
                    The personal profile is equipped with additional settings, flight statistics, as
                    well as reminders about the upcoming flight
                  </p>
                  <div className="mt-8 space-y-3 text-xs">
                    {[
                      ["BEGINNER", "rgba(255,255,255,0.55)"],
                      ["TRAVELER", "rgba(140,160,255,0.85)"],
                      ["BUSINESSMAN", "rgba(180,140,255,0.85)"],
                    ].map(([label, color]) => (
                      <div key={label} className="flex items-center gap-2 text-white/70">
                        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <GlassCard className="mx-auto w-full max-w-xs">
                  <div className="flex items-center justify-between text-[10px] text-white/40">
                    <span>≡</span>
                    <NWordmark />
                    <span>✎</span>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-white/10" />
                    <div className="mt-3 text-sm">Daniel Jackson</div>
                    <div className="mt-1 inline-block rounded border border-indigo-400/40 px-2 py-0.5 text-[9px] tracking-[0.25em] text-indigo-200">TRAVELER</div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center text-white/80">
                    {[["Flights", "5"], ["In air", "32h"], ["Flow", "2k km"]].map(([l, v]) => (
                      <div key={l} className="rounded-md border border-white/10 bg-white/[0.03] py-3">
                        <div className="text-[9px] uppercase tracking-[0.25em] text-white/40">{l}</div>
                        <div className="mt-1 text-sm">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-md border border-white/10 bg-white/[0.03] p-3 text-[10px] text-white/60">
                    <div className="text-[9px] uppercase tracking-[0.25em] text-white/40">Upcoming flight</div>
                    <div className="mt-2 flex justify-between"><span>24 May</span><span>12:30 — 18:00</span><span>UA114</span></div>
                  </div>
                </GlassCard>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-xs leading-relaxed text-white/55 md:max-w-xs">
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
            <Parallax speed={0.85}>
              <img
                src={phonesRow}
                alt="NexTrip product showcase"
                loading="lazy"
                width={1920}
                height={1080}
                className="h-auto w-full"
              />
            </Parallax>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-transparent to-[#050508]" />
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