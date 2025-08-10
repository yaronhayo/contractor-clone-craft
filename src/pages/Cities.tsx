import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Cities = () => {
  const areas = Array.from(
    new Map(siteConfig.locations.flatMap((l) => l.serviceAreas).map((a) => [a.slug, a]))
  ).map(([, a]) => a);

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Cities", item: `${siteUrl}/city` },
    ],
  };

  return (
    <div>
      <Seo
        title={`Cities We Serve | ${siteConfig.business.name}`}
        description={`Browse all cities in Bergen County, Hudson County, and surrounding NJ areas where we provide garage door services.`}
        canonical="/city"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Garage Door Service Areas</h1>
            <p className="mt-3 text-muted-foreground">Find your city and explore garage door services available in your area.</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {areas.map((a) => (
              <div key={a.slug} className="rounded-lg border p-4 bg-card">
                <h2 className="font-semibold">Garage Door Service in {a.name}, {a.state}</h2>
                <p className="text-sm text-muted-foreground mt-1">Professional garage door repair and installation.</p>
                <div className="mt-3">
                  <Link to={`/city/${a.slug}`} className="text-sm story-link">View garage door services</Link>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  {siteConfig.taxonomy.services.slice(0, 3).map((s) => (
                    <li key={s.slug}>
                      <Link to={siteConfig.routes.serviceCity(s.slug, a.slug)} className="story-link">{s.name} in {a.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cities;
