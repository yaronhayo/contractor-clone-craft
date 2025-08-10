import { Shield, Clock, Wrench, Star, CheckCircle2, Phone } from "lucide-react";

const FeatureItem = ({ icon: Icon, text, highlight }: { 
  icon: React.ComponentType<any>; 
  text: string; 
  highlight?: boolean; 
}) => (
  <div className={`flex items-center justify-center gap-3 py-4 px-6 transition-all duration-300 ${
    highlight ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
  }`}>
    <Icon className="h-5 w-5 flex-shrink-0" />
    <span className="font-semibold text-sm md:text-base whitespace-nowrap">{text}</span>
  </div>
);

const FeaturesBar = () => {
  const features = [
    { icon: Clock, text: "24/7 Emergency Service", highlight: true },
    { icon: Shield, text: "Licensed & Insured" },
    { icon: Wrench, text: "All Brands Serviced" },
    { icon: Star, text: "4.9/5 Customer Rating" },
    { icon: CheckCircle2, text: "Satisfaction Guaranteed" },
  ];

  return (
    <section aria-label="Key features" className="bg-gradient-to-r from-background via-muted/20 to-background border-y shadow-sm">
      <div className="container">
        {/* Mobile: Scrollable horizontal list */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {features.map((feature, i) => (
              <div key={i} className="flex-shrink-0">
                <FeatureItem {...feature} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Even grid */}
        <div className="hidden md:grid md:grid-cols-5">
          {features.map((feature, i) => (
            <div key={i} className="border-r last:border-r-0 border-border/30">
              <FeatureItem {...feature} />
            </div>
          ))}
        </div>
      </div>

      {/* Animated bottom accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
    </section>
  );
};

export default FeaturesBar;