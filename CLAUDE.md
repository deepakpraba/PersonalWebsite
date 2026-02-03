# Personal Portfolio Website - Development Guide

## Project Overview

Building a professional portfolio website for Deepak Prabaharan - Data Engineer at Lennar, showcasing projects, experience, and technical skills.

**Tech Stack:**

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel
- Custom domain: deepakprabaharan.com (or similar)

---

## Quick Start Commands

### Initialize Project

```bash
# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest personal-website --typescript --tailwind --app --no-src-dir

# Navigate to project
cd personal-website

# Install dependencies (if any additional needed)
npm install lucide-react  # For icons

# Run development server
npm run dev
# Visit http://localhost:3000
```

### Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Git
git add .
git commit -m "Initial commit"
git push origin main
```

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **Prettier - Code formatter** - Auto-formatting
- **ESLint** - Linting
- **Auto Rename Tag** - Automatically rename paired HTML tags
- **GitLens** - Git supercharged

---

## Project Structure

```
personal-website/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global Tailwind styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── projects/
│   │   └── page.tsx        # Projects showcase
│   └── resume/
│       └── page.tsx        # Resume/CV page
├── components/
│   ├── Header.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer with links
│   ├── Hero.tsx            # Hero section for home page
│   ├── ProjectCard.tsx     # Individual project card
│   ├── SkillBadge.tsx      # Technology skill badges
│   └── ContactButton.tsx   # Contact CTA button
├── lib/
│   ├── projects.ts         # Project data
│   └── skills.ts           # Skills/technologies data
├── public/
│   ├── images/
│   │   ├── headshot.jpg    # Professional photo
│   │   └── projects/       # Project screenshots
│   ├── resume.pdf          # Downloadable resume
│   └── favicon.ico
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## Design Guidelines

### Color Scheme (Professional & Modern)

