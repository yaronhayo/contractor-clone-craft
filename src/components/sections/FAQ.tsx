import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";
import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "@/lib/cms";

const fallbackFaqs = [
  { q: "Do you offer free garage door repair estimates in Elmwood Park?", a: "Yes, we provide fast, no-obligation garage door repair estimates throughout Elmwood Park, Montclair, and surrounding areas. Submit the form or call us and we'll assess your garage door repair needs." },
  { q: "Which areas do you serve for garage door repair?", a: "We proudly serve Elmwood Park, North Caldwell, West Caldwell, Little Falls, Montclair, Cedar Grove, Fair Lawn, Clifton, and surrounding NJ areas. Same-day garage door repair available in most locations." },
  { q: "Are your garage door repair technicians licensed and insured?", a: "Absolutely. We are fully licensed (NJ License #13VH13553300) and insured garage door repair specialists with certified technicians for your peace of mind." },
  { q: "Do you provide emergency garage door repair near me?", a: "Yes! We offer 24/7 emergency garage door repair service throughout Elmwood Park and Montclair. Whether you're stuck with a broken garage door spring or opener failure, we'll get you back up and running fast." },
  { q: "What warranty do you offer on garage door spring repair?", a: "We offer an industry-leading 10-year warranty on all garage door spring repairs and other garage door repair services. This is the longest warranty coverage available." },
  { q: "Do you offer discounts on garage door repair services?", a: "Yes! We offer 10% senior discounts on all garage door repair services. We also provide free on-site estimates for all garage door repair needs." },
  { q: "How quickly can you respond for garage door repair in Montclair?", a: "We provide same-day garage door repair service throughout Montclair, Elmwood Park, and surrounding areas. For emergencies, we typically arrive within 1-2 hours." },
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
