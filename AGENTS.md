# Goodbran Jekyll Blog

A professional Jekyll blog inspired by Mozilla Protocol design system.

## Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _includes/           # Reusable HTML snippets
│   ├── footer.html      # Site footer
│   └── header.html      # Site header & navigation
├── _layouts/            # Page templates
│   ├── default.html     # Base layout
│   ├── home.html        # Homepage layout
│   ├── page.html        # Static page layout
│   └── post.html        # Blog post layout
├── _posts/              # Blog posts (Markdown with YAML frontmatter)
├── _sass/               # Sass stylesheets
│   └── _protocol.scss   # Mozilla Protocol-inspired theme
├── assets/
│   └── css/
│       └── main.scss    # Main stylesheet entry
├── 404.html             # 404 error page
├── about.markdown       # About page
├── blog.html            # Blog listing page
└── index.markdown       # Homepage

## Design System

The theme is inspired by [Mozilla Protocol](https://protocol.mozilla.org/):

- **Colors**: Firefox orange (#FF7139) accents, clean grays, professional blacks
- **Typography**: Zilla Slab (headings) + Inter (body)
- **Layout**: Card-based grid, clean navigation, generous whitespace
- **Components**: Cards, buttons, navigation, footer

## Blog Post Format

Posts use YAML frontmatter:

```yaml
---
layout: post
title: "Post Title"
date: 2026-04-21 12:00:00 +0800
description: "Brief description for SEO and listings"
cover_image: "/assets/images/post-image.png"  # Optional
---

Post content in Markdown...
```

## Migration Notes (from goodbran Rails app)

The original blog used a Rails-based CMS called "Perron". Migration checklist:

1. Copy markdown files from `/goodbran/app/content/blogs/` to `/_posts/`
2. Rename files to Jekyll format: `YYYY-MM-DD-title.markdown`
3. Update frontmatter (should mostly work as-is)
4. Convert ERB newsletter blocks to static content or Jekyll includes
5. Handle KaTeX math rendering (add MathJax or KaTeX)
6. Move CDN images if needed

## Commands

```bash
# Build site
jekyll build

# Serve locally with live reload
jekyll serve --watch

# Build for production
JEKYLL_ENV=production jekyll build
```

## Deployment

The generated `_site/` folder contains the static site ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static host
