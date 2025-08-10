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
      <Seo title={`About ${siteConfig.business.name}`} description={`Learn about our garage door experts serving Edison, Bergen County, Hudson County—licensed, insured, and trusted for all garage door needs.`} canonical="/about" />
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
            <h1 className="text-3xl md:text-5xl font-extrabold">About Pro Line Garage Experts</h1>
            <p className="mt-4 text-muted-foreground">We deliver expert garage door installation, repair, and emergency services across Edison, Bergen County, Hudson County with professional craftsmanship and 24/7 availability.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Get Your Free Garage Door Estimate</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services">Explore Garage Door Services</Link>
              </Button>
            </div>
          </header>
        </section>

        {/* Stats */}
        <section className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="10+" label="Years Serving NJ" />
            <Stat value="500+" label="Garage Doors Serviced" />
            <Stat value="4.9/5" label="Average Rating" />
            <Stat value="24/7" label="Emergency Service" />
          </div>
        </section>

        {/* Values */}
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold">Our Garage Door Service Mission</h2>
            <p className="mt-3 text-muted-foreground">We combine modern garage door technology with proven installation and repair methods to deliver safe, reliable operation—every time.</p>
          </header>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <ValueItem icon={ShieldCheck} title="Quality First" desc="Certified technicians, premium materials, and detailed workmanship on every job." />
            <ValueItem icon={Sparkles} title="Safety First" desc="All garage door work follows strict safety protocols with proper spring handling and opener installation." />
            <ValueItem icon={Clock} title="24/7 Available" desc="Emergency garage door repair available around the clock—we're here when you need us most." />
          </div>
        </section>

        {/* Licensing & Guarantees (E-E-A-T) */}
        <section className="container py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Licensed Garage Door Experts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Licensed, bonded, and insured garage door specialists in {siteConfig.business.hqAddress.state}. Certified technicians trained on all major garage door brands and systems.
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
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Our Garage Door Service Story</h2>
              <p>
                Since day one, our focus has been helping homeowners and businesses in Edison, Bergen County, and Hudson County with dependable garage door services. From emergency repairs to new installations, we communicate clearly and deliver professional results.
              </p>
              <p>
                Our certified garage door technicians undergo ongoing training on the latest garage door technology, safety protocols, and installation techniques to ensure every job is completed safely, on time, and on budget.
              </p>
            </article>
            <aside className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold flex items-center gap-2"><HandshakeIcon className="h-5 w-5 text-primary" aria-hidden="true" /> Why Choose Us</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Licensed garage door specialists</li>
                <li>• 24/7 emergency garage door service</li>
                <li>• All major garage door brands serviced</li>
                <li>• Transparent, upfront pricing</li>
                <li>• Top-rated in Bergen & Hudson counties</li>
              </ul>
            </aside>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold">Milestones</h3>
              <ol className="mt-4 space-y-4 border-l pl-4">
                <TimelineItem year="2015" title={`Founded in ${siteConfig.business.hqAddress.city}`} text="Started with a mission to raise the bar for local locksmith services." />
                <TimelineItem year="2015" title={`Founded in ${siteConfig.business.hqAddress.city}`} text="Started with a mission to provide the best garage door service in New Jersey." />
                <TimelineItem year="2018" title="Service Area Expansion" text="Extended garage door service coverage to Bergen County and Hudson County." />
                <TimelineItem year="2022" title="500th Garage Door" text="A major milestone—500 garage doors serviced with consistent 5-star reviews." />
              </ol>
            </div>
            <div>
              <h3 className="font-semibold">Credentials</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Licensed Garage Door Specialists</Badge>
                <Badge variant="secondary">24/7 Emergency Service</Badge>
                <Badge variant="secondary">All Brands Serviced</Badge>
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
