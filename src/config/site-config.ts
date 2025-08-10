export type MediaCredit = {
  source: "Freepik" | "Internal" | "Other";
  author?: string;
  url?: string;
  license?: string;
};

export type MediaAsset = {
  src: string; // path in /src/assets or remote URL
  width: number;
  height: number;
  alt: string;
  title?: string;
  description?: string;
  credit?: MediaCredit;
};

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string; // 2-letter code
  postalCode: string;
  country?: string;
};

export type Hours = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
};

export type Geo = { lat: number; lng: number };

export type Branding = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  logos: {
    light?: MediaAsset;
    dark?: MediaAsset;
    mark?: MediaAsset;
  };
  favicon?: MediaAsset;
};

export type SocialLinks = Partial<{
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
  yelp: string;
  googleBusiness: string;
}>;

export type ServiceCategory = {
  slug: string; // e.g., "garage-door-repair"
  name: string;
  description?: string;
  image?: MediaAsset;
};

export type Service = {
  slug: string; // e.g., "garage-door-installation"
  name: string;
  categorySlug: string;
  shortDescription?: string;
  longDescription?: string;
  images?: MediaAsset[];
};

export type ServiceAreaCity = {
  name: string; // e.g., "Edison"
  state: string; // e.g., "NJ"
  slug: string; // e.g., "edison-nj"
  center?: Geo; // optional map marker
  neighborhoods?: string[];
};

export type Location = {
  id: string;
  name: string; // e.g., "Pro Line Garage Experts Edison"
  slug: string; // e.g., "pro-line-garage-experts-edison-nj"
  phone: string;
  email?: string;
  address: Address;
  geo: Geo;
  hours: Hours;
  isPrimary?: boolean;
  coverageRadiusMiles?: number;
  serviceAreas: ServiceAreaCity[];
};

export type RouteTemplates = {
  servicesIndex: string; // "/services"
  serviceCategory: (categorySlug: string) => string; // "/services/garage-door-repair"
  individualService: (categorySlug: string, serviceSlug: string) => string; // "/services/garage-door-repair/garage-door-spring-repair"
  serviceCity: (serviceSlug: string, citySlug: string) => string; // "/garage-door-repair-edison-nj"
  locationsIndex: string; // "/locations"
  locationDetail: (locationSlug: string) => string; // "/locations/pro-line-garage-experts-edison-nj"
  serviceAreasIndex: string; // "/service-areas"
  serviceAreaDetail: (areaSlug: string) => string; // "/service-areas/edison-nj"
};

export type Integrations = {
  googleMaps?: {
    apiKey?: string; // set per-project in Vercel env
    defaultCenter?: Geo;
    defaultZoom?: number;
    mapId?: string; // optional Google Cloud map style ID
  };
  recaptcha?: {
    version: "v2-invisible";
    siteKey?: string;
  };
  gtm?: {
    containerId?: string; // e.g., "GTM-XXXX"
    dataLayerName?: string; // default "dataLayer"
  };
  resend?: {
    fromEmail?: string;
    replyToEmail?: string;
    brand?: string;
    templates?: Partial<{
      contactForm: string;
      estimateRequest: string;
      bookingConfirmation: string;
    }>;
  };
  sanity?: {
    projectId?: string;
    dataset?: string;
    apiVersion?: string;
    useCdn?: boolean;
  };
  freepik?: {
    defaultAttribution?: string;
    profileUrl?: string;
  };
  vercel?: {
    projectName?: string;
  };
};

export type SEOConfig = {
  defaultTitle: string;
  defaultDescription: string;
  siteUrl?: string;
  image?: MediaAsset; // default share image
  templates: {
    service: string; // e.g., "{{service.name}} | {{business.name}}"
    category: string; // e.g., "{{category.name}} Services | {{business.name}}"
    serviceCity: string; // e.g., "{{service.name}} in {{city.name}}, {{city.state}} | {{business.name}}"
    location: string; // e.g., "{{location.name}} | {{business.name}}"
  };
};

export type SiteConfig = {
  business: {
    name: string;
    legalName?: string;
    dba?: string;
    phone: string;
    email: string;
    siteUrl: string; // production domain
    hqAddress: Address;
    geo?: Geo;
    hours: Hours;
    social?: SocialLinks;
    branding: Branding;
  };
  media: {
    hero?: MediaAsset;
    gallery?: MediaAsset[];
    serviceCardDefault?: MediaAsset;
  };
  taxonomy: {
    categories: ServiceCategory[];
    services: Service[];
  };
  locations: Location[];
  routes: RouteTemplates;
  seo: SEOConfig;
  integrations: Integrations;
};

