import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import ServiceAreasMap from "@/components/maps/ServiceAreasMap";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import ReviewsTeaser from "@/components/sections/ReviewsTeaser";
import FinalCTA from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Phone, ArrowRight, Shield, Clock, Award, CheckCircle2, HelpCircle, PhoneCall, Wrench } from "lucide-react";
import { MapsProvider } from "@/contexts/MapsProvider";

const ServiceAreasHub = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values());
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteUrl}/service-areas` },
    ],
  };


  return (
    <MapsProvider>
      <div>
        <Seo title="Service Areas Bergen & Hudson County NJ | Licensed Garage Door Contractor | ez2fix" description={`⭐ Garage door repair & installation throughout Bergen County (Elmwood Park, Fair Lawn, Clifton, Montclair) & Hudson County (Jersey City, Hoboken, Weehawken) | Licensed NJ contractor #13VH09315400 | 12+ years experience | Serving 25+ communities with same-day service | FREE estimates`} canonical="/service-areas" />
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        </Helmet>
        <Header />
        <main id="content">
          {/* Hero Section - Matching services page style */}
          <section className="relative min-h-[60vh] bg-gradient-to-br from-secondary via-gray-800 to-foreground flex items-center overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.15),transparent)]" />
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
            
            <div className="relative container">
              <nav aria-label="Breadcrumb" className="text-sm text-white mb-8">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
                <span className="mx-2">/</span> 
                <span className="text-white font-medium">Service Areas</span>
              </nav>
              
              <header className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <MapPin className="h-4 w-4" />
                  #1 Choice Across Bergen & Hudson Counties
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                  Licensed Garage Door Contractor Serving
                  <span className="block text-primary">Bergen & Hudson County, NJ</span>
                </h1>
                <p className="mt-6 text-lg text-white leading-relaxed max-w-3xl mx-auto">
                  <strong>Your trusted garage door experts across 25+ Northern NJ communities since 2012.</strong> From Jersey City's historic brownstones to Bergen County's suburban neighborhoods, our NJ-licensed technicians (#13VH09315400) have completed 3,000+ installations and repairs with zero safety incidents. Same-day emergency service available.
                </p>
                
                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                    <Star className="h-4 w-4 text-primary fill-current" />
                    <span className="text-sm font-semibold text-white">3,000+ Jobs Completed</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-semibold text-white">NJ License #13VH09315400</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-white">25+ Communities Served</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-white">12+ Years Experience</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <a
                      href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
                      onClick={() => {
                        try {
                          (window as any).dataLayer = (window as any).dataLayer || [];
                          (window as any).dataLayer.push({ event: "phone_click", source: "service_areas_hero", phone: siteConfig.business.phone });
                        } catch {}
                      }}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call {siteConfig.business.phone}
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-full px-8 py-4 text-lg font-bold border-2 border-muted text-foreground bg-background hover:bg-muted hover:text-foreground transition-all duration-300"
                    onClick={() => {
                      const mapSection = document.getElementById('service-areas-map');
                      if (mapSection) {
                        mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    View Coverage Map
                  </Button>
                </div>
              </header>
            </div>
          </section>

          {/* Interactive Coverage Map Section */}
          <section id="service-areas-map" className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-accent/5">
            <div className="container">
              <header className="text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                  <MapPin className="h-4 w-4" />
                  Interactive Coverage Map
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Find Your Neighborhood
                  </span>
                </h2>
                <p className="mt-6 text-lg text-foreground leading-relaxed">
                  <strong>Click your area to see local expertise.</strong> From Jersey City's historic districts to Bergen County's modern developments—discover how our technicians understand your neighborhood's unique garage door challenges.
                </p>
              </header>

              <div className="relative max-w-6xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
                <div className="relative bg-card border-2 rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-muted">
                    <ServiceAreasMap height={600} />
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">Click any marker to learn about local service expertise</p>
                  </div>
                </div>
              </div>

              {/* Coverage Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-foreground font-medium">Communities Served</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent">2</div>
                  <div className="text-sm text-foreground font-medium">Counties Covered</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-foreground font-medium">Area Coverage</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-foreground font-medium">Emergency Response</div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Area Categories Section */}
          <section className="relative py-16 md:py-24 bg-background">
            <div className="container">
              <header className="text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Shield className="h-4 w-4" />
                  Local Area Expertise
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Why Your Neighborhood Matters for Garage Door Service
                </h2>
                <p className="mt-4 text-lg text-foreground leading-relaxed">
                  <strong>Not all garage door service is the same.</strong> Urban apartments, historic homes, and modern developments each have unique requirements. Our technicians are trained to handle your area's specific challenges.
                </p>
              </header>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-background border-2 rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                      Hudson County Urban Areas
                    </h3>
                    <p className="text-foreground mb-4 leading-relaxed text-sm">
                      <strong>Jersey City, Hoboken, Weehawken</strong><br/>
                      Historic brownstones, converted warehouses, and high-rise condos require specialized knowledge of older building structures and space constraints.
                    </p>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Historic building compliance</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Space-efficient solutions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Vintage door restoration</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-background border-2 rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                      <MapPin className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                      Bergen County Suburbs
                    </h3>
                    <p className="text-foreground mb-4 leading-relaxed text-sm">
                      <strong>Elmwood Park, Montclair, Fair Lawn</strong><br/>
                      Modern residential developments with smart technology integration and energy-efficient requirements.
                    </p>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>Smart opener integration</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>Energy-efficient solutions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>Modern safety features</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-background border-2 rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                      Mixed-Use Communities
                    </h3>
                    <p className="text-foreground mb-4 leading-relaxed text-sm">
                      <strong>Ridgewood, Paramus, Little Falls</strong><br/>
                      Combination of commercial and residential properties requiring versatile service approaches and flexible scheduling.
                    </p>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Commercial door service</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Flexible scheduling</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Multi-property solutions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Service Areas Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container">
              <header className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Popular Service Areas
                </h2>
                <p className="mt-4 text-lg text-foreground leading-relaxed">
                  Click any area below to learn about local garage door expertise, customer reviews, and specialized services available in your community.
                </p>
              </header>

              {/* Area Cards - Matching services page card style */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {areas.slice(0, 12).map((area, index) => (
                  <article 
                    key={area.slug} 
                    className={`group relative animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                    <Link to={siteConfig.routes.serviceAreaDetail(area.slug)} className="block">
                      <div className="relative bg-background border-2 rounded-2xl p-8 h-full text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                          <MapPin className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                          {area.name}, {area.state}
                        </h3>
                        <p className="text-foreground mb-4 leading-relaxed">
                          Expert garage door service featuring licensed technicians who understand local building requirements and weather challenges.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-foreground mb-4">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-primary fill-current" />
                            ))}
                            <span className="ml-1">Local Reviews</span>
                          </div>
                        </div>
                        
                        {/* Service Features */}
                        <div className="space-y-2 mb-6 text-left">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>Emergency repair service</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>New installation & replacement</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>Opener repair & programming</span>
                          </div>
                        </div>

                        <div className="border-t pt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-600">Licensed & Insured</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                            Learn More <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {areas.length > 12 && (
                <div className="text-center mt-12">
                  <p className="text-foreground mb-4">Plus {areas.length - 12} more communities throughout Bergen & Hudson Counties</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      View All Service Areas
                    </Button>
                    <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 transition-all duration-300" asChild>
                      <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}>Get Service Today</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section - Reusing homepage component */}
          <FAQ />

          {/* Reviews Section - Reusing homepage component */}
          <ReviewsTeaser />

          {/* Final CTA Section - Reusing homepage component */}
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MapsProvider>
  );
};

export default ServiceAreasHub;