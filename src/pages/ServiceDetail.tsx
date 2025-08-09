import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = siteConfig.taxonomy.services.find((s) => s.slug === slug) ?? siteConfig.taxonomy.services[0];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription || `Learn about ${service.name}. Get a free estimate today.`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.business.legalName || siteConfig.business.name,
      telephone: siteConfig.business.phone,
      url: siteConfig.seo.siteUrl,
    },
    areaServed: siteConfig.locations.map((l) => ({
      "@type": "City",
      name: `${l.address.city}, ${l.address.state}`,
    })),
  };

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}${siteConfig.routes.servicesIndex}` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}${siteConfig.routes.individualService(service.slug)}` },
    ],
  };
  return (
    <div>
      <Seo title={`${service.name} | ${siteConfig.business.name}`} description={service.shortDescription || `Learn about ${service.name}. Get a free estimate today.`} canonical={siteConfig.routes.individualService(service.slug)} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to={siteConfig.routes.servicesIndex}>Services</Link> / <span className="text-foreground">{service.name}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{service.name}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">{service.shortDescription || "Professional, reliable, and hassle‑free service."}</p>
          </header>

          <div className="mt-8 rounded-lg overflow-hidden border">
            {(() => { const img = service.images?.[0] || siteConfig.media.serviceCardDefault; return img ? (<img src={img.src} alt={img.alt || `${service.name} example photo`} className="w-full h-72 object-cover" loading="lazy" />) : null; })()}
          </div>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <h2>What’s Included</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
              dapibus leo. We follow a clear, customer‑first process to ensure great results every time.
            </p>
            <h3>Our 4‑Step Process</h3>
            <ol>
              <li>Reach out and tell us about your project.</li>
              <li>We schedule a convenient time and provide transparent pricing.</li>
              <li>Our trained team completes the work with care and craftsmanship.</li>
              <li>Final walkthrough and satisfaction check.</li>
            </ol>
            <h3>Why Choose Us</h3>
            <ul>
              <li>Licensed and insured technicians</li>
              <li>On‑time arrival and friendly service</li>
              <li>Top‑rated local reviews</li>
            </ul>
          </section>

          <div className="mt-10">
            <Link to="/#estimate" onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "cta_click", source: "service_detail", cta: "estimate", service: service.name }); } catch {} }} className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90">
              Get a Free Estimate
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
