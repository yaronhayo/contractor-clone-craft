import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const PopularCityServices = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0,4);
  const topServices = siteConfig.taxonomy.services.slice(0,3);

  return (
    <section id="popular-city-services" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Popular locksmith services near you</h2>
        <p className="mt-2 text-muted-foreground">Quick links to our most requested services in top cities we serve.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {areas.map((a) => (
          <article key={a.slug} className="rounded-lg border p-4 bg-card">
            <h3 className="font-semibold">{a.name}, {a.state}</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {topServices.map((s) => (
                <li key={s.slug}>
                  <Link to={siteConfig.routes.serviceCity(s.slug, a.slug)} className="story-link">{s.name} in {a.name}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularCityServices;
