# ez2fix - Professional Contractor Website

A modern, high-performance website built for contractors specializing in garage door services. This project features a clean architecture, excellent SEO optimization, and a focus on local business needs.

## ✨ Features

- **🚀 High Performance**: Optimized build configuration with code splitting and lazy loading
- **📱 Mobile-First**: Fully responsive design optimized for all device sizes  
- **🎯 SEO Optimized**: Comprehensive meta tags, structured data, and local SEO
- **🛡️ Error Handling**: Robust error boundaries and user-friendly error states
- **📝 Form Validation**: Advanced form handling with real-time validation
- **🎨 Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **⚡ Fast Loading**: Lazy-loaded components and optimized bundles

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State**: TanStack Query for server state
- **Build**: Vite with SWC
- **SEO**: React Helmet Async
- **CMS**: Sanity (optional)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run typecheck
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components with validation
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── sections/       # Page sections (Hero, Services, etc.)
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── config/             # Configuration files
└── contexts/           # React contexts
```

## 🎨 Customization

### Branding
Update the site configuration in `src/config/site-config.ts`:

```typescript
export const siteConfig = {
  business: {
    name: "Your Business Name",
    phone: "(xxx) xxx-xxxx",
    email: "info@yourbusiness.com",
    // ... other settings
  }
}
```

### Colors & Styling
The color scheme is defined in the site config and can be customized:

```typescript
branding: {
  colors: {
    primary: "42 63% 53%",    // Main brand color
    secondary: "38 23% 9%",   // Secondary color
    accent: "46 81% 65%",     // Accent color
  }
}
```

### SEO Optimization
- Meta titles and descriptions are automatically generated
- Structured data (JSON-LD) is included for local business
- Open Graph and Twitter Card tags are optimized
- Sitemap generation is configured

## 📈 Performance

This build includes several performance optimizations:

- **Code Splitting**: Automatic route-based code splitting
- **Bundle Optimization**: Manual chunks for vendor libraries
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Lazy loading and responsive images
- **Minification**: Terser minification with console removal in production

## 🔍 SEO Features

- Local business structured data
- Geographic meta tags
- Optimized meta descriptions
- Canonical URLs
- Social media meta tags
- Google Analytics/GTM integration ready

## 📱 Mobile Experience

- Touch-friendly interface
- Mobile call bar for easy contact
- Responsive forms
- Optimized images for different screen sizes
- Fast loading on mobile networks

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `RESEND_API_KEY` - For email functionality
   - `GOOGLE_MAPS_API_KEY` - For maps integration
   - `RECAPTCHA_SITE_KEY` - For form protection
3. Deploy automatically on push

### Environment Variables

```env
# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM="Your Business <noreply@yourdomain.com>"
EMAIL_TO=your@email.com

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

# reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_key

# Analytics
VITE_GTM_CONTAINER_ID=GTM-XXXXXX
```

## 🎯 Local Business Features

- Service area management
- Local SEO optimization
- Business hours display
- Contact information management
- Location-based content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: info@ez2fix.com
- Phone: (201) 554-6769

---

Built with ❤️ for contractors who want a professional web presence.