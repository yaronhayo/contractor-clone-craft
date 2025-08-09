import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { siteConfig } from "@/config/site-config";
import { renderInvisibleRecaptcha } from "@/lib/recaptcha";
import { sendEstimateRequest } from "@/lib/email";
import { Autocomplete } from "@react-google-maps/api";
import { useMaps } from "@/contexts/MapsProvider";
import { Link } from "react-router-dom";
const EstimateForm = () => {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [service, setService] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const [widgetId, setWidgetId] = useState<number | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const siteKey = siteConfig.integrations.recaptcha?.siteKey || "";
  const mapsKey = siteConfig.integrations.googleMaps?.apiKey || "";
  const { isLoaded: mapsLoaded } = useMaps();
  const autocompleteRef = useRef<any>(null);

  const serviceOptions = siteConfig.taxonomy?.services || [];
  const timeframeOptions = [
    "ASAP (within 1 hour)",
    "Today",
    "Within 24 hours",
    "Within 3 days",
    "Schedule a date",
  ];

  // Setup Invisible reCAPTCHA v2 when site key is available
  useEffect(() => {
    if (!siteKey || !recaptchaRef.current || widgetId !== null) return;
    (async () => {
      const id = await renderInvisibleRecaptcha(recaptchaRef.current!, siteKey, (token: string) => {
        setRecaptchaToken(token);
      });
      if (id !== null) setWidgetId(id);
    })();
  }, [siteKey, widgetId]);

  // When token is received from reCAPTCHA, send the form
  useEffect(() => {
    if (!submitting) return;
    if (siteKey) {
      if (recaptchaToken) {
        void doSend(recaptchaToken);
      }
    }
  }, [recaptchaToken, submitting, siteKey]);

  const doSend = async (token: string) => {
    const payload = {
      address,
      services: [service, timeframe ? `Timeframe: ${timeframe}` : ""].filter(Boolean) as string[],
      name,
      phone,
      email,
      message: [timeframe ? `Preferred timeframe: ${timeframe}` : "", message].filter(Boolean).join("\n\n"),
      recaptchaToken: token || undefined,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    };

    const res = await sendEstimateRequest(payload as any);
    if (res.ok) {
      toast({ title: "Request sent", description: "We will contact you shortly." });
      setAddress("");
      setService("");
      setTimeframe("");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } else {
      toast({ title: "Something went wrong", description: res.error || "Please try again.", variant: "destructive" } as any);
    }
    setSubmitting(false);
    setRecaptchaToken("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({ title: "Consent required", description: "Please accept the privacy policy to proceed.", variant: "destructive" } as any);
      return;
    }
    setSubmitting(true);
    if (siteKey && widgetId !== null && (window as any).grecaptcha) {
      (window as any).grecaptcha.execute(widgetId);
      return;
    }
    void doSend("");
  };

  return (
    <section id="estimate" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Get A Free Estimate</h2>
        <p className="mt-2 text-muted-foreground">Fill out the quick form below to schedule a no-pressure, no-obligation quote.</p>
        <p className="mt-2 font-semibold">Need to contact us right away? Call Us: {siteConfig.business.phone}</p>
      </header>

      <div ref={recaptchaRef} className="hidden" />
      <form onSubmit={onSubmit} className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Service address *</label>
          {mapsLoaded ? (
            <Autocomplete
              onLoad={(ac) => (autocompleteRef.current = ac)}
              onPlaceChanged={() => {
                const place = autocompleteRef.current?.getPlace?.();
                const formatted = place?.formatted_address || address;
                setAddress(formatted);
              }}
            >
              <Input required placeholder="123 Main St, City, ST" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Autocomplete>
          ) : (
            <Input required placeholder="123 Main St, City, ST" value={address} onChange={(e) => setAddress(e.target.value)} />
          )}

          <label className="block text-sm font-medium mt-4">What type of service do you need? *</label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((s: any) => (
                <SelectItem key={s.slug} value={s.name}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label className="block text-sm font-medium mt-4">Preferred timeframe *</label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger>
              <SelectValue placeholder="When do you need this?" />
            </SelectTrigger>
            <SelectContent>
              {timeframeOptions.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name *</label>
              <Input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number *</label>
              <Input required type="tel" placeholder="(000) 555-5555" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <Input required type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Short description of what you need</label>
            <Textarea rows={5} placeholder="Tell us more about your project" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
            <label htmlFor="consent" className="text-sm text-muted-foreground">
              I agree to the <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
            </label>
          </div>
          <Button type="submit" className="mt-2">Request Free Estimate</Button>
        </div>
      </form>
    </section>
  );
};

export default EstimateForm;
