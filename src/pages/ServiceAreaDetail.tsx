import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";

const toTitle = (slug?: string) =>
  (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const ServiceAreaDetail = () => {
  const { slug } = useParams();
  const area = toTitle(slug) || "Service Area";
  const loc = siteConfig.locations.find((l) => l.serviceAreas.some((a) => a.slug === slug));
  const locationId = loc?.id;

  return (
    <div>
      <Seo title={`${area} | Service Area`} description={`Learn about our services available in ${area}. Get a free estimate today.`} canonical={`/service-areas/${slug}`} />
      <Header />
      <main>
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to="/service-areas">Service Areas</Link> / <span className="text-foreground">{area}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">Top‑Rated (Service) in {area}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Proudly serving homeowners and businesses in {area}. Reliable scheduling, friendly pros, and great results.</p>
          </header>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <h2>Services Available in {area}</h2>
            <ul>
              <li>(Service Provided #1)</li>
              <li>(Service Provided #2)</li>
              <li>(Service Provided #3)</li>
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
            <a href="/#estimate" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90">Get a Free Estimate</a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceAreaDetail;
