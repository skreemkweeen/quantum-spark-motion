import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Devices } from "@/components/sections/Devices";
import { Footer } from "@/components/sections/Footer";
import { ParallaxHero } from "@/components/ui/parallax-scrolling";
import Threads from "@/components/ui/threads";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
          <Threads color={[1, 1, 1]} amplitude={1.2} distance={0.1} enableMouseInteraction={false} />
        </div>
        <div className="relative z-10">
          <ParallaxHero title="ELEMENT UX" />
          {/* Seamless blend into Hero */}
          <div className="pointer-events-none -mt-32 h-32 bg-gradient-to-b from-transparent to-background" />
          <Hero />
        </div>
      </div>
      <Projects />
      <Devices />
    </main>
    <Footer />
  </div>
);

export default Index;