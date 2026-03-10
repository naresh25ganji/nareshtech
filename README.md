# NareshTech Blog — nareshtech.net

A fast, SEO-optimized Tech/AI blog built with Astro, hosted free on Cloudflare Pages.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:4321

---

## 📁 Project Structure

```
src/
├── layouts/
│   ├── Base.astro          # Main layout (nav, footer, AdSense slots)
│   └── BlogPost.astro      # Blog post layout (affiliate banners, ad units)
├── pages/
│   ├── index.astro         # Homepage
│   ├── about.astro         # About page
│   ├── tools.astro         # Affiliate tools/resources page
│   ├── rss.xml.js          # RSS feed
│   └── blog/
│       ├── index.astro     # Blog listing page
│       └── *.md            # Your blog posts
```

---

## ✍️ Writing a New Post

Create a new `.md` file in `src/pages/blog/`:

```markdown
---
layout: ../../layouts/BlogPost.astro
title: "Your Post Title"
description: "A short description for SEO and previews."
pubDate: "2025-01-25"
tags: ["AI", "Tutorial"]
affiliate:              # Optional — shows affiliate banner at top of post
  url: "https://yourlink.com"
  label: "Try this tool free →"
---

Your content in Markdown here...
```

---

## 💰 Monetization Setup

### 1. Google AdSense
1. Apply at https://adsense.google.com (need 15-20 posts first)
2. Get your publisher ID: `ca-pub-XXXXXXXXXXXXXXXX`
3. In `src/layouts/Base.astro`, uncomment and update:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"></script>
   ```
4. Replace `<div class="ad-unit">` placeholders with real `<ins class="adsbygoogle">` tags

### 2. Affiliate Links
- Add `affiliate:` frontmatter to any post (see above)
- Update `src/pages/tools.astro` with your real affiliate products
- Update the homepage tools section in `src/pages/index.astro`

### 3. Google Analytics
In `src/layouts/Base.astro`, uncomment and update:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## ☁️ Deployment (Cloudflare Pages)

### First Deploy
1. Push this repo to GitHub
2. Go to https://pages.cloudflare.com
3. Create project → Connect to Git → Select your repo
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click Save and Deploy

### Connect nareshtech.net
1. In Cloudflare Pages → your project → Custom domains
2. Add `nareshtech.net`
3. Since you're on Cloudflare Registrar, DNS updates automatically ✅

### Auto-Deploy
Every `git push` to main auto-deploys. Zero config needed.

---

## 📈 SEO Checklist

- [x] Sitemap auto-generated (`/sitemap-index.xml`)
- [x] RSS feed at `/rss.xml`
- [x] Open Graph meta tags
- [x] Canonical URLs
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

---

## 🛠️ Customize

| File | What to change |
|------|----------------|
| `src/layouts/Base.astro` | Nav links, AdSense ID, colors |
| `src/pages/index.astro` | Hero text, affiliate tools section |
| `src/pages/about.astro` | Your bio |
| `src/pages/tools.astro` | Your affiliate products |
| `astro.config.mjs` | Site URL (already set to nareshtech.net) |

---

## 💸 Cost

| Item | Cost |
|------|------|
| Cloudflare Pages hosting | Free |
| nareshtech.net domain | ~$11.86/year |
| SSL certificate | Free (auto) |
| **Total** | **~$1/month** |
