import { Link, useParams } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/components/sections/Projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="mx-auto max-w-7xl px-6 pt-40">
          <h1 className="text-4xl font-semibold">Project not found</h1>
          <Link to="/" className="mt-6 inline-block text-sm text-[hsl(var(--muted-fg))] hover:text-foreground">← Back</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link to="/#work" className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))] hover:text-foreground">← Selected Work</Link>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-8 text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-tight">{project.title}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">{project.tag}</p>
          </Reveal>
        </div>
        <Reveal delay={240}>
          <div className="mx-auto mt-16 aspect-[16/9] w-full max-w-7xl overflow-hidden rounded-sm bg-[hsl(0_0%_10%)]">
            <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-12 pb-32 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Overview</h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-2xl leading-relaxed tracking-tight">
              A precision case study for {project.title} — interaction design,
              motion language, and engineered front-end. Detailed write-up coming
              soon.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;