"use client";

import * as React from "react";
import { HTMLMotionProps, MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextStaggerHoverProps {
  text: string;
  index: number;
}
interface HoverSliderImageProps {
  index: number;
  imageUrl: string;
}
interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

function splitText(text: string) {
  const words = text.split(" ").map((w) => w.concat(" "));
  const characters = words.map((w) => w.split("")).flat(1);
  return { words, characters };
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined);
function useHoverSliderContext() {
  const ctx = React.useContext(HoverSliderContext);
  if (!ctx) throw new Error("useHoverSliderContext must be used within HoverSlider");
  return ctx;
}

export const HoverSlider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const changeSlide = React.useCallback((i: number) => setActiveSlide(i), []);
    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div ref={ref} className={cn(className)} {...props}>
          {children}
        </div>
      </HoverSliderContext.Provider>
    );
  }
);
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;
  const handleMouse = () => changeSlide(index);
  return (
    <a
      ref={ref}
      onMouseEnter={handleMouse}
      className={cn(
        "relative inline-block cursor-pointer overflow-hidden text-[clamp(2.25rem,7vw,6rem)] font-semibold leading-[1] tracking-tight",
        className
      )}
      {...props}
    >
      <MotionConfig transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
        {characters.map((char, i) => (
          <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
            <motion.span
              className="inline-block text-[hsl(var(--muted-fg))]/50"
              animate={isActive ? { y: "-100%" } : { y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.015 }}
            >
              {char}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 inline-block text-foreground"
              initial={{ y: "100%" }}
              animate={isActive ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.3, delay: i * 0.015 }}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </MotionConfig>
    </a>
  );
});
TextStaggerHover.displayName = "TextStaggerHover";

const clipPathVariants = {
  visible: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
  hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)" },
};

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
      className
    )}
    {...props}
  />
));
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();
  return (
    <motion.img
      ref={ref}
      src={imageUrl}
      className={cn("size-full object-cover", className)}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      {...props}
    />
  );
});
HoverSliderImage.displayName = "HoverSliderImage";