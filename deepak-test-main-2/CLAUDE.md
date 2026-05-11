@AGENTS.md

---

## Website Completion Checklist

### 1. PDF Files — Add to `public/`

| File | Used for |
|---|---|
| `public/resume.pdf` | "Resume" button on the home page (`OscilloscopeMonitor.js`) |
| `public/biometric-project.pdf` | Project Two (Biometric Feedback Controller) document link |

Once added, update:
- `OscilloscopeMonitor.js` — change the "Link" / Resume CTA button `href` to `/resume.pdf`
- `app/lib/projects.js` — change Project Two `link` to `/biometric-project.pdf`

---

### 2. GitHub Links — Pending from Deepak

| Project | File | Field | Status |
|---|---|---|---|
| Project 1 — NBA Sentiment Analysis | `app/lib/projects.js` | `link` | ⏳ Needs GitHub URL |
| Project 3 — Personal Website | `app/lib/projects.js` | `link` | ⏳ Needs GitHub URL (this repo) |

When URLs are provided, replace `"#"` in the `link` field for each project in `app/lib/projects.js`.

---

### 3. Home Page "Link" Button

- **File:** `app/components/OscilloscopeMonitor.js`
- The fourth CTA button (labeled "Link", `href="#"`) is a placeholder.
- Intended use: **Resume** — point to `/resume.pdf` once the file is added to `public/`.
- Update the label from "Link" to "Resume" and set `href="/resume.pdf"`.

---

### 4. Email Setup (Resend)

**Steps:**
1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → create a new key
3. Create `.env.local` in the project root:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   CONTACT_EMAIL=your@email.com
   ```
4. The `from` address in `app/api/contact/route.js` is currently `onboarding@resend.dev` (Resend sandbox only). For production, add and verify a custom domain in Resend, then update line 14 of `route.js`:
   ```js
   from: "Contact Form <contact@yourdomain.com>",
   ```

---

### 5. Deployment (Vercel)

1. Ensure all changes are pushed to GitHub (`main` branch)
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import `deepak-prabaharan_len/deepak-test`
3. In Vercel project settings → **Environment Variables**, add:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Click **Deploy** — Vercel auto-detects Next.js

---

### 6. Optional Polish

| Item | Notes |
|---|---|
| Favicon | Add `public/favicon.ico` to replace the default Next.js icon |
| OG image | Add `public/og-image.png` for social share previews |
| Project 2 link | Wired to `"#"` — update to `/biometric-project.pdf` once PDF is added |

---

### Summary of Remaining Action Items

| Status | Item |
|---|---|
| ⏳ | Drop `resume.pdf` into `public/` and update Resume button in `OscilloscopeMonitor.js` |
| ⏳ | Drop `biometric-project.pdf` into `public/` and update Project 2 link in `projects.js` |
| ⏳ | Provide GitHub URL for Project 1 (NBA Sentiment Analysis) |
| ⏳ | Provide GitHub URL for Project 3 (Personal Website) |
| ⏳ | Set up Resend account, add `.env.local`, optionally verify custom domain |
| ⏳ | Deploy to Vercel with env vars set |
| ⬜ | (Optional) Add favicon and OG image to `public/` |
