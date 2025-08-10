import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ServiceAreasHub = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values());
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteUrl}/service-areas` },
    ],
  };
  return (
    <div>
      <Seo title="Locksmith Service Areas" description={`We serve ${siteConfig.business.hqAddress.city} and nearby areas. Explore neighborhoods we cover.`} canonical="/service-areas" />
      <Seo title="Garage Door Service Areas in NJ" description={`Professional garage door service in Edison, Bergen County, Hudson County, and surrounding NJ areas. 24/7 emergency repair available.`} canonical="/service-areas" />
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
          </Helmet>
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Garage Door Service Areas in New Jersey</h1>
            <p className="mt-3 text-muted-foreground">Proudly serving homeowners and businesses across Edison, Bergen County, Hudson County, and surrounding NJ areas.</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {areas.map((a) => (
              <Link
                key={a.slug}
                to={siteConfig.routes.serviceAreaDetail(a.slug)}
                className="rounded-lg border bg-card p-4 hover-scale block"
              >
                <h2 className="font-semibold">Garage Door Service in {a.name}, {a.state}</h2>
                <p className="text-sm text-muted-foreground mt-1">Professional garage door repair, installation, and emergency service</p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">Garage Door Service Coverage Map</h2>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <ServiceAreasMap height={480} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceAreasHub;
