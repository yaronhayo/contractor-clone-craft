import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import EstimateForm from "@/components/sections/EstimateForm";
import FinalCTA from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  MessageSquare, 
  Calendar,
  Shield,
  Star,
  CheckCircle2,
  Zap,
  Users,
  Award,
  HeartHandshake
} from "lucide-react";

const Contact = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Now",
      subtitle: "Immediate Response",
      description: "Speak directly with our garage door experts. Get instant advice, emergency service, or schedule your appointment.",
      action: "Call " + siteConfig.business.phone,
      href: `tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`,
      badge: "Fastest Response",
      color: "text-primary"
    },
    {
      icon: MessageSquare,
      title: "Get Free Estimate",
      subtitle: "Online Form",
      description: "Fill out our detailed form for accurate estimates on garage door repair, installation, or maintenance services.",
      action: "Request Estimate",
      href: "#estimate-form",
      badge: "Most Popular",
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Detailed Inquiry",
      description: "Send us detailed questions, photos of your garage door issues, or requests for comprehensive service quotes.",
      action: "Email Us",
      href: `mailto:${siteConfig.business.email}`,
      badge: "Best for Details",
      color: "text-primary"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Emergency Only" },
    { day: "Holidays", hours: "Emergency Available" }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Same-Day Service",
      description: "Emergency repairs and routine service available the same day you call"
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "$1M insurance coverage and licensed NJ contractors for your protection"
    },
    {
      icon: Star,
      title: "5-Star Reviews",
      description: "Consistently rated 5 stars by customers throughout Bergen & Hudson Counties"
    },
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Decade of experience serving Northern New Jersey with trusted expertise"
    }
  ];

  const serviceAreas = [
    "Jersey City", "Hoboken", "Weehawken", "Union City", "North Bergen",
    "Elmwood Park", "Montclair", "Fair Lawn", "Ridgewood", "Paramus",
    "Little Falls", "Cedar Grove", "West Caldwell", "Verona", "Bloomfield"
  ];

  return (
    <div>
      <Seo 
        title={`Contact ${siteConfig.business.name} - Free Garage Door Estimates`}
        description={`Contact ez2fix for professional garage door service in Bergen & Hudson Counties. Free estimates, same-day service, licensed technicians. Call ${siteConfig.business.phone}.`}
        canonical="/contact" 
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
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
              <span className="text-white font-medium">Contact Us</span>
            </nav>
            
            <header className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <HeartHandshake className="h-4 w-4" />
                Ready to Help 24/7
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                Get Expert Garage Door Service Today
              </h1>
              <p className="mt-6 text-lg text-white leading-relaxed">
                <strong>Need garage door service fast?</strong> Our licensed technicians serve Bergen and Hudson Counties with same-day repairs, emergency service, and free estimates. Don't let garage door problems disrupt your day—contact us now.
              </p>
              
              {/* Emergency Contact */}
              <div className="mt-8 p-6 bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-400/30 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-red-400" />
                  <span className="text-red-400 font-bold">EMERGENCY SERVICE AVAILABLE</span>
                </div>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 rounded-full px-8 py-4 text-lg font-bold shadow-lg transition-all duration-300" asChild>
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "contact_emergency", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
              </div>
            </header>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="relative py-16 md:py-24 bg-background">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <MessageSquare className="h-4 w-4" />
                Multiple Ways to Connect
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Preferred Contact Method
                </span>
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                Whether you need emergency service or want to schedule maintenance, we make it easy to get the garage door help you need.
              </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`h-full hover:shadow-xl transition-all duration-300 animate-fade-in border-2 hover:border-primary/20 group`} style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-8 text-center relative">
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-xs font-bold">
                        {method.badge}
                      </Badge>
                    </div>
                    
                    {/* Icon */}
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <method.icon className={`h-10 w-10 ${method.color}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-accent font-semibold mb-4">{method.subtitle}</p>
                    <p className="text-foreground leading-relaxed mb-8">
                      {method.description}
                    </p>
                    
                    {/* CTA Button */}
                    <Button 
                      size="lg" 
                      className="w-full rounded-full font-bold group-hover:shadow-lg transition-all duration-300" 
                      asChild
                    >
                      <a 
                        href={method.href}
                        onClick={(e) => {
                          if (method.href === "#estimate-form") {
                            e.preventDefault();
                            const estimateSection = document.getElementById('estimate-form');
                            if (estimateSection) {
                              estimateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          } else {
                            try {
                              (window as any).dataLayer = (window as any).dataLayer || [];
                              (window as any).dataLayer.push({ 
                                event: method.href.includes('tel:') ? "phone_click" : "email_click", 
                                source: "contact_methods", 
                                method: method.title 
                              });
                            } catch {}
                          }
                        }}
                      >
                        {method.action}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Info Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Business Hours & Contact Info */}
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Clock className="h-4 w-4" />
                  Business Information
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  When & How{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    to Reach Us
                  </span>
                </h2>

                {/* Business Hours Card */}
                <Card className="mb-8 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Business Hours</h3>
                        <p className="text-sm text-foreground">Regular & Emergency Service</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {businessHours.map((schedule, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium">{schedule.day}</span>
                          <span className="text-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-red-600" />
                        <span className="text-red-600 font-bold text-sm">EMERGENCY SERVICE</span>
                      </div>
                      <p className="text-sm text-red-700">Available 24/7 for urgent garage door failures, security issues, and safety hazards.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Details Card */}
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Contact Details</h3>
                        <p className="text-sm text-foreground">Licensed NJ Contractors</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <a 
                            href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`} 
                            className="text-primary hover:underline"
                          >
                            {siteConfig.business.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <a 
                            href={`mailto:${siteConfig.business.email}`}
                            className="text-primary hover:underline"
                          >
                            {siteConfig.business.email}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Service Area</p>
                          <p className="text-foreground">Bergen & Hudson Counties, NJ</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Award className="h-4 w-4" />
                  Why Choose ez2fix
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  Trusted{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Garage Door Experts
                  </span>
                </h2>
                
                <div className="space-y-6">
                  {whyChooseUs.map((reason, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <reason.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                            <p className="text-foreground leading-relaxed">{reason.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="relative py-16 bg-background">
          <div className="container">
            <header className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Areas We Serve
              </h3>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                Professional garage door service throughout Northern New Jersey's most trusted communities.
              </p>
            </header>

            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{area}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-foreground mb-4">Don't see your area? Call us - we may still serve your location!</p>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/service-areas">
                      View All Service Areas <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Estimate Form Section */}
        <section id="estimate-form" className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Calendar className="h-4 w-4" />
                Free Estimate Request
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Get Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Free Estimate
                </span>
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                Fill out the form below and we'll provide you with an accurate, no-obligation estimate for your garage door service needs.
              </p>
            </header>

            <div className="max-w-4xl mx-auto">
              <EstimateForm />
            </div>
          </div>
        </section>

        {/* Customer Testimonial CTA */}
        <section className="relative py-16 md:py-20 bg-background">
          <div className="container">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join 750+ Satisfied Customers
              </h3>
              <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
                Experience the difference of working with Northern New Jersey's most trusted garage door service company. Professional, reliable, and guaranteed.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300" asChild>
                  <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-4 text-lg font-bold transition-all duration-300" asChild>
                  <Link to="/reviews">
                    Read Customer Reviews <Star className="h-4 w-4 ml-2 fill-current" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;