# First Class Locksmith Brand Guidelines

## Overview
Professional locksmith brand with premium, trustworthy aesthetic focused on emergency services and expertise. Design emphasizes safety, reliability, and 24/7 availability.

## Color Palette

### Primary Colors
- **Primary Orange**: `#ea9e25` (HSL: 42 63% 53%)
- **Secondary Dark**: `#221f1f` (HSL: 38 23% 9%) 
- **Accent Gold**: `#EECD5C` (HSL: 46 81% 65%)

### Neutral Colors
- **Background**: White (#FFFFFF)
- **Muted**: Gray-50 to Gray-900 scale
- **Text**: Gray-900 (dark) / White (on dark backgrounds)

### Usage Guidelines
- Primary orange for CTAs, trust badges, and key highlights
- Dark secondary for backgrounds and contrast elements
- Accent gold for subtle highlights and secondary elements
- Maintain WCAG contrast ratios for all text combinations

## Typography

### Font Family
- **Primary**: Montserrat (weights: 400, 600, 700, 800)
- **Fallback**: ui-sans-serif, system-ui, sans-serif

### Hierarchy
- **Hero Headlines**: `text-3xl md:text-5xl font-extrabold`
- **Section Headers**: `text-3xl md:text-5xl font-extrabold`
- **Subsection Headers**: `text-xl md:text-2xl font-bold`
- **Card Titles**: `text-xl font-bold`
- **Body Text**: `text-base` with `leading-relaxed`
- **Small Text**: `text-sm` for captions and meta info

### Special Effects
- **Gradient Text**: `bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent`
- **Primary Text**: Use for highlights and important elements

## Layout & Spacing

### Container System
- **Container**: `container` class with auto margins
- **Section Padding**: `py-16 md:py-24` for main sections
- **Content Width**: `max-w-4xl mx-auto` for headers
- **Grid Systems**: Responsive grids (sm:grid-cols-2, lg:grid-cols-3)

### Spacing Scale
- **Section Spacing**: 16px mobile, 24px desktop (py-16 md:py-24)
- **Element Spacing**: 8px system (gap-8, space-y-8)
- **Card Padding**: p-6 to p-8 depending on card size

## Components

### Cards
```
className="bg-background border-2 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
```

### Buttons
- **Primary CTA**: `rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl`
- **Secondary**: `variant="outline" border-2 hover:bg-primary hover:text-primary-foreground`
- **Icon Buttons**: Include relevant icons with proper spacing

### Trust Indicators
- **Badge Style**: `bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold`
- **Rating Display**: Star icons with "5.0/5" text
- **License Info**: Shield icon with license number

## Visual Effects

### Animations
- **Fade In**: `animate-fade-in` with staggered delays
- **Hover Transforms**: `hover:scale-105` or `hover:scale-110`
- **Smooth Transitions**: `transition-all duration-300`
- **Background Patterns**: Radial gradients and floating elements

### Backgrounds
- **Section Backgrounds**: Alternating white and gray-50
- **Gradient Overlays**: `from-gray-900/70 via-gray-800/50 to-gray-900/60`
- **Pattern Elements**: Floating shapes with blur effects

### Shadows
- **Card Shadows**: `shadow-lg hover:shadow-xl`
- **Button Shadows**: Progressive shadow increase on hover
- **Floating Elements**: `shadow-2xl` for elevated components

## Icons & Graphics

### Icon System
- **Lucide React**: Consistent icon library
- **Size Standards**: h-4 w-4 (small), h-5 w-5 (medium), h-6 w-6 (large)
- **Colors**: Primary color for brand consistency
- **Placement**: Proper spacing with text (gap-2, gap-3)

### Service Icons
- **Emergency**: AlertTriangle, Clock
- **Repair**: Wrench, Settings  
- **Installation**: Hammer, Award
- **Areas**: MapPin

## Branding Elements

### Trust Building
- **5.0/5 Star Ratings**: Consistently displayed
- **License Numbers**: Always visible with Shield icon
- **Emergency Availability**: 24/7 messaging with Clock icon
- **Warranty Info**: 10 year warranty prominently featured

### Call-to-Actions
- **Primary**: Phone numbers with PhoneCall icon
- **Secondary**: "Get Free Estimate" with appropriate routing
- **Emergency**: Red/urgent styling for emergency services

## Responsive Design

### Breakpoints
- **Mobile**: Default (320px+)
- **Small**: sm: (640px+) 
- **Medium**: md: (768px+)
- **Large**: lg: (1024px+)

### Mobile Considerations
- **Stacked layouts**: Single column on mobile
- **Touch-friendly**: Larger buttons and tap targets
- **Readable text**: Appropriate font sizes for mobile
- **Simplified navigation**: Mobile-optimized menus

## Content Guidelines

### Voice & Tone
- **Professional yet approachable**
- **Emphasize expertise and reliability**
- **Clear, benefit-focused messaging**
- **Emergency-ready and responsive**

### Key Messaging
- **Same day service available**
- **10 year warranty**
- **Licensed & insured professionals** 
- **24/7 emergency availability**
- **Free estimates and transparent pricing**

## Implementation Notes

### CSS Classes to Use Consistently
- **Section wrapper**: `relative py-16 md:py-24`
- **Headers**: `text-center max-w-4xl mx-auto mb-16`
- **Grid layouts**: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Cards**: `rounded-2xl border-2 hover:border-primary/30 transition-all duration-300`
- **CTAs**: `rounded-full px-8 py-4 font-bold transition-all duration-300`

### Animation Timing
- **Base duration**: 300ms for most transitions
- **Stagger delays**: 100-150ms between elements
- **Hover effects**: Immediate feedback with smooth transitions