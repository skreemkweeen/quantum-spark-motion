'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

interface ParallaxHeroProps {
  title?: string;
}

export function ParallaxHero({ title = 'ELEMENT UX' }: ParallaxHeroProps) {
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    let tl: gsap.core.Timeline | undefined;
    if (triggerElement) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });
      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];
      layers.forEach((layerObj, idx) => {
        tl!.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          { yPercent: layerObj.yPercent, ease: 'none' },
          idx === 0 ? undefined : '<'
        );
      });
    }

    const lenis = new Lenis();
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={parallaxRef} className="relative w-full">
      <div data-parallax-layers className="relative h-[200vh] w-full overflow-clip">
        {/* Layer 1 — back (slowest visible move) deep gradient */}
        <div
          data-parallax-layer="1"
          className="absolute inset-0 h-screen w-full bg-[radial-gradient(ellipse_at_top,hsl(0_0%_18%)_0%,hsl(0_0%_6%)_60%,hsl(0_0%_4%)_100%)]"
        />
        {/* Layer 2 — horizon line */}
        <div
          data-parallax-layer="2"
          className="absolute inset-x-0 top-[60%] h-screen"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[hsl(var(--accent-line))]" />
          <div className="absolute inset-x-0 top-[20%] h-px bg-[hsl(var(--accent-line))] opacity-60" />
          <div className="absolute inset-x-0 top-[35%] h-px bg-[hsl(var(--accent-line))] opacity-40" />
        </div>
        {/* Layer 3 — title */}
        <div
          data-parallax-layer="3"
          className="absolute inset-x-0 top-[28%] flex items-center justify-center"
        >
          <h1 className="px-6 text-center font-semibold leading-[0.85] tracking-tight text-foreground text-[clamp(4rem,16vw,16rem)]">
            {title}
          </h1>
        </div>
        {/* Layer 4 — foreground caption (fastest) */}
        <div
          data-parallax-layer="4"
          className="absolute inset-x-0 top-[78%] flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[hsl(var(--muted-fg))]">
            Studio · Interaction · Motion
          </span>
          <span className="text-xs text-[hsl(var(--muted-fg))]">↓ scroll</span>
        </div>
      </div>
    </section>
  );
}