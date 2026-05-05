import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Devices } from "@/components/sections/Devices";
import { Footer } from "@/components/sections/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <Hero />
      <Projects />
      <Devices />
    </main>
    <Footer />
  </div>
);

export default Index;