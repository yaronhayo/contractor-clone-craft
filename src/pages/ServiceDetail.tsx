import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link, useParams } from "react-router-dom";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";

const allServices = [
  { slug: "service-number-1", title: "Service Provided #1", image: service1 },
  { slug: "service-number-2", title: "Service Provided #2", image: service2 },
  { slug: "service-number-3", title: "Service Provided #3", image: service1 },
  { slug: "service-number-4", title: "Service Provided #4", image: service2 },
  { slug: "service-number-5", title: "Service Provided #5", image: service1 },
  { slug: "service-number-6", title: "Service Provided #6", image: service2 },
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = allServices.find((s) => s.slug === slug) ?? allServices[0];

  return (
    <div>
      <Seo title={`${service.title} in (City)`} description={`Details about ${service.title} for homeowners in (City). Get a free estimate today.`} canonical={`/services/${service.slug}`} />
      <Header />
      <main>
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span className="text-foreground">{service.title}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{service.title}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Professional, reliable, and hassle‑free — learn what to expect when you choose us for {service.title.toLowerCase()} in (City).</p>
          </header>

          <div className="mt-8 rounded-lg overflow-hidden border">
            <img src={service.image} alt={`${service.title} example project photo`} className="w-full h-72 object-cover" loading="lazy" />
          </div>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <h2>What’s Included</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
              dapibus leo. We follow a clear, customer‑first process to ensure great results every time.
            </p>
            <h3>Our 4‑Step Process</h3>
            <ol>
              <li>Reach out and tell us about your project.</li>
              <li>We schedule a convenient time and provide transparent pricing.</li>
              <li>Our trained team completes the work with care and craftsmanship.</li>
              <li>Final walkthrough and satisfaction check.</li>
            </ol>
            <h3>Why Choose Us</h3>
            <ul>
              <li>Licensed and insured technicians</li>
              <li>On‑time arrival and friendly service</li>
              <li>Top‑rated local reviews</li>
            </ul>
          </section>

          <div className="mt-10">
            <Link to="/#estimate" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90">
              Get a Free Estimate
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
