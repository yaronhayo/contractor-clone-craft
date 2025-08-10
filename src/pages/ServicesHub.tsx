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

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const categorySlug = siteConfig.taxonomy.services.find(ts => ts.slug === service.slug)?.categorySlug || siteConfig.taxonomy.categories[0]?.slug || "garage-door-repair";
  const to = siteConfig.routes.individualService(categorySlug, service.slug);
  const imgSrc = service.imageUrl || siteConfig.media.serviceCardDefault?.src || "";
  
  // Service icon mapping
  const serviceIcons = {
    "garage-door-spring-repair": Zap,
    "garage-door-repair": Wrench,
    "garage-door-installation": Award,
    "garage-door-opener-repair": Settings,
    "emergency-garage-door-repair": AlertTriangle,
  };
  
  const ServiceIcon = serviceIcons[service.slug as keyof typeof serviceIcons] || Wrench;
  
  // Enhanced service features
  const serviceFeatures = {
    "garage-door-spring-repair": ["High-tension spring replacement", "Safety inspection included", "10 year warranty"],
    "garage-door-repair": ["Track realignment", "Panel replacement", "Hardware upgrades"],
    "garage-door-installation": ["Custom sizing & fitting", "Energy efficient options", "Free on-site estimate"],
    "garage-door-opener-repair": ["All major brands serviced", "Remote programming", "Safety sensor testing"],
    "emergency-garage-door-repair": ["15 minute response time", "Mobile repair units", "After-hours availability"],
  };
  
  const features = serviceFeatures[service.slug as keyof typeof serviceFeatures] || ["Expert technicians", "Quality parts", "Satisfaction guaranteed"];
  
  return (
    <article 
      className={`group relative overflow-hidden rounded-2xl border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl animate-fade-in bg-gradient-to-br from-background to-accent/5`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Floating Icon */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center z-10 group-hover:bg-primary/20 transition-all duration-300">
        <ServiceIcon className="h-6 w-6 text-primary" />
      </div>
      
      <Link to={to} className="block">
        {/* Service Image */}
        <div className="relative overflow-hidden">
          {imgSrc && (
            <img 
              src={imgSrc} 
              alt={`${service.name} in ${siteConfig.business.hqAddress.city}`} 
              width={siteConfig.media.serviceCardDefault?.width || 1200} 
              height={siteConfig.media.serviceCardDefault?.height || 800} 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
              loading="lazy" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Emergency Badge */}
          {service.slug.includes('emergency') && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                24/7 Available
              </div>
            </div>
          )}
          
          {/* Bottom overlay with service type */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/90 to-transparent text-background">
            <div className="text-sm font-semibold opacity-90">Professional Service</div>
          </div>
        </div>

        {/* Service Content */}
        <div className="p-8">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
            {service.name}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.shortDescription || "Professional garage door service with expert technicians and quality parts."}
          </p>
          
          {/* Service Features List */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* CTA Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary fill-current" />
                <span className="text-sm font-semibold text-primary">Free Estimate</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Quick Call Button - appears on hover */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <Button size="sm" className="rounded-full shadow-lg" asChild>
          <a 
            href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
            onClick={(e) => {
              e.stopPropagation();
              try {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ 
                  event: "phone_click", 
                  source: "service_card", 
                  service: service.name,
                  phone: siteConfig.business.phone 
                });
              } catch {}
            }}
          >
            <Phone className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </article>
  );
};

