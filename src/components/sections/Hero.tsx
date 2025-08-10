import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { PhoneCall, Star, Shield, Clock, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHomepageContent } from "@/lib/cms";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
              <span className="text-sm font-semibold text-gray-900">5.0/5 Rating</span>
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
              Garage Door Repair Elmwood Park
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Same Day Service & Free Estimate</span>
          </h1>
          
          <p className="mt-4 text-base md:text-lg text-white/90 leading-relaxed animate-fade-in">
            Expert garage door repair in Elmwood Park, Montclair, and surrounding areas. Spring repair, opener service, and installation with 10 year warranty. 
            <strong className="text-primary"> Same day service available.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-4 animate-fade-in">
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
              <Link to="/contact">Get Free Estimate</Link>
            </Button>
          </div>

          </div>

          {/* Quick Booking Form - Lifted up for better alignment */}
          <div className="animate-fade-in -mt-8 lg:-mt-12">
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
                  placeholder="Service Address (Elmwood Park, NJ)" 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
                <select 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                >
                  <option value="">When do you need service?</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Today If Possible">Today If Possible</option>
                  <option value="Within the next few days">Within the next few days</option>
                  <option value="Within the next few weeks">Within the next few weeks</option>
                  <option value="Not sure">Not sure</option>
                </select>
                <select 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                >
                  <option value="">Select Garage Door Service</option>
                  <option value="garage-door-spring-repair">Garage Door Spring Repair</option>
                  <option value="garage-door-repair">Garage Door Repair</option>
                  <option value="garage-door-opener-repair">Garage Door Opener Repair</option>
                  <option value="garage-door-installation">Garage Door Installation</option>
                  <option value="emergency-garage-door-repair">24/7 Emergency Repair</option>
                </select>
                <Button 
                  className="w-full text-base py-3 rounded-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  type="submit"
                >
                  Request Garage Door Service
                </Button>
              </form>
              <p className="text-xs text-gray-600 text-center mt-3">
                Free on-site estimate • 10 year warranty • Same day service • 10% senior discount
              </p>
            </div>

            {/* Key Benefits - Horizontal Layout */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Same day service</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>10 year warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Licensed NJ contractor</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>10% senior discount</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Free estimate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-slide-in-right">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-primary">10 Yr</div>
          <div className="text-sm text-gray-600">Warranty</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;