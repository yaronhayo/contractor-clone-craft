import { useState } from "react";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/components/ui/use-toast";

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
    businessName: siteConfig.business.name || "",
    businessPhone: siteConfig.business.phone || "",
    businessEmail: siteConfig.business.email || "",
    businessSiteUrl: siteConfig.business.siteUrl || "",
    seoSiteUrl: siteConfig.seo.siteUrl || "",
    mapsApiKey: siteConfig.integrations.googleMaps?.apiKey || "",
    mapsMapId: siteConfig.integrations.googleMaps?.mapId || "",
    gtmContainerId: siteConfig.integrations.gtm?.containerId || "",
    recaptchaSiteKey: siteConfig.integrations.recaptcha?.siteKey || "",
    sanityProjectId: siteConfig.integrations.sanity?.projectId || "",
    sanityDataset: siteConfig.integrations.sanity?.dataset || "production",
  });

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    const overrides = {
      business: {
        name: form.businessName,
        phone: form.businessPhone,
        email: form.businessEmail,
        siteUrl: form.businessSiteUrl,
      },
      seo: { siteUrl: form.seoSiteUrl },
      integrations: {
        googleMaps: { apiKey: form.mapsApiKey || undefined, mapId: form.mapsMapId || undefined },
        gtm: { containerId: form.gtmContainerId || undefined },
        recaptcha: { version: "v2-invisible", siteKey: form.recaptchaSiteKey || undefined },
        sanity: { projectId: form.sanityProjectId || undefined, dataset: form.sanityDataset || undefined },
      },
    };
    try {
      localStorage.setItem("siteConfigOverrides", JSON.stringify(overrides));
      toast({ title: "Settings saved", description: "Reloading to apply changes..." });
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      toast({ title: "Failed to save", description: "Please try again.", variant: "destructive" as any });
    }
  };

  const onReset = () => {
    try {
      localStorage.removeItem("siteConfigOverrides");
      toast({ title: "Reset complete", description: "Reloading to defaults..." });
      setTimeout(() => window.location.reload(), 600);
    } catch {}
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
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="seoSiteUrl">Canonical site URL</Label>
                  <Input id="seoSiteUrl" placeholder="https://www.example.com" value={form.seoSiteUrl} onChange={(e) => setForm((f) => ({ ...f, seoSiteUrl: e.target.value }))} />
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Google Tag Manager</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="gtmContainerId">Container ID</Label>
                  <Input id="gtmContainerId" placeholder="GTM-XXXXXX" value={form.gtmContainerId} onChange={(e) => setForm((f) => ({ ...f, gtmContainerId: e.target.value }))} />
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