// Utility: shallow-deep merge for config overrides (arrays are replaced)
function mergeDeep<T>(target: T, source: any): T {
  if (!source) return target;
  const isObj = (v: any) => v && typeof v === "object" && !Array.isArray(v);
  const output: any = Array.isArray(target) ? [...(source ?? target)] : { ...(target as any) };
  for (const key of Object.keys(source)) {
    const srcVal = (source as any)[key];
    const tgtVal = (target as any)[key];
    if (isObj(srcVal) && isObj(tgtVal)) {
      output[key] = mergeDeep(tgtVal, srcVal);
    } else if (srcVal !== undefined) {
      output[key] = srcVal;
    }
  }
  return output;
}

// Configuration for Pro Line Garage Experts
const baseConfig: SiteConfig = {
  business: {
    name: "ez2fix",
    legalName: "ez2fix LLC",
    phone: "(201) 554-6769",
    email: "support@ez2fix.com",
    siteUrl: "https://ez2fix.com",
    hqAddress: {
      line1: "123 Main Street",
      city: "Elmwood Park",
      state: "NJ",
      postalCode: "07407",
      country: "US",
    },
    geo: { lat: 40.9026, lng: -74.1218 },
    hours: {
      mon: "24 Hours",
      tue: "24 Hours",
      wed: "24 Hours",
      thu: "24 Hours",
      fri: "24 Hours",
      sat: "24 Hours",
      sun: "24 Hours",
    },
    social: {
      facebook: "https://facebook.com/ez2fix",
      instagram: "https://instagram.com/ez2fix",
      googleBusiness: "https://g.page/ez2fix",
    },
    branding: {
      colors: {
        primary: "42 63% 53%", // #D2A63C
        secondary: "38 23% 9%", // #1D1912  
        accent: "46 81% 65%", // #EECD5C
      },
      logos: {
        light: {
          src: "/ez2fix-logo.png",
          width: 200,
          height: 48,
          alt: "ez2fix Logo",
        },
        dark: {
          src: "/ez2fix-logo.png",
          width: 200,
          height: 48,
          alt: "ez2fix Logo",
        },
        mark: {
          src: "/ez2fix-logo.png",
          width: 48,
          height: 48,
          alt: "ez2fix Logo Mark",
        },
      },
    },
  },
  media: {
    hero: {
      src: "https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1600",
      width: 1600,
      height: 900,
      alt: "Professional garage door installation and repair services",
      credit: {
        source: "Other",
        author: "Pexels",
        url: "https://www.pexels.com/",
        license: "Standard license",
      },
    },
    serviceCardDefault: {
      src: "https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: 1200,
      height: 800,
      alt: "Professional garage door service",
    },
    gallery: [
      {
        src: "https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "Garage door services - installation and repair",
      },
    ],
  },
  taxonomy: {
    categories: [
      {
        slug: "garage-door-repair",
        name: "Garage Door Repair",
        description: "Expert garage door repair services for all types of residential and commercial doors.",
      },
      {
        slug: "garage-door-installation",
        name: "Garage Door Installation",
        description: "Professional garage door installation with quality doors and expert craftsmanship.",
      },
      {
        slug: "garage-door-opener",
        name: "Garage Door Opener",
        description: "Garage door opener repair, installation, and programming services.",
      },
      {
        slug: "emergency-repair",
        name: "Emergency Repair",
        description: "24/7 emergency garage door repair for urgent situations and same-day service.",
      },
    ],
    services: [
      // Garage Door Repair
      { slug: "garage-door-spring-repair", name: "Garage Door Spring Repair Services", categorySlug: "garage-door-repair", shortDescription: "Professional garage door spring repair and replacement with 10 year warranty." },
      { slug: "garage-door-repair", name: "Garage Door Repair Services", categorySlug: "garage-door-repair", shortDescription: "Complete garage door repair services with same day service available." },
      
      // Garage Door Installation
      { slug: "garage-door-installation", name: "Garage Door Installation Services", categorySlug: "garage-door-installation", shortDescription: "Professional garage door installation with free on-site estimate and 10% senior discount." },
      
      // Garage Door Opener
      { slug: "garage-door-opener-repair", name: "Garage Door Opener Repair Service", categorySlug: "garage-door-opener", shortDescription: "Expert garage door opener repair and programming with same day service." },
      
      // Emergency Repair
      { slug: "emergency-garage-door-repair", name: "24/7 Emergency Garage Door Repair", categorySlug: "emergency-repair", shortDescription: "24/7 emergency garage door repair with fast response across Elmwood Park and surrounding areas." },
    ],
  },
  locations: [
    {
      id: "loc-elmwood-park",
      name: "ez2fix Elmwood Park",
      slug: "ez2fix-elmwood-park-nj",
      phone: "(201) 554-6769",
      email: "support@ez2fix.com",
      address: {
        line1: "123 Main Street",
        city: "Elmwood Park",
        state: "NJ",
        postalCode: "07407",
        country: "US",
      },
      geo: { lat: 40.9026, lng: -74.1218 },
      hours: {
        mon: "24 Hours",
        tue: "24 Hours",
        wed: "24 Hours",
        thu: "24 Hours",
        fri: "24 Hours",
        sat: "24 Hours",
        sun: "24 Hours",
      },
      isPrimary: true,
      coverageRadiusMiles: 50,
      serviceAreas: [
        {
          name: "North Caldwell",
          state: "NJ",
          slug: "north-caldwell-nj",
          center: { lat: 40.8465, lng: -74.2582 },
        },
        { name: "West Caldwell", state: "NJ", slug: "west-caldwell-nj", center: { lat: 40.8465, lng: -74.2765 } },
        { name: "Little Falls", state: "NJ", slug: "little-falls-nj", center: { lat: 40.8782, lng: -74.2176 } },
        { name: "Montclair", state: "NJ", slug: "montclair-nj", center: { lat: 40.8259, lng: -74.2090 } },
        { name: "Cedar Grove", state: "NJ", slug: "cedar-grove-nj", center: { lat: 40.8532, lng: -74.2287 } },
        { name: "Fair Lawn", state: "NJ", slug: "fair-lawn-nj", center: { lat: 40.9362, lng: -74.1318 } },
        { name: "Clifton", state: "NJ", slug: "clifton-nj", center: { lat: 40.8584, lng: -74.1638 } },
        
      ],
    },
  ],
  routes: {
    servicesIndex: "/services",
    serviceCategory: (categorySlug: string) => `/services/${categorySlug}`,
    individualService: (categorySlug: string, serviceSlug: string) => `/services/${categorySlug}/${serviceSlug}`,
    serviceCity: (serviceSlug: string, citySlug: string) => `/services/${serviceSlug}-${citySlug}`,
    locationsIndex: "/locations",
    locationDetail: (locationSlug: string) => `/locations/${locationSlug}`,
    serviceAreasIndex: "/service-areas",
    serviceAreaDetail: (areaSlug: string) => `/service-areas/${areaSlug}`,
  },
  seo: {
    defaultTitle: "ez2fix — Garage Door Repair Elmwood Park NJ | Same Day Service | Free Estimate",
    defaultDescription:
      "Garage door repair Elmwood Park NJ - Spring repair, opener service, installation. Same day service, 10 year warranty, 10% senior discount. Free on-site estimate.",
    siteUrl: "https://ez2fix.com",
    image: {
      src: "https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: 1200,
      height: 630,
      alt: "ez2fix – quality garage door service",
    },
    templates: {
      service: "{{service.name}} | {{business.name}}",
      category: "{{category.name}} Services | {{business.name}}",
      serviceCity: "{{service.name}} in {{city.name}}, {{city.state}} | {{business.name}}",
      location: "{{location.name}} | {{business.name}}",
    },
  },
  integrations: {
    googleMaps: {
      apiKey: "", // set per-site in Vercel Project Environment
      defaultCenter: { lat: 40.9026, lng: -74.1218 },
      defaultZoom: 11,
    },
    recaptcha: {
      version: "v2-invisible",
      siteKey: "", // set per-site in Vercel Project Environment
    },
    gtm: {
      containerId: "", // e.g., GTM-XXXXXX
      dataLayerName: "dataLayer",
    },
    resend: {
      fromEmail: "no-reply@ez2fix.com",
      replyToEmail: "support@ez2fix.com",
      brand: "ez2fix",
      templates: {
        contactForm: "resend_template_contact",
        estimateRequest: "resend_template_estimate",
        bookingConfirmation: "resend_template_booking",
      },
    },
    sanity: {
      projectId: "", // set per-site
      dataset: "production",
      apiVersion: "2024-10-01",
      useCdn: true,
    },
    freepik: {
      defaultAttribution: "Image by Pexels",
      profileUrl: "https://www.pexels.com/",
    },
    vercel: {
      projectName: "ez2fix",
    },
  },
};

// Apply runtime overrides from localStorage (publishable keys & settings)
const overrides = typeof window !== "undefined" ? (() => {
  try { return JSON.parse(localStorage.getItem("siteConfigOverrides") || "null"); } catch { return null; }
})() : null;

export const siteConfig: SiteConfig = overrides ? mergeDeep(baseConfig, overrides) : baseConfig;