import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { useQuery } from "@tanstack/react-query";
import { getServices, fallbackServiceItems } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Clock, Shield, CheckCircle2, Star, Phone, Zap, Award } from "lucide-react";

const Services = () => {
  const { data } = useQuery({ queryKey: ["services"], queryFn: getServices, staleTime: 60_000 });
  const items = (data && data.length ? data : fallbackServiceItems()).slice(0, 6);

  // Enhanced service data with better copy and features
  const enhancedServices = items.map((service, index) => {
    const baseService = siteConfig.taxonomy.services.find(s => s.slug === service.slug);
    const enhancements = {
      "garage-door-spring-repair": {
        tagline: "Same Day Spring Repair",
        features: ["High-tension spring replacement", "Safety inspection included", "10 year warranty on parts"],
        urgency: "Emergency service available",
        icon: Zap
      },
      "garage-door-repair": {
        tagline: "Complete Garage Door Solutions", 
        features: ["Track realignment", "Panel replacement", "Hardware upgrades"],
        urgency: "Same day service",
        icon: Wrench
      },
      "garage-door-installation": {
        tagline: "Professional Installation",
        features: ["Custom sizing & fitting", "Energy efficient options", "Free on-site estimate"],
        urgency: "10% senior discount",
        icon: Award
      },
      "garage-door-opener-repair": {
        tagline: "Smart Opener Solutions",
        features: ["All major brands serviced", "Remote programming", "Safety sensor testing"],
        urgency: "Tech support included",
        icon: Shield
      },
      "emergency-garage-door-repair": {
        tagline: "24/7 Emergency Response",
        features: ["15 minute response time", "Mobile repair units", "After-hours availability"],
        urgency: "Available now",
        icon: Clock
      }
    };
    
    const enhancement = enhancements[service.slug as keyof typeof enhancements] || {
      tagline: "Professional Service",
      features: ["Expert technicians", "Quality parts", "Satisfaction guaranteed"],
      urgency: "Available today",
      icon: Wrench
    };
    
    return { ...service, ...enhancement };
  });
  return (
    <section id="services" className="container py-16 md:py-24">
      {/* Section Header */}
      <header className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Wrench className="h-4 w-4" />
          Expert Garage Door Services
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Garage Door Experts You Can Trust
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Professional garage door repair and installation in {siteConfig.business.hqAddress.city}. Licensed technicians, 
          10 year warranty, and same-day service available. Your garage door problems solved right the first time.
        </p>
      </header>

      {/* Detailed Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {enhancedServices.map((service, index) => {
          const categorySlug = siteConfig.taxonomy.services.find(ts => ts.slug === service.slug)?.categorySlug || siteConfig.taxonomy.categories[0]?.slug || "garage-door-repair";
          const to = siteConfig.routes.individualService(categorySlug, service.slug);
          const imgSrc = service.imageUrl || siteConfig.media.serviceCardDefault?.src || "";
          const alt = `${service.name} in ${siteConfig.business.hqAddress.city}`;
          const ServiceIcon = service.icon;
          
          return (
            <article 
              key={service.slug} 
              className={`group relative overflow-hidden rounded-2xl border-2 hover:border-primary transition-all duration-500 hover:shadow-2xl animate-fade-in bg-gradient-to-br from-background to-accent/5`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Floating Icon */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center z-10 group-hover:bg-primary/20 transition-all duration-300">
                <ServiceIcon className="h-6 w-6 text-primary" />
              </div>
              
              <Link to={to} className="block">
                {/* Service Image */}
                <div className="relative overflow-hidden">
                  {imgSrc && (
                    <img 
                      src={imgSrc} 
                      alt={alt} 
                      width={siteConfig.media.serviceCardDefault?.width || 1200} 
                      height={siteConfig.media.serviceCardDefault?.height || 800} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
                      loading="lazy" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Urgency Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                      {service.urgency}
                    </div>
                  </div>
                  
                  {/* Bottom overlay with tagline */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/90 to-transparent text-background">
                    <div className="text-sm font-semibold opacity-90">{service.tagline}</div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.shortDescription || "Professional garage door service with expert technicians and quality parts."}
                  </p>
                  
                  {/* Service Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary fill-current" />
                        <span className="text-sm font-semibold text-primary">Free Estimate</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                        <span>Get Started</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Quick Call Button - appears on hover */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button size="sm" className="rounded-full shadow-lg" asChild>
                  <a 
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ 
                          event: "phone_click", 
                          source: "service_card", 
                          service: service.name,
                          phone: siteConfig.business.phone 
                        });
                      } catch {}
                    }}
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Enhanced Bottom Section */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Garage Door Service in {siteConfig.business.hqAddress.city}?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Don't let garage door problems disrupt your day. Our expert technicians are ready to help 
            with professional repair and installation services across Bergen and Hudson Counties.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Shield className="h-4 w-4 text-primary" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4 text-primary" />
              <span>Same Day Service</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Star className="h-4 w-4 text-primary fill-current" />
              <span>5.0/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Award className="h-4 w-4 text-primary" />
              <span>10 Year Warranty</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
            <a
              href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
              onClick={() => {
                try {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: "phone_click", source: "services_bottom_cta", phone: siteConfig.business.phone });
                } catch {}
              }}
            >
              <Phone className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Call {siteConfig.business.phone}
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 py-4 text-lg font-bold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
            <Link to="/services">
              View All Services <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
        
        {/* Bottom note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Free estimates • Licensed professionals • Emergency service available 24/7
        </p>
      </div>
    </section>
  );
};

export default Services;