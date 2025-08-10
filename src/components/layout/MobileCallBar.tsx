import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site-config";

const MobileCallBar = () => {
  const phone = siteConfig.business.phone;
  if (!phone) return null;
  const telHref = `tel:${phone}`;

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container py-2">
        <Button asChild size="lg" className="w-full rounded-full">
          <a
            href={telHref}
            aria-label={`Call ${siteConfig.business.name}`}
            onClick={() => {
              try {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ event: "phone_click", source: "mobile_bar", phone });
              } catch {}
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <PhoneCall className="h-5 w-5" />
              <span>Call Now</span>
              <span className="font-semibold">{phone}</span>
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileCallBar;
