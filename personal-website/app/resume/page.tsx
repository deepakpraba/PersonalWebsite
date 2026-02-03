import { Download, Mail, MapPin, Linkedin, Github, FileText, Briefcase, GraduationCap, Award } from 'lucide-react'
import { skills } from '@/lib/skills'

export const metadata = {
  title: 'Resume | Deepak Prabaharan',
  description: 'Resume of Deepak Prabaharan - Data Engineer',
}

export default function ResumePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-xl text-white">
                <FileText size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Resume</h1>
                <p className="text-gray-600">Download or view my professional resume</p>
              </div>
            </div>
            <a
              href="/resume.pdf"
              download
              className="btn-primary flex items-center gap-2"
            >
              <Download size={20} /> Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Deepak Prabaharan</h2>
              <p className="text-xl text-blue-100 mb-4">Data Engineer</p>
              <div className="flex flex-wrap gap-4 text-blue-100">
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> Irving, Texas
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={16} /> deepak@example.com
                </span>
                <a
                  href="https://linkedin.com/in/deepakprabaharan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="https://github.com/deepakprabaharan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Summary */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-blue-600" />
                  </div>
                  Professional Summary
                </h3>
                <p className="text-gray-700 leading-relaxed pl-10">
                  Data Engineer with expertise in modern data stack technologies including dbt, Apache
                  Airflow, and Snowflake. Passionate about building scalable data pipelines and analytics
                  solutions that drive business value. AWS certified with a strong foundation in Python
                  and SQL. Committed to clean code, data quality, and continuous learning.
                </p>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase size={16} className="text-blue-600" />
                  </div>
                  Experience
                </h3>
                <div className="pl-10">
                  <div className="border-l-2 border-blue-200 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="mb-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900">Data Engineer</h4>
                          <p className="text-blue-600 font-medium">Lennar</p>
                        </div>
                        <span className="text-gray-500 text-sm">April 2025 - Present</span>
                      </div>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          Build and maintain data pipelines using dbt and Apache Airflow for ETL/ELT processes
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          Develop Five Star Plan Performance Dashboard with comprehensive Snowflake analytics
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          Implement data quality frameworks and real-time monitoring systems
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          Integrate BuildPro data using Qlik Replicate and Apache Iceberg
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          Migrate ATP/JIRA PowerBI connectors with 100% column match accuracy
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award size={16} className="text-blue-600" />
                  </div>
                  Technical Skills
                </h3>
                <div className="pl-10 grid md:grid-cols-2 gap-4">
                  {skills.map((category) => (
                    <div key={category.category} className="bg-gray-50 rounded-lg p-4">
                      <span className="font-semibold text-gray-900 text-sm">{category.category}</span>
                      <p className="text-gray-600 text-sm mt-1">{category.skills.join(' • ')}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award size={16} className="text-blue-600" />
                  </div>
                  Certifications
                </h3>
                <div className="pl-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Award size={18} className="text-yellow-600" />
                    <span className="font-medium text-gray-900">AWS Certified Cloud Practitioner</span>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap size={16} className="text-blue-600" />
                  </div>
                  Education & Goals
                </h3>
                <div className="pl-10">
                  <p className="text-gray-700">
                    <span className="font-medium">Pursuing:</span> Master of Science in Artificial
                    Intelligence - University of Texas at Austin
                  </p>
                </div>
              </section>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            Download the PDF version for a printer-friendly format
          </p>
        </div>
      </section>
    </div>
  )
}
