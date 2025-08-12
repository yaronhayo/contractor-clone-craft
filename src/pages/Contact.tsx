import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Calendar,
  CheckCircle2,
  Send,
  Wrench,
  HelpCircle,
  Star,
  ThumbsUp,
  PhoneCall
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
      title: "Call Us",
      description: "Get immediate help or schedule service with our friendly team",
      value: siteConfig.business.phone,
      href: `tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`,
      primary: true
    },
    {
      icon: MessageCircle,
      title: "Send Message",
      description: "Fill out our contact form and we'll get back to you quickly",
      value: "Quick Response",
      href: "#contact-form",
      primary: false
    },
    {
      icon: Calendar,
      title: "Book Online",
      description: "Schedule your service appointment at your convenience",
      value: "24/7 Booking",
      href: "/booking",
      primary: false
    }
  ];

  const howItWorks = [
    {
      step: "1",
      icon: PhoneCall,
      title: "Contact Us",
      description: "Call, message, or book online - whatever works best for you"
    },
    {
      step: "2",
      icon: Calendar,
      title: "Schedule Service",
      description: "We'll find a convenient time that fits your schedule"
    },
    {
      step: "3",
      icon: Wrench,
      title: "Expert Service",
      description: "Our technician arrives with the tools and parts needed"
    },
    {
      step: "4",
      icon: ThumbsUp,
      title: "Job Complete",
      description: "Your garage door works perfectly with our warranty"
    }
  ];

  const faqItems = [
    {
      question: "Do you provide free estimates?",
      answer: "Yes! We offer completely free, no-obligation estimates for all garage door services. There's never any pressure or hidden fees."
    },
    {
      question: "How quickly can you respond?",
      answer: "We typically respond within hours and offer same-day service for most areas. Emergency service is available when you need it most."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve Bergen and Hudson Counties in Northern New Jersey, including Elmwood Park, Jersey City, Montclair, and surrounding communities."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Absolutely. We're fully licensed contractors with comprehensive insurance coverage for your complete protection and peace of mind."
    },
    {
      question: "What garage door brands do you work with?",
      answer: "We service all major brands including LiftMaster, Chamberlain, Genie, Wayne Dalton, and more. Our technicians are trained on all systems."
    },
    {
      question: "Do you offer warranties on your work?",
      answer: "Yes, we provide industry-leading warranties on both parts and labor. We stand behind our work with comprehensive coverage."
    }
  ];

  return (
    <div>
      <Seo 
        title="Contact ez2fix LLC | (201) 554-6769 | Emergency Garage Door Repair Bergen County"
        description="📞 Contact ez2fix LLC for 24/7 emergency garage door repair in Bergen County NJ | Call (201) 554-6769 | FREE estimates, same-day service | Spring repair, installation, opener service | Licensed & insured | Elmwood Park office serving all of NJ"
        canonical="/contact" 
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      
      <main id="content">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-primary/10" />
          
          <div className="relative container max-w-6xl">
            <div className="text-center mb-16">
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
                <span className="mx-2">/</span> 
                <span className="text-secondary-foreground font-medium">Contact</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6 leading-tight">
                Get Expert Help with
                <span className="block text-primary">Your Garage Door</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <strong className="text-secondary-foreground">Need garage door service?</strong> Whether it's a quick repair or full installation, 
                we're here to help. Choose how you'd like to get in touch with our professional team.
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`group hover:shadow-xl transition-all duration-300 bg-white border-2 ${method.primary ? 'border-primary/30 ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/20'}`}>
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 ${method.primary ? 'bg-primary/10' : 'bg-gray-100'}`}>
                      <method.icon className={`h-10 w-10 ${method.primary ? 'text-primary' : 'text-gray-700'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>
                    <div className={`text-lg font-semibold mb-6 ${method.primary ? 'text-primary' : 'text-accent'}`}>
                      {method.value}
                    </div>
                    <Button 
                      size="lg" 
                      className={`w-full rounded-xl font-semibold transition-all duration-300 ${
                        method.primary 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                      }`}
                      asChild
                    >
                      <a 
                        href={method.href}
                        onClick={(e) => {
                          if (method.href === "#contact-form") {
                            e.preventDefault();
                            const contactSection = document.getElementById('contact-form');
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                      >
                        {method.title}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Wrench className="h-4 w-4" />
                How It Works
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Simple Process, Professional Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Getting your garage door fixed shouldn't be complicated. Here's our straightforward process.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <step.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Factors */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Northern New Jersey Trusts ez2fix
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've built our reputation on reliability, expertise, and customer satisfaction
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Licensed & Insured</div>
                <p className="text-gray-600 text-sm">Fully licensed contractors with comprehensive insurance coverage</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">5-Star Reviews</div>
                <p className="text-gray-600 text-sm">Consistently rated 5 stars by satisfied customers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">10+ Years</div>
                <p className="text-gray-600 text-sm">Decade of experience serving Northern New Jersey</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">10-Year Warranty</div>
                <p className="text-gray-600 text-sm">Industry-leading warranty on parts and labor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <MessageCircle className="h-4 w-4" />
                Send Us a Message
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Get Your Free Estimate
              </h2>
              <p className="text-xl text-muted-foreground">
                Tell us about your garage door needs and we'll get back to you within 24 hours
              </p>
            </div>

            <Card className="shadow-xl border-2 border-primary/10">
              <CardContent className="p-8 md:p-12">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input 
                        id="name"
                        type="text" 
                        placeholder="Enter your name"
                        className="h-12 border-2 border-border focus:border-primary rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input 
                        id="phone"
                        type="tel" 
                        placeholder="(123) 456-7890"
                        className="h-12 border-2 border-border focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="your@email.com"
                      className="h-12 border-2 border-border focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                      Service Address
                    </label>
                    <Input 
                      id="address"
                      type="text" 
                      placeholder="Where do you need service?"
                      className="h-12 border-2 border-border focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Describe Your Garage Door Issue
                    </label>
                    <Textarea 
                      id="message"
                      placeholder="Tell us what's happening with your garage door..."
                      className="min-h-32 border-2 border-border focus:border-primary rounded-xl resize-none"
                    />
                  </div>

                  <div className="text-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <HelpCircle className="h-4 w-4" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Common Questions & Answers
              </h2>
              <p className="text-xl text-muted-foreground">
                Find answers to the most common questions about our garage door services
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-200 rounded-xl px-6 hover:border-primary/30 transition-colors duration-300">
                  <AccordionTrigger className="text-left font-semibold py-6 text-gray-900 hover:text-primary transition-colors duration-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Have more questions? Check out our comprehensive FAQ page.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-xl font-semibold"
                asChild
              >
                <Link to="/faq">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  See All FAQs
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Your Garage Door Working Perfectly?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              <strong className="text-gray-900">Don't let garage door problems slow you down.</strong> Contact our licensed professionals today 
              for fast, reliable service with our 10-year warranty protection.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg text-lg" 
                asChild
              >
                <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}>
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Call {siteConfig.business.phone}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg" 
                asChild
              >
                <Link to="/booking">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Service Online
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>9:00 AM - 3:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold text-gray-900">Service Area</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`} className="hover:text-primary transition-colors">
                      {siteConfig.business.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href={`mailto:${siteConfig.business.email}`} className="hover:text-primary transition-colors">
                      {siteConfig.business.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Bergen & Hudson Counties, NJ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;