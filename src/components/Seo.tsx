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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.business.name,
      url: siteUrl,
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
      openingHours: [
        `Mon ${siteConfig.business.hours.mon}`,
        `Tue ${siteConfig.business.hours.tue}`,
        `Wed ${siteConfig.business.hours.wed}`,
        `Thu ${siteConfig.business.hours.thu}`,
        `Fri ${siteConfig.business.hours.fri}`,
        `Sat ${siteConfig.business.hours.sat}`,
        `Sun ${siteConfig.business.hours.sun}`,
      ],
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
        name: "Locksmith Services",
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

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Seo;
