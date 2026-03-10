---
layout: ../../layouts/BlogPost.astro
title: "How to Build a Personal Blog with Astro and Deploy it Free"
description: "Step-by-step guide to launching a fast, SEO-optimized blog using Astro and Cloudflare Pages — completely free."
pubDate: "2025-01-20"
tags: ["Tutorial", "Astro", "Web Dev"]
---

## Why Astro?

Astro is the best framework for content-heavy sites in 2025. It generates pure static HTML — no JavaScript bloat — which means:

- ⚡ Perfect Lighthouse scores
- 🔍 Excellent SEO out of the box
- 💰 Free hosting on Cloudflare Pages

Let's build it.

## Prerequisites

- Node.js 18+ installed
- A GitHub account
- A Cloudflare account (free)

## Step 1: Create Your Astro Project

```bash
npm create astro@latest my-blog
cd my-blog
npm install
```

Choose the "blog" template when prompted. It sets up everything you need.

## Step 2: Run It Locally

```bash
npm run dev
```

Open `http://localhost:4321` and you'll see your blog running.

## Step 3: Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
gh repo create my-blog --public --push
```

## Step 4: Deploy to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click **Create a project** → Connect to Git
3. Select your GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Click **Save and Deploy**

Your site will be live in under 2 minutes at a `*.pages.dev` URL.

## Step 5: Connect Your Custom Domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `nareshtech.net`
3. Since your domain is already on Cloudflare Registrar, DNS updates automatically

**That's it.** Your blog is live on your custom domain, with SSL, for free.

## Writing Your First Post

Create a new file in `src/pages/blog/`:

```markdown
---
title: "My First Post"
description: "A short description"
pubDate: "2025-01-20"
tags: ["Tag1", "Tag2"]
---

Your content here in Markdown.
```

Push to GitHub and Cloudflare auto-deploys in ~30 seconds.

---

## Next Steps

- Set up Google Analytics
- Apply for Google AdSense
- Add affiliate links to your posts

Happy blogging! 🚀
