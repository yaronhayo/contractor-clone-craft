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
    name: "Pro Line Garage Experts",
    legalName: "Pro Line Garage Experts LLC",
    phone: "(732) 555-0100",
    email: "info@prolinegaragenj.com",
    siteUrl: "https://www.prolinegaragenj.com",
    hqAddress: {
      line1: "123 Main Street",
      city: "Edison",
      state: "NJ",
      postalCode: "08817",
      country: "US",
    },
    geo: { lat: 40.5187, lng: -74.4121 },
    hours: {
      mon: "7:00AM – 11:00PM",
      tue: "7:00AM – 11:00PM",
      wed: "7:00AM – 11:00PM",
      thu: "7:00AM – 11:00PM",
      fri: "7:00AM – 11:00PM",
      sat: "7:00AM – 11:00PM",
      sun: "7:00AM – 11:00PM",
    },
    social: {
      facebook: "https://facebook.com/prolinegaragenj",
      instagram: "https://instagram.com/prolinegaragenj",
      googleBusiness: "https://g.page/prolinegaragenj",
    },
    branding: {
      colors: {
        primary: "hsl(15 85% 50%)",
        secondary: "hsl(220 14% 96%)",
        accent: "hsl(220 13% 91%)",
      },
      logos: {
        light: {
          src: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
          width: 200,
          height: 48,
          alt: "Pro Line Garage Experts Logo",
        },
        dark: {
          src: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
          width: 200,
          height: 48,
          alt: "Pro Line Garage Experts Logo",
        },
        mark: {
          src: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=100",
          width: 48,
          height: 48,
          alt: "Pro Line Garage Experts Logo Mark",
        },
      },
    },
  },
  media: {
    hero: {
      src: "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1600",
      width: 1600,
      height: 900,
      alt: "Professional garage door installation and repair services",
      credit: {
        source: "Freepik",
        author: "Freepik",
        url: "https://www.pexels.com/",
        license: "Standard license",
      },
    },
    serviceCardDefault: {
      src: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: 1200,
      height: 800,
      alt: "Professional garage door service",
    },
    gallery: [
      {
        src: "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "Garage door installation and repair",
      },
    ],
  },
  taxonomy: {
    categories: [
      {
        slug: "emergency-garage-door",
        name: "Emergency Garage Door",
        description: "24/7 emergency garage door repair and service—fast response when you need it most.",
      },
      {
        slug: "garage-door-repair",
        name: "Garage Door Repair",
        description: "Complete garage door repair services including springs, openers, and rollers.",
      },
      {
        slug: "garage-door-installation",
        name: "Garage Door Installation",
        description: "Professional garage door installation with quality materials and expert craftsmanship.",
      },
    ],
    services: [
      // Emergency Garage Door
      { slug: "24-7-emergency-garage-door-service", name: "24/7 Emergency Garage Door Service", categorySlug: "emergency-garage-door", shortDescription: "Emergency garage door repair available 24/7—fast response when you're stuck." },
      
      // Garage Door Repair
      { slug: "garage-door-repair", name: "Garage Door Repair", categorySlug: "garage-door-repair", shortDescription: "Expert garage door repair for all makes and models—same day service available." },
      { slug: "garage-door-spring-repairs", name: "Garage Door Spring Repairs", categorySlug: "garage-door-repair", shortDescription: "Professional spring repair and replacement—restoring safe operation." },
      { slug: "garage-door-opener-repair", name: "Garage Door Opener Repair", categorySlug: "garage-door-repair", shortDescription: "Garage door opener diagnosis and repair—all brands serviced." },
      { slug: "roller-replacement-repair", name: "Roller Replacement & Repair", categorySlug: "garage-door-repair", shortDescription: "Smooth operation with professional roller replacement and repair services." },

      // Garage Door Installation
      { slug: "garage-door-installation", name: "Garage Door Installation", categorySlug: "garage-door-installation", shortDescription: "Complete garage door installation with quality materials and expert workmanship." },
    ],
  },
  locations: [
    {
      id: "loc-edison",
      name: "Pro Line Garage Experts Edison",
      slug: "pro-line-garage-experts-edison-nj",
      phone: "(732) 555-0100",
      email: "edison@prolinegaragenj.com",
      address: {
        line1: "123 Main Street",
        city: "Edison",
        state: "NJ",
        postalCode: "08817",
        country: "US",
      },
      geo: { lat: 40.5187, lng: -74.4121 },
      hours: {
        mon: "7:00AM – 11:00PM",
        tue: "7:00AM – 11:00PM",
        wed: "7:00AM – 11:00PM",
        thu: "7:00AM – 11:00PM",
        fri: "7:00AM – 11:00PM",
        sat: "7:00AM – 11:00PM",
        sun: "7:00AM – 11:00PM",
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
    defaultTitle: "Pro Line Garage Experts — Professional Garage Door Service in Edison, NJ",
    defaultDescription:
      "Professional garage door installation, repair, and emergency services in Edison, NJ. Serving Bergen and Hudson counties with 24/7 availability.",
    siteUrl: "https://www.prolinegaragenj.com",
    image: {
      src: "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: 1200,
      height: 630,
      alt: "Pro Line Garage Experts – quality garage door service",
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
      defaultCenter: { lat: 40.5187, lng: -74.4121 },
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
      fromEmail: "no-reply@prolinegaragenj.com",
      replyToEmail: "info@prolinegaragenj.com",
      brand: "Pro Line Garage Experts",
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
      projectName: "pro-line-garage-experts",
    },
  },
};

// Apply runtime overrides from localStorage (publishable keys & settings)
const overrides = typeof window !== "undefined" ? (() => {
  try { return JSON.parse(localStorage.getItem("siteConfigOverrides") || "null"); } catch { return null; }
})() : null;

export const siteConfig: SiteConfig = overrides ? mergeDeep(baseConfig, overrides) : baseConfig;