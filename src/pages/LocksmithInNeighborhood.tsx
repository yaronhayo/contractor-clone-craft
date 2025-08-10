import CityServiceLanding from "@/components/templates/CityServiceLanding";
import { useParams, Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const toTitle = (slug?: string) => (slug || "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const LocksmithInNeighborhood = () => {
  const { state, city, neighborhood } = useParams();
  const stateCode = String(state || "").toUpperCase();
  const cityParam = String(city || "");
  const nParam = String(neighborhood || "");
  const areaSlug = `${cityParam}-${stateCode.toLowerCase()}`;
  const areaName = `${toTitle(nParam)}, ${toTitle(cityParam)}, ${stateCode}`;

  // CityServiceLanding handles SEO for city-level content; add a breadcrumb wrapper here
  return (
    <>
      <Seo title={`Locksmith in ${toTitle(nParam)}, ${toTitle(cityParam)}, ${stateCode}`} description={`Local locksmith serving ${toTitle(nParam)} and surrounding ${toTitle(cityParam)} neighborhoods.`} canonical={`/locksmith-in/${String(state||"")}/${String(city||"")}/${String(neighborhood||"")}`} />
      <Header />
      <main id="content" className="container py-6">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <ol className="flex gap-2 text-muted-foreground">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/locksmith-in">Locksmith in USA</Link></li>
            <li aria-hidden>›</li>
            <li><Link to={`/locksmith-in/${String(state||"")}`}>{String(state||"").toUpperCase()}</Link></li>
            <li aria-hidden>›</li>
            <li><Link to={`/locksmith-in/${String(state||"")}/${String(city||"")}`}>{toTitle(cityParam)}</Link></li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground font-medium">{toTitle(nParam)}</li>
          </ol>
        </nav>
        <CityServiceLanding slug={areaSlug} area={areaName} />
      </main>
      <Footer />
    </>
  );
};

export default LocksmithInNeighborhood;
