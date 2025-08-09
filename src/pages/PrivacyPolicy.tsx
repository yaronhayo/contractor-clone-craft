import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteUrl}/privacy-policy` },
    ],
  };
  return (
    <div>
      <Seo title="Privacy Policy" description="Read our privacy practices and how we handle your data." canonical="/privacy-policy" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
            <p className="mt-3 text-muted-foreground">Your privacy matters. This page explains what information we collect and how we use it.</p>
          </header>
          <article className="prose prose-neutral dark:prose-invert max-w-none mt-10">
            <p>
              This privacy policy describes how we collect, use, and share information when you use our website. We are committed to protecting your personal information and being transparent about our data practices.
            </p>
            <h2>Information We Collect</h2>
            <p>We collect contact details you provide (name, email, phone, address) to deliver our services.</p>
            <h2>How We Use Information</h2>
            <p>We use your information to respond to inquiries, schedule estimates, and provide requested services.</p>
            <h2>Contact</h2>
            <p>Questions? Contact us at service@example.com.</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
