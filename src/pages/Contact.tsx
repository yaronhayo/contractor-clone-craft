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
      </Helmet>
      <Header />
      <main>
        {/* Hero */}
        <section className="container py-14 md:py-20 animate-fade-in">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold">Let’s Talk About Your Project</h1>
            <p className="mt-4 text-muted-foreground">Fast, friendly help from a local team—request a free estimate or reach us directly.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <a href="tel:+18055555555" aria-label="Call us now"><Phone className="h-4 w-4 mr-2" aria-hidden="true" />Call Now</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:service@example.com" aria-label="Email us"><Mail className="h-4 w-4 mr-2" aria-hidden="true" />Email Us</a>
              </Button>
            </div>
          </header>
        </section>

        {/* Quick Contact Info */}
        <section className="container pb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard icon={Phone} title="Phone">
              <a href="tel:+18055555555" className="story-link">(805) 555-5555</a>
              <p>Mon–Fri, 8am–5pm</p>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href="mailto:service@example.com" className="story-link">service@example.com</a>
              <p>We reply within one business day</p>
            </InfoCard>
            <InfoCard icon={MapPin} title="Address">
              <p>BUSINESS ADDRESS</p>
              <p>Serving (City) and surrounding areas</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold">Request a Free Estimate</h2>
            <p className="mt-2 text-muted-foreground">Tell us about your project and we’ll follow up with a clear, no‑obligation quote.</p>
          </div>
          <EstimateForm />
        </section>

        {/* Map, hours, contact block from CompanyInfo */}
        <CompanyInfo />

        {/* CTA */}
        <section className="container pb-16">
          <div className="rounded-lg border p-6 md:p-10 text-center bg-card">
            <h2 className="text-xl md:text-2xl font-bold">Prefer to talk?</h2>
            <p className="mt-2 text-muted-foreground">Give us a quick call and we’ll answer your questions on the spot.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild>
                <a href="tel:+18055555555"><Phone className="h-4 w-4 mr-2" aria-hidden="true" />Call (805) 555-5555</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/services">Explore Services<ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" /></a>
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
