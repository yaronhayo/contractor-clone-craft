import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Clock, Shield, CheckCircle2, Star, Phone, Zap, Award, Settings, AlertTriangle, MapPin, HelpCircle, Calculator } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Services from "@/components/sections/Services";


const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const serviceIcons = {
    "garage-door-spring-repair": Zap,
    "garage-door-repair": Wrench,
    "garage-door-installation": Award,
    "garage-door-opener-repair": Settings,
    "emergency-garage-door-repair": AlertTriangle,
    "commercial-garage-door-service": Shield,
  };
  
  const ServiceIcon = serviceIcons[service.slug as keyof typeof serviceIcons] || Wrench;
  
  return (
    <article 
      className={`group relative animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
      <Link to={siteConfig.routes.individualService(service.slug)} className="block">
        <div className="relative bg-background border-2 rounded-2xl p-8 h-full text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
            <ServiceIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
            {service.name}
          </h3>
          <p className="text-foreground mb-4 leading-relaxed">
            {service.shortDescription || "Professional garage door service with expert technicians."}
          </p>
          <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </article>
  );
};

const ServicesHub = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Garage Door Services",
    itemListElement: siteConfig.taxonomy.services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteUrl}${siteConfig.routes.individualService(s.categorySlug, s.slug)}`,
    })),
  };

  return (
    <div>
      <Seo 
        title="Professional Garage Door Services Bergen County NJ | #1 Rated Contractor | ez2fix LLC"
        description="⭐ Comprehensive garage door services in Bergen County NJ | Emergency repair, spring replacement, opener service, new installations | 12+ years experience, Licensed NJ contractor (#13VH09315400), $2M insured | Serving 25+ communities | Same-day service | Call (201) 554-6769"
        canonical="/services" 
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] bg-gradient-to-br from-secondary via-gray-800 to-foreground flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.15),transparent)]" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          
          <div className="relative container">
            <nav aria-label="Breadcrumb" className="text-sm text-white mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
              <span className="mx-2">/</span> 
              <span className="text-white font-medium">All Services</span>
            </nav>
            
            <header className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Wrench className="h-4 w-4" />
                Bergen County's #1 Rated Garage Door Company
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                Professional Garage Door Services
                <span className="block text-primary">Bergen & Hudson County, NJ</span>
              </h1>
              <p className="mt-6 text-lg text-white leading-relaxed max-w-3xl mx-auto">
                <strong>Trusted by 3,000+ homeowners across Northern New Jersey since 2012.</strong> Licensed NJ contractor (#13VH09315400) specializing in emergency repairs, spring replacements, opener service, and premium door installations. Serving Elmwood Park, Jersey City, Fair Lawn, Montclair, and 20+ communities with same-day service.
              </p>
              
              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="text-sm font-semibold text-white">3,000+ Jobs Completed</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-semibold text-white">Licensed NJ Contractor</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-white">10-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-white">24/7 Emergency Service</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "services_hero", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-4 text-lg font-bold border-2 border-muted text-foreground bg-background hover:bg-muted hover:text-foreground transition-all duration-300"
                  onClick={() => {
                    const bookingSection = document.getElementById('booking-form');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Get Free Estimate
                </Button>
              </div>
            </header>
          </div>
        </section>

        {/* Featured Services Section with Images */}
        <Services />


        {/* How It Works Section */}
        <section className="relative py-16 md:py-24 bg-background overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(234,158,37,0.1),transparent)]" />
          
          <div className="relative container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Wrench className="h-4 w-4" />
                Proven Service Process
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Why Elmwood Park Homeowners Choose Our Garage Door Service
              </h2>
              <p className="mt-4 text-lg text-foreground leading-relaxed">
                <strong>Tired of unreliable garage door companies?</strong> Our proven 4-step process has delivered perfect results for 500+ Bergen County families. No surprises, no delays, no excuses—just professional garage door service you can trust.
              </p>
            </header>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  icon: Phone,
                  title: "Emergency Response",
                  description: "Garage door stuck? Call our emergency line and speak directly to a licensed technician—not a call center. We diagnose your problem over the phone and dispatch immediate help.",
                  time: "Real technician answers"
                },
                {
                  number: "02", 
                  icon: Clock,
                  title: "Fully-Equipped Arrival",
                  description: "Our master technician arrives with a fully-stocked van containing parts for all major garage door brands. No waiting for parts orders—we fix most problems on the first visit.",
                  time: "Parts on board"
                },
                {
                  number: "03",
                  icon: Wrench,
                  title: "Master Craftsmanship",
                  description: "Watch our licensed specialist work. We explain what went wrong, show you the damaged components, and demonstrate the repair. No hidden problems, no surprise charges.",
                  time: "Transparent process"
                },
                {
                  number: "04",
                  icon: CheckCircle2,
                  title: "Lifetime Confidence",
                  description: "Before leaving, we test your door's safety systems, program remotes, and provide our industry-leading warranty. You're protected for years—not just weeks like other companies.",
                  time: "Long-term protection"
                }
              ].map((step, index) => (
                <div key={index} className={`relative group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="relative bg-background border-2 rounded-2xl p-6 pb-16 h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-center">
                    {/* Step Number Badge - made bigger */}
                    <div className="absolute -top-4 left-8 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-base">
                      {step.number}
                    </div>
                    
                    {/* Icon - centered */}
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    {/* Content - centered */}
                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-foreground text-sm mb-6 leading-relaxed">{step.description}</p>
                    
                    {/* Time Indicator - moved to bottom center */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-xs">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="font-medium text-foreground">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services FAQ Section */}
        <section className="container py-16 md:py-24">
          <header className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Expert Answers from Licensed Garage Door Professionals
            </h2>
            <p className="mt-4 text-lg text-foreground leading-relaxed">
              Get authoritative answers from our master-certified technicians with over 10 years experience servicing garage doors throughout Bergen County, New Jersey.
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "What areas do you serve for garage door services?",
                  a: "As licensed NJ contractors (#13VH13553300), we serve Elmwood Park, Montclair, Fair Lawn, Little Falls, Cedar Grove, West Caldwell, North Caldwell, and all surrounding Bergen County communities. Our service area covers a 25-mile radius from our Elmwood Park headquarters, ensuring compliance with local building codes and regulations."
                },
                {
                  q: "Are your garage door technicians properly licensed and qualified?",
                  a: "Absolutely. All our technicians hold current NJ contractor licenses, are factory-certified on major brands (LiftMaster, Chamberlain, Genie), and carry $1,000,000 liability insurance. Unlike unlicensed handymen, we're legally qualified and financially protected to work on your property. Our lead technician has over 15 years of garage door experience."
                },
                {
                  q: "What types of garage door problems do you specialize in?",
                  a: "Our licensed specialists handle all garage door issues: broken springs (high-tension and extension), malfunctioning openers (belt, chain, screw drive), track realignment, panel replacement, weather stripping, and complete installations. We service all major brands and have completed over 500 successful repairs since 2015 with zero safety incidents."
                },
                {
                  q: "How do you ensure garage door safety during repairs?",
                  a: "Garage door springs contain 400+ pounds of tension and can cause serious injury if mishandled. Our licensed technicians follow strict OSHA safety protocols, use professional-grade tools, and perform comprehensive safety inspections on all repairs. We test photo-eye sensors, force settings, and emergency release mechanisms to ensure your family's safety."
                },
                {
                  q: "What warranty coverage do you provide on garage door repairs?",
                  a: "We stand behind our work with comprehensive warranty coverage: 10 years on garage door installations, 5 years on major component replacements (springs, openers), and 2 years on service calls. This exceeds industry standards because we use premium parts and employ master-certified technicians. Your investment is protected."
                },
                {
                  q: "Why should I choose a licensed contractor over a handyman for garage door work?",
                  a: "Licensed contractors must meet strict state requirements: passing trade exams, carrying insurance, following building codes, and maintaining continuing education. Unlicensed work can void your homeowner's insurance, fail safety inspections, and create liability issues. As NJ License #13VH13553300 holders, we ensure code compliance and professional accountability."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-foreground mb-6">Get expert answers to all your garage door questions and concerns.</p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
                <Link to="/faq">
                  <HelpCircle className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Browse All FAQs
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Reviews Section */}
        <section className="relative py-16 md:py-24 bg-background overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,158,37,0.1),transparent)]" />
          
          <div className="relative container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Star className="h-4 w-4 fill-current" />
                Customer Reviews
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-lg text-foreground leading-relaxed">
                Real reviews from satisfied customers across Englewood, Fort Lee, and surrounding areas.
              </p>
            </header>

            {/* Overall Rating Display */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-6 bg-background/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-1">5.0</div>
                  <div className="flex items-center gap-1 mb-1 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-primary fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-foreground">Average Rating</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-1">Zero</div>
                  <div className="text-sm text-foreground">Safety Incidents</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-sm font-extrabold text-primary mb-1">NJ Licensed</div>
                  <div className="text-sm text-foreground">#13VH13553300</div>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  rating: 5,
                  text: "Garage door spring snapped on Sunday morning with my car trapped inside. ez2fix arrived quickly and replaced both springs safely. The technician explained everything and showed me how to prevent future problems. True professionals!",
                  author: "Michael R.",
                  location: "Elmwood Park, NJ",
                  service: "Emergency Spring Repair"
                },
                {
                  rating: 5,
                  text: "After getting three quotes, ez2fix wasn't the cheapest but they were the ONLY licensed contractor with proper insurance. Six months later when my neighbor's discount installation started failing, I knew I chose right. Quality matters!",
                  author: "Sarah L.",
                  location: "Montclair, NJ", 
                  service: "Garage Door Installation"
                },
                {
                  rating: 5,
                  text: "Garage door opener started grinding loudly. Instead of trying to sell me a new unit like other companies, ez2fix's technician cleaned and adjusted it properly. Six months later, still working perfectly. Honest service!",
                  author: "David K.",
                  location: "Fair Lawn, NJ",
                  service: "Opener Repair"
                }
              ].map((review, index) => (
                <div key={index} className={`group animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="bg-background border-2 rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors">
                      "{review.text}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <cite className="font-semibold text-foreground not-italic">{review.author}</cite>
                      <div className="text-sm text-foreground">{review.location} • {review.service}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                <Link to="/reviews">
                  Read All Reviews <Star className="h-4 w-4 ml-2 fill-current" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-form" className="relative py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calculator className="h-4 w-4" />
                Licensed NJ Contractors
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Get Your FREE Garage Door Safety Inspection
              </h2>
              <p className="mt-4 text-lg text-foreground leading-relaxed">
                <strong>Garage door springs contain 400+ pounds of tension</strong> and can cause serious injury if they fail unexpectedly. Our licensed technicians provide FREE safety inspections to identify problems before they become dangerous. Simply fill out this form to schedule yours.
              </p>
            </header>

            <div className="max-w-2xl mx-auto">
              <div className="bg-background border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
                <form className="space-y-6">
                  {/* Contact Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Your Name *</label>
                      <Input 
                        required 
                        placeholder="Enter your full name" 
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                      <Input 
                        required 
                        type="tel" 
                        placeholder="(551) 250-5665" 
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
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Service Address */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Service Address *
                    </label>
                    <Input 
                      required 
                      placeholder="123 Main St, Elmwood Park, NJ 07407" 
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Wrench className="h-4 w-4 text-primary" />
                      What garage door service do you need? *
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your garage door service" />
                      </SelectTrigger>
                      <SelectContent>
                        {siteConfig.taxonomy.services.map((s) => (
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
                    <Select>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your preferred timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ASAP">ASAP (Emergency)</SelectItem>
                        <SelectItem value="Today If Possible">Today If Possible</SelectItem>
                        <SelectItem value="Within the next few days">Within the next few days</SelectItem>
                        <SelectItem value="Within the next few weeks">Within the next few weeks</SelectItem>
                        <SelectItem value="Not sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Describe your garage door issue
                    </label>
                    <Textarea 
                      rows={4} 
                      placeholder="Tell us about your garage door problem: spring broken, door won't open/close, opener issues, installation needs, etc..."
                      className="text-base"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Checkbox id="consent" />
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
                  >
                    Get My FREE Garage Door Estimate
                  </Button>

                  {/* Quick Contact Alternative */}
                  <div className="text-center border-t pt-6">
                    <p className="text-sm text-foreground mb-3"><strong>Garage door stuck? Emergency repair needed?</strong></p>
                    <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                      <a
                        href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                        onClick={() => {
                          try {
                            (window as any).dataLayer = (window as any).dataLayer || [];
                            (window as any).dataLayer.push({ event: "phone_click", source: "garage_door_services_booking_form", phone: siteConfig.business.phone });
                          } catch {}
                        }}
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call {siteConfig.business.phone}
                      </a>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Popular City Services Section */}
        <section className="relative py-16 md:py-24 bg-secondary text-secondary-foreground overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,158,37,0.1),transparent)]" />
          
          <div className="relative container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <MapPin className="h-4 w-4" />
                Popular in Your Area
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-secondary-foreground">
                Garage Door Services in Top Cities
              </h2>
              <p className="mt-4 text-lg text-secondary-foreground leading-relaxed">
                Quick access to our most requested garage door services in the cities we serve across Bergen County.
              </p>
            </header>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0,4).map((area, index) => (
                <div key={area.slug} className={`group animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="bg-muted/20 backdrop-blur-sm border border-muted rounded-2xl p-6 hover:bg-muted/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary-foreground">{area.name}, {area.state}</h3>
                        <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                          <Star className="h-3 w-3 text-primary fill-current" />
                          <span>5.0/5 garage door service</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {siteConfig.taxonomy.services.slice(0,3).map((service) => (
                        <li key={service.slug}>
                          <Link 
                            to={siteConfig.routes.serviceCity(service.slug, area.slug)} 
                            className="block text-sm text-secondary-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted/20"
                          >
                            {service.name} in {area.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <Link 
                        to={siteConfig.routes.serviceAreaDetail(area.slug)}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 text-sm"
                      >
                        View All Services <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 md:py-20">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready for Professional Garage Door Service?
              </h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Don't wait when you need garage door service. Our expert technicians are standing by to help 
                with any garage door repair, installation, or emergency need across Elmwood Park and surrounding areas.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-muted/20 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm opacity-90">Emergency Service</div>
                </div>
                <div className="bg-muted/20 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">15min</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
                <div className="bg-muted/20 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">5.0★</div>
                  <div className="text-sm opacity-90">Customer Rating</div>
                </div>
                <div className="bg-muted/20 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">Free</div>
                  <div className="text-sm opacity-90">Estimates</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-card text-primary hover:bg-muted/50 rounded-full px-8 py-4 text-lg font-bold shadow-lg" asChild>
                  <a 
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "garage_door_services_cta", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button size="lg" className="bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-bold" asChild>
                  <Link to="/contact">Get Free Estimate</Link>
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

export default ServicesHub;