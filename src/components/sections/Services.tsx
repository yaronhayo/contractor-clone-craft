import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const Services = () => {
  return (
    <section id="areas" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Locksmith Services in {siteConfig.business.hqAddress.city}</h2>
        <p className="mt-2 text-muted-foreground">From emergency lockouts to rekeying, car keys, and smart lock installs—our licensed locksmiths have you covered.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {siteConfig.taxonomy.services.slice(0, 6).map((s) => {
          const img = s.images?.[0] || siteConfig.media.serviceCardDefault;
          return (
            <Link key={s.slug} to={siteConfig.routes.individualService(s.slug)} className="rounded-lg overflow-hidden border bg-card block hover-scale">
              {img && (
                <img src={img.src} alt={img.alt || `${s.name} photo`} className="w-full h-48 object-cover" loading="lazy" />
              )}
              <div className="p-4">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.shortDescription || "Learn more about this service and what’s included"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
