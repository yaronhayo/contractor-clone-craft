import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapsProvider } from "@/contexts/MapsProvider";

const CityHub = () => {
  const { slug } = useParams();
  const area = siteConfig.locations.flatMap((l) => l.serviceAreas.map((a) => ({ ...a, locationId: l.id }))).find((a) => a.slug === slug);
  const areaName = area ? `${area.name}, ${area.state}` : "City";
  const locationId = area?.locationId;
  const canonical = `/city/${slug}`;

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteUrl}${siteConfig.routes.serviceAreasIndex}` },
      { "@type": "ListItem", position: 3, name: areaName, item: `${siteUrl}${canonical}` },
    ],
  };

  return (
    <div>
      <Seo title={`Locksmith in ${areaName}`} description={`Your trusted locksmith in ${areaName}. Fast response for lockouts, rekeys, car keys, and smart locks.`} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <span className="text-foreground">{areaName}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith in {areaName}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Licensed, insured locksmiths serving {areaName}. 24/7 emergency lockouts, rekeys, hardware installs, and car keys.</p>
          </header>

          <section className="mt-8">
            <h2 className="text-xl font-bold">Popular Services in {areaName}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {siteConfig.taxonomy.services.map((s) => (
                <Link key={s.slug} to={siteConfig.routes.individualService(s.slug)} className="rounded-md border p-4 hover-scale">
                  <span className="font-medium">{s.name}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more"}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3">Coverage Map</h2>
            <MapsProvider>
              <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                <ServiceAreasMap height={360} locationId={locationId} />
              </div>
            </MapsProvider>
          </section>

          {area && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">Nearby Areas</h2>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {siteConfig.locations
                  .find((l) => l.id === locationId)!
                  .serviceAreas.filter((a) => a.slug !== slug)
                  .slice(0, 6)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link to={siteConfig.routes.serviceAreaDetail(a.slug)} className="story-link">
                        {a.name}, {a.state}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          )}

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

export default CityHub;
