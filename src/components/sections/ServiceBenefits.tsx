import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site-config";
import { 
  CheckCircle2, 
  Shield, 
  Clock, 
  Award, 
  Zap, 
  Heart, 
  TrendingUp, 
  Users,
  PhoneCall,
  ArrowRight,
  AlertTriangle,
  DollarSign
} from "lucide-react";

interface ServiceBenefitsProps {
  serviceSlug: string;
  benefits: Array<{
    icon: any;
    title: string;
    description: string;
    highlight?: string;
  }>;
}

const ServiceBenefits = ({ serviceSlug, benefits }: ServiceBenefitsProps) => {
  const riskFactors = [
    "Injury from high-tension springs",
    "Property damage from improper repairs",
    "Voided manufacturer warranties",
    "More expensive repairs later",
    "Security vulnerabilities from broken doors"
  ];

  const costComparison = {
    "garage-door-spring-repair": { diy: "$50-150", professional: "$150-300", savings: "Prevents $800+ damage" },
    "garage-door-repair": { diy: "$100-300", professional: "$200-500", savings: "Avoids $1,200+ replacement" },
    "garage-door-installation": { diy: "$800-1,500", professional: "$1,200-2,500", savings: "20+ year investment" },
    "garage-door-opener-repair": { diy: "$75-200", professional: "$150-400", savings: "Prevents electrical damage" },
    "emergency-garage-door-repair": { diy: "Not advisable", professional: "$200-600", savings: "Immediate security" },
    "commercial-garage-door-service": { diy: "Not feasible", professional: "$500-3,000", savings: "Business continuity" }
  };

  const currentCost = costComparison[serviceSlug as keyof typeof costComparison];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        {/* Why Professional Service */}
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-700 border-red-300 mb-4">
            ⚠️ Don't Risk DIY
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Professional Service is Worth Every Penny
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Garage door repair isn't a DIY project. One mistake can cost thousands or cause serious injury.
          </p>
        </div>

        {/* Cost Comparison */}
        {currentCost && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-12 border-2 border-red-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-800 mb-2">DIY vs Professional: The Real Cost</h3>
              <p className="text-red-600">Think DIY will save money? Think again.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <Card className="border-2 border-red-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-red-700 text-lg">DIY Attempt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800 mb-2">{currentCost.diy}</div>
                  <ul className="text-sm text-red-600 space-y-1">
                    {riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 text-red-500 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-300 ring-2 ring-green-200">
                <CardHeader className="pb-3 bg-green-50">
                  <CardTitle className="text-green-700 text-lg">Professional Service</CardTitle>
                  <Badge className="bg-green-100 text-green-800 text-xs">RECOMMENDED</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800 mb-2">{currentCost.professional}</div>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>✓ Licensed & insured</li>
                    <li>✓ 10-year warranty</li>
                    <li>✓ Safe & code-compliant</li>
                    <li>✓ Quality guaranteed</li>
                    <li>✓ Peace of mind</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-700 text-lg">Long-term Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800 mb-2">{currentCost.savings}</div>
                  <p className="text-sm text-blue-600">
                    Professional service prevents costly mistakes and provides lasting reliability
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Service Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {benefit.description}
                    </p>
                    {benefit.highlight && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {benefit.highlight}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Call-to-Action */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold">Every Minute Counts!</h3>
            </div>
            
            <p className="text-lg text-red-100 mb-6">
              Garage door problems don't wait for convenient times. The longer you wait, 
              the more dangerous and expensive the problem becomes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-red-50 text-lg py-3 px-8 font-bold"
                asChild
              >
                <a 
                  href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined') {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ 
                          event: "phone_click", 
                          source: "service_benefits", 
                          service: serviceSlug,
                          phone: siteConfig.business.phone 
                        });
                      }
                    } catch (error) {
                      console.warn('Analytics tracking failed:', error);
                    }
                  }}
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Call {siteConfig.business.phone} Now
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg py-3 px-8"
                onClick={() => {
                  try {
                    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                      const estimateSection = document.getElementById('estimate-form');
                      if (estimateSection) {
                        estimateSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  } catch (error) {
                    console.warn('Scroll to estimate failed:', error);
                  }
                }}
              >
                Get Free Estimate
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="mt-4 text-sm text-red-200">
              24/7 Emergency Service • Licensed NJ Contractors • Same-Day Response
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;