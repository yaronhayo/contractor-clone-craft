import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";
import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "@/lib/cms";

const fallbackFaqs = [
  { q: "Do you offer free garage door estimates?", a: "Yes, we provide fast, no-obligation garage door estimates. Submit the form or call us and we'll assess your garage door needs." },
  { q: "Which areas do you serve for garage door service?", a: `We proudly serve Edison, all of Bergen County, Hudson County, and surrounding NJ areas. Same-day garage door service available in most locations.` },
  { q: "Are your garage door technicians licensed and insured?", a: "Absolutely. We are fully licensed and insured garage door specialists with certified technicians for your peace of mind." },
  { q: "Do you provide emergency garage door repair?", a: "Yes! We offer 24/7 emergency garage door repair service. Whether you're stuck with a broken garage door spring or opener failure, we'll get you back up and running fast." },
  { q: "What garage door brands do you service?", a: "We service all major garage door brands including LiftMaster, Chamberlain, Genie, Craftsman, and more. Our technicians are trained on all residential and commercial garage door systems." },
  { q: "How long does garage door installation take?", a: "Most garage door installations are completed in 2-4 hours, depending on the type of door and complexity. We'll provide an accurate timeline during your free estimate." },
  { q: "What payments do you accept for garage door services?", a: "We accept major credit cards, checks, and offer financing options on garage door installations and major repairs." },
];

const FAQ = () => {
  const { data } = useQuery({ queryKey: ["faqs"], queryFn: getFaqs, staleTime: 60_000 });
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
    <section id="faq" className="py-14 md:py-20 bg-gray-50">
      <div className="container">
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
      </div>
    </section>
  );
};

export default FAQ;
