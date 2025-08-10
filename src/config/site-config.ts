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
    email: "info@ez2fix.com",
    siteUrl: "https://www.ez2fix.com",
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
        primary: "39 85% 55%",
        secondary: "25 5% 13%",
        accent: "39 85% 55%",
      },
      logos: {
        light: {
          src: "https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/first-class-locksmith//First%20Class%20Locksmith%20Logo.png",
          width: 200,
          height: 48,
          alt: "ez2fix Logo",
        },
        dark: {
          src: "https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/first-class-locksmith//First%20Class%20Locksmith%20Logo.png",
          width: 200,
          height: 48,
          alt: "ez2fix Logo",
        },
        mark: {
          src: "https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/first-class-locksmith//First%20Class%20Locksmith%20Favicon.png",
          width: 48,
          height: 48,
          alt: "ez2fix Logo Mark",
        },
      },
    },
  },
  media: {
    hero: {
      src: "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=1600",
      width: 1600,
      height: 900,
      alt: "Professional locksmith services - locks and keys",
      credit: {
        source: "Other",
        author: "Pexels",
        url: "https://www.pexels.com/",
        license: "Standard license",
      },
    },
    serviceCardDefault: {
      src: "https://images.pexels.com/photos/5691629/pexels-photo-5691629.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: 1200,
      height: 800,
      alt: "Professional locksmith service",
    },
    gallery: [
      {
        src: "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "Locksmith services - security and access",
      },
    ],
  },
  taxonomy: {
    categories: [
      {
        slug: "emergency-locksmith",
        name: "Emergency Locksmith",
        description: "24/7 emergency locksmith service—fast response when you're locked out.",
      },
      {
        slug: "residential-locksmith",
        name: "Residential Locksmith",
        description: "Complete residential locksmith services including lock installation and repair.",
      },
      {
        slug: "commercial-locksmith",
        name: "Commercial Locksmith",
        description: "Professional commercial locksmith services for businesses and offices.",
      },
      {
        slug: "automotive-locksmith",
        name: "Automotive Locksmith",
        description: "Car lockout, key replacement, and automotive locksmith services.",
      },
    ],
    services: [
      // Emergency Locksmith
      { slug: "car-lockout", name: "Car Lockout", categorySlug: "emergency-locksmith", shortDescription: "Fast car lockout service—get back in your vehicle quickly and safely." },
      { slug: "house-lockout", name: "House Lockout", categorySlug: "emergency-locksmith", shortDescription: "Locked out of your home? 24/7 residential lockout service available." },
      { slug: "business-lockout", name: "Business Lockout", categorySlug: "emergency-locksmith", shortDescription: "Commercial lockout service to get your business accessible again." },
      
      // Residential Locksmith  
      { slug: "lock-replacement", name: "Lock Replacement", categorySlug: "residential-locksmith", shortDescription: "Professional lock replacement for enhanced home security." },
      { slug: "lock-rekey", name: "Lock Rekey", categorySlug: "residential-locksmith", shortDescription: "Rekey existing locks for new keys—cost-effective security solution." },
      { slug: "lock-repair", name: "Lock Repair", categorySlug: "residential-locksmith", shortDescription: "Expert lock repair to restore proper function and security." },
      
      // Commercial Locksmith
      { slug: "master-key-systems", name: "Master Key Systems", categorySlug: "commercial-locksmith", shortDescription: "Custom master key systems for businesses and property managers." },
      { slug: "access-control", name: "Access Control", categorySlug: "commercial-locksmith", shortDescription: "Modern access control systems for enhanced business security." },
      
      // Automotive Locksmith
      { slug: "car-key-replacement", name: "Car Key Replacement", categorySlug: "automotive-locksmith", shortDescription: "Professional car key replacement for all vehicle makes and models." },
      { slug: "key-fob-programming", name: "Key Fob Programming", categorySlug: "automotive-locksmith", shortDescription: "Expert key fob programming and replacement services." },

    ],
  },
  locations: [
    {
      id: "loc-edison",
      name: "ez2fix Elmwood Park",
      slug: "ez2fix-elmwood-park-nj",
      phone: "(201) 554-6769",
      email: "info@ez2fix.com",
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
        // Bergen County cities
        {
          name: "Englewood",
          state: "NJ",
          slug: "englewood-nj",
          center: { lat: 40.8929, lng: -73.9726 },
          neighborhoods: ["Downtown", "North Englewood"],
        },
        { name: "Fort Lee", state: "NJ", slug: "fort-lee-nj", center: { lat: 40.8501, lng: -73.9701 } },
        { name: "Tenafly", state: "NJ", slug: "tenafly-nj", center: { lat: 40.9251, lng: -73.9626 } },
        { name: "Bergenfield", state: "NJ", slug: "bergenfield-nj", center: { lat: 40.9276, lng: -73.9973 } },
        { name: "Cliffside Park", state: "NJ", slug: "cliffside-park-nj", center: { lat: 40.8215, lng: -73.9879 } },
        { name: "Ridgefield Park", state: "NJ", slug: "ridgefield-park-nj", center: { lat: 40.8565, lng: -74.0198 } },
        { name: "Ridgefield", state: "NJ", slug: "ridgefield-nj", center: { lat: 40.8348, lng: -74.0104 } },
        { name: "Cresskill", state: "NJ", slug: "cresskill-nj", center: { lat: 40.9426, lng: -73.9596 } },
        { name: "Teaneck", state: "NJ", slug: "teaneck-nj", center: { lat: 40.8876, lng: -74.0159 } },
        { name: "Hackensack", state: "NJ", slug: "hackensack-nj", center: { lat: 40.8859, lng: -74.0435 } },
        { name: "Paramus", state: "NJ", slug: "paramus-nj", center: { lat: 40.9445, lng: -74.0654 } },
        { name: "Ridgewood", state: "NJ", slug: "ridgewood-nj", center: { lat: 40.9798, lng: -74.1165 } },
        { name: "Fair Lawn", state: "NJ", slug: "fair-lawn-nj", center: { lat: 40.9362, lng: -74.1318 } },
        
        // Hudson County cities
        { name: "Jersey City", state: "NJ", slug: "jersey-city-nj", center: { lat: 40.7178, lng: -74.0431 }, neighborhoods: ["Downtown", "Newport", "The Heights"] },
        { name: "Hoboken", state: "NJ", slug: "hoboken-nj", center: { lat: 40.7430, lng: -74.0324 } },
        { name: "Bayonne", state: "NJ", slug: "bayonne-nj", center: { lat: 40.6687, lng: -74.1143 } },
        { name: "Union City", state: "NJ", slug: "union-city-nj", center: { lat: 40.7662, lng: -74.0376 } },
        { name: "West New York", state: "NJ", slug: "west-new-york-nj", center: { lat: 40.7879, lng: -74.0143 } },
        { name: "North Bergen", state: "NJ", slug: "north-bergen-nj", center: { lat: 40.8043, lng: -74.0121 } },
        { name: "Secaucus", state: "NJ", slug: "secaucus-nj", center: { lat: 40.7896, lng: -74.0565 } },
        { name: "Weehawken", state: "NJ", slug: "weehawken-nj", center: { lat: 40.7698, lng: -74.0198 } },
        
        // Edison and surrounding Middlesex County
        { name: "Elmwood Park", state: "NJ", slug: "elmwood-park-nj", center: { lat: 40.9026, lng: -74.1218 }, neighborhoods: ["Downtown", "East Elmwood Park"] },
        { name: "Edison", state: "NJ", slug: "edison-nj", center: { lat: 40.5187, lng: -74.4121 }, neighborhoods: ["Menlo Park", "Clara Barton", "Oak Tree"] },
        { name: "Woodbridge", state: "NJ", slug: "woodbridge-nj", center: { lat: 40.5576, lng: -74.2846 } },
        { name: "New Brunswick", state: "NJ", slug: "new-brunswick-nj", center: { lat: 40.4862, lng: -74.4518 } },
        { name: "Perth Amboy", state: "NJ", slug: "perth-amboy-nj", center: { lat: 40.5065, lng: -74.2654 } },
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
    defaultTitle: "ez2fix — 24/7 Locksmith Service in Elmwood Park, NJ | Emergency Lockouts",
    defaultDescription:
      "24/7 emergency locksmith service in Elmwood Park, NJ. Car lockouts, house lockouts, lock repair, key replacement. Fast response across Bergen and Hudson counties.",
    siteUrl: "https://www.ez2fix.com",
    image: {
      src: "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: 1200,
      height: 630,
      alt: "ez2fix – quality locksmith service",
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
      replyToEmail: "info@ez2fix.com",
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