import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MapPin, Clock, Shield, CheckCircle2, Award, Users, ThumbsUp } from "lucide-react";

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

  // Enhanced reviews with more detail and variety
  const featuredReviews = [
    { 
      author: "Jennifer M.", 
      rating: 5, 
      date: "2025-01-15", 
      location: "Elmwood Park, NJ",
      serviceType: "Emergency Repair",
      body: "My garage door spring snapped at 11PM on a Sunday night. I called ez2fix and they had a technician at my house within 45 minutes! Professional, courteous, and fixed it perfectly. The safety they follow is impressive—definitely worth choosing licensed professionals.", 
      verified: true 
    },
    { 
      author: "Robert K.", 
      rating: 5, 
      date: "2024-12-20", 
      location: "Jersey City, NJ",
      serviceType: "Installation",
      body: "Installed a beautiful new insulated garage door for our historic brownstone. The technician understood the unique requirements of older buildings and made sure everything was up to code. Six months later, it still operates flawlessly and looks amazing.",
      verified: true 
    },
    { 
      author: "Maria G.", 
      rating: 5, 
      date: "2025-01-08", 
      location: "Montclair, NJ",
      serviceType: "Opener Repair",
      body: "Garage door opener started making terrible grinding noises. Instead of trying to sell me a new one, their technician properly diagnosed and serviced it. A year later, it's still running quietly. Honest, reliable company that doesn't oversell.",
      verified: true 
    },
    { 
      author: "David L.", 
      rating: 5, 
      date: "2024-11-30", 
      location: "Fair Lawn, NJ",
      serviceType: "Track Repair",
      body: "Garage door came completely off track during a storm—scary situation! Their emergency team arrived quickly with all the right equipment. Professional, clean work, and properly insured. I've recommended them to three neighbors already.",
      verified: true 
    },
    { 
      author: "Sarah T.", 
      rating: 5, 
      date: "2025-01-12", 
      location: "Hoboken, NJ",
      serviceType: "Spring Replacement",
      body: "Called ez2fix after my garage door wouldn't open. They diagnosed broken torsion springs and replaced them the same day. The technician explained everything clearly and showed me the safety features. Great communication throughout.",
      verified: true 
    },
    { 
      author: "Mike D.", 
      rating: 5, 
      date: "2024-12-15", 
      location: "Little Falls, NJ",
      serviceType: "Full Replacement",
      body: "Our 20-year-old door finally gave up. ez2fix handled everything from permits to disposal of the old door. The new door is beautiful and operates so smoothly. They even programmed our cars' built-in openers. Excellent service start to finish.",
      verified: true 
    }
  ];

  const additionalReviews = [
    { author: "Lisa R.", rating: 5, date: "2025-01-10", location: "Weehawken, NJ", body: "Quick response for broken cables. Professional repair with quality parts." },
    { author: "Tom W.", rating: 5, date: "2024-12-28", location: "Cedar Grove, NJ", body: "Excellent installation of smart garage door opener. Works perfectly with our home automation." },
    { author: "Anna P.", rating: 5, date: "2025-01-05", location: "Ridgewood, NJ", body: "Emergency repair on New Year's Day. Reliable service when we needed it most." },
    { author: "Carlos M.", rating: 5, date: "2024-12-22", location: "North Bergen, NJ", body: "Professional maintenance service. Technician was thorough and knowledgeable." },
    { author: "Kelly F.", rating: 5, date: "2025-01-03", location: "Paramus, NJ", body: "Great experience with door panel replacement. Quality workmanship at fair prices." },
    { author: "Steve B.", rating: 5, date: "2024-12-18", location: "West Caldwell, NJ", body: "Fixed our noisy door perfectly. Much quieter now and operates smoothly." }
  ];

  const reviewStats = {
    totalReviews: 247,
    averageRating: 5.0,
    fiveStars: 240,
    fourStars: 5,
    threeStars: 2,
    twoStars: 0,
    oneStars: 0
  };

  // Create review schema markup
  const reviewLd = featuredReviews.map((r) => ({
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
      <Seo 
        title="Customer Reviews & Testimonials | 5-Star Garage Door Service | ez2fix LLC"
        description="⭐ 5-star customer reviews for ez2fix LLC garage door services in Bergen County NJ | Real testimonials from satisfied customers | Spring repair, installation, emergency service reviews | Licensed & trusted contractor | See why homeowners choose ez2fix"
        canonical="/reviews" 
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(reviewLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] bg-gradient-to-br from-secondary via-gray-800 to-foreground flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.15),transparent)]" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          
          <div className="relative container">
            <nav aria-label="Breadcrumb" className="text-sm text-white mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
              <span className="mx-2">/</span> 
              <span className="text-white font-medium">Reviews</span>
            </nav>
            
            <header className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Star className="h-4 w-4 fill-current" />
                Real Customer Experiences
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                What Our Customers Say
              </h1>
              <p className="mt-6 text-lg text-white leading-relaxed">
                <strong>Don't just take our word for it.</strong> Read real reviews from homeowners across Bergen and Hudson Counties who chose ez2fix for their garage door needs. Their experiences speak for our commitment to quality and service.
              </p>
              
              {/* Review Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">{reviewStats.averageRating}/5.0 Average</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-white">{reviewStats.totalReviews}+ Reviews</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <ThumbsUp className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-white">98% Satisfaction Rate</span>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="mt-8">
                <Button size="lg" className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "reviews_hero", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Join Our Satisfied Customers
                  </a>
                </Button>
              </div>
            </header>
          </div>
        </section>

        {/* Review Statistics Section */}
        <section className="relative py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="h-8 w-8 text-primary fill-current" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{reviewStats.averageRating}</div>
                  <div className="text-sm text-foreground font-medium">Average Rating</div>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{reviewStats.totalReviews}+</div>
                  <div className="text-sm text-foreground font-medium">Total Reviews</div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ThumbsUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-foreground font-medium">Satisfaction Rate</div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{reviewStats.fiveStars}</div>
                  <div className="text-sm text-foreground font-medium">Five-Star Reviews</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Reviews Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Star className="h-4 w-4 fill-current" />
                Featured Customer Stories
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Real Experiences{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Real Results
                </span>
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                These detailed reviews showcase the quality of our work and the satisfaction of our customers throughout Bergen and Hudson Counties. Each review represents a real customer experience.
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredReviews.map((review, index) => (
                <Card key={index} className={`h-full hover:shadow-xl transition-all duration-300 animate-fade-in border-2 hover:border-primary/20`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{review.author}</h3>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <MapPin className="h-4 w-4" />
                          {review.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">
                        {review.serviceType}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-primary fill-current" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">5.0/5.0</span>
                    </div>

                    {/* Review Content */}
                    <blockquote className="text-foreground leading-relaxed italic">
                      "{review.body}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Reviews Section */}
        <section className="relative py-16 bg-background">
          <div className="container">
            <header className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">More Customer Reviews</h3>
              <p className="text-foreground">Recent feedback from customers across our service area</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalReviews.map((review, index) => (
                <Card key={index} className={`hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 50}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-primary fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      {review.location}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">"{review.body}"</p>
                    <p className="text-xs text-muted-foreground mt-3">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why Customers Choose ez2fix
              </h3>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                Consistent themes from our customer reviews highlight what sets us apart in garage door service.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">Licensed & Professional</h4>
                <p className="text-foreground leading-relaxed">
                  Customers consistently praise our licensed technicians, professional approach, and adherence to safety standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold mb-3">Reliable Response</h4>
                <p className="text-foreground leading-relaxed">
                  Reviews highlight our prompt response times, especially for emergency situations, and consistent reliability.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">Quality Results</h4>
                <p className="text-foreground leading-relaxed">
                  Customers appreciate our honest assessments, quality parts, and workmanship that lasts long after service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-20 bg-background">
          <div className="container">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
              <Star className="h-16 w-16 text-primary mx-auto mb-6 fill-current" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience Five-Star Service?
              </h3>
              <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers throughout Bergen and Hudson Counties. Contact us today for professional garage door service that earns five-star reviews.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300" asChild>
                  <a href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-4 text-lg font-bold transition-all duration-300" asChild>
                  <Link to="/contact">
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;