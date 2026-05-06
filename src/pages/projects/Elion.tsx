import { Link } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { ProjectFooterRibbon } from "@/components/ProjectFooterRibbon";
import elionInterface from "@/assets/elion-interface.png";
import elionBrandSystem from "@/assets/elion-brand-system.png";
import elionSoundbarSystem from "@/assets/elion-soundbar-system.png";
import elionConcepts from "@/assets/elion-concepts.png";
import elionIdentityBoard from "@/assets/elion-identity-board.png";
import elionHeadphones from "@/assets/elion-headphones.png";
import elionHeadphonesSystem from "@/assets/elion-headphones-system.png";
import elionBillboards from "@/assets/elion-billboards.png";

const meta = [
  { k: "Client", v: "Elion" },
  { k: "Year", v: "2026" },
  { k: "Scope", v: "Brand · Product · Experience" },
  { k: "Category", v: "Audio Technology" },
];

const Elion = () => (
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
              Engineered frequency · Physical impact
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-6 text-[clamp(3.5rem,14vw,12rem)] font-semibold leading-[0.85] tracking-tight">
              ELION
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[hsl(var(--muted-fg))]">
              A premium audio brand system spanning industrial design, product
              storytelling, interface direction, and campaign world-building.
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
            <img src={elionInterface} alt="Elion product experience interface" className="h-full w-full object-cover" />
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
              Elion treats sound as a visual and tactile medium. The identity and
              product language use deep blacks, precision metallic finishes, and
              controlled violet-blue accents to express bass, pressure, and sonic
              clarity across every touchpoint.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Identity System</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={elionBrandSystem} alt="Elion brand identity board" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={elionIdentityBoard} alt="Elion logo exploration board" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Product System</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={elionSoundbarSystem} alt="Elion soundbar system variations" className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
                <img src={elionConcepts} alt="Elion audio product concepts" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={elionHeadphones} alt="Elion headphones product render" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={elionHeadphonesSystem} alt="Elion headphones finishes and features" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Campaign Execution</h2>
              <div className="h-px w-40 bg-[hsl(var(--accent-line))]" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-sm bg-[hsl(0_0%_5%)]">
              <img src={elionBillboards} alt="Elion campaign billboard system" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[hsl(var(--accent-line))] px-6 py-24">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/#work" className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))] hover:text-foreground">
            ← Back to Work
          </Link>
          <Link to="/projects/sip-society" className="text-[10px] uppercase tracking-[0.3em] hover:text-[hsl(var(--muted-fg))]">
            Next: Sip Society →
          </Link>
        </div>
      </section>
    </main>
    <ProjectFooterRibbon
      title="ELION"
      phrases={["LUXURY AUDIO", "INDUSTRIAL DESIGN", "IMMERSIVE SOUND"]}
    />
    <Footer />
  </div>
);

export default Elion;
