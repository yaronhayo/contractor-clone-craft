import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const StatusBadge = ({ ok }: { ok: boolean }) => (
  <Badge variant={ok ? "default" : "secondary"}>{ok ? "Configured" : "Missing"}</Badge>
);

const Setup = () => {
  const mapsOk = Boolean(siteConfig.integrations.googleMaps?.apiKey);
  const gtmOk = Boolean(siteConfig.integrations.gtm?.containerId);
  const recaptchaOk = Boolean(siteConfig.integrations.recaptcha?.siteKey);
  const sanityOk = Boolean(siteConfig.integrations.sanity?.projectId);

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
      </main>
    </div>
  );
};

export default Setup;
