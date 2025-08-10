import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import LocationsMap from "@/components/maps/LocationsMap";
import { MapsProvider } from "@/contexts/MapsProvider";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Locations = () => {
  const locations = siteConfig.locations;
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${siteUrl}/locations` },
    ],
  };
  return (
    <div>
      <Seo title="Locations" description="Find our locations and service coverage on the map." canonical="/locations" />
      <Seo title="Garage Door Service Locations in NJ" description="Find our Edison, NJ location and garage door service coverage across Bergen County, Hudson County, and surrounding areas." canonical="/locations" />
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
          </Helmet>
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Pro Line Garage Experts Locations</h1>
            <p className="mt-3 text-muted-foreground">Our Edison, NJ location serves Bergen County, Hudson County, and surrounding areas with professional garage door services.</p>
          </header>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapsProvider>
                <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                  <LocationsMap height={480} />
                </div>
              </MapsProvider>
            </div>
            <aside className="space-y-4">
              {locations.map((loc) => (
                <div key={loc.id} className="rounded-lg border p-4">
                  <h2 className="font-semibold">{loc.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {loc.address.line1}, {loc.address.city}, {loc.address.state} {loc.address.postalCode}
                  </p>
                  <p className="text-sm mt-1">Phone: {loc.phone}</p>
                  <Link to={`/locations/${loc.slug}`} className="text-primary text-sm mt-2 inline-block">View details</Link>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;
