import { Nav } from "@/components/Nav";
import { Projects } from "@/components/sections/Projects";
import { Devices } from "@/components/sections/Devices";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { ChromeWavefield } from "@/components/ui/chrome-wavefield";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <ChromeWavefield />
      <Projects />
      <SectionDivider variant="deep" />
      <Devices />
    </main>
    <Footer />
  </div>
);

export default Index;