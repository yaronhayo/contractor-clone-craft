import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ServiceCategories = () => {
  const categories = siteConfig.taxonomy.categories;
  const services = siteConfig.taxonomy.services;
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Categories", item: `${siteUrl}/service-categories` },
    ],
  };
  const categoriesListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Garage Door Service Categories",
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${siteUrl}${siteConfig.routes.serviceCategory(c.slug)}`,
    })),
  };

  return (
    <div>
      <Seo
        title={`Garage Door Service Categories | ${siteConfig.business.name}`}
        description={`Browse garage door services by category in ${siteConfig.business.hqAddress.city}: residential, commercial, emergency repairs, and more.`}
        canonical="/service-categories"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(categoriesListLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Service Categories</h1>
            <p className="mt-3 text-muted-foreground">Explore services by category for faster navigation.</p>
          </header>

          <div className="mt-10 space-y-12">
            {categories.map((cat) => {
              const catServices = services.filter((s) => s.categorySlug === cat.slug);
              return (
                <section key={cat.slug} className="rounded-lg border p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">{cat.name}</h2>
                      {cat.description && (
                        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{cat.description}</p>
                      )}
                    </div>
                    <div>
                      <Link to={siteConfig.routes.serviceCategory(cat.slug)} className="story-link">View all {cat.name} services</Link>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {catServices.map((s) => {
                      const img = s.images?.[0] || siteConfig.media.serviceCardDefault;
                      return (
                        <Link key={s.slug} to={siteConfig.routes.individualService(s.categorySlug, s.slug)} className="rounded-lg overflow-hidden border bg-card block hover-scale">
                          {img && <img src={img.src} alt={img.alt || `${s.name} photo`} width={img.width} height={img.height} className="w-full h-44 object-cover" loading="lazy" />}
                          <div className="p-4">
                            <h3 className="font-semibold">{s.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more"}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to={siteConfig.routes.servicesIndex} className="story-link">View all services</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceCategories;
