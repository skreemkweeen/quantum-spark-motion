import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

interface FooterNavigationProps {
  nextProject?: { title: string; slug: string };
  email?: string;
  location?: string;
  copyrightName?: string;
  accentColor?: string;
}

function item(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay },
    },
  };
}

export function FooterNavigation({
  nextProject,
  email = "studio@elementux.co",
  location = "Lisbon · New York",
  copyrightName = "Elementux",
  accentColor = "140, 80, 255",
}: FooterNavigationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const year = new Date().getFullYear();

  return (
    <div ref={ref} className="relative px-6 pb-16 pt-12 md:pb-20 md:pt-16">
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, rgba(${accentColor}, 0.35), transparent)` }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <motion.div variants={item(0)} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Navigation</p>
            <Link
              to="/#work"
              className="group mt-4 inline-flex items-center gap-2 text-base text-white/85 transition-colors hover:text-white"
            >
              <span>Back to Work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </motion.div>

          <motion.div variants={item(0.08)} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              {nextProject ? "Next Project" : ""}
            </p>
            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group mt-4 inline-flex items-center gap-2 text-base text-white/85 transition-colors hover:text-white"
              >
                <span>{nextProject.title}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}
          </motion.div>

          <motion.div variants={item(0.16)} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Contact</p>
            <a
              href={`mailto:${email}`}
              className="group mt-4 inline-flex items-center gap-2 text-base text-white/85 transition-colors hover:text-white"
            >
              <span>{email}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={item(0.28)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.25em] text-white/40 md:flex-row md:items-center"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
          <div>© {year} {copyrightName}. All rights reserved.</div>
        </motion.div>
      </div>
    </div>
  );
}
