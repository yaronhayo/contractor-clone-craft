import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ReviewsTeaser from "@/components/sections/ReviewsTeaser";

const Reviews = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteUrl}/reviews` },
    ],
  };

  return (
    <div>
      <Seo title={`Reviews | ${siteConfig.business.name}`} description={`Real customer reviews for our locksmith services in ${siteConfig.business.hqAddress.city}.`} canonical="/reviews" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <span className="text-foreground">Reviews</span>
          </nav>
          <header className="mt-4 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Customer Reviews</h1>
            <p className="mt-3 text-muted-foreground">See why locals trust us for fast, reliable locksmith services.</p>
          </header>
        </section>
        <ReviewsTeaser />
        {/* Optionally expand with more detailed reviews or embeds later */}
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