- **Primary:** Blue (#3B82F6) - Trust, professionalism
- **Secondary:** Slate (#64748B) - Text, subtle elements
- **Background:** White (#FFFFFF) or Very Light Gray (#F9FAFB)
- **Accent:** Emerald (#10B981) - Call-to-action buttons
- **Text:** Dark Gray (#1F2937) - Main content

### Typography

- **Headings:** Inter or Poppins (clean, modern)
- **Body:** Inter or System UI (readable, professional)
- **Code/Technical:** JetBrains Mono or Fira Code

### Layout Principles

- **Max width:** 1200px for content (centered)
- **Spacing:** Consistent padding/margins (Tailwind spacing scale)
- **Mobile-first:** Design for mobile, scale up to desktop
- **White space:** Don't overcrowd - let content breathe
- **Hierarchy:** Clear visual hierarchy with size/weight/color

---

## Page Breakdown

### 1. Home Page (`app/page.tsx`)

**Sections:**

1. **Hero Section**
   - Name and title (e.g., "Data Engineer @ Lennar")
   - Brief tagline (1-2 sentences about what you do)
   - CTA buttons: "View Projects" & "Download Resume"
   - Professional headshot or avatar

2. **Quick Intro**
   - 2-3 paragraphs about your background
   - Current role highlights
   - What drives you professionally

3. **Featured Skills**
   - Grid of technology badges
   - Core technologies: dbt, Airflow, Snowflake, AWS, Python, SQL
   - Visual icons or logos

4. **Featured Projects** (2-3 top projects)
   - Brief preview cards
   - Link to full projects page

**Design Notes:**

- Keep it clean and scannable
- Use gradients or subtle animations for visual interest
- Ensure fast load time (under 2 seconds)

---

### 2. About Page (`app/about/page.tsx`)

**Content:**

- **Professional Background**
  - Current role at Lennar (April 2025 - Present)
  - Key responsibilities
  - Team structure (reporting to Nilesh Patel & Rob Muniz)

- **Technical Expertise**
  - Modern data stack (dbt, Airflow, Snowflake)
  - Cloud platforms (AWS)
  - Data engineering specialties
  - Certifications (AWS Cloud Practitioner)

- **Journey & Interests**
  - Career path
  - What you're learning (DJing, financial optimization)
  - Academic pursuits (UT Austin Master's in AI interest)

- **Personal Touch**
  - Based in Irving, Texas
  - Interests outside work
  - What makes you unique

**Design Notes:**

- Split screen: photo on one side, content on other (desktop)
- Timeline for career progression
- Skill bars or competency indicators

---

### 3. Projects Page (`app/projects/page.tsx`)

**Project Cards - Include for each:**

- Project name
- Brief description (2-3 sentences)
- Technologies used (badges)
- Key achievements/impact
- Screenshot or visual
- GitHub link (if applicable)

**Project Ideas to Feature:**

1. **Five Star Plan Performance Dashboard**
   - dbt models for homebuilding analytics
   - SQL transformations, metric calculations
   - Star rating systems
   - Technologies: dbt, Snowflake, SQL

2. **Data Pipeline Orchestration**
   - Airflow DAG development
   - ETL processes
   - Error handling and monitoring
   - Technologies: Airflow, Python, AWS

3. **BuildPro Data Integration**
   - Qlik Replicate integration
   - StageRaw model development
   - Schema synchronization
   - Technologies: Qlik, dbt, Iceberg

4. **ATP/JIRA PowerBI Migration**
   - Connector migration
   - 100% column match achievement
   - Technologies: PowerBI, SQL

5. **Personal Projects** (if any)
   - Side projects
   - Open source contributions
   - Learning experiments

**Design Notes:**

- Grid layout (2-3 columns on desktop)
- Hover effects on cards
- Filter by technology (optional enhancement)
- "View Details" expands card or goes to detailed page

---

### 4. Resume Page (`app/resume/page.tsx`)

**Options:**

**Option A: Embedded Resume**

- Display resume content directly on page
- Styled with Tailwind
- Downloadable PDF button at top

**Option B: PDF Viewer**

- Embed PDF viewer
- Download button
- Print button

**Content Sections:**

- Header (Name, Title, Contact)
- Summary
- Work Experience (reverse chronological)
- Education
- Skills & Technologies
- Certifications
- Notable Achievements

**Design Notes:**

- Clean, ATS-friendly layout
- Print-friendly styling
- Easy to scan
- Download button prominent

---

## Component Details

### Header Component (`components/Header.tsx`)

```typescript
// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
];

// Features:
// - Sticky/fixed position
// - Mobile hamburger menu
// - Active link highlighting
// - Smooth transitions
```

### Footer Component (`components/Footer.tsx`)

```typescript
// Include:
// - Social links (LinkedIn, GitHub, Email)
// - Copyright notice
// - Quick links to main pages
// - Optional: "Built with Next.js" badge
```

### ProjectCard Component (`components/ProjectCard.tsx`)

```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

// Features:
// - Hover effects (scale, shadow)
// - Technology badges
// - Responsive image
// - CTA buttons
```

---

## Data Structure

### Projects Data (`lib/projects.ts`)

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    id: "five-star-dashboard",
    title: "Five Star Plan Performance Dashboard",
    description:
      "Comprehensive analytics dashboard for homebuilding performance metrics using dbt and Snowflake",
    technologies: ["dbt", "Snowflake", "SQL", "Airflow"],
    featured: true,
    date: "2025-01",
  },
  // Add more projects...
];
```

### Skills Data (`lib/skills.ts`)

```typescript
export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Data Engineering",
    skills: ["dbt", "Apache Airflow", "Apache Iceberg", "ETL/ELT"],
  },
  {
    category: "Cloud & Data Platforms",
    skills: ["AWS", "Snowflake", "Amazon Athena", "Microsoft Fabric"],
  },
  {
    category: "Programming",
    skills: ["Python", "SQL", "TypeScript", "JavaScript"],
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "Docker", "Qlik Replicate", "PowerBI"],
  },
];
```

---

## Implementation Steps

### Phase 1: Setup & Foundation

1. Initialize Next.js project: `npx create-next-app@latest`
2. Configure TypeScript and Tailwind
3. Set up project structure (folders/files)
4. Install dependencies (if any additional needed)

### Phase 2: Core Layout

1. Build Header component with navigation
2. Build Footer component
3. Create root layout (`app/layout.tsx`)
4. Set up global styles and Tailwind config

### Phase 3: Home Page

1. Create Hero section component
2. Build quick intro section
3. Add featured skills display
4. Add featured projects preview
5. Ensure mobile responsiveness

### Phase 4: About Page

1. Structure content sections
2. Add professional background
3. Create skills/expertise display
4. Add personal touches
5. Include professional photo

### Phase 5: Projects Page

1. Create ProjectCard component
2. Populate projects data
3. Build grid layout
4. Add filtering/sorting (optional)
5. Ensure responsive design

### Phase 6: Resume Page

1. Choose embedded vs PDF viewer approach
2. Create resume layout
3. Add download functionality
4. Style for print
5. Test across devices

### Phase 7: Polish & Optimization

1. Add animations (subtle, professional)
2. Optimize images (Next.js Image component)
3. Test accessibility (keyboard navigation, screen readers)
4. Test performance (Lighthouse scores)
5. Add meta tags for SEO

### Phase 8: Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Configure custom domain
4. Test live site
5. Set up analytics (optional)

---

## Deployment Configuration

### GitHub Setup

1. Create repository on GitHub
2. Initialize git in your project
3. Add remote and push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/personal-website.git
git push -u origin main
```

### Vercel Deployment Steps

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Configure Project (Usually auto-configured)**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get preview URL: `your-project.vercel.app`

### Custom Domain Setup

1. **Buy Domain** (Recommended registrars)
   - Cloudflare ($10/year) - Best value, great DNS
   - Namecheap ($13/year) - Popular, easy to use
   - Google Domains ($12/year) - Simple interface

2. **Connect to Vercel**
   - Vercel Dashboard → Your Project → Settings → Domains
   - Add your domain: `deepakprabaharan.com`
   - Vercel provides DNS records

3. **Update DNS Settings**
   - Go to your domain registrar's DNS settings
   - Add the records Vercel provides:
     - A Record: `76.76.21.21` (or what Vercel shows)
     - CNAME: `cname.vercel-dns.com`
   - For `www` subdomain, add CNAME pointing to your main domain

4. **Wait for Propagation**
   - DNS can take 10 minutes to 48 hours
   - Usually works within 1-2 hours
   - Check status in Vercel dashboard

### Environment Variables (if needed)

Create `.env.local` file (not committed to git):

```
NEXT_PUBLIC_SITE_URL=https://deepakprabaharan.com
# Add any API keys here if needed later
```

In Vercel Dashboard → Settings → Environment Variables:

- Add the same variables
- These are used in production build

### Automatic Deployments

Once connected:

- Push to `main` branch → Automatically deploys to production
- Push to feature branches → Creates preview deployments
- Pull requests → Get preview URLs for testing

---

## Best Practices

### Performance

- Use Next.js `<Image>` component for optimized images
- Lazy load images below the fold
- Minimize JavaScript bundle size
- Use static generation where possible

### SEO

- Add proper meta tags in each page
- Use semantic HTML
- Include alt text for images
- Create descriptive page titles

### Accessibility

- Keyboard navigation support
- ARIA labels where needed
- Color contrast ratios (WCAG AA)
- Focus indicators
- Screen reader friendly

### Responsiveness

- Mobile-first approach
- Test on multiple screen sizes
- Touch-friendly tap targets (44x44px minimum)
- Readable text on all devices

---

---

## Code Snippets & Starter Templates

### Root Layout (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deepak Prabaharan | Data Engineer',
  description: 'Data Engineer specializing in modern data stack technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### Home Page Starter (`app/page.tsx`)

```typescript
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="py-20">
        <h1 className="text-5xl font-bold mb-4">
          Hi, I'm <span className="text-blue-600">Deepak Prabaharan</span>
        </h1>
        <h2 className="text-2xl text-gray-600 mb-6">
          Data Engineer @ Lennar
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Building robust data pipelines and analytics solutions using modern data stack
          technologies. Specializing in dbt, Airflow, and cloud data platforms.
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            View Projects <ArrowRight size={20} />
          </Link>
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 flex items-center gap-2"
          >
            <Download size={20} /> Download Resume
          </a>
        </div>
      </section>
    </div>
  )
}
```

### Header Component (`components/Header.tsx`)

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            DP
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
```

### Footer Component (`components/Footer.tsx`)

```typescript
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © 2025 Deepak Prabaharan. Built with Next.js
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-600 hover:text-blue-600"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### ProjectCard Component (`components/ProjectCard.tsx`)

```typescript
import { ExternalLink, Github } from 'lucide-react'

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
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
          >
            <Github size={18} /> Code
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
          >
            <ExternalLink size={18} /> Live Demo
          </a>
        )}
      </div>
    </div>
  )
}
```

### Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#64748B",
        accent: "#10B981",
      },
    },
  },
  plugins: [],
};
export default config;
```

### Global Styles (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
  }

  .btn-secondary {
    @apply px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors;
  }
}
```

