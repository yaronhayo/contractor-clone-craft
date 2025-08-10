import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link, useParams } from "react-router-dom";

const STATE_NAMES: Record<string, string> = { TX: "Texas", FL: "Florida", CA: "California", NJ: "New Jersey" };

const LocksmithInCounty = () => {
  const { state, county } = useParams();
  const code = (state || "").toUpperCase();
  const stateName = STATE_NAMES[code] || code;
  const countyName = String(county || "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Placeholder until county data is introduced via CMS
  const sampleCities = Array.from(new Map(
    siteConfig.locations.flatMap(l => l.serviceAreas)
      .filter(a => a.state.toUpperCase() === code)
      .map(a => [a.slug, a])
  ).values()).slice(0,12);

  return (
    <>
      <Seo title={`Locksmith in ${countyName} County, ${stateName} | ${siteConfig.business.name}`} description={`Local locksmith serving ${countyName} County, ${stateName}. Fast, professional service.`} canonical={`/locksmith-in/${(state||"").toLowerCase()}/counties/${county}`} />
      <Header />
      <main id="content" className="container py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex gap-2 text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/locksmith-in">Locksmith in USA</Link></li>
            <li aria-hidden>›</li>
            <li><Link to={`/locksmith-in/${(state||"").toLowerCase()}`}>Locksmith in {stateName}</Link></li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground font-medium">{countyName} County</li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith in {countyName} County, {stateName}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">County-level page scaffold ready. Connect county data in CMS to auto-populate cities and specific content. For now, here are popular cities we serve in {stateName}:</p>

        <section className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sampleCities.map((c) => {
            const cityParam = c.slug.replace(`-${(state||"").toLowerCase()}`, "");
            return (
              <article key={c.slug} className="p-4 rounded-md border">
                <h2 className="text-lg font-semibold">
                  <Link to={`/locksmith-in/${(state||"").toLowerCase()}/${cityParam}`}>Locksmith in {c.name}, {code}</Link>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Explore services in {c.name}</p>
              </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LocksmithInCounty;
