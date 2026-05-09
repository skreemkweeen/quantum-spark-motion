import { useEffect, useRef, useState } from "react";

/** Soft pointer-tracking ambient glow that follows the cursor across the page. */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[640px] w-[640px] rounded-full opacity-60 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(220,228,240,0.10), rgba(180,195,220,0.05) 40%, transparent 70%)",
        filter: "blur(40px)",
        willChange: "transform",
      }}
    />
  );
};

/** Thin top-edge scroll progress indicator with a chrome accent. */
export const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${p})`,
          background:
            "linear-gradient(90deg, transparent, rgba(220,228,240,0.9), rgba(255,255,255,0.6), transparent)",
          boxShadow: "0 0 12px rgba(220,228,240,0.6)",
          transition: "transform 120ms linear",
        }}
      />
    </div>
  );
};

/** Sticky right-edge editorial section index rail. */
const RAIL_ITEMS = [
  { id: "hero", label: "Hero" },
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "identity", label: "Identity" },
  { id: "splash", label: "Splash" },
  { id: "description", label: "Concept" },
  { id: "userflow", label: "Userflow" },
  { id: "tour", label: "Tour" },
  { id: "profile", label: "Profile" },
  { id: "showcase", label: "Showcase" },
];

export const SectionRail = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = RAIL_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav
      aria-label="Section index"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3 text-[8px] uppercase tracking-[0.4em]">
        {RAIL_ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.id} className="pointer-events-auto">
              <a
                href={`#${item.id}`}
                className="group flex items-center gap-3"
                style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.28)" }}
              >
                <span
                  className="transition-all duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0)" : "translateX(8px)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="block h-px transition-all duration-500"
                  style={{
                    width: isActive ? 28 : 14,
                    background: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                    boxShadow: isActive ? "0 0 8px rgba(220,228,240,0.5)" : "none",
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