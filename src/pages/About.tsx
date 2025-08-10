import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import CompanyInfo from "@/components/sections/CompanyInfo";
import FAQ from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Sparkles, Clock, HandshakeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
const Stat = ({ value, label }: { value: string; label: string }) => (
  <Card className="text-center hover-scale">
    <CardHeader>
      <CardTitle className="text-3xl font-extrabold">{value}</CardTitle>
    </CardHeader>
    <CardContent className="text-muted-foreground text-sm">{label}</CardContent>
  </Card>
);

const ValueItem = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <Card className="h-full">
    <CardHeader className="flex-row items-center gap-3">
      <div className="rounded-full border p-2 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
  </Card>
);

const TimelineItem = ({ year, title, text }: { year: string; title: string; text: string }) => (
  <li className="relative pl-6">
    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary/80" aria-hidden="true" />
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{year}</div>
    <div className="font-semibold">{title}</div>
    <p className="text-sm text-muted-foreground mt-1">{text}</p>
  </li>
);

const About = () => {
  return (
    <div>
      <Seo title={`About ${siteConfig.business.name}`} description={`Learn about our locksmith team serving ${siteConfig.business.hqAddress.city}—licensed, insured, and trusted.`} canonical="/about" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "")}/` },
            { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "")}/about` },
          ],
        })}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero */}
        <section className="container py-16 md:py-24 animate-fade-in">
          <header className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold">About Our Locksmith Company</h1>
            <p className="mt-4 text-muted-foreground">We deliver reliable locksmith services in {siteConfig.business.hqAddress.city} with honesty, craftsmanship, and care.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Get Your Free Estimate</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </header>
        </section>

        {/* Stats */}
        <section className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="10+" label="Years in Business" />
            <Stat value="500+" label="Projects Completed" />
            <Stat value="4.9/5" label="Average Rating" />
            <Stat value="100%" label="Satisfaction Guarantee" />
          </div>
        </section>

        {/* Values */}
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold">Our Mission & Values</h2>
            <p className="mt-3 text-muted-foreground">We combine modern tools with proven methods to deliver reliable, beautiful results—every time.</p>
          </header>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <ValueItem icon={ShieldCheck} title="Quality First" desc="Certified technicians, premium materials, and detailed workmanship on every job." />
            <ValueItem icon={Sparkles} title="Clean & Respectful" desc="We protect your property, communicate clearly, and leave spaces spotless." />
            <ValueItem icon={Clock} title="On-Time & On-Budget" desc="Transparent pricing and reliable scheduling—no surprises, just results." />
          </div>
        </section>

        {/* Licensing & Guarantees (E-E-A-T) */}
        <section className="container py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Licensing & Insurance</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Licensed, bonded, and insured in {siteConfig.business.hqAddress.state}. License #: 123456 (replace). COI available on request.
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Hours & Response</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Mon–Fri {siteConfig.business.hours.mon} • Sat {siteConfig.business.hours.sat} • Sun {siteConfig.business.hours.sun}. Emergency response available.
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Satisfaction Guarantee</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                100% satisfaction guarantee on workmanship. Parts warrantied per manufacturer.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-14 md:py-20">
          <div className="grid md:grid-cols-3 gap-10">
            <article className="md:col-span-2 space-y-4 text-muted-foreground">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Our Story</h2>
              <p>
                Since day one, our focus has been helping homeowners and businesses with dependable locksmith services. From the first call to the final walkthrough, we communicate clearly and treat your property with respect.
              </p>
              <p>
                Our certified locksmiths undergo ongoing training to ensure your job is done safely, on time, and on budget.
              </p>
            </article>
            <aside className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold flex items-center gap-2"><HandshakeIcon className="h-5 w-5 text-primary" aria-hidden="true" /> Why Choose Us</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Licensed and insured</li>
                <li>• Transparent pricing</li>
                <li>• Friendly, on-time crew</li>
                <li>• Top-rated local reviews</li>
              </ul>
            </aside>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold">Milestones</h3>
              <ol className="mt-4 space-y-4 border-l pl-4">
                <TimelineItem year="2015" title={`Founded in ${siteConfig.business.hqAddress.city}`} text="Started with a mission to raise the bar for local locksmith services." />
                <TimelineItem year="2018" title="Team Expansion" text="Grew our certified locksmith crew and added new service offerings." />
                <TimelineItem year="2022" title="500th Project" text="A major milestone—earning consistent 5-star reviews from clients." />
              </ol>
            </div>
            <div>
              <h3 className="font-semibold">Credentials</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Licensed & Insured</Badge>
                <Badge variant="secondary">Background-Checked Crew</Badge>
                <Badge variant="secondary">Local & Family-Owned</Badge>
                <Badge variant="secondary">Satisfaction Guarantee</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Contact / Company Info */}
        <CompanyInfo />
      </main>
      <Footer />
    </div>
  );
};

export default About;
