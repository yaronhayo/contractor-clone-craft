# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2aeb0aca-77ae-4e0e-b637-f9c72bd0034e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2aeb0aca-77ae-4e0e-b637-f9c72bd0034e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploying to Vercel

Deploy this project on Vercel using the included vercel.json (SPA routing + API functions):

1) Connect GitHub repo in Vercel → New Project → Import
2) Framework: Vite (auto-detected)
   - Build Command: npm run build
   - Output Directory: dist
3) Environment Variables (Project Settings → Environment Variables)
   - RESEND_API_KEY
   - EMAIL_FROM (e.g., "Your Brand <no-reply@yourdomain.com>")
   - EMAIL_TO (recipient inbox)
4) Deploy, then open /setup on your site to configure client keys (Sanity, GTM, Maps, reCAPTCHA) and business info
5) In /setup, use "Send test email" to verify /api/send-email on Vercel

More details: docs/vercel-deploy.md

---

## Launch Checklist (Vercel + GitHub + Sanity + Claude Code)

Use this step-by-step guide when launching a new locksmith site from this starter.

- Open the checklist: [docs/launch-checklist.md](docs/launch-checklist.md)
- Covers repo setup, Sanity content, GTM/Maps/reCAPTCHA, SEO, performance, analytics, and deployment.
- Includes tips for customizing with Claude Code (GitHub-linked) and submitting sitemaps to Search Console.
