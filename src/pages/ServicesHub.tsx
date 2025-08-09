import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const ServicesHub = () => {
  return (
    <div>
      <Seo title="Services" description="Explore our full list of (services) available in (City) and nearby areas." canonical="/services" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Our Services</h1>
            <p className="mt-3 text-muted-foreground">Professional, reliable, and tailored to your project needs.</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {siteConfig.taxonomy.services.map((s) => {
              const img = s.images?.[0] || siteConfig.media.serviceCardDefault;
              return (
                <Link key={s.slug} to={siteConfig.routes.individualService(s.slug)} className="rounded-lg overflow-hidden border bg-card block hover-scale">
                  {img && (
                    <img src={img.src} alt={img.alt || `${s.name} photo`} className="w-full h-48 object-cover" loading="lazy" />
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold">{s.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more about this service and what’s included"}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesHub;
