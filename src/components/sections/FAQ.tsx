import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";

const faqs = [
  { q: "Do you offer free estimates?", a: "Yes, we provide fast, no-obligation estimates. Submit the form and we'll reach out." },
  { q: "Which areas do you serve?", a: `We proudly serve ${siteConfig.business.hqAddress.city} and surrounding neighborhoods within a 30-mile radius.` },
  { q: "Are you licensed and insured?", a: "Absolutely. We are fully licensed and insured for your peace of mind." },
  { q: "What payments do you accept?", a: "We accept major credit cards, checks, and offer financing options on select services." },
];

const FAQ = () => {
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
    <section id="faq" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">Frequently Asked Questions</h2>
        <p className="mt-2 text-muted-foreground">Answers to common questions from our customers</p>
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
    </section>
  );
};

export default FAQ;
