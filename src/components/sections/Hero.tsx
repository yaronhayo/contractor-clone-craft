import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { PhoneCall, Star, Shield, Clock, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHomepageContent } from "@/lib/cms";
import { Helmet } from "react-helmet-async";

const Hero = () => {
  const { data } = useQuery({ queryKey: ["homepage"], queryFn: getHomepageContent, staleTime: 60_000 });

  const primaryLoc = siteConfig.locations.find((l) => l.isPrimary) || siteConfig.locations[0];
  const city = primaryLoc?.address?.city || "";
  const state = primaryLoc?.address?.state || "";

  const fallbackTitle = `${siteConfig.business.name} — Expert Garage Door Repair ${city && state ? `in ${city}, ${state}` : ""}`;
  const heroTitle = data?.heroTitle?.trim() ? data?.heroTitle : fallbackTitle;
  const heroDescription = data?.heroDescription?.trim() ? data?.heroDescription : siteConfig.seo.defaultDescription;
  
  // Robust fallback for media hero properties
  const mediaHero = siteConfig.media.hero || {};
  const heroSrc = data?.heroImageUrl || mediaHero.src || "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1600";
  const heroAlt = mediaHero.alt || `${siteConfig.business.name} garage door repair service`;
  const heroWidth = mediaHero.width || 1600;
  const heroHeight = mediaHero.height || 900;

  return (
    <section aria-label="Hero" className="relative min-h-[85vh] flex items-center">
      <Helmet>
        <link rel="preload" as="image" href={heroSrc} />
      </Helmet>
      
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroSrc} 
          alt={heroAlt} 
          width={heroWidth} 
          height={heroHeight} 
          className="w-full h-full object-cover" 
          loading="eager" 
          decoding="async" 
          fetchPriority="high" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
      </div>

      {/* Hero Content */}
      <div className="relative container z-10">
        <div className="max-w-3xl">
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">24/7 Emergency</span>
            </div>
          </div>

          <h1 id="content" className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Expert Garage Door Repair
            </span>
            <br />
            <span className="text-primary">in {city}, {state}</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in">
            Emergency garage door repair, spring repair, and professional installations with 24/7 service in Elmwood Park and Montclair. 
            <strong className="text-foreground"> Same-day service • 10-year warranty • Free estimates.</strong>
          </p>

          {/* Key Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>Same-day garage door repair service</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>10-year warranty on all repairs</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>Licensed NJ professionals (License #13VH13553300)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>10% senior discount + free on-site estimates</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 animate-fade-in">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
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
                <PhoneCall className="h-6 w-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Call Now: {siteConfig.business.phone}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
              <a href="#estimate">Get Free Estimate</a>
            </Button>
          </div>

          {/* Emergency Banner */}
          <div className="mt-8 p-4 bg-red-600 text-white rounded-lg border-l-4 border-red-800 animate-fade-in">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 animate-pulse" />
              <div>
                <p className="font-semibold">Emergency Garage Door Service Available 24/7</p>
                <p className="text-sm opacity-90">Stuck with a broken garage door or spring? Call now for immediate assistance in Elmwood Park and surrounding areas!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-slide-in-right">
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
          <div className="text-2xl font-bold text-primary">1000+</div>
          <div className="text-sm text-muted-foreground">Garage Doors Repaired</div>
        </div>
      </div>
    </section>
  );
};
