import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import FAQSection from "@/components/sections/FAQ";
import { Link } from "react-router-dom";

const FAQ = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
    ],
  };

  return (
    <div>
      <Seo title={`FAQ | ${siteConfig.business.name}`} description={`Answers to common locksmith questions in ${siteConfig.business.hqAddress.city}.`} canonical="/faq" />
      <Seo title={`FAQ | ${siteConfig.business.name}`} description={`Answers to common garage door questions in ${siteConfig.business.hqAddress.city}, Bergen County, and Hudson County.`} canonical="/faq" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <span className="text-foreground">FAQ</span>
          </nav>
          <header className="mt-4 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Garage Door FAQ</h1>
            <p className="mt-3 text-muted-foreground">Everything you need to know about our garage door services, repairs, and installation process.</p>
          </header>
        </section>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
