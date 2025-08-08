import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import EstimateForm from "@/components/sections/EstimateForm";
import CompanyInfo from "@/components/sections/CompanyInfo";

const Contact = () => {
  return (
    <div>
      <Seo title="Contact Us" description="Get in touch for a free estimate or to ask questions about our services." canonical="/contact" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Contact Us</h1>
            <p className="mt-3 text-muted-foreground">Request a free estimate or give us a call—we're here to help.</p>
          </header>
        </section>
        <EstimateForm />
        <CompanyInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
