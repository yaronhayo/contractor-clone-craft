import { CheckCircle2, AlertTriangle, Wrench, Clock } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";

const ProblemCard = ({ icon: Icon, title, description, urgency }: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string;
  urgency: "high" | "medium" | "low";
}) => {
  const urgencyColors = {
    high: "border-destructive/30 bg-destructive/10 text-destructive",
    medium: "border-accent/30 bg-accent/10 text-accent-foreground", 
    low: "border-primary/30 bg-primary/10 text-primary"
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-background border rounded-xl p-6 h-full hover:border-primary/30 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{title}</h3>
              {urgency === "high" && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${urgencyColors[urgency]}`}>
                  Emergency
                </span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Questions = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Garage Door Won't Open?",
      description: "Stuck with a garage door that won't budge? Our emergency technicians are available 24/7 to get you back up and running fast.",
      urgency: "high" as const
    },
    {
      icon: Wrench,
      title: "Broken Springs or Cables?",
      description: "Garage door springs and cables under high tension require professional repair. Don't risk injury—call our certified technicians.",
      urgency: "high" as const
    },
    {
      icon: Clock,
      title: "Opener Making Strange Noises?",
      description: "Grinding, squeaking, or clicking sounds often indicate worn components. Early intervention prevents costly emergency repairs.",
      urgency: "medium" as const
    },
    {
      icon: Wrench,
      title: "Need a New Garage Door?",
      description: "Upgrade to a modern, energy-efficient garage door with professional installation and manufacturer warranty coverage.",
      urgency: "low" as const
    },
    {
      icon: AlertTriangle,
      title: "Door Off Track or Damaged?",
      description: "A garage door off its tracks is dangerous and can cause property damage. Our experts safely realign and repair track systems.",
      urgency: "high" as const
    },
    {
      icon: Clock,
      title: "Looking for Preventive Maintenance?",
      description: "Regular garage door maintenance extends equipment life and prevents unexpected breakdowns. Schedule annual service today.",
      urgency: "low" as const
    }
  ];

  return (
    <section id="problems" className="relative py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <AlertTriangle className="h-4 w-4" />
            Common Garage Door Problems
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Garage Door Problems in {siteConfig.business.hqAddress.city}?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't let garage door issues disrupt your day. Our experienced technicians handle everything from 
            emergency repairs to scheduled maintenance across Bergen and Hudson Counties.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ProblemCard {...problem} />
            </div>
          ))}
        </div>

        {/* Emergency CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-2xl p-8 shadow-lg">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold mb-2">Emergency Garage Door Service?</h3>
              <p className="opacity-90">Available 24/7 across Jersey City, Bergen County & Hudson County</p>
            </div>
            <Button size="lg" variant="secondary" className="bg-background text-destructive hover:bg-muted rounded-full px-8" asChild>
              <a 
                href={`tel:${siteConfig.business.phone.replace(/[^+\d]/g, "")}`}
                onClick={() => {
                  try {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ event: "phone_click", source: "emergency_cta", phone: siteConfig.business.phone });
                  } catch {}
                }}
              >
                Call Now: {siteConfig.business.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;