import { siteConfig } from "@/config/site-config";

interface ServiceSchemaProps {
  serviceName: string;
  serviceSlug: string;
  description: string;
  features: string[];
}

export const generateServiceSchema = ({ serviceName, serviceSlug, description, features }: ServiceSchemaProps) => {
  const siteUrl = siteConfig.seo?.siteUrl || "";
  
  // Add safety checks for all siteConfig accesses
  if (!siteConfig || !siteConfig.business) {
    console.warn('Site config not available for schema generation');
    return {};
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType: serviceName,
    description: description,
    url: `${siteUrl}${siteConfig.routes.individualService(serviceSlug)}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: siteConfig.business.legalName || siteConfig.business.name,
      telephone: siteConfig.business.phone,
      email: siteConfig.business.email,
      url: siteUrl,
      logo: `${siteUrl}/ez2fix-logo.png`,
      image: `${siteUrl}/ez2fix-logo.png`,
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card, Check",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.business.hqAddress.street1,
        addressLocality: siteConfig.business.hqAddress.city,
        addressRegion: siteConfig.business.hqAddress.state,
        postalCode: siteConfig.business.hqAddress.zipCode,
        addressCountry: "US"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.business.hqAddress.coordinates?.lat || 40.7128,
        longitude: siteConfig.business.hqAddress.coordinates?.lng || -74.0060
      },
      openingHours: "Mo-Su 00:00-23:59",
      sameAs: [
        siteConfig.business.social?.googleMaps,
        siteConfig.business.social?.facebook,
        siteConfig.business.social?.yelp
      ].filter(Boolean),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Garage Door Services",
        itemListElement: features.map((feature, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: feature
          }
        }))
      }
    },
    areaServed: siteConfig.locations.flatMap(location => 
      location.serviceAreas.map(area => ({
        "@type": "City",
        name: `${area.name}, ${area.state}`
      }))
    ),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: 247,
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Jennifer M."
        },
        reviewBody: "Emergency garage door spring repair at 11PM - technician arrived quickly and fixed perfectly. Professional service when we needed it most!",
        datePublished: "2025-01-15"
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5", 
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Robert K."
        },
        reviewBody: "Excellent installation of new garage door. Professional technician who understood unique building requirements. Highly recommended!",
        datePublished: "2024-12-20"
      }
    ],
    potentialAction: {
      "@type": "ContactAction",
      target: `tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`,
      name: `Call ${siteConfig.business.name} for ${serviceName}`
    }
  };
};

export const generateLocalBusinessSchema = () => {
  const siteUrl = siteConfig.seo?.siteUrl || "";
  
  // Add safety checks for all siteConfig accesses
  if (!siteConfig || !siteConfig.business) {
    console.warn('Site config not available for local business schema generation');
    return {};
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: siteConfig.business.legalName || siteConfig.business.name,
    alternateName: siteConfig.business.name,
    description: "Professional garage door repair and installation services in New Jersey. Licensed contractors with 24/7 emergency service, 10-year warranty, and 5-star customer rating.",
    url: siteUrl,
    telephone: siteConfig.business.phone,
    email: siteConfig.business.email,
    logo: `${siteUrl}/ez2fix-logo.png`,
    image: [
      `${siteUrl}/ez2fix-logo.png`,
      `${siteUrl}/assets/hero-house.jpg`,
      `${siteUrl}/assets/service-1.jpg`
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.hqAddress.street1,
      addressLocality: siteConfig.business.hqAddress.city,
      addressRegion: siteConfig.business.hqAddress.state,
      postalCode: siteConfig.business.hqAddress.zipCode,
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates", 
      latitude: siteConfig.business.hqAddress.coordinates?.lat || 40.7128,
      longitude: siteConfig.business.hqAddress.coordinates?.lng || -74.0060
    },
    openingHours: ["Mo-Su 00:00-23:59"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.business.hqAddress.coordinates?.lat || 40.7128,
        longitude: siteConfig.business.hqAddress.coordinates?.lng || -74.0060
      },
      geoRadius: "50000"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: siteConfig.taxonomy.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription
        },
        url: `${siteUrl}${siteConfig.routes.individualService(service.slug)}`
      }))
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: 247,
      bestRating: "5",
      worstRating: "1"
    },
    sameAs: [
      siteConfig.business.social?.googleMaps,
      siteConfig.business.social?.facebook,
      siteConfig.business.social?.yelp
    ].filter(Boolean)
  };
};

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
};