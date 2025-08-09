import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const Services = () => {
  return (
    <section id="areas" className="container py-14 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">(Service Area) + (Service) Expert Friendly Service</p>
        <p className="mt-2 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
      </div>

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
