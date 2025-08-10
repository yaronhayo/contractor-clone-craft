import { Shield, Clock, Wrench, Star, CheckCircle2, Phone } from "lucide-react";

const FeatureItem = ({ icon: Icon, text, highlight }: { 
  icon: React.ComponentType<any>; 
  text: string; 
  highlight?: boolean; 
}) => (
  <div className={`flex items-center justify-center gap-3 py-4 px-6 transition-all duration-300 ${
    highlight ? 'bg-primary/20 text-primary' : 'text-white hover:bg-primary/10 hover:text-primary'
  }`}>
    <Icon className="h-5 w-5 flex-shrink-0" />
    <span className="font-semibold text-sm md:text-base whitespace-nowrap">{text}</span>
  </div>
);

const FeaturesBar = () => {
  const features = [
    { icon: Clock, text: "Same Day Service", highlight: true },
    { icon: Shield, text: "Licensed NJ #13VH13578200" },
    { icon: Wrench, text: "All Garage Door Brands" },
    { icon: Star, text: "5.0/5 Customer Rating" },
    { icon: CheckCircle2, text: "10 Year Warranty" },
  ];

  return (
    <section aria-label="Key features" className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y shadow-lg">
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
        <div className="hidden md:grid md:grid-cols-5 divide-x divide-gray-700">
          {features.map((feature, i) => (
            <div key={i} className="last:divide-x-0">
              <FeatureItem {...feature} />
            </div>
          ))}
        </div>
      </div>

      {/* Animated bottom accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};

export default FeaturesBar;