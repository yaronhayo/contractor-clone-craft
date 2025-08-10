import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site-config";

const Row = ({ children }: { children: string }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
    <span className="text-sm md:text-base text-foreground/90">{children}</span>
  </li>
);

const Questions = () => {
  return (
    <section id="about" className="container py-14 md:py-20">
      <header className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Need Garage Door Service In {siteConfig.business.hqAddress.city}?</h2>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <ul className="space-y-5">
          <Row>Garage door won't open or close and you're stuck?</Row>
          <Row>Broken garage door springs causing safety concerns?</Row>
          <Row>Garage door opener making strange noises or not working?</Row>
        </ul>
        <ul className="space-y-5">
          <Row>Need a new garage door installation for your home?</Row>
          <Row>Damaged rollers causing rough or uneven operation?</Row>
          <Row>Looking for a trusted, licensed garage door expert with upfront pricing?</Row>
        </ul>
      </div>
    </section>
  );
};

export default Questions;