---

## Content Writing Tips

### Professional Tone

- Be confident but not arrogant
- Use active voice
- Be specific about achievements
- Quantify when possible (e.g., "Improved pipeline efficiency by 40%")

### Technical Details

- Explain projects at a high level for non-technical visitors
- Include technical depth for fellow engineers
- Focus on impact and outcomes, not just technologies
- Use clear, jargon-free language when possible

### Personal Touch

- Let your personality show
- Share what excites you about data engineering
- Mention interests that make you unique
- Be authentic

---

---

## Troubleshooting & Common Issues

### Port Already in Use

```bash
# Error: Port 3000 is already in use
# Solution: Kill the process or use a different port
lsof -ti:3000 | xargs kill -9
# Or run on different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Error: Cannot find module '@/components/Header'
# Solution: Check tsconfig.json has correct paths
# Make sure you have this in tsconfig.json:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind Classes Not Working

- Make sure `tailwind.config.ts` includes all content paths
- Restart dev server after changing Tailwind config
- Clear `.next` cache: `rm -rf .next`

### Images Not Loading

- Use Next.js `<Image>` component instead of `<img>`
- Add image domains to `next.config.js` if loading external images
- Images in `/public` folder are accessed without `/public` prefix

### Build Errors on Vercel

- Check that all environment variables are set in Vercel dashboard
- Ensure `package.json` has correct Node version
- Review build logs for specific errors

### TypeScript Errors

- Run `npm run build` locally before deploying
- Use `// @ts-ignore` sparingly (better to fix the type)
- Check that all props have proper TypeScript interfaces

