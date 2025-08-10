import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";

const ServicesHub = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };
  return (
    <div>
      <Seo title="Locksmith Services" description={`Explore our full list of locksmith services available in ${siteConfig.business.hqAddress.city} and nearby areas.`} canonical="/services" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith Services in {siteConfig.business.hqAddress.city}</h1>
            <p className="mt-3 text-muted-foreground">Professional, reliable, and tailored to your security needs.</p>
            <p className="mt-2 text-sm"><Link to="/service-categories" className="story-link">Browse by category</Link></p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {siteConfig.taxonomy.services.map((s) => {
              const img = s.images?.[0] || siteConfig.media.serviceCardDefault;
              return (
                <Link key={s.slug} to={siteConfig.routes.individualService(s.slug)} className="rounded-lg overflow-hidden border bg-card block hover-scale">
                  {img && (
                    <img src={img.src} alt={img.alt || `${s.name} photo`} width={img.width} height={img.height} className="w-full h-48 object-cover" loading="lazy" />
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold">{s.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more about this service and what’s included"}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Popular city-service shortcuts for internal linking */}
          <section className="mt-12">
            <h2 className="text-xl font-bold">Popular in Top Cities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0,4).map((a) => (
                <div key={a.slug} className="rounded-md border p-4">
                  <div className="font-medium">{a.name}, {a.state}</div>
                  <ul className="mt-2 space-y-1 text-sm">
                    {siteConfig.taxonomy.services.slice(0,3).map((s) => (
                      <li key={s.slug}>
                        <Link to={siteConfig.routes.serviceCity(s.slug, a.slug)} className="story-link">{s.name} in {a.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesHub;
