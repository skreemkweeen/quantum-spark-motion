import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import vantaHero from "@/assets/vanta-hero.jpg";
import elionInterface from "@/assets/elion-interface.png";
import sipHero from "@/assets/sip-hero.png";

export const PROJECTS = [
  {
    slug: "vanta",
    title: "VANTA",
    tag: "Brand · Web",
    imageUrl: vantaHero,
  },
  {
    slug: "elion",
    title: "ELION",
    tag: "Product · iOS",
    imageUrl: elionInterface,
  },
  {
    slug: "sip-society",
    title: "SIP SOCIETY",
    tag: "Hospitality",
    imageUrl: sipHero,
  },
  {
    slug: "nextrip",
    title: "NEXTRIP",
    tag: "Travel · App",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2400&auto=format&fit=crop",
  },
  {
    slug: "11ven",
    title: "11VEN",
    tag: "Cultural",
    imageUrl:
      "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=2400&auto=format&fit=crop",
  },
];

export const Projects = () => (
  <section
    id="work"
    className="relative px-6 pb-32 pt-20"
    style={{ background: "#050508" }}
  >
    {/* Atmospheric continuity: subtle grid + top fade so the section emerges from the hero */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "132px 132px",
        maskImage:
          "radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 95%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-40"
      style={{ background: "linear-gradient(to bottom, #050508, transparent)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(140,80,255,0.04), transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-7xl">
      <Reveal>
        <div className="mb-16 flex items-end justify-between">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">
            Selected Work
          </h2>
          <div className="h-px w-40 origin-left bg-[hsl(var(--accent-line))]" />
        </div>
      </Reveal>
      <HoverSlider className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-2">
          {PROJECTS.map((p, i) => (
            <div
              key={p.slug}
              className="flex items-baseline justify-between border-b border-[hsl(var(--accent-line))] py-4"
            >
              <Link to={`/projects/${p.slug}`} className="block">
                <TextStaggerHover text={p.title} index={i} />
              </Link>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">
                {p.tag}
              </span>
            </div>
          ))}
        </div>
        <HoverSliderImageWrap className="aspect-[4/5] overflow-hidden rounded-sm bg-[hsl(0_0%_10%)] md:sticky md:top-28">
          {PROJECTS.map((p, i) => (
            <HoverSliderImage key={p.slug} index={i} imageUrl={p.imageUrl} alt={p.title} />
          ))}
        </HoverSliderImageWrap>
      </HoverSlider>
    </div>
  </section>
);