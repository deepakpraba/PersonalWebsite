import { ExternalLink, Github, Folder } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
          <Folder size={24} />
        </div>
        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="View code on GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
