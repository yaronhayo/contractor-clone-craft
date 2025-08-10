import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { useQuery } from "@tanstack/react-query";
import { getServices, fallbackServiceItems } from "@/lib/cms";

const Services = () => {
  const { data } = useQuery({ queryKey: ["services"], queryFn: getServices, staleTime: 60_000 });
  const items = (data && data.length ? data : fallbackServiceItems()).slice(0, 6);

  return (
    <section id="areas" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Locksmith Services in {siteConfig.business.hqAddress.city}</h2>
        <p className="mt-2 text-muted-foreground">From emergency lockouts to rekeying, car keys, and smart lock installs—our licensed locksmiths have you covered.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {items.map((s) => {
          const categorySlug = siteConfig.taxonomy.services.find(ts => ts.slug === s.slug)?.categorySlug || siteConfig.taxonomy.categories[0]?.slug || "emergency-locksmith";
          const to = siteConfig.routes.individualService(categorySlug, s.slug);
          const imgSrc = s.imageUrl || siteConfig.media.serviceCardDefault?.src || "";
          const alt = `${s.name} photo`;
          return (
            <Link key={s.slug} to={to} className="rounded-lg overflow-hidden border bg-card block hover-scale">
              {imgSrc && (
                <img src={imgSrc} alt={alt} width={siteConfig.media.serviceCardDefault?.width || 1200} height={siteConfig.media.serviceCardDefault?.height || 800} className="w-full h-48 object-cover" loading="lazy" />
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
