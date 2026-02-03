import Link from 'next/link'
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import SkillBadge from '@/components/SkillBadge'
import { projects } from '@/lib/projects'
import { skills } from '@/lib/skills'

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 mb-6 shadow-sm">
                <MapPin size={16} className="text-blue-600" />
                Irving, Texas
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Deepak Prabaharan
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 mb-6 flex items-center gap-2">
                <Sparkles size={24} className="text-yellow-500" />
                Data Engineer @ Lennar
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Building robust data pipelines and analytics solutions using modern data stack
                technologies. Specializing in{' '}
                <span className="font-semibold text-blue-600">dbt</span>,{' '}
                <span className="font-semibold text-blue-600">Airflow</span>, and{' '}
                <span className="font-semibold text-blue-600">cloud data platforms</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  View Projects <ArrowRight size={20} />
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download Resume
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden md:flex justify-center opacity-0 animate-fade-in animation-delay-200">
              <div className="relative">
                <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-64 h-64 lg:w-72 lg:h-72 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      DP
                    </span>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-700 animate-bounce">
                  dbt
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-700 animate-bounce animation-delay-200">
                  Snowflake
                </div>
                <div className="absolute top-1/2 -right-8 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-700 animate-bounce animation-delay-300">
                  AWS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">About Me</h2>
            <p className="section-subheading mx-auto">
              Passionate about transforming raw data into actionable insights
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">What I Do</h3>
              <p className="text-gray-700 leading-relaxed">
                I&apos;m a Data Engineer at Lennar, where I build and maintain data pipelines that
                power business analytics and decision-making. My work focuses on transforming raw
                data into actionable insights using modern data engineering tools like dbt, Apache
                Airflow, and Snowflake.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">My Journey</h3>
              <p className="text-gray-700 leading-relaxed">
                I hold an AWS Cloud Practitioner certification and am pursuing advanced studies in
                AI and machine learning. I&apos;m always exploring new technologies and approaches
                to data engineering, with a goal of attending UT Austin for a Master&apos;s in AI.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Learn more about me <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Technical Skills</h2>
            <p className="section-subheading mx-auto">
              Technologies I use to build modern data solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category) => (
              <div key={category.category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="secondary" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="section-heading">Featured Projects</h2>
              <p className="text-gray-600">Some of my recent data engineering work</p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View all projects <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`opacity-0 animate-fade-in-up`}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            I&apos;m always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:deepak@example.com"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
            <Link
              href="/resume"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
            >
              View Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
