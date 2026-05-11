import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../lib/projects";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <Link
        href="/portfolio"
        className="text-xs text-purple-400/70 tracking-widest uppercase hover:text-purple-400 transition-colors mb-10 inline-block"
      >
        ← Back to Portfolio
      </Link>

      <p className="text-xs tracking-[0.4em] uppercase text-purple-500/70 mb-2">// Project</p>
      <h1 className="text-3xl sm:text-5xl font-bold mb-8 tracking-tight glow-purple text-purple-400">
        {project.title}
      </h1>

      {/* Description */}
      <div className="bg-[#0a0a1a] rounded border border-purple-500/20 p-8 mb-6 border-glow-purple">
        <h2 className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4">
          // Description
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm">{project.fullDescription}</p>
      </div>

      {/* Skills */}
      <div className="bg-[#0a0a1a] rounded border border-purple-500/20 p-8 mb-6 border-glow-purple">
        <h2 className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4">
          // Skills Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border border-purple-500/30 text-purple-400 rounded text-xs font-medium tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Live Link */}
      <div className="bg-[#0a0a1a] rounded border border-purple-500/20 p-8 border-glow-purple">
        <h2 className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4">
          // Live Project
        </h2>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 border border-purple-500 text-purple-400 text-sm font-medium tracking-widest uppercase rounded hover:bg-purple-500/10 transition-all"
          style={{ boxShadow: "0 0 12px rgba(168,85,247,0.3)" }}
        >
          Open Project //
        </a>
      </div>
    </div>
  );
}
