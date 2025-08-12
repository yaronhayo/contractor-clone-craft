import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";
import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "@/lib/cms";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const fallbackFaqs = [
  { q: "Do you offer free garage door estimates?", a: "Yes, we provide fast, no-obligation garage door estimates. Submit the form or call us and we'll assess your garage door needs." },
  { q: "Which areas do you serve for garage door service?", a: `We proudly serve Jersey City, all of Bergen County, Hudson County, and surrounding NJ areas. Same-day garage door service available in most locations.` },
  { q: "Are your garage door technicians licensed and insured?", a: "Absolutely. We are fully licensed and insured garage door specialists with certified technicians for your peace of mind." },
  { q: "Do you provide emergency garage door repair?", a: "Yes! We offer 24/7 emergency garage door repair service. Whether you're stuck with a broken garage door spring or opener failure, we'll get you back up and running fast." },
  { q: "What garage door brands do you service?", a: "We service all major garage door brands including LiftMaster, Chamberlain, Genie, Craftsman, and more. Our technicians are trained on all residential and commercial garage door systems." },
  { q: "How long does garage door installation take?", a: "Most garage door installations are completed in 2-4 hours, depending on the type of door and complexity. We'll provide an accurate timeline during your free estimate." },
  { q: "What payments do you accept for garage door services?", a: "We accept major credit cards, checks, and offer financing options on garage door installations and major repairs." },
];

const FAQ = () => {
  const { data } = useQuery({ 
    queryKey: ["faqs"], 
    queryFn: getFaqs, 
    staleTime: 60_000,
    retry: false,
    throwOnError: false,
    meta: {
      errorMessage: 'Failed to load FAQs from CMS'
    }
  });
  const faqs = data && data.length ? data : fallbackFaqs;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-14 md:py-20 bg-background">
      <div className="container">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Frequently Asked Questions</h2>
        <p className="mt-2 text-foreground">Answers to common questions from our customers</p>
      </header>

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto mt-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Enhanced CTA Section */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h3>
          
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Can't find what you're looking for? Browse our complete FAQ collection for detailed answers 
            about garage door services, pricing, warranties, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
              <Link to="/faq">
                <HelpCircle className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Read All FAQs
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group" asChild>
              <a 
                href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
                onClick={() => {
                  try {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ 
                      event: "phone_click", 
                      source: "faq_call_for_help", 
                      phone: siteConfig.business.phone 
                    });
                  } catch {}
                }}
              >
                <HelpCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Call for Help
              </a>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default FAQ;
