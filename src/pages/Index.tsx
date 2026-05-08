import { Nav } from "@/components/Nav";
import { Projects } from "@/components/sections/Projects";
import { Devices } from "@/components/sections/Devices";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";
import { WhatWeDo } from "@/components/WhatWeDo";
import { IntelligenceCore } from "@/components/IntelligenceCore";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <TheInfiniteGrid />
      <Projects />
      <WhatWeDo />
      <IntelligenceCore />
      <SectionDivider variant="deep" />
      <Devices />
    </main>
    <Footer />
  </div>
);

export default Index;
