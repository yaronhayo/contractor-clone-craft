import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Phone, Star, Shield, Clock, CheckCircle2, ArrowRight, Wrench, Settings, AlertTriangle } from "lucide-react";

const FAQ = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
    ],
  };

  // Organized FAQ categories for better user experience
  const faqCategories = [
    {
      title: "Emergency & Repairs",
      icon: AlertTriangle,
      color: "text-primary",
      bgColor: "bg-primary/5",
      faqs: [
        {
          q: "My garage door won't open at all. What should I do first?",
          a: "First, check if the power is connected and the remote battery is working. If the door still won't open, don't attempt to force it manually as this can cause injury. Our emergency technicians are available 24/7 to safely diagnose and repair the issue. Common causes include broken springs, damaged cables, or opener motor failure."
        },
        {
          q: "Is it safe to use my garage door if it's making strange noises?",
          a: "No, unusual noises often indicate worn or damaged components that could fail unexpectedly. Grinding, scraping, or loud banging sounds suggest immediate attention is needed. Stop using the door and contact our technicians to prevent potential injury and avoid more expensive repairs."
        },
        {
          q: "How quickly can you respond to garage door emergencies?",
          a: "We prioritize emergency calls and typically respond within the hour for urgent situations throughout Bergen and Hudson Counties. Our technicians carry common replacement parts and are equipped to handle most emergency repairs on the first visit."
        },
        {
          q: "What constitutes a garage door emergency?",
          a: "Garage door emergencies include: doors that won't open/close completely, broken springs, doors off track, damaged cables, opener failures that leave you stranded, and any situation where the door poses a safety risk to people or property."
        }
      ]
    },
    {
      title: "Installation & Replacement",
      icon: Settings,
      color: "text-primary",
      bgColor: "bg-primary/5",
      faqs: [
        {
          q: "How do I know if I need a new garage door vs. repair?",
          a: "Consider replacement if your door is over 15 years old, requires frequent repairs, has significant rust or damage, lacks modern safety features, or repair costs exceed 50% of replacement cost. Our technicians provide honest assessments to help you make the most cost-effective decision."
        },
        {
          q: "What factors should I consider when choosing a new garage door?",
          a: "Key factors include: material (steel, aluminum, wood, composite), insulation requirements, style that matches your home, size and weight capacity, safety features, smart technology integration, and local weather resistance needs for New Jersey climate."
        },
        {
          q: "How long does garage door installation take?",
          a: "Standard single-door installation typically takes 3-4 hours. Double doors or complex installations with new tracks and openers may take 4-6 hours. We'll provide an accurate timeline during your free estimate and work efficiently to minimize disruption."
        },
        {
          q: "Do you handle permits and inspections for new installations?",
          a: "Yes, as licensed New Jersey contractors, we handle all necessary permits and ensure installations meet local building codes throughout Bergen and Hudson Counties. We coordinate inspections and provide all required documentation."
        }
      ]
    },
    {
      title: "Maintenance & Service",
      icon: Wrench,
      color: "text-accent",
      bgColor: "bg-accent/5",
      faqs: [
        {
          q: "How often should I have my garage door serviced?",
          a: "We recommend professional maintenance every 6-12 months, depending on usage frequency. Regular service includes lubricating moving parts, adjusting spring tension, checking safety features, and identifying potential issues before they become expensive repairs."
        },
        {
          q: "What maintenance can I safely do myself?",
          a: "Safe DIY maintenance includes: cleaning tracks of debris, testing safety features monthly, replacing weather stripping, and keeping the door clean. Never attempt to adjust springs, cables, or opener settings yourself - these require professional expertise and special tools."
        },
        {
          q: "Why is my garage door opening or closing unevenly?",
          a: "Uneven operation usually indicates track misalignment, worn rollers, or spring tension issues. This can cause excessive wear and potential safety hazards. Professional adjustment is needed to restore smooth, balanced operation and prevent further damage."
        },
        {
          q: "How can I extend my garage door's lifespan?",
          a: "Regular professional maintenance, prompt repair of minor issues, keeping tracks clean, lubricating moving parts, and avoiding forcing the door when it's not operating smoothly. Quality installation and using genuine replacement parts also significantly extend door life."
        }
      ]
    }
  ];

  const quickAnswers = [
    {
      icon: Clock,
      title: "Emergency Response",
      description: "24/7 emergency service available throughout Bergen & Hudson Counties"
    },
    {
      icon: Shield,
      title: "Licensed & Insured", 
      description: "Fully licensed NJ contractors with $1M liability insurance"
    },
    {
      icon: CheckCircle2,
      title: "Satisfaction Guaranteed",
      description: "Quality workmanship backed by our service guarantee"
    }
  ];

  return (
    <div>
      <Seo 
        title="Garage Door FAQ Bergen County NJ | Expert Answers | ez2fix LLC"
        description="❓ Get expert answers to garage door questions in Bergen County NJ | Spring repair, installation costs, emergency service, warranty info | Licensed contractor FAQ | When to repair vs replace | Safety tips | Call ez2fix LLC (201) 554-6769"
        canonical="/faq" 
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
              <span className="text-white font-medium">FAQ</span>
            </nav>
            
            <header className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <HelpCircle className="h-4 w-4" />
                Expert Answers to Your Questions
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                Garage Door FAQ
              </h1>
              <p className="mt-6 text-lg text-white leading-relaxed">
                <strong>Get instant answers to common garage door questions.</strong> From emergency repairs to installation advice, our experts have compiled everything you need to know about garage door service in Bergen and Hudson Counties.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "faq_hero", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Get Immediate Help
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-4 text-lg font-bold border-2 border-muted text-foreground bg-background hover:bg-muted hover:text-foreground transition-all duration-300"
                  onClick={() => {
                    const faqSection = document.getElementById('faq-categories');
                    if (faqSection) {
                      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Browse All FAQs
                </Button>
              </div>
            </header>
          </div>
        </section>

        {/* Quick Answers Section */}
        <section className="relative py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {quickAnswers.map((answer, index) => (
                <Card key={index} className={`text-center hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <answer.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{answer.title}</h3>
                    <p className="text-foreground leading-relaxed">{answer.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories Section */}
        <section id="faq-categories" className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <HelpCircle className="h-4 w-4" />
                Organized by Category
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Find Answers{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Fast
                </span>
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                Our FAQs are organized by topic to help you find the specific information you need quickly. Can't find what you're looking for? Call us for personalized assistance.
              </p>
            </header>

            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className={`animate-fade-in`} style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border border-gray-200 rounded-xl px-6">
                        <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors py-6">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground leading-relaxed pb-6">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="relative py-16 md:py-20 bg-background">
          <div className="container">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
              <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
                Our expert technicians are standing by to answer your specific garage door questions and provide personalized solutions for your situation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300" asChild>
                  <a href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-4 text-lg font-bold transition-all duration-300" asChild>
                  <Link to="/contact">
                    Contact Us Online <ArrowRight className="h-5 w-5 ml-2" />
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

export default FAQ;