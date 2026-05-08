import { Nav } from "@/components/Nav";
import { Projects } from "@/components/sections/Projects";
import { Devices } from "@/components/sections/Devices";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";
import { WhatWeDo } from "@/components/WhatWeDo";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <TheInfiniteGrid />
      <WhatWeDo />
      <Projects />
      <SectionDivider variant="deep" />
      <Devices />
    </main>
    <Footer />
  </div>
);

export default Index;
