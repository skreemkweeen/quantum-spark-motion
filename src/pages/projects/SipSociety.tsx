import { Link } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import sipHero from "@/assets/sip-hero.png";
import sipSplash from "@/assets/sip-splash.png";
import sipPackaging from "@/assets/sip-packaging.png";
import sipFlavors from "@/assets/sip-flavors.png";
import sipFlavorSystem from "@/assets/sip-flavor-system.png";
import sipBenefits from "@/assets/sip-benefits.png";
import sipAd from "@/assets/sip-ad.png";
import sipApp from "@/assets/sip-app.png";

const meta = [
  { k: "Client", v: "Sip Society" },
  { k: "Year", v: "2026" },
  { k: "Scope", v: "Brand · Packaging · Web · App" },
  { k: "Category", v: "Functional Beverage" },
];

const SipSociety = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <section className="relative px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link to="/#work" className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))] hover:text-foreground">
              ← Selected Work
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">
              Healthy soda · Real benefits
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-6 text-[clamp(3.5rem,14vw,12rem)] font-semibold leading-[0.85] tracking-tight">
              SIP SOCIETY
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[hsl(var(--muted-fg))]">
              A modern functional soda brand built around prebiotics, low sugar,
              and everyday rituals — spanning identity, packaging, web, and a
              companion mobile app.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[hsl(var(--accent-line))] pt-8 md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k}>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">
                    {m.k}
                  </div>
                  <div className="mt-2 text-sm">{m.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal delay={120}>
        <section className="mx-auto mt-20 w-full max-w-7xl px-6">
          <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
            <img src={sipHero} alt="Sip Society hero" className="h-full w-full object-cover" />
          </div>
        </section>
      </Reveal>

      <section className="px-6 py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Overview</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-2xl leading-relaxed tracking-tight">
              Sip Society reimagines soda as a daily ritual. The system pairs
              warm, natural tones with a clean editorial type voice — letting
              ingredients, function, and craft speak for themselves.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Packaging System</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={sipPackaging} alt="Sip Society packaging system" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Product Photography</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={sipSplash} alt="Sip Society splash photography" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Web Experience</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={sipFlavorSystem} alt="Sip Society flavor system page" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={sipFlavors} alt="Sip Society flavors page" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={sipBenefits} alt="Sip Society benefits page" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Mobile App</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={sipApp} alt="Sip Society mobile app screens" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Campaign</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={sipAd} alt="Sip Society social ad" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[hsl(var(--accent-line))] px-6 py-24">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/#work" className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))] hover:text-foreground">
            ← Back to Work
          </Link>
          <Link to="/projects/nextrip" className="text-[10px] uppercase tracking-[0.3em] hover:text-[hsl(var(--muted-fg))]">
            Next: Nextrip →
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default SipSociety;