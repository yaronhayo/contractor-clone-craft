import { useState } from "react";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import LocationsImporter from "@/components/setup/LocationsImporter";
import LocationsSheetsSync from "@/components/setup/LocationsSheetsSync";

const StatusBadge = ({ ok }: { ok: boolean }) => (
  <Badge variant={ok ? "default" : "secondary"}>{ok ? "Configured" : "Missing"}</Badge>
);

const Setup = () => {
  const mapsOk = Boolean(siteConfig.integrations.googleMaps?.apiKey);
  const gtmOk = Boolean(siteConfig.integrations.gtm?.containerId);
  const recaptchaOk = Boolean(siteConfig.integrations.recaptcha?.siteKey);
  const sanityOk = Boolean(siteConfig.integrations.sanity?.projectId);

  const { toast } = useToast();
  const [form, setForm] = useState({
    // Business
    businessName: siteConfig.business.name || "",
    businessPhone: siteConfig.business.phone || "",
    businessEmail: siteConfig.business.email || "",
    businessSiteUrl: siteConfig.business.siteUrl || "",
    // Address
    addressLine1: siteConfig.business.hqAddress.line1 || "",
    addressLine2: siteConfig.business.hqAddress.line2 || "",
    addressCity: siteConfig.business.hqAddress.city || "",
    addressState: siteConfig.business.hqAddress.state || "",
    addressPostalCode: siteConfig.business.hqAddress.postalCode || "",
    addressCountry: siteConfig.business.hqAddress.country || "",
    // Hours
    hoursMon: siteConfig.business.hours.mon || "",
    hoursTue: siteConfig.business.hours.tue || "",
    hoursWed: siteConfig.business.hours.wed || "",
    hoursThu: siteConfig.business.hours.thu || "",
    hoursFri: siteConfig.business.hours.fri || "",
    hoursSat: siteConfig.business.hours.sat || "",
    hoursSun: siteConfig.business.hours.sun || "",
    // Social
    socialFacebook: siteConfig.business.social?.facebook || "",
    socialInstagram: siteConfig.business.social?.instagram || "",
    socialTwitter: siteConfig.business.social?.twitter || "",
    socialYoutube: siteConfig.business.social?.youtube || "",
    socialTiktok: siteConfig.business.social?.tiktok || "",
    socialLinkedin: siteConfig.business.social?.linkedin || "",
    socialYelp: siteConfig.business.social?.yelp || "",
    socialGoogleBusiness: siteConfig.business.social?.googleBusiness || "",
    // Branding colors (HSL strings)
    brandingPrimary: siteConfig.business.branding.colors.primary || "",
    brandingSecondary: siteConfig.business.branding.colors.secondary || "",
    brandingAccent: siteConfig.business.branding.colors.accent || "",
    // SEO
    seoSiteUrl: siteConfig.seo.siteUrl || "",
    seoDefaultTitle: siteConfig.seo.defaultTitle || "",
    seoDefaultDescription: siteConfig.seo.defaultDescription || "",
    // Google Maps
    mapsApiKey: siteConfig.integrations.googleMaps?.apiKey || "",
    mapsMapId: siteConfig.integrations.googleMaps?.mapId || "",
    mapsDefaultCenterLat: String(siteConfig.integrations.googleMaps?.defaultCenter?.lat ?? ""),
    mapsDefaultCenterLng: String(siteConfig.integrations.googleMaps?.defaultCenter?.lng ?? ""),
    mapsDefaultZoom: String(siteConfig.integrations.googleMaps?.defaultZoom ?? ""),
    // GTM
    gtmContainerId: siteConfig.integrations.gtm?.containerId || "",
    gtmDataLayerName: siteConfig.integrations.gtm?.dataLayerName || "dataLayer",
    // reCAPTCHA
    recaptchaSiteKey: siteConfig.integrations.recaptcha?.siteKey || "",
    // Sanity
    sanityProjectId: siteConfig.integrations.sanity?.projectId || "",
    sanityDataset: siteConfig.integrations.sanity?.dataset || "production",
    sanityApiVersion: siteConfig.integrations.sanity?.apiVersion || "2024-10-01",
    sanityUseCdn: typeof siteConfig.integrations.sanity?.useCdn === "boolean" ? Boolean(siteConfig.integrations.sanity?.useCdn) : true,
    // Freepik
    freepikAttribution: siteConfig.integrations.freepik?.defaultAttribution || "",
    freepikProfileUrl: siteConfig.integrations.freepik?.profileUrl || "",
    // Integrations (optional)
    zapierWebhookUrl: (siteConfig as any).integrations?.zapier?.webhookUrl || "",
    // Locations & Service Areas (JSON)
    locationsJson: JSON.stringify(siteConfig.locations, null, 2),
  });

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    const overrides = {
      business: {
        name: form.businessName,
        phone: form.businessPhone,
        email: form.businessEmail,
        siteUrl: form.businessSiteUrl,
        hqAddress: {
          line1: form.addressLine1,
          line2: form.addressLine2 || undefined,
          city: form.addressCity,
          state: form.addressState,
          postalCode: form.addressPostalCode,
          country: form.addressCountry || undefined,
        },
        hours: {
          mon: form.hoursMon,
          tue: form.hoursTue,
          wed: form.hoursWed,
          thu: form.hoursThu,
          fri: form.hoursFri,
          sat: form.hoursSat,
          sun: form.hoursSun,
        },
        social: {
          facebook: form.socialFacebook || undefined,
          instagram: form.socialInstagram || undefined,
          twitter: form.socialTwitter || undefined,
          youtube: form.socialYoutube || undefined,
          tiktok: form.socialTiktok || undefined,
          linkedin: form.socialLinkedin || undefined,
          yelp: form.socialYelp || undefined,
          googleBusiness: form.socialGoogleBusiness || undefined,
        },
        branding: {
          colors: {
            primary: form.brandingPrimary,
            secondary: form.brandingSecondary,
            accent: form.brandingAccent,
          },
          logos: siteConfig.business.branding.logos,
          favicon: siteConfig.business.branding.favicon,
        },
      },
      seo: {
        siteUrl: form.seoSiteUrl,
        defaultTitle: form.seoDefaultTitle,
        defaultDescription: form.seoDefaultDescription,
      },
      integrations: {
        googleMaps: {
          apiKey: form.mapsApiKey || undefined,
          mapId: form.mapsMapId || undefined,
          defaultCenter: {
            lat: form.mapsDefaultCenterLat ? parseFloat(form.mapsDefaultCenterLat) : undefined as any,
            lng: form.mapsDefaultCenterLng ? parseFloat(form.mapsDefaultCenterLng) : undefined as any,
          },
          defaultZoom: form.mapsDefaultZoom ? parseInt(form.mapsDefaultZoom) : undefined as any,
        },
        gtm: { containerId: form.gtmContainerId || undefined, dataLayerName: form.gtmDataLayerName || undefined },
        recaptcha: { version: "v2-invisible", siteKey: form.recaptchaSiteKey || undefined },
        sanity: { projectId: form.sanityProjectId || undefined, dataset: form.sanityDataset || undefined, apiVersion: form.sanityApiVersion || undefined, useCdn: form.sanityUseCdn },
        freepik: { defaultAttribution: form.freepikAttribution || undefined, profileUrl: form.freepikProfileUrl || undefined },
        ...(form.zapierWebhookUrl ? { zapier: { webhookUrl: form.zapierWebhookUrl } } : {}),
      },
    };
    try {
      let locationsOverride: any[] | undefined = undefined;
      try {
        const parsed = JSON.parse(form.locationsJson || "[]");
        if (Array.isArray(parsed)) locationsOverride = parsed;
      } catch {}
      if (locationsOverride) (overrides as any).locations = locationsOverride;

      localStorage.setItem("siteConfigOverrides", JSON.stringify(overrides));
      toast({ title: "Settings saved", description: "Reloading to apply changes..." });
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      toast({ title: "Failed to save", description: "Please check your Locations JSON and try again.", variant: "destructive" as any });
    }
  };

  const onReset = () => {
    try {
      localStorage.removeItem("siteConfigOverrides");
      toast({ title: "Reset complete", description: "Reloading to defaults..." });
      setTimeout(() => window.location.reload(), 600);
    } catch {}
  };

  const handleTestEmail = async () => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "test", name: "Setup Test", pageUrl: window.location.href }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      toast({ title: "Test email sent", description: "Check your EMAIL_TO inbox (server env)." });
    } catch (e: any) {
      toast({ title: "Email test failed", description: e?.message || "Missing server secrets?", variant: "destructive" as any });
    }
  };

  const handleTriggerZapierWebhook = async () => {
    if (!form.zapierWebhookUrl) {
      toast({ title: "Missing URL", description: "Enter your Zapier webhook URL.", variant: "destructive" as any });
      return;
    }
    try {
      await fetch(form.zapierWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({ timestamp: new Date().toISOString(), triggered_from: window.location.origin, type: "setup_test" }),
      });
      toast({ title: "Request Sent", description: "Check Zap history to confirm it triggered." });
    } catch (e: any) {
      toast({ title: "Webhook failed", description: e?.message || "Unable to reach Zapier", variant: "destructive" as any });
    }
  };

  return (
    <div>
      <Seo
        title="Project Setup Checklist"
        description="Project setup checklist for this template: configure brand details, Google Maps, GTM, and reCAPTCHA."
        canonical="/setup"
      />

      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main id="content" className="container py-14 md:py-20">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold">Project Setup Checklist</h1>
          <p className="mt-3 text-muted-foreground">
            Use this checklist for each Vercel project (single-brand). Edit values in <code>src/config/site-config.ts</code>.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Full launch steps are documented in <code>docs/launch-checklist.md</code> inside your repo.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Brand & Business Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Business name, phone, email</span>
                <StatusBadge ok={Boolean(siteConfig.business?.name && siteConfig.business?.phone && siteConfig.business?.email)} />
              </div>
              <div className="flex items-center justify-between">
                <span>Logo & hero images</span>
                <StatusBadge ok={Boolean((siteConfig.business?.branding?.logos?.light || siteConfig.business?.branding?.logos?.dark) && siteConfig.media?.hero)} />
              </div>
              <p className="text-sm text-muted-foreground">
                Update the business details, media, and service taxonomy to match the company.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Maps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Maps JavaScript API key</span>
                <StatusBadge ok={mapsOk} />
              </div>
              <p className="text-sm text-muted-foreground">
                Set <code>integrations.googleMaps.apiKey</code> and optionally <code>mapId</code>, <code>defaultCenter</code>, <code>defaultZoom</code>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Tag Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>GTM container ID</span>
                <StatusBadge ok={gtmOk} />
              </div>
              <p className="text-sm text-muted-foreground">
                Set <code>integrations.gtm.containerId</code>. DataLayer name defaults to <code>dataLayer</code>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>reCAPTCHA v2 Invisible</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Site key</span>
                <StatusBadge ok={recaptchaOk} />
              </div>
              <p className="text-sm text-muted-foreground">
                Set <code>integrations.recaptcha.siteKey</code>. The Estimate form will auto-execute when present.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO & Sitemap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Canonical site URL</span>
                <StatusBadge ok={Boolean(siteConfig.seo.siteUrl)} />
              </div>
              <p className="text-sm text-muted-foreground">
                Set <code>seo.siteUrl</code>. We generated <code>/sitemap.xml</code> and you can add it to <code>/public/robots.txt</code>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sanity (optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Project ID & dataset</span>
                <StatusBadge ok={sanityOk} />
              </div>
              <p className="text-sm text-muted-foreground">
                Set <code>integrations.sanity.projectId</code> and <code>dataset</code> if using CMS-driven content.
              </p>
            </CardContent>
          </Card>
        </section>

        <article className="mt-10 prose prose-neutral max-w-none dark:prose-invert">
          <h2>Where to configure</h2>
          <ul>
            <li>
              Publishable keys (Maps, GTM, reCAPTCHA) are stored in <code>src/config/site-config.ts</code> per Vercel project.
            </li>
            <li>
              If you later add server-side functions (e.g., email sending), keep secrets in your Vercel Project Settings → Environment Variables.
            </li>
          </ul>
        </article>

        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold">Configure Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">These are publishable keys and basic business settings. Values are saved in your browser and applied across the site.</p>
          <form onSubmit={onSave} className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="businessName">Business name</Label>
                  <Input id="businessName" value={form.businessName} onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="businessPhone">Phone</Label>
                  <Input id="businessPhone" value={form.businessPhone} onChange={(e) => setForm((f) => ({ ...f, businessPhone: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="businessEmail">Email</Label>
                  <Input id="businessEmail" type="email" value={form.businessEmail} onChange={(e) => setForm((f) => ({ ...f, businessEmail: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="businessSiteUrl">Business site URL</Label>
                  <Input id="businessSiteUrl" placeholder="https://www.example.com" value={form.businessSiteUrl} onChange={(e) => setForm((f) => ({ ...f, businessSiteUrl: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address & Hours</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="addressLine1">Address line 1</Label>
                    <Input id="addressLine1" value={form.addressLine1} onChange={(e) => setForm((f) => ({ ...f, addressLine1: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="addressLine2">Address line 2 (optional)</Label>
                    <Input id="addressLine2" value={form.addressLine2} onChange={(e) => setForm((f) => ({ ...f, addressLine2: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="addressCity">City</Label>
                    <Input id="addressCity" value={form.addressCity} onChange={(e) => setForm((f) => ({ ...f, addressCity: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="addressState">State</Label>
                    <Input id="addressState" value={form.addressState} onChange={(e) => setForm((f) => ({ ...f, addressState: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="addressPostalCode">Postal code</Label>
                    <Input id="addressPostalCode" value={form.addressPostalCode} onChange={(e) => setForm((f) => ({ ...f, addressPostalCode: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="addressCountry">Country</Label>
                    <Input id="addressCountry" value={form.addressCountry} onChange={(e) => setForm((f) => ({ ...f, addressCountry: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Business hours</p>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="hoursMon">Mon</Label>
                      <Input id="hoursMon" value={form.hoursMon} onChange={(e) => setForm((f) => ({ ...f, hoursMon: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hoursTue">Tue</Label>
                      <Input id="hoursTue" value={form.hoursTue} onChange={(e) => setForm((f) => ({ ...f, hoursTue: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hoursWed">Wed</Label>
                      <Input id="hoursWed" value={form.hoursWed} onChange={(e) => setForm((f) => ({ ...f, hoursWed: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hoursThu">Thu</Label>
                      <Input id="hoursThu" value={form.hoursThu} onChange={(e) => setForm((f) => ({ ...f, hoursThu: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hoursFri">Fri</Label>
                      <Input id="hoursFri" value={form.hoursFri} onChange={(e) => setForm((f) => ({ ...f, hoursFri: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hoursSat">Sat</Label>
                      <Input id="hoursSat" value={form.hoursSat} onChange={(e) => setForm((f) => ({ ...f, hoursSat: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hoursSun">Sun</Label>
                      <Input id="hoursSun" value={form.hoursSun} onChange={(e) => setForm((f) => ({ ...f, hoursSun: e.target.value }))} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Profiles</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="socialFacebook">Facebook</Label>
                  <Input id="socialFacebook" placeholder="https://facebook.com/yourpage" value={form.socialFacebook} onChange={(e) => setForm((f) => ({ ...f, socialFacebook: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialInstagram">Instagram</Label>
                  <Input id="socialInstagram" placeholder="https://instagram.com/yourprofile" value={form.socialInstagram} onChange={(e) => setForm((f) => ({ ...f, socialInstagram: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialTwitter">Twitter / X</Label>
                  <Input id="socialTwitter" placeholder="https://x.com/yourhandle" value={form.socialTwitter} onChange={(e) => setForm((f) => ({ ...f, socialTwitter: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialYoutube">YouTube</Label>
                  <Input id="socialYoutube" placeholder="https://youtube.com/@yourchannel" value={form.socialYoutube} onChange={(e) => setForm((f) => ({ ...f, socialYoutube: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialTiktok">TikTok</Label>
                  <Input id="socialTiktok" placeholder="https://tiktok.com/@yourhandle" value={form.socialTiktok} onChange={(e) => setForm((f) => ({ ...f, socialTiktok: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialLinkedin">LinkedIn</Label>
                  <Input id="socialLinkedin" placeholder="https://linkedin.com/company/yourcompany" value={form.socialLinkedin} onChange={(e) => setForm((f) => ({ ...f, socialLinkedin: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialYelp">Yelp</Label>
                  <Input id="socialYelp" placeholder="https://yelp.com/biz/yourbiz" value={form.socialYelp} onChange={(e) => setForm((f) => ({ ...f, socialYelp: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="socialGoogleBusiness">Google Business Profile</Label>
                  <Input id="socialGoogleBusiness" placeholder="https://g.page/yourplace" value={form.socialGoogleBusiness} onChange={(e) => setForm((f) => ({ ...f, socialGoogleBusiness: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding Colors (HSL)</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <p className="md:col-span-3 text-sm text-muted-foreground">These map to the design system tokens. Use HSL like "222.2 47.4% 11.2%".</p>
                <div className="space-y-1">
                  <Label htmlFor="brandingPrimary">Primary</Label>
                  <Input id="brandingPrimary" placeholder="e.g. 222.2 47.4% 11.2%" value={form.brandingPrimary} onChange={(e) => setForm((f) => ({ ...f, brandingPrimary: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="brandingSecondary">Secondary</Label>
                  <Input id="brandingSecondary" placeholder="e.g. 210 40% 96%" value={form.brandingSecondary} onChange={(e) => setForm((f) => ({ ...f, brandingSecondary: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="brandingAccent">Accent</Label>
                  <Input id="brandingAccent" placeholder="e.g. 142.1 76.2% 36.3%" value={form.brandingAccent} onChange={(e) => setForm((f) => ({ ...f, brandingAccent: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attribution (Freepik)</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="freepikAttribution">Default attribution text</Label>
                  <Input id="freepikAttribution" value={form.freepikAttribution} onChange={(e) => setForm((f) => ({ ...f, freepikAttribution: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="freepikProfileUrl">Profile URL</Label>
                  <Input id="freepikProfileUrl" placeholder="https://www.freepik.com/author/yourname" value={form.freepikProfileUrl} onChange={(e) => setForm((f) => ({ ...f, freepikProfileUrl: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="seoSiteUrl">Canonical site URL</Label>
                  <Input id="seoSiteUrl" placeholder="https://www.example.com" value={form.seoSiteUrl} onChange={(e) => setForm((f) => ({ ...f, seoSiteUrl: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="seoDefaultTitle">Default title</Label>
                  <Input id="seoDefaultTitle" value={form.seoDefaultTitle} onChange={(e) => setForm((f) => ({ ...f, seoDefaultTitle: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="seoDefaultDescription">Default description</Label>
                  <Textarea id="seoDefaultDescription" rows={4} value={form.seoDefaultDescription} onChange={(e) => setForm((f) => ({ ...f, seoDefaultDescription: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Google Maps</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="mapsApiKey">Maps API key</Label>
                  <Input id="mapsApiKey" value={form.mapsApiKey} onChange={(e) => setForm((f) => ({ ...f, mapsApiKey: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mapsMapId">Map ID (optional)</Label>
                  <Input id="mapsMapId" value={form.mapsMapId} onChange={(e) => setForm((f) => ({ ...f, mapsMapId: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mapsDefaultCenterLat">Default center lat</Label>
                  <Input id="mapsDefaultCenterLat" type="number" step="any" value={form.mapsDefaultCenterLat} onChange={(e) => setForm((f) => ({ ...f, mapsDefaultCenterLat: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mapsDefaultCenterLng">Default center lng</Label>
                  <Input id="mapsDefaultCenterLng" type="number" step="any" value={form.mapsDefaultCenterLng} onChange={(e) => setForm((f) => ({ ...f, mapsDefaultCenterLng: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mapsDefaultZoom">Default zoom</Label>
                  <Input id="mapsDefaultZoom" type="number" value={form.mapsDefaultZoom} onChange={(e) => setForm((f) => ({ ...f, mapsDefaultZoom: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Google Tag Manager</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-1">
                  <Label htmlFor="gtmContainerId">Container ID</Label>
                  <Input id="gtmContainerId" placeholder="GTM-XXXXXX" value={form.gtmContainerId} onChange={(e) => setForm((f) => ({ ...f, gtmContainerId: e.target.value }))} />
                </div>
                <div className="space-y-1 md:col-span-1">
                  <Label htmlFor="gtmDataLayerName">Data layer name</Label>
                  <Input id="gtmDataLayerName" placeholder="dataLayer" value={form.gtmDataLayerName} onChange={(e) => setForm((f) => ({ ...f, gtmDataLayerName: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>reCAPTCHA</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="recaptchaSiteKey">Site key</Label>
                  <Input id="recaptchaSiteKey" value={form.recaptchaSiteKey} onChange={(e) => setForm((f) => ({ ...f, recaptchaSiteKey: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sanity (optional)</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="sanityProjectId">Project ID</Label>
                  <Input id="sanityProjectId" value={form.sanityProjectId} onChange={(e) => setForm((f) => ({ ...f, sanityProjectId: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="sanityDataset">Dataset</Label>
                  <Input id="sanityDataset" value={form.sanityDataset} onChange={(e) => setForm((f) => ({ ...f, sanityDataset: e.target.value }))} />
                </div>
                <div className="space-y-1 md:col-span-1">
                  <Label htmlFor="sanityApiVersion">API version</Label>
                  <Input id="sanityApiVersion" placeholder="2024-10-01" value={form.sanityApiVersion} onChange={(e) => setForm((f) => ({ ...f, sanityApiVersion: e.target.value }))} />
                </div>
                <div className="flex items-center gap-3 md:col-span-1">
                  <Switch id="sanityUseCdn" checked={!!form.sanityUseCdn} onCheckedChange={(checked) => setForm((f) => ({ ...f, sanityUseCdn: Boolean(checked) }))} />
                  <Label htmlFor="sanityUseCdn">Use CDN (faster, cacheable)</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Locations & Service Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Edit the locations array used across the site. This supports nested serviceAreas per location. Changes apply instantly after saving.</p>
                <div className="space-y-1">
                  <Label htmlFor="locationsJson">Locations JSON</Label>
                  <Textarea id="locationsJson" rows={12} value={form.locationsJson} onChange={(e) => setForm((f) => ({ ...f, locationsJson: e.target.value }))} />
                </div>
                <p className="text-xs text-muted-foreground">Tip: Keep a backup. Each location requires id, name, slug, phone, address, geo, hours, and serviceAreas[].</p>
              </CardContent>
            </Card>

            <LocationsImporter
              existingLocations={(() => { try { return JSON.parse(form.locationsJson || "[]"); } catch { return []; } })()}
              onMerge={(locs) => setForm((f) => ({ ...f, locationsJson: JSON.stringify(locs, null, 2) }))}
            />

            <LocationsSheetsSync
              existingLocations={(() => { try { return JSON.parse(form.locationsJson || "[]"); } catch { return []; } })()}
              onMerge={(locs) => setForm((f) => ({ ...f, locationsJson: JSON.stringify(locs, null, 2) }))}
            />

            <Card>
              <CardHeader>
                <CardTitle>Server Email (Resend) & Secrets</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <p className="text-sm text-muted-foreground">Private keys must be set in your hosting env (e.g., RESEND_API_KEY, EMAIL_FROM, EMAIL_TO). Use this to send a test message via /api/send-email.</p>
                <div>
                  <Button type="button" onClick={handleTestEmail}>Send test email</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zapier Webhook (optional)</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-3 items-end">
                <div className="md:col-span-2 space-y-1">
                  <Label htmlFor="zapierWebhookUrl">Webhook URL</Label>
                  <Input id="zapierWebhookUrl" placeholder="https://hooks.zapier.com/hooks/catch/..." value={form.zapierWebhookUrl} onChange={(e) => setForm((f) => ({ ...f, zapierWebhookUrl: e.target.value }))} />
                </div>
                <div>
                  <Button type="button" variant="outline" onClick={handleTriggerZapierWebhook}>Send test event</Button>
                </div>
                <p className="text-xs text-muted-foreground md:col-span-3">We store this URL in browser only. Forms can be wired later to POST to this webhook.</p>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="outline" onClick={onReset}>Reset to defaults</Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Setup;
