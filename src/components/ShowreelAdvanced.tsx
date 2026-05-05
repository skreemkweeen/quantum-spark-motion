"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Play, X } from "lucide-react";

export default function ShowreelAdvanced() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const ringRef = useRef<SVGCircleElement | null>(null);
  const glitchRef = useRef<HTMLDivElement | null>(null);

  // Loader animation
  useEffect(() => {
    if (!loading || !ringRef.current) return;
    gsap.fromTo(
      ringRef.current,
      { strokeDashoffset: 238 },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          setTimeout(() => setOpen(true), 300);
        },
      }
    );
  }, [loading]);

  // Glitch loop
  useEffect(() => {
    if (!open || !glitchRef.current) return;
    const el = glitchRef.current;
    const glitch = () => {
      gsap.to(el, {
        x: Math.random() * 6 - 3,
        skewX: Math.random() * 10 - 5,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        clearProps: "all",
      });
    };
    const interval = setInterval(glitch, 1200);
    return () => clearInterval(interval);
  }, [open]);

  // Cursor distortion
  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!glitchRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to(glitchRef.current, { x, y, duration: 0.3, ease: "power2.out" });
  };

  return (
    <>
      <button
        onClick={() => setLoading(true)}
        onMouseMove={handleMove}
        className="group flex items-center gap-5 cursor-pointer"
      >
        <div ref={glitchRef} className="relative h-20 w-20">
          <svg className="absolute inset-0" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="hsl(var(--accent-line))"
              strokeWidth="1"
            />
          </svg>
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
            <circle
              ref={ringRef}
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              strokeDasharray="238"
              strokeDashoffset="238"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-5 w-5 fill-foreground text-foreground" />
          </div>
        </div>
        <span className="text-left text-xs uppercase tracking-[0.3em] text-foreground">
          Watch
          <br />
          Showreel
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative aspect-video w-[90vw] max-w-5xl overflow-hidden rounded-sm border border-[hsl(var(--accent-line))] bg-black"
            >
              <video
                src="https://res.cloudinary.com/dan1xbozd/video/upload/v1778015265/hf_20260505_200834_7873eeb8-103f-4832-aac7-bec85b693793_1_owfgeg.mp4"
                autoPlay
                controls
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => {
                  setOpen(false);
                  setLoading(false);
                }}
                className="absolute right-4 top-4 text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}