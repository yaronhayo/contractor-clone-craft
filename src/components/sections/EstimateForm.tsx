import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site-config";
import { renderInvisibleRecaptcha } from "@/lib/recaptcha";
import { sendEstimateRequest } from "@/lib/email";
import { Autocomplete } from "@react-google-maps/api";
import { useMaps } from "@/contexts/MapsProvider";
import { Link } from "react-router-dom";
import { Calculator, PhoneCall, MapPin, Clock, CheckCircle2, Star, Wrench, Shield } from "lucide-react";

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
  const [hp, setHp] = useState(""); // honeypot
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
    "ASAP (Emergency - within 1 hour)",
    "Today",
    "Within 24 hours",
    "Within 3 days",
    "Schedule for later this week",
    "Schedule for next week",
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
    } else {
      void doSend("");
    }
  }, [recaptchaToken, submitting, siteKey]);

  const doSend = async (token: string) => {
    const url = typeof window !== "undefined" ? new URL(window.location.href) : null;
    const payload = {
      address,
      services: [service, timeframe ? `Timeframe: ${timeframe}` : ""].filter(Boolean) as string[],
      name,
      phone,
      email,
      message: [timeframe ? `Preferred timeframe: ${timeframe}` : "", message].filter(Boolean).join("\n\n"),
      recaptchaToken: token || undefined,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      honeypot: hp || undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      utmSource: url?.searchParams.get("utm_source") || undefined,
      utmMedium: url?.searchParams.get("utm_medium") || undefined,
      utmCampaign: url?.searchParams.get("utm_campaign") || undefined,
      utmTerm: url?.searchParams.get("utm_term") || undefined,
      utmContent: url?.searchParams.get("utm_content") || undefined,
    };

    const res = await sendEstimateRequest(payload as any);
    if (res.ok) {
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "estimate_request_submitted",
          form: "estimate",
          services: payload.services,
          city: siteConfig.business.hqAddress.city,
        });
      } catch {}
      toast({ title: "Request sent successfully!", description: "We'll contact you within 15 minutes during business hours." });
      setAddress("");
      setService("");
      setTimeframe("");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } else {
      toast({ title: "Something went wrong", description: res.error || "Please try again or call us directly.", variant: "destructive" } as any);
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
    <section id="estimate" className="relative py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        {/* Section Header */}
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="h-4 w-4" />
            Free Garage Door Estimate
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Get Your Free Garage Door Quote
          </h2>
          <p className="mt-6 text-lg text-foreground leading-relaxed">
            Professional garage door estimates with transparent evaluation. No sales calls, no pressure—just honest assessment of your garage door needs.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="border-2 hover:border-primary/30 transition-all duration-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  Request Your Free Estimate
                </CardTitle>
                <p className="text-foreground">
                  Submit this form to receive a detailed evaluation of your garage door needs. We'll provide a comprehensive assessment and service recommendations.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div ref={recaptchaRef} className="hidden" />
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" autoComplete="off" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} />
                  </div>

                  {/* Service Address */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Service Address *
                    </label>
                    {mapsLoaded ? (
                      <Autocomplete
                        onLoad={(ac) => (autocompleteRef.current = ac)}
                        onPlaceChanged={() => {
                          const place = autocompleteRef.current?.getPlace?.();
                          const formatted = place?.formatted_address || address;
                          setAddress(formatted);
                        }}
                      >
                        <Input 
                          required 
                          placeholder="123 Main St, Jersey City, NJ 07302" 
                          value={address} 
                          onChange={(e) => setAddress(e.target.value)}
                          className="h-12 text-base"
                        />
                      </Autocomplete>
                    ) : (
                      <Input 
                        required 
                        placeholder="123 Main St, Jersey City, NJ 07302" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-12 text-base"
                      />
                    )}
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Wrench className="h-4 w-4 text-primary" />
                      What garage door service do you need? *
                    </label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your garage door service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((s: any) => (
                          <SelectItem key={s.slug} value={s.name}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Timeframe */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      When do you need service? *
                    </label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your preferred timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeframeOptions.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Your Name *</label>
                      <Input 
                        required 
                        placeholder="Enter your full name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                      <Input 
                        required 
                        type="tel" 
                        placeholder="(732) 555-0100" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email Address *</label>
                    <Input 
                      required 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Describe your garage door issue or project
                    </label>
                    <Textarea 
                      rows={4} 
                      placeholder="Tell us about your garage door repair needs, installation requirements, or any specific concerns..."
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-muted/15 rounded-lg">
                    <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                    <label htmlFor="consent" className="text-sm text-foreground leading-relaxed">
                      I agree to the <Link to="/privacy-policy" className="text-primary underline hover:no-underline">Privacy Policy</Link> and 
                      consent to being contacted about garage door services.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold rounded-xl"
                    disabled={submitting}
                  >
                    {submitting ? "Sending Request..." : "Get My Free Garage Door Estimate"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Call Card */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <PhoneCall className="h-6 w-6 text-primary" />
                  Need Help Right Now?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  For emergency garage door service or immediate assistance, call us directly:
                </p>
                <Button size="lg" className="w-full rounded-full text-lg font-bold" asChild>
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "estimate_sidebar", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <PhoneCall className="h-5 w-5" />
                    {siteConfig.business.phone}
                  </a>
                </Button>
                <p className="text-xs text-foreground mt-3 text-center">
                  Available 24/7 for Emergency Service
                </p>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Why Choose Our Estimates?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>100% free, no-obligation quotes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Licensed & insured professionals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Same-day service available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Satisfaction guarantee on all work</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Testimonial Card */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground mb-3 italic">
                  "Emergency garage door repair at 11pm - technician arrived quickly and had us back up and running. 
                  Professional service when we needed it most!"
                </blockquote>
                <cite className="text-xs font-semibold text-foreground">— Maria G., Englewood, NJ</cite>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  We Serve Your Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values())
                    .slice(0, 8)
                    .map((area) => (
                      <div key={area.slug} className="text-foreground">
                        {area.name}, {area.state}
                      </div>
                    ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/service-areas">View All Service Areas</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-background/80 backdrop-blur-sm border rounded-full px-8 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4 text-primary" />
              <span>24/7 Emergency Service</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Star className="h-4 w-4 text-primary fill-current" />
              <span>5.0/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateForm;