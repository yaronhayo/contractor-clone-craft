import { siteConfig } from "@/config/site-config";
import { PhoneCall, Calendar, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Contact Us",
    text: "Door won't open? Stuck outside? Call our emergency hotline and speak to a real technician (not an answering service). We'll diagnose your problem over the phone and dispatch help as soon as possible.",
    time: "Professional response"
  },
  {
    number: "02", 
    icon: Calendar,
    title: "Rapid Response",
    text: "Our technician arrives promptly with a fully-stocked van containing the most common garage door parts. We strive to fix most problems on the first visit to minimize your inconvenience.",
    time: "Professional service"
  },
  {
    number: "03",
    icon: Wrench,
    title: "Professional Repair",
    text: "Watch our master technician work. We'll explain what went wrong, show you the damaged parts, and demonstrate the repair. No hidden problems, no upselling—just honest, expert service.",
    time: "Quality workmanship"
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "10-Year Warranty",
    text: "Before we leave, we test your door's safety features, program your remotes, and hand you our exclusive 10-year warranty certificate. You're covered for a DECADE—not just 90 days like competitors.",
    time: "Peace of mind guaranteed"
  },
];

const ProcessStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const Icon = step.icon;
  
  return (
    <div className={`relative group animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
      {/* Connecting Line (hidden on last item) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 z-0" />
      )}
      
      <div className="relative bg-background border-2 rounded-2xl p-8 pb-16 hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-center">
        {/* Step Number Badge - made bigger */}
        <div className="absolute -top-4 left-8 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-base">
          {step.number}
        </div>
        
        {/* Icon - centered */}
        <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-muted/50 transition-colors duration-300 shadow-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        
        {/* Content - centered */}
        <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
        <p className="text-foreground mb-6 leading-relaxed">{step.text}</p>
        
        {/* Time Indicator - moved to bottom center */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-medium text-foreground">{step.time}</span>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  return (
    <section id="process" className="relative py-16 md:py-24 bg-gradient-to-b from-secondary to-secondary/80 text-secondary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,158,37,0.1),transparent)]" />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Wrench className="h-4 w-4" />
            Our Proven Process
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary-foreground">
            From Broken to Fixed in 4 Simple Steps
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            <strong>Tired of being trapped by a broken garage door?</strong> Our proven 4-step process gets you back to normal fast—usually within 2 hours. 
            No surprises, no delays, no excuses. Just professional results you can count on.
          </p>
        </header>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-4 mb-16">
          {steps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>

        {/* Warranty & Benefits Highlight */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Why Risk It? Get These Guarantees Today
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            <strong>Don't settle for "good enough" when your family's safety is at stake.</strong> These industry-leading guarantees prove we stand behind our work—something discount companies can't match.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">10 Years</div>
              <div className="text-sm opacity-90">Warranty</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">10%</div>
              <div className="text-sm opacity-90">Senior Discount</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">Same Day</div>
              <div className="text-sm opacity-90">Service</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">Free</div>
              <div className="text-sm opacity-90">On-Site Estimate</div>
            </div>
          </div>

          <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full px-8 py-4 text-lg font-bold" asChild>
            <a 
              href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
              onClick={() => {
                try {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: "phone_click", source: "guarantees_cta", phone: siteConfig.business.phone });
                } catch {}
              }}
            >
              Call for Free Estimate: {siteConfig.business.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;