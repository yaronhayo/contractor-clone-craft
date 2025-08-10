import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
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
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const StatCard = ({ number, label, sublabel }: { number: string; label: string; sublabel?: string }) => (
  <div className="text-center group">
    <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <div className="font-semibold text-foreground">{label}</div>
    {sublabel && <div className="text-sm text-muted-foreground">{sublabel}</div>}
  </div>
);

const WhyUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed garage door specialists with comprehensive insurance coverage for your complete peace of mind and protection.",
      highlight: "NJ Licensed"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: "Garage door emergencies don't wait for business hours. Our certified technicians are available around the clock for urgent repairs.",
      highlight: "Always Available"
    },
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Over a decade of garage door expertise serving Edison, Bergen County, and Hudson County with consistent excellence and reliability.",
      highlight: "Proven Track Record"
    },
    {
      icon: Users,
      title: "Local & Trusted",
      description: "Family-owned business with deep community roots. We're your neighbors, committed to building long-term relationships through quality service.",
      highlight: "Community Focused"
    },
    {
      icon: CheckCircle2,
      title: "All Brands Serviced",
      description: "From LiftMaster to Chamberlain, Genie to Craftsman—our technicians are trained and certified on all major garage door brands.",
      highlight: "Universal Expertise"
    },
    {
      icon: Star,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee on all garage door work. If you're not completely happy, we'll make it right—no questions asked.",
      highlight: "Money Back Guarantee"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,158,37,0.1),transparent)]" />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="h-4 w-4 fill-current" />
            Why Choose ez2fix
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Elmwood Park's Premier Garage Door Service Company
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            When you choose ez2fix, you're choosing expertise, reliability, and a commitment to excellence 
            that has made us the most trusted garage door service in Elmwood Park, Montclair, and surrounding areas.
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
            <div className="font-semibold text-white">Garage Doors Serviced</div>
            <div className="text-sm text-gray-400">Since 2015</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">4.9★</div>
            <div className="font-semibold text-white">Average Rating</div>
            <div className="text-sm text-gray-400">250+ Reviews</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="font-semibold text-white">Emergency Service</div>
            <div className="text-sm text-gray-400">Always Available</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
            <div className="font-semibold text-white">Years Experience</div>
            <div className="text-sm text-gray-400">Local Expertise</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white border rounded-2xl p-8 h-full text-center hover:border-primary/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  {feature.highlight && (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                      {feature.highlight}
                    </div>
                  )}
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready for Professional Garage Door Service?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers across Edison, Bergen County, and Hudson County. 
              Get your free estimate today and experience the Pro Line difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold" asChild>
                <a href="#estimate">Get Free Estimate</a>
              </Button>
              <Button size="lg" className="bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800 hover:border-gray-800 rounded-full px-8 py-4 text-lg font-semibold" asChild>
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
              <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-lg font-semibold" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;