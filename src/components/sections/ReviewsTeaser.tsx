import { Star, Quote, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ReviewCard = ({ rating, text, author, location, service }: {
  rating: number;
  text: string;
  author: string;
  location: string;
  service: string;
}) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
        ))}
      </div>
      <Quote className="h-6 w-6 text-primary/30 mb-3" />
      <blockquote className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors">
        "{text}"
      </blockquote>
      <div className="border-t pt-4">
        <cite className="font-semibold text-foreground not-italic">{author}</cite>
        <div className="text-sm text-muted-foreground">{location} • {service}</div>
      </div>
    </CardContent>
  </Card>
);

export default function ReviewsTeaser() {
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

  const reviews = [
    {
      rating: 5,
      text: "Emergency garage door spring repair at midnight - technician arrived in 20 minutes and had everything working perfectly. Professional, courteous, and fairly priced!",
      author: "Sarah M.",
      location: "Fort Lee, NJ",
      service: "Emergency Spring Repair"
    },
    {
      rating: 5,
      text: "New garage door installation exceeded our expectations. Beautiful craftsmanship, quality materials, and the team cleaned up perfectly. Highly recommend!",
      author: "Robert K.",
      location: "Englewood, NJ", 
      service: "Garage Door Installation"
    },
    {
      rating: 5,
      text: "Garage door opener was making terrible noises. They diagnosed the problem quickly, explained everything clearly, and fixed it for a very reasonable price.",
      author: "Maria G.",
      location: "Jersey City, NJ",
      service: "Opener Repair"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ratingLd)}</script>
      </Helmet>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.1),transparent)]" />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="h-4 w-4 fill-current" />
            Customer Reviews
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Trusted by Homeowners Across {city}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it—see what your neighbors in Bergen and Hudson Counties 
            are saying about our garage door services.
          </p>
        </header>

        {/* Overall Rating Display */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-6 bg-background/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-1">4.9</div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-current" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-1">250+</div>
              <div className="text-sm text-muted-foreground">Customer Reviews</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Garage Doors Serviced</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground shadow-xl">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold mb-2">Join Our Satisfied Customers</h3>
              <p className="opacity-90">Experience the same professional garage door service that earned us 250+ five-star reviews</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 rounded-full px-6" asChild>
                <Link to="/reviews">
                  Read All Reviews <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}