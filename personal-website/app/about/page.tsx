import { MapPin, Briefcase, GraduationCap, Award, Code, Database, Cloud, Terminal } from 'lucide-react'
import { skills } from '@/lib/skills'

export const metadata = {
  title: 'About | Deepak Prabaharan',
  description: 'Learn more about Deepak Prabaharan - Data Engineer at Lennar',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Me
                </span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I&apos;m a Data Engineer passionate about building scalable data infrastructure and
                transforming raw data into actionable insights that drive business decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-gray-700">
                  <MapPin size={18} className="text-blue-600" />
                  Irving, Texas
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-gray-700">
                  <Briefcase size={18} className="text-blue-600" />
                  Data Engineer @ Lennar
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-gray-700">
                  <Award size={18} className="text-blue-600" />
                  AWS Certified
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    DP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">My Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I specialize in building and maintaining modern data infrastructure using tools
                  like dbt, Apache Airflow, and Snowflake. My work involves creating robust data
                  pipelines, developing analytics solutions, and ensuring data quality across the
                  organization.
                </p>
                <p>
                  At Lennar, I&apos;ve had the opportunity to work on exciting projects ranging from
                  building performance dashboards to implementing data integration solutions. I&apos;m
                  passionate about writing clean, maintainable code and implementing best practices
                  in data engineering.
                </p>
                <p>
                  Outside of work, I&apos;m always exploring new technologies, learning about AI and
                  machine learning, and pursuing my interests in DJing and financial optimization.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">What Drives Me</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <Database className="text-blue-600 mb-3" size={28} />
                  <h3 className="font-semibold mb-2">Data Architecture</h3>
                  <p className="text-sm text-gray-600">Designing scalable data systems</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <Code className="text-blue-600 mb-3" size={28} />
                  <h3 className="font-semibold mb-2">Clean Code</h3>
                  <p className="text-sm text-gray-600">Writing maintainable solutions</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <Cloud className="text-blue-600 mb-3" size={28} />
                  <h3 className="font-semibold mb-2">Cloud Platforms</h3>
                  <p className="text-sm text-gray-600">Leveraging cloud technologies</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <Terminal className="text-blue-600 mb-3" size={28} />
                  <h3 className="font-semibold mb-2">Automation</h3>
                  <p className="text-sm text-gray-600">Streamlining data workflows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-4 border-blue-600 pl-8 pb-8">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Data Engineer</h3>
                    <p className="text-blue-600 font-medium">Lennar</p>
                  </div>
                  <span className="text-gray-500 text-sm mt-2 md:mt-0">April 2025 - Present</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Build and maintain data pipelines using dbt and Apache Airflow
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Develop analytics solutions for homebuilding performance metrics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Implement data quality frameworks and monitoring systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Collaborate with cross-functional teams to deliver insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category) => (
              <div
                key={category.category}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Future Goals</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <GraduationCap className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3 text-white">Academic Pursuits</h3>
              <p className="text-blue-100">
                Pursuing a Master&apos;s degree in Artificial Intelligence from UT Austin to deepen
                my understanding of ML and its applications in data engineering.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <Briefcase className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3 text-white">Professional Growth</h3>
              <p className="text-blue-100">
                Lead large-scale data platform initiatives and contribute to open-source data
                engineering projects while building impactful solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
