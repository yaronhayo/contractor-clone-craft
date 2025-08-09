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
        <h2 className="text-2xl md:text-3xl font-extrabold">Looking For A Locksmith In {siteConfig.business.hqAddress.city}?</h2>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <ul className="space-y-5">
          <Row>Locked out of your home, car, or office and need help now?</Row>
          <Row>Need a car key replacement or key fob programmed on-site?</Row>
          <Row>Want to rekey locks after moving or a tenant change?</Row>
        </ul>
        <ul className="space-y-5">
          <Row>Considering smart lock installation for better security?</Row>
          <Row>Lost mailbox/safe keys or need a lock repaired?</Row>
          <Row>Looking for a trusted, licensed local locksmith with upfront pricing?</Row>
        </ul>
      </div>
    </section>
  );
};

export default Questions;
