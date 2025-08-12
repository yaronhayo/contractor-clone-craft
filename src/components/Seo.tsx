import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string; // absolute or path starting with /
}

const Seo = ({ title, description, canonical = "/" }: SeoProps) => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const canonicalUrl = canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`;
  const shareImage = siteConfig.seo.image;

  const services = siteConfig.taxonomy.services || [];
  const cities = siteConfig.locations.map((l) => ({ "@type": "City", name: `${l.address.city}, ${l.address.state}` }));

  // Build openingHoursSpecification from configured business hours
  const openingHoursSpecification = (() => {
    const dayMap: Record<string, string> = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
    };
    const hours = siteConfig.business.hours || {} as any;

    const parseTime = (t: string) => {
      const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!m) return null;
      let h = parseInt(m[1], 10);
      const min = parseInt(m[2] || "0", 10);
      const ampm = m[3].toUpperCase();
      if (ampm === "AM") {
        if (h === 12) h = 0;
      } else {
        if (h !== 12) h += 12;
      }
      const hh = String(h).padStart(2, "0");
      const mm = String(min).padStart(2, "0");
      return `${hh}:${mm}`;
    };

    const specs: any[] = [];
    (Object.keys(dayMap) as Array<keyof typeof dayMap>).forEach((k) => {
      const val = (hours as any)[k];
      if (!val) return;
      if (/closed/i.test(val)) return;
      const parts = val.split(/[–-]/); // en dash or hyphen
      if (parts.length !== 2) return;
      const open = parseTime(parts[0]);
      const close = parseTime(parts[1]);
      if (!open || !close) return;
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayMap[k]}`,
        opens: open,
        closes: close,
      });
    });
    return specs;
  })();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.business.name,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.business.legalName || siteConfig.business.name,
      url: siteUrl,
      telephone: siteConfig.business.phone,
      image: shareImage?.src,
      priceRange: "$$",
      sameAs: Object.values(siteConfig.business.social || {}).filter(Boolean),
      hasMap: siteConfig.business.social?.googleBusiness,
      geo: siteConfig.business.geo
        ? {
            "@type": "GeoCoordinates",
            latitude: siteConfig.business.geo.lat,
            longitude: siteConfig.business.geo.lng,
          }
        : undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.business.hqAddress.line1,
        addressLocality: siteConfig.business.hqAddress.city,
        addressRegion: siteConfig.business.hqAddress.state,
        postalCode: siteConfig.business.hqAddress.postalCode,
        addressCountry: siteConfig.business.hqAddress.country || "US",
      },
      areaServed: cities,
      openingHoursSpecification: openingHoursSpecification.length ? openingHoursSpecification : undefined,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.business.phone,
          contactType: "customer service",
          areaServed: cities.map((c: any) => c.name),
          availableLanguage: ["English"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Garage Door Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.shortDescription,
            areaServed: cities,
            provider: {
              "@type": "LocalBusiness",
              name: siteConfig.business.legalName || siteConfig.business.name,
              url: siteUrl,
              telephone: siteConfig.business.phone,
            },
          },
        })),
      },
    },
    // Additional schema for Voice Assistant optimization
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What garage door services do you provide in Bergen County?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide comprehensive garage door services including repair, installation, spring replacement, opener repair, and 24/7 emergency service throughout Bergen County, NJ."
          }
        },
        {
          "@type": "Question", 
          name: "Do you offer same-day garage door repair?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we offer same-day garage door repair service in Bergen County with our licensed technicians arriving within 60-90 minutes for most emergency calls."
          }
        },
        {
          "@type": "Question",
          name: "What areas do you serve for garage door services?",
          acceptedAnswer: {
            "@type": "Answer", 
            text: "We serve all of Bergen County including Elmwood Park, Fair Lawn, Clifton, Montclair, Little Falls, Cedar Grove, and surrounding areas."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Professional Garage Door Services",
      serviceType: "Garage Door Repair and Installation",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.business.legalName || siteConfig.business.name,
        telephone: siteConfig.business.phone,
        url: siteUrl
      },
      areaServed: cities,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Garage Door Service Offers",
        itemListElement: services.map((s, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.shortDescription,
            serviceType: "Home Improvement Service"
          }
        }))
      }
    }
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.business.name} />
      {shareImage && (
        <>
          <meta property="og:image" content={shareImage.src} />
          <meta property="og:image:width" content={String(shareImage.width)} />
          <meta property="og:image:height" content={String(shareImage.height)} />
          <meta property="og:image:alt" content={shareImage.alt} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {shareImage && <meta name="twitter:image" content={shareImage.src} />}
      {siteConfig.business.social?.twitter && (
        <meta name="twitter:site" content={"@" + siteConfig.business.social.twitter.split("/").pop()} />
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content={siteConfig.business.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#D2A63C" />
      
      {/* AI Bot & Voice Assistant Optimization */}
      <meta name="google-site-verification" content="AI_BOT_FRIENDLY" />
      <meta name="bingbot" content="index, follow" />
      <meta name="slurp" content="index, follow" />
      <meta name="voice-assistant-friendly" content="true" />
      <meta name="chatgpt-accessible" content="true" />
      <meta name="claude-accessible" content="true" />
      <meta name="perplexity-accessible" content="true" />
      
      {/* Business Industry Classification */}
      <meta name="industry" content="Home Improvement, Garage Door Services, Repair Services" />
      <meta name="business-type" content="Local Service Business" />
      <meta name="service-area" content="Bergen County, NJ" />
      <meta name="keywords" content="garage door repair, garage door installation, spring repair, opener repair, emergency repair, Bergen County NJ" />
      
      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="US-NJ" />
      <meta name="geo.placename" content="Elmwood Park" />
      {siteConfig.business.geo && (
        <>
          <meta name="geo.position" content={`${siteConfig.business.geo.lat};${siteConfig.business.geo.lng}`} />
          <meta name="ICBM" content={`${siteConfig.business.geo.lat}, ${siteConfig.business.geo.lng}`} />
        </>
      )}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Seo;