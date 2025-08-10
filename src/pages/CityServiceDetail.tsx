import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapsProvider } from "@/contexts/MapsProvider";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";

const toTitle = (slug?: string) => (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const CityServiceDetail = () => {
  const { serviceSlug, citySlug } = useParams();
  const service = siteConfig.taxonomy.services.find((s) => s.slug === serviceSlug) || siteConfig.taxonomy.services[0];
  const area = siteConfig.locations
    .flatMap((l) => l.serviceAreas.map((a) => ({ ...a, locationId: l.id })))
    .find((a) => a.slug === citySlug);
  const areaName = area ? `${area.name}, ${area.state}` : toTitle(citySlug);
  const locationId = area?.locationId;

  const title = `${service.name} in ${areaName} | ${siteConfig.business.name}`;
  const description = service.shortDescription || `Expert ${service.name.toLowerCase()} in ${areaName}. Get a free estimate today.`;
  const canonical = siteConfig.routes.serviceCity(service.slug, citySlug || "");

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}${siteConfig.routes.servicesIndex}` },
      { "@type": "ListItem", position: 3, name: `${service.name} in ${areaName}`, item: `${siteUrl}${canonical}` },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${areaName}`,
    serviceType: service.name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.business.legalName || siteConfig.business.name,
      telephone: siteConfig.business.phone,
      url: siteUrl,
    },
    areaServed: area ? [{ "@type": "City", name: areaName }] : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 250,
    },
    potentialAction: {
      "@type": "ContactAction",
      target: `tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`,
      name: `Call ${siteConfig.business.name}`,
    },
  };

  const img = service.images?.[0] || siteConfig.media.serviceCardDefault;

  return (
    <div>
      <Seo title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to={siteConfig.routes.servicesIndex}>Services</Link> / <span className="text-foreground">{service.name} in {areaName}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{service.name} in {areaName}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">{description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
                aria-label={`Call ${siteConfig.business.name}`}
                onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "city_service_header", phone: siteConfig.business.phone, service: service.name, city: areaName }); } catch {} }}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90"
              >
                Call {siteConfig.business.phone}
              </a>
              <a
                href="/#estimate"
                onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "cta_click", source: "city_service_header", cta: "estimate", service: service.name, city: areaName }); } catch {} }}
                className="inline-flex items-center justify-center rounded-md border px-5 py-3 font-medium hover:bg-accent"
              >
                Get Free Estimate
              </a>
            </div>
          </header>

          {img && (
            <div className="mt-8 rounded-lg overflow-hidden border">
              <img src={img.src} alt={img.alt || `${service.name} in ${areaName}`} width={img.width} height={img.height} className="w-full h-72 object-cover" loading="lazy" />
            </div>
          )}

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <h2>Garage Door Services in {areaName}</h2>
            <ul>
              <li>24/7 emergency garage door repair service</li>
              <li>Professional garage door installation with quality doors</li>
              <li>Spring repair and replacement for all garage door types</li>
              <li>Garage door opener repair and programming</li>
              <li>Licensed and insured garage door specialists</li>
              <li>Transparent pricing with no hidden fees</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold">Related Services</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {siteConfig.taxonomy.services
                .filter((s) => s.categorySlug === service.categorySlug && s.slug !== service.slug)
                .slice(0, 3)
                .map((s) => (
                  <Link key={s.slug} to={siteConfig.routes.serviceCity(s.slug, citySlug || "")} className="rounded-md border p-4 hover-scale">
                    <span className="font-medium">{s.name}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more"}</span>
                  </Link>
                ))}
            </div>
          </section>

          {area && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">Nearby Cities</h2>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {siteConfig.locations
                  .find((l) => l.id === locationId)!
                  .serviceAreas.filter((a) => a.slug !== citySlug)
                  .slice(0, 6)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link to={siteConfig.routes.serviceCity(service.slug, a.slug)} className="story-link">
                        {a.name}, {a.state}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          )}


          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3">Coverage Map</h2>
            <MapsProvider>
              <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                <ServiceAreasMap height={360} locationId={locationId} />
              </div>
            </MapsProvider>
          </section>

          <div className="mt-10">
            <Link to="/#estimate" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90">
              Get a Free Estimate
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CityServiceDetail;
