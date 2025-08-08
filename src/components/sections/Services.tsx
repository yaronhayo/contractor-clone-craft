import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";

const services = [
  { title: "Service Provided #1", image: service1 },
  { title: "Service Provided #2", image: service2 },
  { title: "Service Provided #3", image: service1 },
  { title: "Service Provided #4", image: service2 },
  { title: "Service Provided #5", image: service1 },
  { title: "Service Provided #6", image: service2 },
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
          <article key={s.title} className="rounded-lg overflow-hidden border bg-card">
            <img src={s.image} alt={`${s.title} photo`} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
