import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { useQuery } from "@tanstack/react-query";
import { getServices, fallbackServiceItems } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Clock, Shield, CheckCircle2 } from "lucide-react";

const Services = () => {
  const { data } = useQuery({ queryKey: ["services"], queryFn: getServices, staleTime: 60_000 });
  const items = (data && data.length ? data : fallbackServiceItems()).slice(0, 6);

  return (
    <section id="services" className="container py-16 md:py-24">
      {/* Section Header */}
      <header className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Wrench className="h-4 w-4" />
          Professional Garage Door Services
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Complete Garage Door Solutions in {siteConfig.business.hqAddress.city}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          From emergency repairs to brand new installations, our certified technicians deliver 
          professional garage door services across Bergen and Hudson Counties with same-day availability.
        </p>
      </header>

      {/* Detailed Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((service, index) => {
          const categorySlug = siteConfig.taxonomy.services.find(ts => ts.slug === service.slug)?.categorySlug || siteConfig.taxonomy.categories[0]?.slug || "garage-door-repair";
          const to = siteConfig.routes.individualService(categorySlug, service.slug);
          const imgSrc = service.imageUrl || siteConfig.media.serviceCardDefault?.src || "";
          const alt = `${service.name} photo`;
          
          return (
            <article 
              key={service.slug} 
              className={`group relative overflow-hidden rounded-2xl border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Link to={to} className="block">
                {/* Service Image */}
                <div className="relative overflow-hidden">
                  {imgSrc && (
                    <img 
                      src={imgSrc} 
                      alt={alt} 
                      width={siteConfig.media.serviceCardDefault?.width || 1200} 
                      height={siteConfig.media.serviceCardDefault?.height || 800} 
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Emergency Badge for 24/7 service */}
                  {service.name.includes("Emergency") && (
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      24/7 Available
                    </div>
                  )}
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.shortDescription || "Professional garage door service with expert technicians and quality parts"}
                  </p>
                  
                  {/* Service Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      <Shield className="h-3 w-3" />
                      Licensed
                    </span>
                    <span className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      Guaranteed
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold group-hover:underline">
                      Learn More
                    </span>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-full p-2 pr-6">
          <Button size="lg" className="rounded-full" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
          <span className="text-sm text-muted-foreground">Or call for immediate help</span>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary" asChild>
            <a href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}>
              {siteConfig.business.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;