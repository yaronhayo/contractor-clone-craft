import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { PhoneCall, Star, Shield, Clock, CheckCircle2, Wrench } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHomepageContent } from "@/lib/cms";
import { Link } from "react-router-dom";
import HeroEstimateForm from "@/components/forms/HeroEstimateForm";

const Hero = () => {
  const { data } = useQuery({ queryKey: ["homepage"], queryFn: getHomepageContent, staleTime: 60_000 });

  const primaryLoc = siteConfig.locations.find((l) => l.isPrimary) || siteConfig.locations[0];
  const city = primaryLoc?.address.city;
  const state = primaryLoc?.address.state;

  const heroVideoSrc = "https://qjvikxuhqs1py0go.public.blob.vercel-storage.com/ez2fix-hero-background.mp4";

  return (
    <section aria-label="Hero" className="relative min-h-[90vh] flex items-center bg-secondary">
      
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-primary/10">
        <video 
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Video failed to load:', e);
            e.currentTarget.style.display = 'none';
          }}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        />
      </div>

      {/* Hero Content */}
      <div className="relative container z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative space-y-8">
            {/* Text overlay tint - positioned behind text content only */}
            <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-black/20 rounded-3xl backdrop-blur-sm" />
            <div className="relative z-10 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight">
                Garage Door Broke?
                <br />
                <span className="text-primary">Fixed Today!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                <strong className="text-secondary-foreground">Stuck with a broken garage door in Elmwood Park?</strong> Our licensed technicians provide emergency repairs, spring replacements, opener fixes, and new installations with our comprehensive warranty coverage.
                <strong className="text-accent block mt-3 text-xl">Professional Service Available Now!</strong>
              </p>

              {/* CTA Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-2 border-primary hover:border-primary/90 transition-all duration-300" 
                  asChild
                >
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    aria-label={`Call ${siteConfig.business.name}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "hero", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <PhoneCall className="h-5 w-5 mr-2" />
                    Call Now: {siteConfig.business.phone}
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto border-2 border-muted text-foreground bg-background hover:bg-muted hover:text-foreground font-semibold transition-all duration-300" 
                  asChild
                >
                  <Link to="/services">
                    <Wrench className="h-5 w-5 mr-2" />
                    View All Services
                  </Link>
                </Button>
              </div>
              
              {/* Main Benefits - 2x2 Grid */}
              <div className="relative mt-12">
                <div className="absolute inset-0 -inset-x-4 -inset-y-4 bg-black/20 rounded-2xl backdrop-blur-sm" />
                <div className="relative z-10 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-secondary-foreground">Free On-Site Estimates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-secondary-foreground">10% Senior Citizen Discount</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-secondary-foreground">$200 Off New Installation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-secondary-foreground">Same-Day Service Available</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Enhanced Form */}
          <div className="lg:justify-self-end w-full max-w-md">
            <HeroEstimateForm />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;