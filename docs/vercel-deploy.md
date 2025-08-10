# Vercel Deployment Guide

This starter is optimized for Vercel. Use this guide for every locksmith site you deploy.

1) Import the repo
- Go to Vercel → New Project → Import your GitHub repo
- Framework: Vite (auto-detected)
- Build Command: npm run build
- Output Directory: dist

2) Configure environment variables (Project Settings → Environment Variables)
- RESEND_API_KEY: Your Resend API key
- EMAIL_FROM: e.g., "Your Brand <no-reply@yourdomain.com>"
- EMAIL_TO: Destination inbox for leads
- RECAPTCHA_SECRET (optional): Enables server-side verification for reCAPTCHA v2 Invisible

3) Deploy and configure the app
- Visit https://your-domain/setup
- Fill in: Sanity (optional), GTM, Google Maps, reCAPTCHA, Business/SEO/Branding
- Save — settings persist in localStorage (client-side only)

4) Verify email function
- On /setup, click "Send test email" → should succeed if secrets are set
- The function is at /api/send-email (Vercel Serverless Function)

5) Domains & SEO
- Add your custom domain in Vercel → Project → Domains
- Verify sitemap.xml and robots.txt in /public
- Submit sitemap.xml in Google Search Console

6) Analytics
- Use GTM (enter GTM ID on /setup); publish your container after QA
- Optionally add GA4 via GTM

7) Performance checks
- Optimize hero and gallery images (WebP/AVIF), ensure proper alt text
- Run Lighthouse; target good LCP/CLS/JS budget

Notes
- SPA routing is handled via vercel.json
- API functions live under /api/*.ts
- No .env file is required; set secrets in Vercel only
- Sanity content is optional — when not configured, the site falls back to site-config
