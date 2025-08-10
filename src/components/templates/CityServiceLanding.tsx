import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import { MapsProvider } from "@/contexts/MapsProvider";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface CityServiceLandingProps {
  slug: string;
  area: string;
  locationId?: string;
}

/**
 * Reusable city/service area landing template
 * - Renders SEO (title/desc/canonical)
 * - Breadcrumb JSON-LD
 * - Intro copy, benefits, and map
 * - CTA to estimate
 */
const CityServiceLanding = ({ slug, area, locationId }: CityServiceLandingProps) => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const canonical = `/service-areas/${slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteUrl}/service-areas` },
      { "@type": "ListItem", position: 3, name: area, item: `${siteUrl}${canonical}` },
    ],
  };

  return (
    <div>
      <Seo title={`${area} | Locksmith Service Area`} description={`Locksmith services available in ${area}. Get a free estimate today.`} canonical={canonical} />
      <Seo title={`Garage Door Service in ${area} | ${siteConfig.business.name}`} description={`Professional garage door repair and installation in ${area}. 24/7 emergency service available.`} canonical={canonical} />
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
            <h1 className="text-3xl md:text-4xl font-extrabold">Garage Door Services in {area}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Proudly serving homeowners and businesses in {area}. 24/7 emergency garage door repair, spring replacement, opener service, and professional installation.</p>
          </header>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <h2>Professional Garage Door Services in {area}</h2>
            <ul>
              <li>24/7 emergency garage door repair</li>
              <li>Garage door spring repair and replacement</li>
              <li>Garage door opener installation and repair</li>
              <li>New garage door installation with quality doors</li>
              <li>Roller replacement and track repair</li>
              <li>Commercial garage door service</li>
            </ul>

            <h3>Why {area} Residents Choose Pro Line Garage Experts</h3>
            <ul>
              <li>Certified garage door technicians</li>
              <li>Fast response times in {area}</li>
              <li>Transparent, upfront pricing</li>
              <li>Licensed and insured for all garage door work</li>
              <li>Quality parts and professional installation</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold">Popular Garage Door Services in {area}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {siteConfig.taxonomy.services.slice(0,3).map((s) => (
                <Link key={s.slug} to={siteConfig.routes.individualService(s.categorySlug, s.slug)} className="rounded-md border p-4 hover-scale">
                  <span className="font-medium">{s.name}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more"}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3">Map</h2>
            <MapsProvider>
              <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                <ServiceAreasMap height={360} locationId={locationId || undefined} />
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

export default CityServiceLanding;
