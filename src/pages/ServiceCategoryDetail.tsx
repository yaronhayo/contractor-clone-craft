import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ServiceCategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = siteConfig.taxonomy.categories.find((c) => c.slug === slug);
  const services = siteConfig.taxonomy.services.filter((s) => s.categorySlug === slug);

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const title = category ? `${category.name} Locksmith Services | ${siteConfig.business.name}` : `Services | ${siteConfig.business.name}`;
  const description = category?.description || `Explore ${category?.name || "locksmith"} services offered by ${siteConfig.business.name}.`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}${siteConfig.routes.servicesIndex}` },
      { "@type": "ListItem", position: 3, name: category?.name || "Category", item: `${siteUrl}${siteConfig.routes.serviceCategory(slug || "")}` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category?.name || "Category"} Services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteUrl}${siteConfig.routes.individualService(s.slug)}`,
    })),
  };

  return (
    <div>
      <Seo title={title} description={description} canonical={siteConfig.routes.serviceCategory(slug || "")} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">{category?.name || "Service Category"}</h1>
            {category?.description && <p className="mt-3 text-muted-foreground">{category.description}</p>}
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((s) => {
              const img = s.images?.[0] || siteConfig.media.serviceCardDefault;
              return (
                <Link key={s.slug} to={siteConfig.routes.individualService(s.slug)} className="rounded-lg overflow-hidden border bg-card block hover-scale">
                  {img && (
                    <img
                      src={img.src}
                      alt={img.alt || `${s.name} photo`}
                      width={img.width}
                      height={img.height}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold">{s.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more about this service"}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/service-categories" className="story-link">Back to categories</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceCategoryDetail;
