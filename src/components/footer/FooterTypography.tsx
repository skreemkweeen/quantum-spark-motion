import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface FooterTypographyProps {
  ctaText?: string;
  ghostWord?: string;
  accentColor?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
};
const wordVariants: Variants = {
  hidden: { y: "105%", opacity: 0, rotateX: 12 },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
};
const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 },
  },
};

function WordReveal({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.35em]">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ perspective: 800 }}
        >
          <motion.span variants={wordVariants} className="inline-block will-change-transform">
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FooterTypography({
  ctaText = "Start Something Exceptional.",
  ghostWord,
  accentColor = "140, 80, 255",
}: FooterTypographyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const ghost = ghostWord ?? ctaText.split(" ")[0];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative px-6 py-32 text-center md:py-44"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-black uppercase leading-none tracking-tighter text-white/[0.025]"
        style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}
      >
        {ghost}
      </span>

      <motion.div
        variants={fadeUpVariants}
        className="relative mx-auto flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/60"
      >
        <span>Ready to create</span>
        <motion.span
          variants={lineVariants}
          className="block h-px w-16 origin-left"
          style={{ background: `linear-gradient(to right, rgba(${accentColor}, 0.8), transparent)` }}
        />
      </motion.div>

      <h2
        className="relative mx-auto mt-8 max-w-5xl font-semibold leading-[0.95] tracking-tight text-white"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        <WordReveal text={ctaText} />
      </h2>

      <motion.p
        variants={fadeUpVariants}
        className="relative mx-auto mt-10 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
      >
        Every exceptional project begins with a single decision.
        <br />
        Let's make something that endures.
      </motion.p>
    </motion.div>
  );
}
