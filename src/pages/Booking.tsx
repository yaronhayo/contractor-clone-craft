import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import EstimateForm from "@/components/sections/EstimateForm";
import ReviewsTeaser from "@/components/sections/ReviewsTeaser";
import FAQ from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Star, 
  Calendar,
  PhoneCall,
  Wrench,
  Award
} from "lucide-react";
import { siteConfig } from "@/config/site-config";
import { Link } from "react-router-dom";

const ProcessStep = ({ number, icon: Icon, title, description }: {
  number: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="relative mb-4">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
        <span className="text-primary-foreground font-bold text-lg">{number}</span>
      </div>
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto -mt-14 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-foreground/80 text-sm leading-relaxed">{description}</p>
  </div>
);

const Booking = () => {
  const canonical = "/booking";
  const phone = siteConfig.business.phone;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}${canonical}` : canonical;
  
  const bookingLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Book Garage Door Service",
    url: pageUrl,
    description: "Schedule professional garage door repair and installation service online. Free estimates, same-day service available.",
  };

  return (
    <div>
      <Seo 
        title="Book Garage Door Service Online - Free Estimate" 
        description="Schedule your garage door service online. Free estimates, same-day service, 10-year warranty. Professional repair and installation in Elmwood Park, NJ." 
        canonical={canonical} 
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(bookingLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${typeof window !== "undefined" ? window.location.origin : ""}/` },
            { "@type": "ListItem", position: 2, name: "Book Service", item: pageUrl },
          ],
        })}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.1),transparent)]" />
          
          <div className="relative container">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Calendar className="h-4 w-4" />
                Book Your Service
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
                Schedule Your Garage Door Service
                <span className="block text-primary mt-2">Fast, Easy & Professional</span>
              </h1>
              
              <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto mb-8">
                Get your garage door fixed by licensed professionals. Same-day service available, 
                10-year warranty included, and upfront pricing with no surprises.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span>5.0/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Same Day Service</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Award className="h-4 w-4 text-primary" />
                  <span>10 Year Warranty</span>
                </div>
              </div>

              {/* Emergency Call Button */}
              <div className="mb-12">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                  <a href={telHref} onClick={() => {
                    try {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({ event: "phone_click", source: "booking_hero", phone });
                    } catch {}
                  }}>
                    <PhoneCall className="h-5 w-5 mr-2" />
                    Need Emergency Service? Call {phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <EstimateForm />
          </div>
        </section>

        {/* How Online Booking Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                How Online Booking Works
              </h2>
              <p className="text-lg text-foreground/80">
                Simple, fast, and convenient. Get your garage door service scheduled in just a few clicks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <ProcessStep
                number="1"
                icon={Calendar}
                title="Fill Out Form"
                description="Tell us about your garage door issue and when you'd like service. Takes less than 2 minutes."
              />
              <ProcessStep
                number="2"
                icon={PhoneCall}
                title="We Call You"
                description="Our team contacts you within 15 minutes to confirm details and provide upfront pricing."
              />
              <ProcessStep
                number="3"
                icon={Wrench}
                title="Service Completed"
                description="Licensed technician arrives on time with quality parts to fix your garage door professionally."
              />
            </div>
          </div>
        </section>

        {/* Why Book Online Benefits */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Why Book Online?
              </h2>
              <p className="text-lg text-foreground/80">
                Enjoy these exclusive benefits when you schedule your garage door service through our website.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Faster Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Online requests are processed immediately. We'll contact you within 15 minutes during business hours.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Flexible Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Choose your preferred time slot and we'll work around your schedule for maximum convenience.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Service Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">All online bookings come with our 100% satisfaction guarantee and 10-year warranty on parts.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Customer Reviews */}
        <ReviewsTeaser />

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Schedule Your Service?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Join hundreds of satisfied customers who trust us with their garage door needs. 
                Professional service, guaranteed results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="rounded-full px-8 py-4 text-lg font-semibold" asChild>
                  <Link to="#content">
                    Book Service Now <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300" asChild>
                  <a href={telHref} onClick={() => {
                    try {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({ event: "phone_click", source: "booking_final_cta", phone });
                    } catch {}
                  }}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call {phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;