import { siteConfig } from "@/config/site-config";
import { PhoneCall, Calendar, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Contact Us",
    text: "Call us or submit an online request. Tell us about your garage door issue or installation needs—we're here to help 24/7.",
    time: "Immediate response"
  },
  {
    number: "02", 
    icon: Calendar,
    title: "Schedule Service",
    text: "We'll schedule a convenient time that works for you and provide transparent, upfront pricing with no hidden surprises.",
    time: "Same-day available"
  },
  {
    number: "03",
    icon: Wrench,
    title: "Expert Service",
    text: "Our licensed technician arrives on time with quality parts and tools to complete your garage door repair or installation professionally.",
    time: "2-4 hours average"
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Quality Assured",
    text: "We test everything thoroughly, clean up completely, and ensure you're 100% satisfied with your garage door service before we leave.",
    time: "Satisfaction guaranteed"
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
      
      <div className="relative bg-background border-2 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
        {/* Step Number Badge */}
        <div className="absolute -top-4 left-8 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          {step.number}
        </div>
        
        {/* Icon */}
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-50 transition-colors duration-300 shadow-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{step.text}</p>
        
        {/* Time Indicator */}
        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-medium text-gray-700">{step.time}</span>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  return (
    <section id="process" className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,158,37,0.1),transparent)]" />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Wrench className="h-4 w-4" />
            Our Proven Process
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            How Our Garage Door Service Works
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            From your first call to project completion, we've streamlined our process to be simple, transparent, 
            and stress-free for homeowners across {siteConfig.business.hqAddress.city} and surrounding areas.
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
            Our Service Guarantees
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Quality garage door repair services with unmatched warranties and customer benefits across Elmwood Park and surrounding areas.
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

          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-bold" asChild>
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