import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";

const STATE_NAMES: Record<string, string> = { TX: "Texas", FL: "Florida", CA: "California", NJ: "New Jersey" };

const LocksmithInIndex = () => {
  const seen = new Set<string>();
  const statesFromConfig = siteConfig.locations.flatMap(l => l.serviceAreas.map(a => a.state));
  const uniqueStates = Array.from(new Set(["TX","FL","CA","NJ", ...statesFromConfig])).filter(s => {
    if (seen.has(s)) return false; seen.add(s); return true;
  });

  return (
    <>
      <Seo title={`Locksmith in USA | ${siteConfig.business.name}`} description={`Find a trusted locksmith across major US states. Fast response, licensed & insured. ${siteConfig.business.name}.`} canonical="/locksmith-in" />
      <Header />
      <main id="content" className="container py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex gap-2 text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground font-medium">Locksmith in USA</li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold">Locksmith in USA</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Choose a state to view cities we serve. Pages are optimized for rankings and conversions with clear CTAs and local relevance.</p>

        <section className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uniqueStates.map((code) => (
            <article key={code} className="p-4 rounded-md border">
              <h2 className="text-lg font-semibold">
                <Link to={`/locksmith-in/${code.toLowerCase()}`}>Locksmith in {STATE_NAMES[code] || code}</Link>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Cities in {STATE_NAMES[code] || code} we cover</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LocksmithInIndex;
