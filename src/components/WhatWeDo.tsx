import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import serviceUxUi from "@/assets/service-uxui.png";

const serviceData: GalleryItem[] = [
  { common: "UX / UI Design", binomial: "RESEARCH · PROTOTYPE · SHIP", photo: { url: serviceUxUi, text: "UI design interface", pos: "center", by: "01" } },
  { common: "Graphic Design", binomial: "VISUAL · EDITORIAL · PRINT", photo: { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop&q=80", text: "abstract graphic design", by: "02" } },
  { common: "Art Direction", binomial: "CONCEPT · VISION · EXECUTE", photo: { url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&auto=format&fit=crop&q=80", text: "art direction creative", by: "03" } },
  { common: "Brand Identity", binomial: "MARK · SYSTEM · LANGUAGE", photo: { url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=900&auto=format&fit=crop&q=80", text: "brand identity colours", by: "04" } },
  { common: "Web Design", binomial: "LAYOUT · MOTION · CODE", photo: { url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&auto=format&fit=crop&q=80", text: "web design on screen", by: "05" } },
  { common: "Motion Design", binomial: "ANIMATE · SEQUENCE · FEEL", photo: { url: "https://images.unsplash.com/photo-1574717024652-8a8fad0f3e98?w=900&auto=format&fit=crop&q=80", text: "motion design blur", by: "06" } },
  { common: "Marketing", binomial: "REACH · CONVERT · GROW", photo: { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80", text: "digital marketing analytics", by: "07" } },
  { common: "Strategy", binomial: "DEFINE · ALIGN · EXECUTE", photo: { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80", text: "strategy planning", by: "08" } },
];

const arrowBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  borderRadius: 2,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.85)",
  transition: "border-color 0.3s ease, background 0.3s ease",
  cursor: "pointer",
};

const onArrowEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
  const el = e.currentTarget;
  el.style.borderColor = "rgba(255,255,255,0.35)";
  el.style.background = "rgba(255,255,255,0.08)";
};
const onArrowLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  const el = e.currentTarget;
  el.style.borderColor = "rgba(255,255,255,0.12)";
  el.style.background = "rgba(255,255,255,0.04)";
};

export function WhatWeDo() {
  const anglePerItem = 360 / serviceData.length;
  const [rotationOffset, setRotationOffset] = useState(0);
  const prev = () => setRotationOffset((o) => o - anglePerItem);
  const next = () => setRotationOffset((o) => o + anglePerItem);

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: "#050508", paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      {/* Continuity grid + atmospheric fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "132px 132px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, #000 40%, transparent 95%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, #050508, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, #050508, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(140,80,255,0.04), transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                marginBottom: "1rem",
              }}
            >
              Our Expertise
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem,5vw,4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                color: "#fff",
              }}
            >
              WHAT WE DO
            </h2>
          </div>
          <div className="hidden h-px w-40 origin-left md:block" style={{ background: "rgba(255,255,255,0.14)" }} />
        </div>
      </div>

      {/* Carousel stage */}
      <div
        className="relative mx-auto mt-16"
        style={{ height: "clamp(420px, 55vh, 560px)", width: "100%" }}
      >
        <CircularGallery items={serviceData} radius={520} rotationOffset={rotationOffset} autoRotateSpeed={0.012} />
        {/* Edge fades for cinematic falloff */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-40"
          style={{ background: "linear-gradient(to right, #050508, transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-40"
          style={{ background: "linear-gradient(to left, #050508, transparent)" }}
        />
      </div>

      {/* Footer row: controls + supporting copy */}
      <div className="relative mx-auto mt-14 max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous service"
              onClick={prev}
              onMouseEnter={onArrowEnter}
              onMouseLeave={onArrowLeave}
              style={arrowBtn}
            >
              <ArrowLeft size={16} strokeWidth={1.4} />
            </button>
            <button
              type="button"
              aria-label="Next service"
              onClick={next}
              onMouseEnter={onArrowEnter}
              onMouseLeave={onArrowLeave}
              style={arrowBtn}
            >
              <ArrowRight size={16} strokeWidth={1.4} />
            </button>
            <span
              style={{
                marginLeft: 12,
                fontSize: "8px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.24)",
              }}
            >
              Rotate · {serviceData.length} disciplines
            </span>
          </div>
          <p
            className="md:text-right"
            style={{
              fontSize: "12px",
              lineHeight: 1.8,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.34)",
              maxWidth: "32rem",
              marginLeft: "auto",
            }}
          >
            We craft digital systems and experiences that not only meet but exceed the expectations of the brands we build for.
          </p>
        </div>
      </div>
    </section>
  );
}
