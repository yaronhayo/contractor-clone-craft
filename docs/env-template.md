# Environment & Keys Template (per-site)

This project does not use a traditional .env file. Configure publishable keys in the in-app Setup page and server secrets in your hosting environment (e.g., Vercel → Project Settings → Environment Variables).

1) In-app Setup (stored in localStorage, safe to expose on the client)
- Sanity (CMS)
  - integrations.sanity.projectId
  - integrations.sanity.dataset (e.g., production)
  - integrations.sanity.apiVersion (e.g., 2024-10-01)
  - integrations.sanity.useCdn (true)
- Google Maps
  - integrations.googleMaps.apiKey
  - integrations.googleMaps.mapId (optional)
  - integrations.googleMaps.defaultCenter / defaultZoom
- Google Tag Manager
  - integrations.gtm.containerId (e.g., GTM-XXXXXX)
  - integrations.gtm.dataLayerName (defaults to dataLayer)
- reCAPTCHA
  - integrations.recaptcha.siteKey (v2 Invisible)
- Business/SEO/Branding
  - business.* and seo.* fields

2) Server-side Secrets (set in hosting env; never commit to repo)
- RESEND_API_KEY (used by api/send-email.ts)
- EMAIL_FROM (e.g., "Your Brand <no-reply@yourdomain.com>")
- EMAIL_TO (recipient for leads)

3) How to wire Sanity
- Go to /setup and enter your Sanity Project ID, dataset, and API version. The app will read content via @sanity/client. If not configured or if a query fails, pages safely fall back to site-config content.

4) Call Tracking (optional)
- How it works: Add ?ctn=15551234567 to any URL. The app stores it in localStorage and displays that number globally (e.g., header button) instead of the default phone. No server needed.
- Example: https://yourdomain.com/?ctn=15551234567

5) Recommended launch checklist
- Complete /setup (brand, SEO, Maps, GTM, reCAPTCHA, Sanity)
- Add location(s) and service areas in src/config/site-config.ts (or CMS)
- Verify /sitemap.xml and robots.txt
- Test forms; set Resend variables in hosting
- Publish