---

## File Naming Conventions

**Components:**

- PascalCase: `Header.tsx`, `ProjectCard.tsx`, `Footer.tsx`
- One component per file
- File name matches component name

**Pages:**

- lowercase: `page.tsx`, `layout.tsx`
- Next.js App Router convention

**Utilities/Libs:**

- camelCase: `projects.ts`, `skills.ts`, `utils.ts`

**CSS:**

- lowercase with hyphens: `globals.css`, `custom-styles.css`

**Images:**

- lowercase with hyphens: `profile-photo.jpg`, `project-screenshot.png`

---

## Git Workflow Best Practices

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit: Next.js project setup"
git branch -M main
git remote add origin https://github.com/yourusername/personal-website.git
git push -u origin main

# Feature development
git checkout -b feature/add-projects-page
# Make changes...
git add .
git commit -m "feat: add projects page with project cards"
git push origin feature/add-projects-page

# Merge to main
git checkout main
git merge feature/add-projects-page
git push origin main
```

**Commit Message Conventions:**

- `feat:` - New feature
- `fix:` - Bug fix
- `style:` - Styling changes
- `docs:` - Documentation updates
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

---

## Launch Checklist

- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] Navigation works correctly
- [ ] Links all functional
- [ ] Resume downloads properly
- [ ] Images optimized and loading
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Meta tags and SEO configured
- [ ] Custom domain connected
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics set up (Google Analytics/Vercel Analytics)
- [ ] 404 page created
- [ ] Favicon added
- [ ] Email/contact info correct

---

## Future Enhancements (Post-Launch)

- [ ] Blog section for technical writing
- [ ] Dark mode toggle
- [ ] Project detail pages (individual pages per project)
- [ ] Contact form
- [ ] Animated data visualizations
- [ ] Case studies for major projects
- [ ] Testimonials/recommendations
- [ ] Interactive resume
- [ ] Newsletter signup
- [ ] Search functionality

---

## Resources

**Design Inspiration:**

- https://brittanychiang.com/
- https://leerob.io/
- https://www.joshwcomeau.com/
- https://dribbble.com/tags/portfolio

**Next.js Documentation:**

- https://nextjs.org/docs
- https://nextjs.org/learn

**Tailwind CSS:**

- https://tailwindcss.com/docs
- https://tailwindui.com/components

**Icons:**

- https://lucide.dev/ (React icons)
- https://heroicons.com/
- https://simpleicons.org/ (brand icons)

**Fonts:**

- https://fonts.google.com/
- Inter, Poppins, Work Sans (recommended)

---

## Notes

- Keep it simple initially - you can always add features later
- Focus on content quality over fancy animations
- Make sure it loads fast (< 2 seconds)
- Test with people in your network for feedback
- Update regularly with new projects and accomplishments
- Use this as a living document - update as you build

**Remember:** Your portfolio is a reflection of your work. Make it clean, professional, and authentic to who you are as a data engineer.

---

## VS Code Productivity Tips

### Useful Keyboard Shortcuts (Mac)

- `Cmd + P` - Quick file search
- `Cmd + Shift + P` - Command palette
- `Cmd + /` - Toggle comment
- `Cmd + D` - Select next occurrence
- `Option + Up/Down` - Move line up/down
- `Cmd + Shift + K` - Delete line
- `Cmd + B` - Toggle sidebar
- `Cmd + J` - Toggle terminal
- `Cmd + \` - Split editor

### Snippets to Add (User Snippets)

Create custom snippets: `Cmd + Shift + P` → "Configure User Snippets"

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "export default function ${1:ComponentName}() {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ]
  },
  "TypeScript Interface": {
    "prefix": "tsi",
    "body": ["interface ${1:InterfaceName} {", "  $0", "}"]
  }
}
```

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Terminal Commands You'll Use Often

```bash
npm run dev       # Start development (most used!)
npm run build     # Test production build
git status        # Check git status
git add .         # Stage all changes
git commit -m ""  # Commit changes
git push          # Push to GitHub
```

---

Good luck building! 🚀
