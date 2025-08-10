import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHomepageContent } from "@/lib/cms";

const Hero = () => {
  const { data } = useQuery({ queryKey: ["homepage"], queryFn: getHomepageContent, staleTime: 60_000 });

  const primaryLoc = siteConfig.locations.find((l) => l.isPrimary) || siteConfig.locations[0];
  const city = primaryLoc?.address.city;
  const state = primaryLoc?.address.state;

  const fallbackTitle = `${siteConfig.business.name} — Trusted Local Pros ${city && state ? `in ${city}, ${state}` : ""}`;
  const heroTitle = data?.heroTitle?.trim() ? data?.heroTitle : fallbackTitle;
  const heroDescription = data?.heroDescription?.trim() ? data?.heroDescription : siteConfig.seo.defaultDescription;
  const heroSrc = data?.heroImageUrl || siteConfig.media.hero?.src || "/src/assets/hero-house.jpg";
  const heroAlt = siteConfig.media.hero?.alt || `${siteConfig.business.name} hero image`;

  return (
    <section aria-label="Hero" className="relative">
      <div className="absolute inset-0">
        <img src={heroSrc} alt={heroAlt} className="w-full h-[70vh] md:h-[80vh] object-cover" loading="eager" decoding="async" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/80" />
      </div>

      <div className="relative container h-[70vh] md:h-[80vh] flex items-center justify-center text-center">
        <div className="max-w-4xl animate-fade-in">
          <h1 id="content" className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {heroTitle}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            {heroDescription}
          </p>
          <div className="mt-8">
            <Button size="lg" className="rounded-full" asChild>
              <a
                href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                aria-label={`Call ${siteConfig.business.name}`}
                className="flex items-center gap-2"
                onClick={() => {
                  try {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ event: "phone_click", source: "hero", phone: siteConfig.business.phone });
                  } catch {}
                }}
              >
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

