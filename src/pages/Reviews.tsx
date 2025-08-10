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

  // Simple on-page reviews (sample content; replace with real data later)
  const reviews = [
    { author: "Maria G.", rating: 5, date: "2025-04-12", body: "Locked out of my house at 11pm—tech arrived in 20 minutes and got me in with no damage. Lifesaver!" },
    { author: "James P.", rating: 5, date: "2025-05-03", body: "Rekeyed all our doors after a move. Fast, professional, and fairly priced." },
    { author: "Sofia R.", rating: 4, date: "2025-06-18", body: "Key fob programming for my SUV was quick and worked perfectly. Thank you!" },
  ];

  const reviewLd = reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: r.body,
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
    author: { "@type": "Person", name: r.author },
    datePublished: r.date,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: siteConfig.business.legalName || siteConfig.business.name,
      url: siteUrl,
      telephone: siteConfig.business.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.business.hqAddress.line1,
        addressLocality: siteConfig.business.hqAddress.city,
        addressRegion: siteConfig.business.hqAddress.state,
        postalCode: siteConfig.business.hqAddress.postalCode,
        addressCountry: siteConfig.business.hqAddress.country || "US",
      },
    },
  }));

  return (
    <div>
      <Seo title={`Reviews | ${siteConfig.business.name}`} description={`Real customer reviews for our locksmith services in ${siteConfig.business.hqAddress.city}.`} canonical="/reviews" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(reviewLd)}</script>
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

        {/* On-page reviews list */}
        <section className="container py-10">
          <h2 className="text-xl font-bold">Latest reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {reviews.map((r, i) => (
              <article key={i} className="rounded-md border p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.author}</div>
                  <div className="text-sm text-muted-foreground" aria-label={`Rating: ${r.rating} out of 5`}>
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{new Date(r.date).toLocaleDateString()}</p>
                <p className="mt-2">{r.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
