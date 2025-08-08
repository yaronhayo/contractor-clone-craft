import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";

const services = [
  { title: "Service Provided #1", image: service1, blurb: "Brief description of this service and the benefits for customers." },
  { title: "Service Provided #2", image: service2, blurb: "Brief description of this service and the benefits for customers." },
  { title: "Service Provided #3", image: service1, blurb: "Brief description of this service and the benefits for customers." },
  { title: "Service Provided #4", image: service2, blurb: "Brief description of this service and the benefits for customers." },
  { title: "Service Provided #5", image: service1, blurb: "Brief description of this service and the benefits for customers." },
  { title: "Service Provided #6", image: service2, blurb: "Brief description of this service and the benefits for customers." },
];

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
            {services.map((s) => (
              <article key={s.title} className="rounded-lg overflow-hidden border bg-card">
                <img src={s.image} alt={`${s.title} photo`} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-4">
                  <h2 className="font-semibold">{s.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{s.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesHub;
