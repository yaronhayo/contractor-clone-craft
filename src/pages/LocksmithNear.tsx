import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapsProvider } from "@/contexts/MapsProvider";
import LocationsMap from "@/components/maps/LocationsMap";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import { useCallTracking } from "@/hooks/useCallTracking";

const LocksmithNear = () => {
  const { slug } = useParams();
  const loc = siteConfig.locations.find(l => l.slug === slug);
  const cityState = loc ? `${loc.address.city}, ${loc.address.state}` : "Nearby";
  const { phone, telHref } = useCallTracking(siteConfig.business.phone, loc?.phone);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.siteUrl || "/" },
      { "@type": "ListItem", position: 2, name: "Locksmith Near" },
      { "@type": "ListItem", position: 3, name: cityState }
    ]
  };

  return (
    <>
      <Seo title={`Locksmith near ${cityState} | ${siteConfig.business.name}`} description={`Find a locksmith near ${cityState}. Fast response, professional service. Call ${phone}.`} canonical={`/locksmith-near/${slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content" className="container py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex gap-2 text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/locations">Locations</Link></li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground font-medium">Locksmith near {cityState}</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith near {cityState}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Looking for a locksmith nearby? We serve this area with rapid response times and expert technicians.</p>

        {loc ? (
          <section className="mt-8 grid md:grid-cols-3 gap-8">
            <article className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Our {loc.name} location</h2>
                <p className="text-sm text-muted-foreground mt-1">{loc.address.line1}, {loc.address.city}, {loc.address.state} {loc.address.postalCode}</p>
                <p className="mt-2"><a className="underline" href={telHref}>Call {phone}</a></p>
              </div>
              <MapsProvider>
                <LocationsMap locationIds={[loc.id]} height={320} />
              </MapsProvider>
              <div>
                <h3 className="text-lg font-semibold">Areas we serve from this location</h3>
                <MapsProvider>
                  <ServiceAreasMap locationId={loc.id} height={320} />
                </MapsProvider>
              </div>
            </article>
            <aside className="space-y-4">
              <div className="p-4 rounded-md border">
                <h3 className="font-semibold">Get a Free Estimate</h3>
                <p className="text-sm text-muted-foreground mt-1">Tell us what you need—most quotes in minutes.</p>
                <a href={telHref} className="inline-block mt-3 font-medium underline">Call {phone}</a>
              </div>
              <div className="p-4 rounded-md border">
                <h3 className="font-semibold">Popular Services</h3>
                <ul className="list-disc pl-5 text-sm mt-2">
                  {siteConfig.taxonomy.categories.slice(0,3).map(c => (
                    <li key={c.slug}><Link to={`/services/${c.slug}`} className="underline">{c.name}</Link></li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>
        ) : (
          <p className="mt-8 text-muted-foreground">Location not found. Please visit our <Link to="/locations" className="underline">locations</Link> page.</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default LocksmithNear;
