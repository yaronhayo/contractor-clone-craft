import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";

const WhyUs = () => {
  return (
    <section className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Why Choose {siteConfig.business.name} for Garage Door Services in {siteConfig.business.hqAddress.city}?</h2>
        <p className="mt-4 text-muted-foreground">
          Licensed, insured, and locally trusted. Upfront pricing, 24/7 availability, and expert technicians who respect your property.
        </p>
        <div className="mt-6">
          <Button asChild>
            <a href="/#estimate">Request Free Estimate</a>
          </Button>
        </div>
      </header>
    </section>
  );
};

export default WhyUs;
