import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import { Link } from "react-router-dom";

const services = [
  { title: "Service Provided #1", image: service1, slug: "service-number-1" },
  { title: "Service Provided #2", image: service2, slug: "service-number-2" },
  { title: "Service Provided #3", image: service1, slug: "service-number-3" },
  { title: "Service Provided #4", image: service2, slug: "service-number-4" },
  { title: "Service Provided #5", image: service1, slug: "service-number-5" },
  { title: "Service Provided #6", image: service2, slug: "service-number-6" },
];

const Services = () => {
  return (
    <section id="areas" className="container py-14 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">(Service Area) + (Service) Expert Friendly Service</p>
        <p className="mt-2 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {services.map((s) => (
          <Link key={s.title} to={`/services/${s.slug}`} className="rounded-lg overflow-hidden border bg-card block hover-scale">
            <img src={s.image} alt={`${s.title} photo`} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">Learn more about this service and what’s included</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
