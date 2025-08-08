import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";

const areas = [
  "(City) Downtown",
  "(City) North",
  "(City) South",
  "(Nearby Town)",
  "(Suburb A)",
  "(Suburb B)",
  "(County Region)",
];

const ServiceAreasHub = () => {
  return (
    <div>
      <Seo title="Service Areas" description="We serve (City) and surrounding areas. Explore the neighborhoods we cover." canonical="/service-areas" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Service Area Hub</h1>
            <p className="mt-3 text-muted-foreground">Proudly serving customers across (Region).</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {areas.map((a) => (
              <Link
                key={a}
                to={`/service-areas/${a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                className="rounded-lg border bg-card p-4 hover-scale block"
              >
                <h2 className="font-semibold">{a}</h2>
                <p className="text-sm text-muted-foreground mt-1">Learn more about services offered in this area</p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">Coverage Map</h2>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <iframe
                title="Service Area Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5%2C37.6%2C-122.2%2C37.85&layer=mapnik"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceAreasHub;
