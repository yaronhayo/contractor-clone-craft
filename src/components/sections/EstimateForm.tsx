import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { siteConfig } from "@/config/site-config";
import { renderInvisibleRecaptcha } from "@/lib/recaptcha";

const EstimateForm = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<string[]>([]);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const [widgetId, setWidgetId] = useState<number | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const siteKey = siteConfig.integrations.recaptcha?.siteKey || "";

  const toggle = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s]));
  
  // Setup Invisible reCAPTCHA v2 when site key is available
  useEffect(() => {
    if (!siteKey || !recaptchaRef.current || widgetId !== null) return;
    (async () => {
      const id = await renderInvisibleRecaptcha(recaptchaRef.current!, siteKey, (token: string) => {
        setRecaptchaToken(token);
        toast({ title: "Request sent", description: "We will contact you shortly." });
        console.log("Estimate form submitted", { services, recaptchaToken: token });
      });
      if (id !== null) setWidgetId(id);
    })();
  }, [siteKey, widgetId, services, toast]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (siteKey && widgetId !== null && (window as any).grecaptcha) {
      (window as any).grecaptcha.execute(widgetId);
      return;
    }
    toast({ title: "Request sent", description: "We will contact you shortly." });
    console.log("Estimate form submitted", { services });
  };

  return (
    <section id="estimate" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Get A Free Estimate On (Service)</h2>
        <p className="mt-2 text-muted-foreground">Fill out the quick form below to schedule a no-pressure, no-obligation quote.</p>
        <p className="mt-2 font-semibold">Need to contact us right away? Call Us: (000) 555-5555</p>
      </header>

      <div ref={recaptchaRef} className="hidden" />
      <form onSubmit={onSubmit} className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Where do you need our services? (Address) *</label>
          <Input required placeholder="123 Main St, City, ST" />

          <label className="block text-sm font-medium mt-4">What type of (Service) do you need? *</label>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <Checkbox checked={services.includes(String(i + 1))} onCheckedChange={() => toggle(String(i + 1))} />
                Service #{i + 1}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name *</label>
              <Input required placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number *</label>
              <Input required type="tel" placeholder="(000) 555-5555" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <Input required type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium">Short description of what you need</label>
            <Textarea rows={5} placeholder="Tell us more about your project" />
          </div>
          <Button type="submit" className="mt-2">Request Free Estimate</Button>
        </div>
      </form>
    </section>
  );
};

export default EstimateForm;
