import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import EstimateForm from "@/components/sections/EstimateForm";
import CompanyInfo from "@/components/sections/CompanyInfo";
import FAQ from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";
const InfoCard = ({ icon: Icon, title, children }: { icon: React.ComponentType<any>; title: string; children: React.ReactNode }) => (
  <Card className="h-full">
    <CardHeader className="flex-row items-center gap-3">
      <div className="rounded-full border p-2 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground space-y-1">{children}</CardContent>
  </Card>
);

const Contact = () => {
  const canonical = "/contact";
  const phone = siteConfig.business.phone;
  const email = siteConfig.business.email;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${email}`;
  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}${canonical}` : canonical;
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    url: pageUrl,
  };

  return (
    <div>
      <Seo title="Contact Us" description="Get in touch for a free estimate or to ask questions about our services." canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(contactLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${typeof window !== "undefined" ? window.location.origin : ""}/` },
            { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
          ],
        })}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero */}
        <section className="container py-14 md:py-20 animate-fade-in">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold">Get Expert Garage Door Service Today</h1>
            <p className="mt-4 text-muted-foreground">Fast, professional garage door repair and installation—request a free estimate or call us directly for emergency service.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <a href={telHref} aria-label="Call us now" onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "contact_hero", phone }); } catch {} }}><Phone className="h-4 w-4 mr-2" aria-hidden="true" />Call Now</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={mailHref} aria-label="Email us" onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "email_click", source: "contact_hero", email }); } catch {} }}><Mail className="h-4 w-4 mr-2" aria-hidden="true" />Email Us</a>
              </Button>
            </div>
          </header>
        </section>

        {/* Quick Contact Info */}
        <section className="container pb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard icon={Phone} title="Phone">
              <a href={telHref} className="story-link" onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "contact_info", phone }); } catch {} }}>{phone}</a>
              <p>Mon–Fri, 8am–5pm</p>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href={mailHref} className="story-link" onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "email_click", source: "contact_info", email }); } catch {} }}>{email}</a>
              <p>We reply within one business day</p>
            </InfoCard>
            <InfoCard icon={MapPin} title="Address">
              <p>{siteConfig.business.hqAddress.line1}, {siteConfig.business.hqAddress.city}, {siteConfig.business.hqAddress.state} {siteConfig.business.hqAddress.postalCode}</p>
              <p>Serving Bergen County, Hudson County, and surrounding NJ areas</p>
            </InfoCard>
            <InfoCard icon={Clock} title="Hours">
              <p>Mon–Fri: 8:00AM – 5:00PM</p>
              <p>Sat: 8:00AM – 2:00PM</p>
            </InfoCard>
          </div>
        </section>

        {/* Estimate Form */}
        <section className="container pb-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold">Get Your Free Garage Door Estimate</h2>
            <p className="mt-2 text-muted-foreground">Tell us about your garage door needs and we'll provide a clear, no‑obligation quote for repair or installation.</p>
          </div>
          <EstimateForm />
        </section>

        {/* Map, hours, contact block from CompanyInfo */}
        <CompanyInfo />

        {/* CTA */}
        <section className="container pb-16">
          <div className="rounded-lg border p-6 md:p-10 text-center bg-card">
            <h2 className="text-xl md:text-2xl font-bold">Need Emergency Garage Door Service?</h2>
            <p className="mt-2 text-muted-foreground">Call us now for 24/7 emergency garage door repair—we'll get you back up and running fast.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild>
                <a href={telHref} onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "contact_cta", phone }); } catch {} }}><Phone className="h-4 w-4 mr-2" aria-hidden="true" />Call {phone}</a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services">View Garage Door Services<ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
