import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
              Deepak Prabaharan
            </h3>
            <p className="text-gray-600 text-sm">
              Data Engineer building robust data pipelines and analytics solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/resume" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/deepakprabaharan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/deepakprabaharan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:deepak@example.com"
                className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Deepak Prabaharan. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
