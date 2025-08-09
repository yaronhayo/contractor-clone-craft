# Locksmith Starter – Launch Checklist (Vercel + GitHub + Sanity + Claude Code)

Use this checklist for every new locksmith website you launch from this starter.

## 0) Prerequisites
- Lovable project connected to GitHub (GitHub → Connect in the editor)
- Node 18+ locally (optional), Vercel account

## 1) Clone and rename
- Remix/clone this repo for the new client
- Update branding and business defaults in the Setup page later; keep base code identical

## 2) Sanity CMS (one project/dataset per site)
1. Create a new Sanity project (dataset: `production`)
2. In your Studio, add schemas from `docs/sanity-setup.md` and deploy
3. Publish initial docs:
   - siteSettings (business name, email, phone, address, defaultDescription)
   - homepage (heroTitle/heroDescription/heroImage)
   - service (create a doc per service)
   - faq (at least 4–8 entries)

## 3) App configuration (/setup)
- Enter Sanity: projectId, dataset, apiVersion (e.g. 2024-10-01), useCdn: true
- Enter Google Tag Manager ID (e.g. GTM-XXXXXXX)
- Enter Google Maps browser key (prevents NoApiKeys warning)
- Enter reCAPTCHA v3 site key (if using Estimate form with spam protection)
- Fill Business NAP, hours, social links, branding, SEO siteUrl and defaultDescription
- Save → the page reloads with overrides persisted in localStorage

## 4) Content and internal links
- Services: 800+ words per service; 4–8 FAQs per service; descriptive alt text
- Locations/Service areas: add unique blurbs and cross-link to services
- Ensure a single H1 per page and clean, keyworded slugs

## 5) Structured Data (already wired)
- LocalBusiness (global) + OfferCatalog of Services (global)
- Service JSON-LD on each service detail page
- FAQPage JSON-LD on FAQ section

## 6) Performance
- Convert/optimize images (WebP/AVIF); use Sanity image transforms if using CMS images
- Keep hero as eager; all others lazy
- Run Lighthouse → fix LCP/CLS/JS bloat before launch

## 7) Analytics and events
- Open GTM Preview; verify phone click and CTA events fire
- Connect GA4 inside GTM and publish the container

## 8) Vercel deploy
1. Connect GitHub repo to Vercel and import
2. Set required environment values in Vercel (Sanity, GTM, Maps, reCAPTCHA, email provider if used)
3. Deploy → verify site, sitemap.xml, robots.txt
4. Add custom domain and enable HTTPS

## 9) Search Console & indexing
- Add property in GSC and Bing Webmaster Tools
- Submit sitemap.xml
- Request indexing for homepage, services, and top city/area pages

## 10) Working with Claude Code (GitHub-linked)
- Open your GitHub repo in your IDE with the Claude Code extension enabled
- Authenticate Claude Code with GitHub and grant repo access
- Create feature branches, ask Claude to make targeted changes, and open PRs
- Keep design tokens unified (Tailwind CSS + index.css) and avoid inline color overrides

## 11) QA
- Mobile and desktop smoke test, forms send email, 404/redirects, accessibility basics

That’s it — repeat per client: new Sanity project, configure /setup, publish content, deploy via Vercel.