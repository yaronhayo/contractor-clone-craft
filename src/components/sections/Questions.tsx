import { CheckCircle2 } from "lucide-react";

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
        <h2 className="text-2xl md:text-3xl font-extrabold">Looking For A (Service Provided) In (City or Area)?</h2>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <ul className="space-y-5">
          <Row>Question the customer is asking themselves when searching for this service?</Row>
          <Row>Question the customer is asking themselves when searching for this service?</Row>
          <Row>Question the customer is asking themselves when searching for this service?</Row>
        </ul>
        <ul className="space-y-5">
          <Row>Question the customer is asking themselves when searching for this service?</Row>
          <Row>Question the customer is asking themselves when searching for this service?</Row>
          <Row>Question the customer is asking themselves when searching for this service?</Row>
        </ul>
      </div>
    </section>
  );
};

export default Questions;
