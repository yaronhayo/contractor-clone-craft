# Transactional Email via Resend (Vercel Functions)

This starter uses a lightweight Vercel Serverless Function to send transactional emails using Resend. Each site you deploy from this template should configure its own Resend API key and sender/recipient addresses in Vercel.

## What’s included
- `api/send-email.ts`: Vercel function that sends emails via Resend
- `src/lib/email.ts`: Frontend helper that POSTs estimate requests to the function
- Estimate form wired to call the API (with reCAPTCHA v2 Invisible when configured)

## Configure in Vercel → Project Settings → Environment Variables
Set these variables per project (environment):

- `RESEND_API_KEY` — Your Resend API key
- `EMAIL_FROM` — Sender, e.g. `Your Brand <no-reply@yourdomain.com>`
- `EMAIL_TO` — Where to receive leads, e.g. `leads@yourbrand.com`

Optionally, set `RECAPTCHA_SECRET` in your hosting environment. If set, `/api/send-email` will require and verify a valid reCAPTCHA v2 Invisible token for non-test submissions.

## Resend domain and sending
- Verify your sending domain in Resend for best deliverability
- Use a brand-specific subdomain (e.g., `mail.yourbrand.com`)

## Local development
The function only runs on Vercel. In the local Lovable preview, the API call will respond with a network error. That’s expected. Deploy to Vercel to test end‑to‑end.

## Customizing email content
Update the HTML template in `api/send-email.ts` (keep it simple and readable). If you prefer Resend Templates, add a template ID and call `resend.emails.send({ template_id, ... })`.
