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
  slug: string; // e.g., "automotive-locksmith"
  name: string;
  description?: string;
  image?: MediaAsset;
};

export type Service = {
  slug: string; // e.g., "car-key-replacement"
  name: string;
  categorySlug: string;
  shortDescription?: string;
  longDescription?: string;
  images?: MediaAsset[];
};

export type ServiceAreaCity = {
  name: string; // e.g., "San Antonio"
  state: string; // e.g., "TX"
  slug: string; // e.g., "san-antonio-tx"
  center?: Geo; // optional map marker
  neighborhoods?: string[];
};

export type Location = {
  id: string;
  name: string; // e.g., "Locksmith San Antonio"
  slug: string; // e.g., "locksmith-san-antonio-tx"
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
  serviceCategory: (categorySlug: string) => string; // "/services/automotive-locksmith"
  individualService: (categorySlug: string, serviceSlug: string) => string; // "/services/automotive-locksmith/car-key-replacement"
  serviceCity: (serviceSlug: string, citySlug: string) => string; // "/car-key-replacement-san-antonio-tx"
  locationsIndex: string; // "/locations"
  locationDetail: (locationSlug: string) => string; // "/locations/locksmith-san-antonio-tx"
  serviceAreasIndex: string; // "/service-areas"
  serviceAreaDetail: (areaSlug: string) => string; // "/service-areas/locksmith-near-san-antonio-tx"
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
    category: string; // e.g., "{{category.name}} Locksmith Services | {{business.name}}"
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

// Default example config – replace values per client on new projects
const baseConfig: SiteConfig = {
  business: {
    name: "Your Brand Locksmith",
    legalName: "Your Brand LLC",
    phone: "(800) 000-0000",
    email: "hello@example.com",
    siteUrl: "https://www.example.com",
    hqAddress: {
      line1: "123 Main St",
      city: "San Antonio",
      state: "TX",
      postalCode: "78205",
      country: "US",
    },
    geo: { lat: 29.4252, lng: -98.4946 },
    hours: {
      mon: "8:00AM – 5:00PM",
      tue: "8:00AM – 5:00PM",
      wed: "8:00AM – 5:00PM",
      thu: "8:00AM – 5:00PM",
      fri: "8:00AM – 5:00PM",
      sat: "8:00AM – 2:00PM",
      sun: "Closed",
    },
    social: {
      facebook: "https://facebook.com/yourbrand",
      instagram: "https://instagram.com/yourbrand",
      googleBusiness: "https://g.page/yourbrand",
    },
    branding: {
      colors: {
        primary: "hsl(221 83% 53%)",
        secondary: "hsl(217 32% 17%)",
        accent: "hsl(155 60% 45%)",
      },
      logos: {
        light: {
          src: "/placeholder.svg",
          width: 200,
          height: 48,
          alt: "Your Brand Logo (Light)",
        },
        dark: {
          src: "/placeholder.svg",
          width: 200,
          height: 48,
          alt: "Your Brand Logo (Dark)",
        },
        mark: {
          src: "/placeholder.svg",
          width: 48,
          height: 48,
          alt: "Your Brand Logo Mark",
        },
      },
    },
  },
  media: {
    hero: {
      src: "/src/assets/hero-house.jpg",
      width: 1600,
      height: 900,
      alt: "Locksmith working on front door – professional service",
      credit: {
        source: "Freepik",
        author: "Freepik",
        url: "https://www.freepik.com/",
        license: "Standard license",
      },
    },
    serviceCardDefault: {
      src: "/src/assets/service-1.jpg",
      width: 1200,
      height: 800,
      alt: "Professional locksmith service",
    },
    gallery: [
      {
        src: "/src/assets/service-2.jpg",
        width: 1200,
        height: 800,
        alt: "Automotive key programming on-site",
      },
    ],
  },
  taxonomy: {
    categories: [
      {
        slug: "emergency-locksmith",
        name: "Emergency Locksmith",
        description: "Urgent lockout services for cars, homes, businesses, and storage units—fast, damage-free entry.",
      },
      {
        slug: "residential-locksmith",
        name: "Residential Locksmith",
        description: "Home security: rekeys, repairs, replacements, and gate locks.",
      },
      {
        slug: "commercial-locksmith",
        name: "Commercial Locksmith",
        description: "Business security: master key systems, access control, exit devices, and more.",
      },
      {
        slug: "automotive-locksmith",
        name: "Automotive Locksmith",
        description: "Car key replacement, key fob programming, lockouts, and ignition repair.",
      },
    ],
    services: [
      // Emergency Locksmith
      { slug: "car-lockout", name: "Car Lockout", categorySlug: "emergency-locksmith", shortDescription: "24/7 car lockout assistance—quick, damage-free entry." },
      { slug: "house-lockout", name: "House Lockout", categorySlug: "emergency-locksmith", shortDescription: "Locked out of your home? We’ll get you back inside safely." },
      { slug: "business-lockout", name: "Business Lockout", categorySlug: "emergency-locksmith", shortDescription: "Emergency entry for offices, shops, and industrial properties." },
      { slug: "storage-unit-lockout", name: "Storage Unit Lockout", categorySlug: "emergency-locksmith", shortDescription: "Fast access to storage units without damage." },

      // Residential Locksmith
      { slug: "residential-lock-replacement", name: "Lock Replacement (Residential)", categorySlug: "residential-locksmith", shortDescription: "Replace worn or damaged home locks with secure hardware." },
      { slug: "lock-rekey", name: "Lock Rekey", categorySlug: "residential-locksmith", shortDescription: "Rekey your existing locks to work with new keys." },
      { slug: "lock-repair", name: "Lock Repair", categorySlug: "residential-locksmith", shortDescription: "Fix sticking, broken, or misaligned locks at your home." },
      { slug: "gate-locks", name: "Gate Locks", categorySlug: "residential-locksmith", shortDescription: "Install and service secure locks for gates and outdoor entries." },

      // Commercial Locksmith
      { slug: "commercial-lock-replacement", name: "Lock Replacement (Commercial)", categorySlug: "commercial-locksmith", shortDescription: "Upgrade or replace commercial-grade locks for your business." },
      { slug: "master-key-systems", name: "Master Key Systems", categorySlug: "commercial-locksmith", shortDescription: "Tiered access control with master and user-level keys." },
      { slug: "access-control", name: "Access Control", categorySlug: "commercial-locksmith", shortDescription: "Keypads, card readers, and smart access solutions." },
      { slug: "emergency-exit-devices", name: "Emergency Exit Devices", categorySlug: "commercial-locksmith", shortDescription: "Panic bars and fire exit hardware installation and service." },

      // Automotive Locksmith
      { slug: "car-key-replacement", name: "Car Key Replacement", categorySlug: "automotive-locksmith", shortDescription: "On-site replacement and programming for lost or broken car keys." },
      { slug: "key-fob-programming", name: "Key Fob Programming", categorySlug: "automotive-locksmith", shortDescription: "Program new or existing fobs and remotes for your vehicle." },
      { slug: "car-key-duplicate", name: "Car Key Duplicate", categorySlug: "automotive-locksmith", shortDescription: "Cut and program spare keys to avoid emergencies." },
      { slug: "ignition-repair", name: "Ignition Repair", categorySlug: "automotive-locksmith", shortDescription: "Repair or replace faulty ignitions and key cylinders." },

      // General catch-all service (optional existing)
      { slug: "emergency-locksmith", name: "Emergency Locksmith", categorySlug: "emergency-locksmith", shortDescription: "24/7 emergency locksmith services for homes, cars, and businesses." },
    ],
  },
  locations: [
    {
      id: "loc-san-antonio",
      name: "Locksmith San Antonio",
      slug: "locksmith-san-antonio-tx",
      phone: "(210) 000-0000",
      email: "sa@example.com",
      address: {
        line1: "200 Houston St",
        city: "San Antonio",
        state: "TX",
        postalCode: "78205",
        country: "US",
      },
      geo: { lat: 29.426, lng: -98.489 },
      hours: {
        mon: "8:00AM – 6:00PM",
        tue: "8:00AM – 6:00PM",
        wed: "8:00AM – 6:00PM",
        thu: "8:00AM – 6:00PM",
        fri: "8:00AM – 6:00PM",
        sat: "8:00AM – 4:00PM",
        sun: "Closed",
      },
      isPrimary: true,
      coverageRadiusMiles: 40,
      serviceAreas: [
        {
          name: "San Antonio",
          state: "TX",
          slug: "san-antonio-tx",
          center: { lat: 29.4241, lng: -98.4936 },
          neighborhoods: ["Downtown", "Alamo Heights", "Stone Oak"],
        },
        { name: "Leon Valley", state: "TX", slug: "leon-valley-tx", center: { lat: 29.495, lng: -98.619 } },
        { name: "Austin", state: "TX", slug: "austin-tx", center: { lat: 30.2672, lng: -97.7431 }, neighborhoods: ["Downtown", "South Congress", "Domain"] },
        { name: "Houston", state: "TX", slug: "houston-tx", center: { lat: 29.7604, lng: -95.3698 }, neighborhoods: ["Downtown", "Midtown", "Montrose"] },
        { name: "Dallas", state: "TX", slug: "dallas-tx", center: { lat: 32.7767, lng: -96.797 }, neighborhoods: ["Downtown", "Deep Ellum", "Uptown"] },
      ],
    },

    {
      id: "loc-miami",
      name: "Locksmith Miami",
      slug: "locksmith-miami-fl",
      phone: "(305) 000-0000",
      email: "miami@example.com",
      address: {
        line1: "100 Biscayne Blvd",
        city: "Miami",
        state: "FL",
        postalCode: "33132",
        country: "US",
      },
      geo: { lat: 25.7743, lng: -80.1937 },
      hours: {
        mon: "8:00AM – 6:00PM",
        tue: "8:00AM – 6:00PM",
        wed: "8:00AM – 6:00PM",
        thu: "8:00AM – 6:00PM",
        fri: "8:00AM – 6:00PM",
        sat: "8:00AM – 4:00PM",
        sun: "Closed",
      },
      coverageRadiusMiles: 40,
      serviceAreas: [
        { name: "Miami", state: "FL", slug: "miami-fl", center: { lat: 25.7617, lng: -80.1918 }, neighborhoods: ["Brickell", "Wynwood", "Little Havana"] },
        { name: "Miami Beach", state: "FL", slug: "miami-beach-fl", center: { lat: 25.7907, lng: -80.130 }, neighborhoods: ["South Beach", "North Beach"] },
        { name: "Hialeah", state: "FL", slug: "hialeah-fl", center: { lat: 25.8576, lng: -80.2781 } },
        { name: "Fort Lauderdale", state: "FL", slug: "fort-lauderdale-fl", center: { lat: 26.1224, lng: -80.1373 } },
      ],
    },

    {
      id: "loc-los-angeles",
      name: "Locksmith Los Angeles",
      slug: "locksmith-los-angeles-ca",
      phone: "(323) 000-0000",
      email: "la@example.com",
      address: {
        line1: "600 S Spring St",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90014",
        country: "US",
      },
      geo: { lat: 34.0479, lng: -118.2498 },
      hours: {
        mon: "8:00AM – 6:00PM",
        tue: "8:00AM – 6:00PM",
        wed: "8:00AM – 6:00PM",
        thu: "8:00AM – 6:00PM",
        fri: "8:00AM – 6:00PM",
        sat: "8:00AM – 4:00PM",
        sun: "Closed",
      },
      coverageRadiusMiles: 40,
      serviceAreas: [
        { name: "Los Angeles", state: "CA", slug: "los-angeles-ca", center: { lat: 34.0522, lng: -118.2437 }, neighborhoods: ["Downtown", "Silver Lake", "Hollywood"] },
        { name: "Santa Monica", state: "CA", slug: "santa-monica-ca", center: { lat: 34.0195, lng: -118.4912 } },
        { name: "Pasadena", state: "CA", slug: "pasadena-ca", center: { lat: 34.1478, lng: -118.1445 } },
        { name: "Long Beach", state: "CA", slug: "long-beach-ca", center: { lat: 33.7701, lng: -118.1937 } },
      ],
    },

    {
      id: "loc-newark",
      name: "Locksmith Newark",
      slug: "locksmith-newark-nj",
      phone: "(973) 000-0000",
      email: "nj@example.com",
      address: {
        line1: "50 Park Pl",
        city: "Newark",
        state: "NJ",
        postalCode: "07102",
        country: "US",
      },
      geo: { lat: 40.7357, lng: -74.1724 },
      hours: {
        mon: "8:00AM – 6:00PM",
        tue: "8:00AM – 6:00PM",
        wed: "8:00AM – 6:00PM",
        thu: "8:00AM – 6:00PM",
        fri: "8:00AM – 6:00PM",
        sat: "8:00AM – 4:00PM",
        sun: "Closed",
      },
      coverageRadiusMiles: 40,
      serviceAreas: [
        { name: "Newark", state: "NJ", slug: "newark-nj", center: { lat: 40.7357, lng: -74.1724 }, neighborhoods: ["Downtown", "Ironbound"] },
        { name: "Jersey City", state: "NJ", slug: "jersey-city-nj", center: { lat: 40.7178, lng: -74.0431 } },
        { name: "Hoboken", state: "NJ", slug: "hoboken-nj", center: { lat: 40.743, lng: -74.0324 } },
        { name: "Elizabeth", state: "NJ", slug: "elizabeth-nj", center: { lat: 40.66399, lng: -74.2107 } },
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
    defaultTitle: "Your Brand Locksmith — Trusted Local Pros",
    defaultDescription:
      "Professional automotive, residential, and commercial locksmith services. Fast response, licensed & insured.",
    siteUrl: "https://www.example.com",
    image: {
      src: "/src/assets/hero-house.jpg",
      width: 1200,
      height: 630,
      alt: "Your Brand Locksmith – quality service",
    },
    templates: {
      service: "{{service.name}} | {{business.name}}",
      category: "{{category.name}} Locksmith Services | {{business.name}}",
      serviceCity: "{{service.name}} in {{city.name}}, {{city.state}} | {{business.name}}",
      location: "{{location.name}} | {{business.name}}",
    },
  },
  integrations: {
    googleMaps: {
      apiKey: "", // set per-site in Vercel Project Environment
      defaultCenter: { lat: 29.4252, lng: -98.4946 },
      defaultZoom: 10,
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
      fromEmail: "no-reply@example.com",
      replyToEmail: "support@example.com",
      brand: "Your Brand Locksmith",
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
      defaultAttribution: "Image by Freepik",
      profileUrl: "https://www.freepik.com/",
    },
    vercel: {
      projectName: "your-brand-locksmith",
    },
  },
};

// Apply runtime overrides from localStorage (publishable keys & settings)
const overrides = typeof window !== "undefined" ? (() => {
  try { return JSON.parse(localStorage.getItem("siteConfigOverrides") || "null"); } catch { return null; }
})() : null;

export const siteConfig: SiteConfig = overrides ? mergeDeep(baseConfig, overrides) : baseConfig;
