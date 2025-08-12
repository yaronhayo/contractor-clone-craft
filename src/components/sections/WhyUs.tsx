import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
import { Shield, Clock, Award, Users, CheckCircle2, Star } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, highlight }: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  highlight?: string;
}) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
    <div className="relative bg-background border rounded-2xl p-8 h-full text-center hover:border-primary/30 transition-all duration-300">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {highlight && (
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
          {highlight}
        </div>
      )}
      <p className="text-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const StatCard = ({ number, label, sublabel }: { number: string; label: string; sublabel?: string }) => (
  <div className="text-center group">
    <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <div className="font-semibold text-foreground">{label}</div>
    {sublabel && <div className="text-sm text-foreground">{sublabel}</div>}
  </div>
);

const WhyUs = () => {
  const features = [
    {
      icon: Shield,
      title: "NJ State Licensed & $1M Insured",
      description: "Licensed contractor #13VH13553300 with $1,000,000 liability coverage. Unlike unlicensed handymen, we're legally qualified and financially protected to work on your home.",
      highlight: "Verified License"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: "Stuck outside in the cold? Can't get your car out? Our emergency response team is strategically positioned across Bergen County for rapid assistance when you need it most.",
      highlight: "Always Available"
    },
    {
      icon: Award,
      title: "Extensive Experience Since 2015",
      description: "Master-certified technicians with over a decade of experience each. We've handled every garage door brand and problem imaginable—from simple spring repairs to complex commercial installations.",
      highlight: "Proven Track Record"
    },
    {
      icon: Users,
      title: "Elmwood Park Family-Owned Since 2015",
      description: "We live here, work here, and raise our families here. Our reputation is everything—that's why we guarantee every job with the industry's best 10-year warranty.",
      highlight: "Local Reputation"
    },
    {
      icon: CheckCircle2,
      title: "Factory-Certified on All Brands",
      description: "LiftMaster Master Dealer, Chamberlain certified, Genie authorized—we maintain factory certifications on every major brand. This means authentic parts, proper installation, and valid warranties.",
      highlight: "Factory Certified"
    },
    {
      icon: Star,
      title: "Industry's ONLY 10-Year Warranty",
      description: "While competitors offer 1-2 year warranties, we guarantee our work for 10 FULL YEARS. If anything goes wrong, we fix it free—including parts and labor. That's confidence in quality.",
      highlight: "10-Year Protection"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-secondary/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,158,37,0.1),transparent)]" />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="h-4 w-4 fill-current" />
            Why Choose ez2fix
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary-foreground">
            Why 500+ Elmwood Park Homeowners Trust ez2fix
          </h2>
          <p className="mt-6 text-lg text-secondary-foreground leading-relaxed">
            <strong>Don't gamble with unlicensed handymen.</strong> Since 2015, our certified technicians have completed 500+ garage door repairs with ZERO safety incidents. 
            We're the only local company offering a 10-year warranty because we stand behind our work—guaranteed.
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
            <div className="font-semibold text-secondary-foreground">Garage Doors Serviced</div>
            <div className="text-sm text-foreground">Since 2015</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">5.0★</div>
            <div className="font-semibold text-secondary-foreground">Average Rating</div>
            <div className="text-sm text-foreground">250+ Reviews</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="font-semibold text-secondary-foreground">Emergency Service</div>
            <div className="text-sm text-foreground">Always Available</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
            <div className="font-semibold text-secondary-foreground">Years Experience</div>
            <div className="text-sm text-foreground">Local Expertise</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-background border rounded-2xl p-8 h-full text-center hover:border-primary/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  {feature.highlight && (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                      {feature.highlight}
                    </div>
                  )}
                  <p className="text-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Don't Risk Your Family's Safety with DIY Repairs
            </h3>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Garage door springs are under 400+ pounds of tension—one mistake can cause serious injury or death. 
              <strong>Call the licensed professionals trusted by 500+ Elmwood Park families.</strong>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold" asChild>
                <Link to="/booking">Get Free Estimate</Link>
              </Button>
              <Button size="lg" className="bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80 hover:text-secondary-foreground transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold" asChild>
                <a 
                  href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                  onClick={() => {
                    try {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({ event: "phone_click", source: "why_us_cta", phone: siteConfig.business.phone });
                    } catch {}
                  }}
                >
                  Call {siteConfig.business.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary bg-background hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;