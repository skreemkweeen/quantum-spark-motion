import { ReactNode, HTMLAttributes } from "react";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

interface ParallaxProps extends HTMLAttributes<HTMLDivElement> {
  speed?: number;
  children: ReactNode;
}

export const Parallax = ({ speed = 1, className, children, ...rest }: ParallaxProps) => {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {children}
    </div>
  );
};
