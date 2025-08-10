import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { PhoneCall, Star, Shield, Clock, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHomepageContent } from "@/lib/cms";
import { Helmet } from "react-helmet-async";

const Hero = () => {
  const { data } = useQuery({ queryKey: ["homepage"], queryFn: getHomepageContent, staleTime: 60_000 });

  const primaryLoc = siteConfig.locations.find((l) => l.isPrimary) || siteConfig.locations[0];
  const city = primaryLoc?.address.city;
  const state = primaryLoc?.address.state;

  const fallbackTitle = `${siteConfig.business.name} — Expert Garage Door Service ${city && state ? `in ${city}, ${state}` : ""}`;
  const heroTitle = data?.heroTitle?.trim() ? data?.heroTitle : fallbackTitle;
  const heroDescription = data?.heroDescription?.trim() ? data?.heroDescription : siteConfig.seo.defaultDescription;
  const heroVideoSrc = "https://qjvikxuhqs1py0go.public.blob.vercel-storage.com/ez2fix-hero-background.mp4";

  return (
    <section aria-label="Hero" className="relative min-h-[85vh] flex items-center">
      
      {/* Background Video with Enhanced Overlay */}
      <div className="absolute inset-0">
        <video 
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-800/50 to-gray-900/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/50" />
      </div>

      {/* Hero Content */}
      <div className="relative container z-10 pt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-900">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">24/7 Emergency</span>
            </div>
          </div>

          <h1 id="content" className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight animate-fade-in">
            <span className="text-white">
              24/7 Emergency Garage Door Service
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">in {city}, {state}</span>
          </h1>
          
          <p className="mt-4 text-base md:text-lg text-white/90 leading-relaxed animate-fade-in">
            Garage door repair, spring replacement, opener service, and installation. Available 24/7 across Bergen and Hudson Counties. 
            <strong className="text-yellow-400"> 15-minute response guaranteed.</strong>
          </p>

          {/* Key Benefits */}
          <div className="mt-6 grid grid-cols-1 gap-2 animate-fade-in">
            <div className="flex items-center gap-3 text-sm text-white">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>15-minute emergency garage door response</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>Residential, commercial & industrial garage doors</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>Licensed NJ garage door specialist with 10+ years experience</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>Transparent pricing with no hidden fees</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 animate-fade-in">
            <Button size="lg" className="text-base px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
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
            <Button variant="outline" size="lg" className="text-base px-6 py-4 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
              <a href="#estimate">Get Free Estimate</a>
            </Button>
          </div>
          </div>

          {/* Quick Booking Form */}
          <div className="animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Quick Garage Door Service Request</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Service Address (Englewood, NJ)" 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
                <select 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                >
                  <option value="">Select Garage Door Service</option>
                  <option value="garage-door-emergency">Garage Door Emergency</option>
                  <option value="spring-replacement">Spring Replacement</option>
                  <option value="garage-door-installation">Garage Door Installation</option>
                  <option value="opener-repair">Opener Repair</option>
                  <option value="garage-door-repair">Garage Door Repair</option>
                </select>
                <Button 
                  className="w-full text-base py-3 rounded-lg bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  type="submit"
                >
                  Request Garage Door Service
                </Button>
              </form>
              <p className="text-xs text-gray-600 text-center mt-3">
                Free quotes • No obligation • 15-minute emergency response
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-slide-in-right">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg">
          <div className="text-2xl font-bold text-primary">24/7</div>
          <div className="text-sm text-gray-600">Emergency Garage Door</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;