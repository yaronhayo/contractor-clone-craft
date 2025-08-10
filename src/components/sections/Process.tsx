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
        <div className="absolute -top-4 left-8 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          {step.number}
        </div>
        
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{step.text}</p>
        
        {/* Time Indicator */}
        <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium">{step.time}</span>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  return (
    <section id="process" className="relative py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent)]" />
      
      <div className="relative container">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Wrench className="h-4 w-4" />
            Our Proven Process
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            How Our Garage Door Service Works
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
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

        {/* Emergency Process Highlight */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Emergency Garage Door Service Process
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            For urgent garage door repairs, we've streamlined our emergency response to get you back up and running as quickly as possible.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">≤ 15 min</div>
              <div className="text-sm opacity-90">Response Time</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">≤ 60 min</div>
              <div className="text-sm opacity-90">On-Site Arrival</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">≤ 2 hrs</div>
              <div className="text-sm opacity-90">Most Repairs Complete</div>
            </div>
          </div>

          <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-bold" asChild>
            <a 
              href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
              onClick={() => {
                try {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: "phone_click", source: "emergency_process", phone: siteConfig.business.phone });
                } catch {}
              }}
            >
              Emergency Service: {siteConfig.business.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;