# deepak-test

A Next.js web app built with JavaScript and Tailwind CSS.

## Prerequisites

Node.js is managed via [nvm](https://github.com/nvm-sh/nvm). If you don't have it installed:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install --lts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Edit `app/page.js` to start building — the page auto-updates as you save.

## Project Structure

```
app/
  layout.js       # Root layout (shared across all pages)
  page.js         # Home page (/)
  globals.css     # Global styles (Tailwind base)
  about/
    page.js       # About page (/about)
  portfolio/
    page.js       # Portfolio page (/portfolio)
    [slug]/
      page.js     # Individual project pages (/portfolio/:slug)
  contact/
    page.js       # Contact form page (/contact)
  api/
    contact/
      route.js    # POST handler — sends email via Resend
  components/
    Navbar.js           # Shared navigation bar
    Starfield.js        # Animated star background (canvas)
    OscilloscopeMonitor.js  # Interactive oscilloscope hero component
  lib/
    projects.js   # Portfolio project data
public/           # Static assets
.github/          # Copilot instructions
.vscode/          # VS Code tasks (Dev Server, Build)
```

## Contact Form & Email

The contact page (`/contact`) lets visitors send messages directly to you. It is powered by [Resend](https://resend.com), a developer-friendly email API.

### How it works

1. The user fills out the form (name, email, message) at `/contact`
2. On submit, the form POSTs to `/api/contact`
3. The API route (`app/api/contact/route.js`) calls the Resend API to send a formatted HTML email to your inbox
4. The sender's email is set as `reply_to`, so you can reply directly from your email client

### Environment variables

Create a `.env.local` file in the project root with the following:

```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your_email@example.com
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from your [Resend dashboard](https://resend.com/api-keys) |
| `CONTACT_EMAIL` | The email address where messages will be delivered |

### Getting a Resend API key

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** and create a new key
3. Paste it into `.env.local`

> **Note:** The free Resend tier allows sending from `onboarding@resend.dev` without domain verification. To send from a custom domain (e.g. `contact@yourdomain.com`), add and verify your domain in the Resend dashboard and update the `from` field in `app/api/contact/route.js`.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — click **Deploy**

### Netlify
1. Push to GitHub
2. In Netlify, select **Add new site → Import an existing project**
3. Set build command: `npm run build`, publish directory: `.next`
4. Install the [Netlify Next.js plugin](https://docs.netlify.com/frameworks/next-js/overview/)

### GitHub Pages
GitHub Pages does not natively support server-side Next.js features. Use static export:

1. Add `output: 'export'` to `next.config.mjs`
2. Run `npm run build` — output goes to `out/`
3. Deploy the `out/` directory to GitHub Pages via the `gh-pages` branch
