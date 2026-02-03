import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/projects'
import { Folder } from 'lucide-react'

export const metadata = {
  title: 'Projects | Deepak Prabaharan',
  description: 'View data engineering projects by Deepak Prabaharan',
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <Folder size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              My{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            A collection of data engineering projects I&apos;ve worked on, featuring data pipelines,
            analytics dashboards, and data integrations.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Other Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${(featuredProjects.length + index) * 100}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    liveUrl={project.liveUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Collaboration?</h2>
          <p className="text-blue-100 text-lg mb-8">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <a
            href="mailto:deepak@example.com"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
