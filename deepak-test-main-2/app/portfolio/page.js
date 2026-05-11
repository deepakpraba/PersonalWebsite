import Link from "next/link";
import { projects } from "../lib/projects";

export default function Portfolio() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <p className="text-xs tracking-[0.4em] uppercase text-purple-500/70 mb-2">// Works</p>
      <h1 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight glow-purple text-purple-400">Portfolio</h1>
      <p className="text-zinc-600 text-xs tracking-widest uppercase mb-10">A selection of projects I&apos;ve worked on</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0a0a1a] rounded border border-purple-500/20 p-6 flex flex-col justify-between border-glow-purple hover:border-purple-500/50 transition-all"
          >
            <div>
              <h2 className="text-base font-semibold text-purple-400 tracking-widest uppercase mb-3">{project.title}</h2>
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 border border-zinc-700 text-zinc-500 rounded text-xs font-medium tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/portfolio/${project.slug}`}
              className="mt-2 inline-block px-6 py-3 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 rounded text-base font-medium tracking-widest uppercase transition-all text-center"
            >
              View Project →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

