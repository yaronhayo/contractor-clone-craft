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
  serviceCategory: (categorySlug: string) => string; // "/automotive-locksmith"
  individualService: (serviceSlug: string) => string; // "/car-key-replacement"
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

// Default example config – replace values per client on new projects
export const siteConfig: SiteConfig = {
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
        slug: "automotive-locksmith",
        name: "Automotive Locksmith",
        description: "Car key replacement, key programming, lockouts, ignitions.",
      },
      {
        slug: "residential-locksmith",
        name: "Residential Locksmith",
        description: "Home lockouts, rekeying, smart lock installs.",
      },
    ],
    services: [
      {
        slug: "car-key-replacement",
        name: "Car Key Replacement",
        categorySlug: "automotive-locksmith",
        shortDescription: "On-site replacement and programming for lost or broken car keys.",
        images: [
          {
            src: "/src/assets/service-1.jpg",
            width: 1200,
            height: 800,
            alt: "Car key replacement service van",
          },
        ],
      },
      {
        slug: "house-lockout",
        name: "House Lockout",
        categorySlug: "residential-locksmith",
        shortDescription: "Emergency home lockout assistance, damage-free entry.",
      },
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
        {
          name: "Leon Valley",
          state: "TX",
          slug: "leon-valley-tx",
          center: { lat: 29.495, lng: -98.619 },
        },
      ],
    },
  ],
  routes: {
    servicesIndex: "/services",
    serviceCategory: (categorySlug: string) => `/services/${categorySlug}`,
    individualService: (serviceSlug: string) => `/services/${serviceSlug}`,
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
