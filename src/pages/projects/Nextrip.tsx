{
  /* ============================== 04 SPLASH ============================== */
}
<section id="splash" className="relative overflow-hidden">
  <Bezel />
  <SectionMark index="03" title="Splash Screens" />

  <div className="relative mx-auto max-w-[1600px] px-8 py-40 md:py-56">
    {/* Massive atmospheric environment */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 50% 40%, rgba(220,228,240,0.12), transparent 30%),
          radial-gradient(circle at 20% 50%, rgba(70,90,140,0.10), transparent 40%),
          radial-gradient(circle at 80% 50%, rgba(70,90,140,0.08), transparent 40%),
          linear-gradient(180deg, rgba(4,4,8,0.2), rgba(4,4,8,0.95))
        `,
      }}
    />

    {/* Cinematic glow haze */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.08), transparent 70%)",
        filter: "blur(80px)",
      }}
    />

    {/* Large ghost typography */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        fontSize: "clamp(8rem, 18vw, 22rem)",
        fontFamily: fontDisplay,
        letterSpacing: "-0.08em",
        color: "rgba(255,255,255,0.025)",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      NEXTRIP
    </div>

    {/* Editorial top metadata */}
    <div className="relative mb-28 flex items-start justify-between">
      <div>
        <div style={labelXS}>ONE IDENTITY</div>
        <div
          className="mt-4"
          style={{
            ...labelXS,
            color: "rgba(255,255,255,0.35)",
            lineHeight: 2,
          }}
        >
          unfolding in motion.
        </div>
      </div>

      <div
        className="hidden md:block text-right"
        style={{
          ...labelXS,
          color: "rgba(255,255,255,0.35)",
          lineHeight: 2,
        }}
      >
        <div>RENDER · 1×</div>
        <div>STUDIO LIGHT · COOL</div>
      </div>
    </div>

    {/* Main cinematic stage */}
    <div className="relative flex justify-center items-center min-h-[900px]">
      {/* Floating atmospheric rings */}
      <div
        aria-hidden
        className="absolute w-[1200px] h-[1200px] rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      />

      <div
        aria-hidden
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      {/* Massive cinematic floor glow */}
      <div
        aria-hidden
        className="absolute bottom-[-120px] left-1/2 -translate-x-1/2"
        style={{
          width: "80%",
          height: "300px",
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(220,228,240,0.20), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Phones image */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        {/* Halo behind phones */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.10), transparent 70%)",
            filter: "blur(60px)",
            transform: "scale(1.2)",
          }}
        />

        <img
          src={splashTrio}
          alt="NexTrip splash screens"
          className="relative w-full max-w-[1200px] h-auto object-contain"
          style={{
            filter: `
              drop-shadow(0 40px 80px rgba(0,0,0,0.95))
              drop-shadow(0 120px 160px rgba(0,0,0,0.95))
              drop-shadow(0 0 100px rgba(220,228,240,0.12))
            `,
          }}
        />
      </motion.div>

      {/* Side rail */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-px"
            style={{
              width: i === 3 ? "60px" : "20px",
              background: i === 3 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}

        <div
          style={{
            ...labelXS,
            color: "rgba(255,255,255,0.8)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "0.4em",
          }}
        >
          CONCEPT
        </div>
      </div>
    </div>

    {/* Bottom cinematic rail */}
    <div className="relative mt-24 flex items-center justify-between">
      <span style={labelXS}>FRAME 01 · CITY</span>

      <div
        className="mx-8 h-px flex-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      <span style={labelXS}>FRAME 02 · AIR</span>

      <div
        className="mx-8 h-px flex-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      <span style={labelXS}>FRAME 03 · ARRIVAL</span>
    </div>
  </div>
</section>;
