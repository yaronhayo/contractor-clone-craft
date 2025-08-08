import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";

const About = () => {
  return (
    <div>
      <Seo title="About Our Company" description="Learn about our mission, values, and the expert team behind our (service)." canonical="/about" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">About Our Company</h1>
            <p className="mt-3 text-muted-foreground">We deliver high-quality (service) to (City) with honesty, craftsmanship, and care.</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <article className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Since day one, our focus has been helping homeowners and businesses get reliable, professional (service). We
                combine modern tools with proven methods to achieve consistent, beautiful results.
              </p>
              <p>
                Our certified technicians undergo ongoing training to ensure your project is done safely, on time, and on budget.
              </p>
              <p>
                From the first call to the final walkthrough, we communicate clearly and treat your property with respect.
              </p>
            </article>
            <aside className="rounded-lg border p-6 bg-card">
              <h2 className="font-semibold">Why Choose Us</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Licensed and insured</li>
                <li>• Transparent pricing</li>
                <li>• Friendly, on-time crew</li>
                <li>• Top-rated local reviews</li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
