import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site-config";
import { Shield, Clock, Award, Star, CheckCircle2, Wrench, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description, stats }: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string;
  stats?: string;
}) => (
  <Card className="h-full group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
    <CardHeader className="text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      {stats && (
        <div className="text-2xl font-bold text-primary">{stats}</div>
      )}
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const Welcome = () => {
  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="h-4 w-4 fill-current" />
            Welcome to Pro Line Garage Experts
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Edison's Most Trusted Garage Door Experts
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            For over 10 years, we've been the go-to garage door specialists for homeowners and businesses 
            across Edison, Bergen County, and Hudson County. Our commitment to excellence shows in every project.
          </p>
          
          {/* Quick Contact */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8" asChild>
              <a
                href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
                aria-label={`Call ${siteConfig.business.name}`}
                onClick={() => {
                  try {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ event: "phone_click", source: "welcome", phone: siteConfig.business.phone });
                  } catch {}
                }}
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                Call {siteConfig.business.phone}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              Available 7 days a week, 7AM - 11PM
            </p>
          </div>
        </header>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={Shield} 
            title="Licensed & Insured" 
            description="Fully licensed garage door specialists with comprehensive insurance coverage. Your property and investment are completely protected."
            stats="NJ License #13VH13578200"
          />
          <FeatureCard 
            icon={Clock} 
            title="24/7 Emergency Service" 
            description="Garage door emergencies happen at the worst times. That's why we're available around the clock for urgent repairs and lockouts."
            stats="24/7"
          />
          <FeatureCard 
            icon={Award} 
            title="Proven Excellence" 
            description="Over 500 garage doors serviced with consistent 5-star reviews. Our track record speaks for itself across Bergen and Hudson Counties."
            stats="500+"
          />
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-background via-muted/10 to-background border rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trusted by Homeowners Across New Jersey
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality garage door service has earned us the trust of hundreds of families and businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                4.9★
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                250+
              </div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                15min
              </div>
              <div className="text-sm text-muted-foreground">Average Response</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
            <Link to="/about">
              Learn More About Us <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Welcome;