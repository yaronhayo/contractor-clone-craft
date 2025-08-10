import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site-config";
const FinalCTA = () => {
  return (
    <section className="container py-14 md:py-20">
      <div className="rounded-xl border bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground px-6 py-10 text-center shadow">
        <h3 className="text-2xl font-bold">Need Garage Door Service in Edison or Bergen County?</h3>
        <p className="mt-2 opacity-90">Don't wait—call Pro Line Garage Experts for fast, professional garage door repair and installation.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="rounded-full bg-background text-foreground hover:opacity-90">
            <a
              href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
              aria-label={`Call ${siteConfig.business.name}`}
              className="flex items-center gap-2"
              onClick={() => {
                try {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: "phone_click", source: "final_cta", phone: siteConfig.business.phone });
                } catch {}
              }}
            >
              <PhoneCall className="h-5 w-5" /> Call for Garage Door Service {siteConfig.business.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
