import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";

const Terms = () => {
  return (
    <div>
      <Seo title="Terms & Conditions" description="Review the terms and conditions for using our website and services." canonical="/terms" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Terms & Conditions</h1>
            <p className="mt-3 text-muted-foreground">Please read these terms before using our website or engaging our services.</p>
          </header>
          <article className="prose prose-neutral dark:prose-invert max-w-none mt-10">
            <p>
              This website is owned and operated by [Your Company]. By accessing this site, you agree to comply with these terms and all applicable laws.
            </p>
            <h2>Use of Site</h2>
            <p>Content is provided for informational purposes only and may change without notice.</p>
            <h2>Quotes & Services</h2>
            <p>Estimates are non‑binding until confirmed in writing. Scheduling is subject to availability.</p>
            <h2>Contact</h2>
            <p>For questions about these terms, reach us at service@example.com.</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
