import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import LocationsMap from "@/components/maps/LocationsMap";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LocationDetail = () => {
  const { slug } = useParams();
  const location = siteConfig.locations.find((l) => l.slug === slug) || siteConfig.locations[0];
  const title = location ? `${location.name} | ${siteConfig.business.name}` : `Location | ${siteConfig.business.name}`;

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${siteUrl}${siteConfig.routes.locationsIndex}` },
      { "@type": "ListItem", position: 3, name: location.name, item: `${siteUrl}${siteConfig.routes.locationDetail(location.slug)}` },
    ],
  };

  return (
    <div>
      <Seo title={title} description={`Visit or contact ${location.name}. View address, phone, and service coverage.`} canonical={siteConfig.routes.locationDetail(location.slug)} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to={siteConfig.routes.locationsIndex}>Locations</Link> / <span className="text-foreground">{location.name}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{location.name}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Serving {location.address.city}, {location.address.state} and nearby areas.</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <section className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                <LocationsMap height={420} locationIds={[location.id]} />
              </div>
            </section>
            <aside className="space-y-4">
              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Contact</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {location.address.line1}, {location.address.city}, {location.address.state} {location.address.postalCode}
                </p>
                <p className="text-sm mt-1">Phone: {location.phone}</p>
                {location.email && <p className="text-sm">Email: {location.email}</p>}
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Hours</h2>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Mon: {location.hours.mon}</li>
                  <li>Tue: {location.hours.tue}</li>
                  <li>Wed: {location.hours.wed}</li>
                  <li>Thu: {location.hours.thu}</li>
                  <li>Fri: {location.hours.fri}</li>
                  <li>Sat: {location.hours.sat}</li>
                  <li>Sun: {location.hours.sun}</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Service Areas</h2>
                <ul className="text-sm mt-2 space-y-1">
                  {location.serviceAreas.map((a) => (
                    <li key={a.slug}>
                      <Link className="hover:text-primary" to={siteConfig.routes.serviceAreaDetail(a.slug)}>
                        {a.name}, {a.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default LocationDetail;
