# 🚀 Deployment Guide - EZ2Fix Garage Door Repair Website

## 📋 Pre-Deployment Checklist

Before pushing to GitHub and deploying on Vercel, you'll need to set up several API keys and services.

### 1. 📧 REQUIRED: Email Service (Resend)

**Why needed:** Contact forms and estimate requests
**Setup time:** 5 minutes

1. Go to [resend.com](https://resend.com) and create an account
2. Verify your domain or use their sandbox for testing
3. Get your API key from [API Keys section](https://resend.com/api-keys)
4. Required environment variables:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM=contact@yourdomain.com  
   EMAIL_TO=your-business-email@yourdomain.com
   ```

### 2. 🗺️ REQUIRED: Google Maps API

**Why needed:** Service area maps, location display, address autocomplete
**Setup time:** 10 minutes

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Places API  
   - Geocoding API
4. Create credentials → API Key
5. Restrict your API key:
   - **Application restrictions:** HTTP referrers
   - **Website restrictions:** 
     - `yourdomain.com/*`
     - `*.vercel.app/*`
     - `localhost/*` (for development)
6. Required environment variable:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 3. 🛡️ OPTIONAL: Spam Protection (reCAPTCHA)

**Why needed:** Prevents spam form submissions
**Setup time:** 5 minutes

1. Go to [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Create new site
3. Choose **reCAPTCHA v2** → **"I'm not a robot" Invisible**
4. Add your domains:
   - `yourdomain.com`
   - `*.vercel.app`
   - `localhost` (for development)
5. Required environment variables:
   ```bash
   VITE_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE
   RECAPTCHA_SECRET=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
   ```

### 4. 📊 OPTIONAL: Analytics (Google Tag Manager)

**Why needed:** Track website performance and conversions
**Setup time:** 10 minutes

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create account and container
3. Get your container ID (GTM-XXXXXXX)
4. Set up Google Analytics 4 through GTM
5. Optional environment variables:
   ```bash
   VITE_GTM_ID=GTM-XXXXXXX
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 5. 🐛 OPTIONAL: Error Tracking (Sentry)

**Why needed:** Monitor and fix bugs in production
**Setup time:** 5 minutes

1. Go to [sentry.io](https://sentry.io) and create account
2. Create new project (React)
3. Get your DSN from project settings
4. Optional environment variable:
   ```bash
   VITE_SENTRY_DSN=https://xxxxxxxx@oxxxxxxx.ingest.sentry.io/xxxxxxx
   ```

### 6. 📝 OPTIONAL: Content Management (Sanity CMS)

**Why needed:** Edit website content without code changes
**Setup time:** 15 minutes

1. Go to [sanity.io](https://sanity.io) and create account
2. Create new project
3. Get project ID and dataset name
4. Optional environment variables:
   ```bash
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```

**Note:** The website works perfectly without Sanity - it uses static content fallbacks.

---

## 🌐 Vercel Deployment Steps

### Step 1: Prepare Your Repository

1. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   # Fill in your API keys in .env.local
   ```

2. **Test locally:**
   ```bash
   npm run dev
   # Test all functionality (maps, forms, etc.)
   ```

3. **Build and preview:**
   ```bash
   npm run build
   npm run preview
   # Test production build locally
   ```

### Step 2: Push to GitHub

1. **Initialize git (if not done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ez2fix website"
   ```

2. **Create GitHub repository:**
   - Go to [github.com](https://github.com) and create new repository
   - Don't initialize with README (you already have files)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/ez2fix.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy on Vercel

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Click "Import Project"
   - Connect your GitHub account
   - Select your ez2fix repository

2. **Configure build settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Add environment variables:**
   Go to your Vercel project → Settings → Environment Variables

   **Required variables:**
   ```bash
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=contact@yourdomain.com
   EMAIL_TO=your-business-email@yourdomain.com
   VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
   VITE_SITE_URL=https://your-project-name.vercel.app
   ```

   **Optional variables:**
   ```bash
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET=your_recaptcha_secret
   VITE_GTM_ID=your_gtm_id
   VITE_SENTRY_DSN=your_sentry_dsn
   VITE_SANITY_PROJECT_ID=your_sanity_project_id
   VITE_SANITY_DATASET=production
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project-name.vercel.app`

### Step 4: Custom Domain (Optional)

1. **Add custom domain in Vercel:**
   - Go to project Settings → Domains
   - Add your domain (e.g., `ez2fix.com`)

2. **Update DNS records:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Update `VITE_SITE_URL` environment variable

3. **Update API restrictions:**
   - Google Maps API: Add your custom domain
   - reCAPTCHA: Add your custom domain

---

## ✅ Post-Deployment Testing

After deployment, test these features:

### Essential Features
- [ ] Homepage loads correctly
- [ ] Navigation works (all menu items)
- [ ] Service pages display properly
- [ ] Contact form submits successfully
- [ ] Maps display (if configured)

### API Integration Testing
- [ ] Form submissions send emails
- [ ] Google Maps show service areas
- [ ] reCAPTCHA prevents spam (if configured)
- [ ] Analytics track page views (if configured)

### Performance Testing
- [ ] Site loads quickly (< 3 seconds)
- [ ] Mobile responsiveness
- [ ] SEO meta tags are correct
- [ ] Sitemap and robots.txt accessible

---

## 🔧 Environment Variables Summary

### For Local Development (.env.local)
```bash
# Required
RESEND_API_KEY=your_key
EMAIL_FROM=contact@yourdomain.com
EMAIL_TO=your@email.com
VITE_GOOGLE_MAPS_API_KEY=your_key

# Optional
VITE_RECAPTCHA_SITE_KEY=your_key
RECAPTCHA_SECRET=your_secret
VITE_GTM_ID=GTM-XXXXXXX
VITE_SENTRY_DSN=your_dsn
VITE_SANITY_PROJECT_ID=your_id
```

### For Vercel Production
Set the same variables in Vercel dashboard + add:
```bash
VITE_SITE_URL=https://yourdomain.com
```

---

## 🚨 Security Checklist

- [ ] API keys are restricted to your domains
- [ ] Never commit `.env.local` to GitHub
- [ ] Use environment-specific keys (dev vs prod)
- [ ] Regularly rotate API keys
- [ ] Monitor API usage and billing
- [ ] Set up Vercel security headers (already configured)

---

## 📞 Need Help?

1. **Build issues:** Check Vercel build logs
2. **Form not working:** Verify Resend API key and email settings
3. **Maps not loading:** Check Google Maps API key and restrictions
4. **Performance issues:** Use Vercel Analytics or Google PageSpeed Insights

Your website is now ready for professional deployment! 🎉