import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const toTitle = (slug?: string) =>
  (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const ServiceAreaDetail = () => {
  const { slug } = useParams();
  const area = toTitle(slug) || "Service Area";
  const loc = siteConfig.locations.find((l) => l.serviceAreas.some((a) => a.slug === slug));
  const locationId = loc?.id;
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteUrl}/service-areas` },
      { "@type": "ListItem", position: 3, name: area, item: `${siteUrl}/service-areas/${slug}` },
    ],
  };

  return (
    <div>
      <Seo title={`${area} | Locksmith Service Area`} description={`Locksmith services available in ${area}. Get a free estimate today.`} canonical={`/service-areas/${slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to="/service-areas">Service Areas</Link> / <span className="text-foreground">{area}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith Services in {area}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Proudly serving homeowners and businesses in {area}. 24/7 lockout help, rekeys, car keys, smart locks, and more.</p>
          </header>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <h2>Locksmith Services Available in {area}</h2>
            <ul>
              <li>Emergency lockout assistance</li>
              <li>Lock rekeying and repair</li>
              <li>Car key replacement and key fobs</li>
            </ul>

            <h3>Why Locals Choose Us</h3>
            <ul>
              <li>On‑time, friendly technicians</li>
              <li>Transparent pricing</li>
              <li>Licensed and insured</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3">Map</h2>
            <div className="rounded-lg overflow-hidden border aspect-[4/3]">
              <ServiceAreasMap height={360} locationId={locationId || undefined} />
            </div>
          </section>

          <div className="mt-10">
            <Link to="/#estimate" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90">Get a Free Estimate</Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceAreaDetail;