const CategoryCard = ({ category, index }: { category: any; index: number }) => {
  const services = siteConfig.taxonomy.services.filter(s => s.categorySlug === category.slug);
  const serviceCount = services.length;
  
  const categoryIcons = {
    "garage-door-repair": Wrench,
    "garage-door-installation": Award,
    "garage-door-opener": Settings,
    "emergency-repair": AlertTriangle,
  };
  
  const CategoryIcon = categoryIcons[category.slug as keyof typeof categoryIcons] || Wrench;
  
  return (
    <article 
      className={`group relative animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
      <Link to={siteConfig.routes.serviceCategory(category.slug)} className="block">
        <div className="relative bg-background border-2 rounded-2xl p-8 h-full text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
            <CategoryIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {category.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <span>{serviceCount} Services Available</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
            <span>Explore Services</span>
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
    name: "All Locksmith Services",
    itemListElement: siteConfig.taxonomy.services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteUrl}${siteConfig.routes.individualService(s.categorySlug, s.slug)}`,
    })),
  };

  return (
    <div>
      <Seo title="Locksmith Services in Englewood NJ | All Services" description={`Complete locksmith services in Englewood, Fort Lee, Tenafly and surrounding areas. Emergency lockout, rekeys, car keys, and commercial services.`} canonical="/services" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.15),transparent)]" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          
          <div className="relative container">
            <nav aria-label="Breadcrumb" className="text-sm text-gray-300 mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
              <span className="mx-2">/</span> 
              <span className="text-white font-medium">All Services</span>
            </nav>
            
            <header className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Wrench className="h-4 w-4" />
                Professional Locksmith Services
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                Complete Locksmith Services in Englewood, NJ
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                From emergency lockouts to security upgrades, our licensed locksmiths provide expert service 
                across Englewood, Fort Lee, Tenafly, and surrounding Bergen County areas.
              </p>
              
              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="text-sm font-semibold">5.0/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-semibold">Licensed NJ #13VH13578200</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-semibold">24/7 Emergency</span>
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
                <Button size="lg" variant="outline" className="rounded-full px-8 py-4 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300" asChild>
                  <Link to="/contact">Get Free Estimate</Link>
                </Button>
              </div>
            </header>
          </div>
        </section>

        {/* All Services Section */}
        <section className="container py-16 md:py-24">
          <header className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CheckCircle2 className="h-4 w-4" />
              Complete Service List
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              All Locksmith Services Available
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Comprehensive locksmith solutions for residential, commercial, automotive, and emergency needs 
              throughout Englewood and surrounding Bergen County areas.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.taxonomy.services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(234,158,37,0.1),transparent)]" />
          
          <div className="relative container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Wrench className="h-4 w-4" />
                Our Process
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                How Our Locksmith Service Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                From emergency lockouts to security upgrades, our streamlined process ensures fast, professional service every time.
              </p>
            </header>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  icon: Phone,
                  title: "Contact Us",
                  description: "Call us or submit a request online. We're available 24/7 for emergency lockouts and scheduled service.",
                  time: "Immediate response"
                },
                {
                  number: "02", 
                  icon: Clock,
                  title: "Quick Response",
                  description: "Our technician arrives within 15-30 minutes for emergencies, or at your scheduled appointment time.",
                  time: "15-30 minutes"
                },
                {
                  number: "03",
                  icon: Wrench,
                  title: "Expert Service",
                  description: "Licensed locksmith performs the work using quality tools and parts. Clear communication throughout.",
                  time: "30-60 minutes"
                },
                {
                  number: "04",
                  icon: CheckCircle2,
                  title: "Quality Assured",
                  description: "Test all locks and keys, clean up completely, and ensure you're 100% satisfied before we leave.",
                  time: "Satisfaction guaranteed"
                }
              ].map((step, index) => (
                <div key={index} className={`relative group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="bg-background border-2 rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    {/* Step Number Badge */}
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{step.description}</p>
                    
                    {/* Time Indicator */}
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="font-medium text-gray-700">{step.time}</span>
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
              Locksmith Service Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Common questions about our locksmith services, pricing, and coverage areas.
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "What areas do you serve for locksmith services?",
                  a: "We serve Englewood, Fort Lee, Tenafly, Bergenfield, Cliffside Park, Ridgefield Park, Ridgefield, Cresskill, and surrounding Bergen County areas. Emergency service available 24/7."
                },
                {
                  q: "How quickly can you respond to emergency lockouts?",
                  a: "For emergency lockouts, we typically arrive within 15-30 minutes. Our mobile units are strategically positioned across Bergen County for rapid response."
                },
                {
                  q: "Do you provide free estimates for locksmith services?",
                  a: "Yes, we provide free, no-obligation estimates for all non-emergency locksmith services. Emergency lockout service has transparent, upfront pricing."
                },
                {
                  q: "Are your locksmiths licensed and insured?",
                  a: "Absolutely. All our locksmiths are fully licensed (NJ License #13VH13578200), bonded, and insured for your complete peace of mind."
                },
                {
                  q: "What types of locks and security systems do you work with?",
                  a: "We service all types of locks including traditional deadbolts, smart locks, high-security locks, automotive locks, and commercial access control systems."
                },
                {
                  q: "Do you offer 24/7 emergency locksmith service?",
                  a: "Yes, we provide 24/7 emergency locksmith service for lockouts, break-ins, and urgent security needs throughout our service area."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
              <Link to="/faq">
                View All FAQs <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Services Reviews Section */}
        <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
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
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
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
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Satisfied Customers</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Emergency Available</div>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  rating: 5,
                  text: "Locked out of my car at 2am - they arrived in 20 minutes and had me back in without any damage. Professional and fairly priced!",
                  author: "Michael R.",
                  location: "Englewood, NJ",
                  service: "Car Lockout"
                },
                {
                  rating: 5,
                  text: "Rekeyed all our locks after moving in. Arrived on time, explained everything clearly, and left the place spotless. Highly recommend!",
                  author: "Sarah L.",
                  location: "Fort Lee, NJ", 
                  service: "Lock Rekey"
                },
                {
                  rating: 5,
                  text: "Lost my car keys and needed new ones programmed. They came to my location and had everything working in 30 minutes. Great service!",
                  author: "David K.",
                  location: "Tenafly, NJ",
                  service: "Car Key Replacement"
                }
              ].map((review, index) => (
                <div key={index} className={`group animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="bg-background border-2 rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors">
                      "{review.text}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <cite className="font-semibold text-foreground not-italic">{review.author}</cite>
                      <div className="text-sm text-muted-foreground">{review.location} • {review.service}</div>
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
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calculator className="h-4 w-4" />
                Book Your Service
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Schedule Your Locksmith Service
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Ready to get started? Fill out our quick booking form and we'll contact you within 15 minutes during business hours.
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
                      placeholder="123 Main St, Englewood, NJ 07631" 
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Wrench className="h-4 w-4 text-primary" />
                      What locksmith service do you need? *
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your locksmith service" />
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
                      Describe your locksmith needs
                    </label>
                    <Textarea 
                      rows={4} 
                      placeholder="Tell us about your lock issue, security upgrade needs, or any specific requirements..."
                      className="text-base"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Checkbox id="consent" />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the <Link to="/privacy-policy" className="text-primary underline hover:no-underline">Privacy Policy</Link> and 
                      consent to being contacted about locksmith services.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold rounded-xl"
                  >
                    Book My Locksmith Service
                  </Button>

                  {/* Quick Contact Alternative */}
                  <div className="text-center border-t pt-6">
                    <p className="text-sm text-muted-foreground mb-3">Need immediate assistance?</p>
                    <Button size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                      <a
                        href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                        onClick={() => {
                          try {
                            (window as any).dataLayer = (window as any).dataLayer || [];
                            (window as any).dataLayer.push({ event: "phone_click", source: "services_booking_form", phone: siteConfig.business.phone });
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
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,158,37,0.1),transparent)]" />
          
          <div className="relative container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <MapPin className="h-4 w-4" />
                Popular in Your Area
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Locksmith Services in Top Cities
              </h2>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                Quick access to our most requested locksmith services in the cities we serve across Bergen County.
              </p>
            </header>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0,4).map((area, index) => (
                <div key={area.slug} className={`group animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{area.name}, {area.state}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-300">
                          <Star className="h-3 w-3 text-primary fill-current" />
                          <span>5.0/5 rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {siteConfig.taxonomy.services.slice(0,3).map((service) => (
                        <li key={service.slug}>
                          <Link 
                            to={siteConfig.routes.serviceCity(service.slug, area.slug)} 
                            className="block text-sm text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/10"
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
                Ready for Professional Locksmith Service?
              </h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Don't wait when you need locksmith service. Our expert technicians are standing by to help 
                with any lock, key, or security need across Englewood and surrounding areas.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm opacity-90">Emergency Service</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">15min</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">5.0★</div>
                  <div className="text-sm opacity-90">Customer Rating</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">Free</div>
                  <div className="text-sm opacity-90">Estimates</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-bold shadow-lg" asChild>
                  <a 
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "services_cta", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button size="lg" className="bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800 rounded-full px-8 py-4 text-lg font-bold" asChild>
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