import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";

const STATE_NAMES: Record<string, string> = { TX: "Texas", FL: "Florida", CA: "California", NJ: "New Jersey" };

function toStateCode(param?: string): { code: string; name: string } {
  const p = (param || "").toLowerCase();
  const byCode = p.length === 2 ? p.toUpperCase() : "";
  const byName = Object.entries(STATE_NAMES).find(([, name]) => name.toLowerCase() === p)?.[0];
  const code = byCode || byName || p.toUpperCase();
  const name = STATE_NAMES[code] || code;
  return { code, name };
}

const LocksmithInState = () => {
  const { state } = useParams();
  const { code, name } = toStateCode(state);

  const cities = Array.from(new Map(
    siteConfig.locations
      .flatMap(l => l.serviceAreas)
      .filter(a => a.state.toUpperCase() === code)
      .map(a => [a.slug, a])
  ).values());

  return (
    <>
      <Seo title={`Locksmith in ${name} | ${siteConfig.business.name}`} description={`Local locksmith services across ${name}. Automotive, residential, commercial. Fast response.`} canonical={`/locksmith-in/${(state||"").toLowerCase()}`} />
      <Header />
      <main id="content" className="container py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex gap-2 text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/locksmith-in">Locksmith in USA</Link></li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground font-medium">Locksmith in {name}</li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith in {name}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Choose a city in {name}. Each page highlights nearby coverage, services, and conversions-optimized CTAs.</p>

        <section className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cities.length ? cities.map((c) => {
            const cityParam = c.slug.replace(`-${code.toLowerCase()}`, "");
            return (
              <article key={c.slug} className="p-4 rounded-md border">
                <h2 className="text-lg font-semibold">
                  <Link to={`/locksmith-in/${(state||"").toLowerCase()}/${cityParam}`}>Locksmith in {c.name}, {code}</Link>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Explore services in {c.name}</p>
              </article>
            );
          }) : (
            <p className="text-muted-foreground">No cities configured yet. Add service areas to locations in site-config or CMS. This page will auto-populate.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LocksmithInState;
