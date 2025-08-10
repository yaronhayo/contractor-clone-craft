import { Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";

const ReviewsTeaser = () => {
  const city = siteConfig.business.hqAddress.city;
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");

  const ratingLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.business.legalName || siteConfig.business.name,
    url: siteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 250,
    },
  };

  return (
    <section className="container py-10">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ratingLd)}</script>
      </Helmet>
      <div className="rounded-lg border p-6 bg-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Top‑Rated Locksmith in {city}</h3>
          <p className="text-muted-foreground">Real customer reviews for our locksmith services.</p>
        </div>
        <div className="flex items-center gap-1 text-primary" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">4.9/5 • 250+ reviews</span>
        </div>
      </div>
    </section>
  );
};

export default ReviewsTeaser;
