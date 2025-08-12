import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import HeroEstimateForm from "@/components/forms/HeroEstimateForm";
import { siteConfig } from "@/config/site-config";
import { 
  PhoneCall, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle2, 
  Award,
  MapPin,
  Zap,
  Users,
  TrendingUp
} from "lucide-react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  problem: string;
  agitation: string;
  serviceSlug: string;
  features: string[];
}

const ServiceHero = ({ 
  title, 
  subtitle, 
  problem, 
  agitation, 
  serviceSlug, 
  features 
}: ServiceHeroProps) => {
  const trustSignals = [
    { icon: Shield, text: "Licensed & Insured", color: "text-green-600" },
    { icon: Clock, text: "Same-Day Service", color: "text-blue-600" },
    { icon: Award, text: "10 Year Warranty", color: "text-purple-600" },
    { icon: Star, text: "5.0★ Rated", color: "text-yellow-600" }
  ];

  const urgencyFactors = [
    { icon: Users, text: "247 Happy Customers This Month" },
    { icon: TrendingUp, text: "98% Problem Resolution Rate" },
    { icon: Zap, text: "15-Min Average Response Time" }
  ];

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Emergency Badge */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-red-100 text-red-700 border-red-300 px-4 py-2 text-sm font-semibold animate-pulse">
                🚨 Emergency Service Available
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-green-300 px-4 py-2 text-sm">
                ✅ Licensed NJ Contractors
              </Badge>
            </div>

            {/* Problem Statement */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                <span className="text-red-600">{problem}</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              
              <p className="text-xl text-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Agitation */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <p className="text-red-800 font-medium leading-relaxed">
                ⚠️ {agitation}
              </p>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg border hover:shadow-md transition-all">
                  <signal.icon className={`h-8 w-8 ${signal.color} mb-2`} />
                  <span className="text-sm font-semibold text-foreground">{signal.text}</span>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="bg-background/70 backdrop-blur-sm rounded-xl p-6 border">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                What's Included:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
              <div className="grid grid-cols-3 gap-4 text-center">
                {urgencyFactors.map((factor, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <factor.icon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs font-semibold text-foreground">{factor.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg py-6 px-8 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all"
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
                          source: "service_hero", 
                          service: serviceSlug,
                          phone: siteConfig.business.phone 
                        });
                      }
                    } catch (error) {
                      console.warn('Analytics tracking failed:', error);
                    }
                  }}
                >
                  <PhoneCall className="h-6 w-6 mr-3" />
                  Call Now - {siteConfig.business.phone}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg py-6 px-8 border-2 border-primary hover:bg-primary hover:text-white transition-all"
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
              </Button>
            </div>

            {/* Location & Hours */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Serving {siteConfig.business.hqAddress.city}, NJ & Surrounding Areas
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Emergency Service Available
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:sticky lg:top-8">
            <div id="estimate-form" className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-3 rounded-t-xl mb-4">
                <p className="font-bold text-lg">🔥 Limited Time Offer</p>
                <p className="text-sm">FREE Service Call with Repair ($75 Value)</p>
              </div>
              <HeroEstimateForm />
              
              {/* Form Trust Elements */}
              <div className="mt-4 text-center text-xs text-muted-foreground space-y-2">
                <div className="flex justify-center items-center space-x-4">
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-green-600" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-blue-600" />
                    <span>15-Min Response</span>
                  </div>
                </div>
                <p>No spam. Your information is safe with us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;