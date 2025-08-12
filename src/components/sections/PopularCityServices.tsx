import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { MapPin, Star, ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const CityCard = ({ area, services }: { 
  area: { name: string; state: string; slug: string }; 
  services: Array<{ name: string; slug: string }>;
}) => (
  <article className="group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
    <div className="relative bg-background border-2 rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300">
      {/* City Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-200">
            {area.name}, {area.state}
          </h3>
          <div className="flex items-center gap-1 text-xs text-foreground">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span>5.0/5 garage door service</span>
          </div>
        </div>
      </div>

      {/* Service Links */}
      <div className="space-y-2 mb-6">
        {services.map((service) => (
          <Link 
            key={service.slug} 
            to={siteConfig.routes.serviceCity(service.slug, area.slug)}
            className="block p-3 rounded-lg border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group/link"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium group-hover/link:text-primary transition-colors">
                {service.name} in {area.name}
              </span>
              <ArrowRight className="h-4 w-4 text-foreground group-hover/link:text-primary group-hover/link:translate-x-1 transition-all duration-200" />
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <Link 
        to={siteConfig.routes.serviceAreaDetail(area.slug)}
        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
      >
        View All Services <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </article>
);

const PopularCityServices = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0, 4);
  const topServices = siteConfig.taxonomy.services.slice(0, 3);

  return (
    <section id="popular-city-services" className="relative py-16 md:py-24 bg-background">
      <div className="container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MapPin className="h-4 w-4" />
            Popular in Your Area
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Garage Door Services Near You
          </h2>
          <p className="mt-6 text-lg text-foreground leading-relaxed">
            Quick access to our most requested garage door services in the top cities we serve across 
            Bergen County, Hudson County, and surrounding New Jersey areas.
          </p>
        </header>

        {/* Cities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {areas.map((area, index) => (
            <div key={area.slug} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CityCard area={area} services={topServices} />
            </div>
          ))}
        </div>

        {/* Service Categories Quick Access */}
        <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Browse Garage Door Services by Category
            </h3>
            <p className="text-foreground max-w-2xl mx-auto">
              Find the exact garage door service you need with our organized service categories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {siteConfig.taxonomy.services.slice(0, 6).map((service, index) => (
              <Link 
                key={service.slug} 
                to={siteConfig.routes.individualService(service.slug)}
                className={`group block animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-background border-2 rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                    {service.name}
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {service.shortDescription || "Professional service when you need it most."}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                    <span className="text-sm">Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
              <Link to="/services">
                View All Garage Door Services <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCityServices;