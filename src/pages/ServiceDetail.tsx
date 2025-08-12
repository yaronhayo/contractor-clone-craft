import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorBoundary from "@/components/ErrorBoundary";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceProofSection from "@/components/sections/ServiceProofSection";
import ServiceBenefits from "@/components/sections/ServiceBenefits";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import FAQ from "@/components/sections/FAQ";
import ReviewsTeaser from "@/components/sections/ReviewsTeaser";
import FinalCTA from "@/components/sections/FinalCTA";
import { generateServiceSchema, generateLocalBusinessSchema } from "@/lib/schema";
import { 
  PhoneCall, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Award, 
  Star, 
  Wrench, 
  Users,
  ArrowRight,
  MapPin,
  Phone,
  Zap,
  Heart,
  TrendingUp,
  DollarSign
} from "lucide-react";

// Service-specific content helpers
const getServiceProblem = (slug: string): string => {
  const problems: Record<string, string> = {
    "garage-door-spring-repair": "Garage Door Won't Open? Spring Broken?",
    "garage-door-repair": "Garage Door Acting Up? Won't Close Properly?",
    "garage-door-installation": "Need a New Garage Door? Old One Beyond Repair?",
    "garage-door-opener-repair": "Garage Door Opener Dead? Remote Not Working?",
    "emergency-garage-door-repair": "Garage Door Emergency? Stuck Outside?",
    "commercial-garage-door-service": "Commercial Door Down? Business Operations Stopped?"
  };
  return problems[slug] || "Garage Door Problems?";
};

const getServiceAgitation = (slug: string): string => {
  const agitations: Record<string, string> = {
    "garage-door-spring-repair": "A broken garage door spring isn't just inconvenient - it's dangerous. Those springs are under enormous tension and can cause serious injury if not handled by professionals. Don't risk DIY repairs that could hurt you or damage your property further.",
    "garage-door-repair": "When your garage door won't close properly, your home's security is compromised. Leaving it partially open invites theft and lets weather damage your belongings. Every day you wait, the problem gets worse and more expensive to fix.",
    "garage-door-installation": "That old garage door isn't just ugly - it's costing you money every month through poor insulation and frequent repairs. A new door pays for itself through energy savings and eliminates those constant repair headaches.",
    "garage-door-opener-repair": "A dead garage door opener means you're stuck manually lifting heavy doors or trapped outside during bad weather. Don't struggle with heavy lifting when a simple repair can restore your convenience and safety.",
    "emergency-garage-door-repair": "When you're stuck outside in freezing weather or can't get your car out for work, every minute counts. Emergency garage door problems don't wait for convenient times - you need immediate professional help.",
    "commercial-garage-door-service": "When your commercial garage door fails, your entire business operation stops. Loading docks become unusable, deliveries are blocked, and every hour of downtime costs you money and damages customer relationships."
  };
  return agitations[slug] || "Garage door problems never happen at convenient times and only get worse without professional attention.";
};

const getServiceFeatures = (slug: string): string[] => {
  const features: Record<string, string[]> = {
    "garage-door-spring-repair": [
      "High-tension spring replacement with proper tools",
      "Safety inspection of all door components", 
      "10-year warranty on parts and labor",
      "Emergency same-day service available"
    ],
    "garage-door-repair": [
      "Track realignment and panel replacement",
      "Hardware upgrades and weatherproofing",
      "Complete safety system testing",
      "Same-day service in most cases"
    ],
    "garage-door-installation": [
      "Custom sizing and professional fitting",
      "Energy-efficient insulated options",
      "Free on-site estimates",
      "10% senior citizen discount"
    ],
    "garage-door-opener-repair": [
      "All major brands serviced",
      "Remote programming and setup",
      "Safety sensor testing and calibration",
      "Tech support included with service"
    ],
    "emergency-garage-door-repair": [
      "15-minute average response time",
      "Mobile repair units fully equipped",
      "24/7 availability including holidays",
      "Emergency service at standard rates"
    ],
    "commercial-garage-door-service": [
      "Industrial-grade door installation",
      "Preventive maintenance contracts",
      "Business continuity focus",
      "Licensed commercial contractors"
    ]
  };
  return features[slug] || ["Professional service", "Licensed technicians", "Quality parts", "Satisfaction guarantee"];
};

const getServiceBenefits = (slug: string) => {
  const benefits: Record<string, Array<{icon: any, title: string, description: string, highlight?: string}>> = {
    "garage-door-spring-repair": [
      {
        icon: Shield,
        title: "Safety-First Spring Replacement",
        description: "Garage door springs store deadly amounts of energy. Our technicians use professional-grade tools and safety procedures to replace springs without risk to your family.",
        highlight: "OSHA Certified"
      },
      {
        icon: Clock,
        title: "Emergency Spring Repair",
        description: "Broken spring? We respond within 15 minutes with fully-stocked repair trucks. Most spring replacements completed same-day to get your garage door working again.",
        highlight: "15 Min Response"
      },
      {
        icon: Award,
        title: "10-Year Spring Warranty",
        description: "Unlike handymen who offer 90-day warranties, our springs come with a full 10-year parts and labor guarantee. We stand behind our work for the long haul.",
        highlight: "10 Year Warranty"
      }
    ],
    "garage-door-repair": [
      {
        icon: Wrench,
        title: "Complete Door Diagnostics",
        description: "We don't just fix the obvious problem. Our comprehensive inspection identifies all issues to prevent future breakdowns and ensure your door operates safely.",
        highlight: "Full Inspection"
      },
      {
        icon: Shield,
        title: "Licensed & Insured Repairs",
        description: "Don't trust garage door repairs to unlicensed handymen. We carry $1M liability insurance and hold valid NJ contractor licenses for your protection.",
        highlight: "NJ Licensed"
      },
      {
        icon: Clock,
        title: "Same-Day Service Available",
        description: "Most garage door repairs completed the same day you call. Our trucks carry common parts so we can get your door working without delays or return visits.",
        highlight: "Same Day Fix"
      }
    ]
  };
  
  // Default benefits for services not specifically defined
  const defaultBenefits = [
    {
      icon: Shield,
      title: "Licensed Professionals",
      description: "Fully licensed contractors with $1M liability insurance. Unlike handymen, we're legally qualified to work on your garage door systems.",
      highlight: "NJ Licensed"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: "Garage door problems don't wait for business hours. Our emergency team responds quickly when you're stuck or unsafe.",
      highlight: "Always Available"
    },
    {
      icon: Award,
      title: "10-Year Warranty",
      description: "We stand behind our work with industry-leading warranties. Most competitors offer only 90 days - we guarantee 10 years.",
      highlight: "Long Term Protection"
    }
  ];
  
  return benefits[slug] || defaultBenefits;
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Guard against missing slug parameter
  if (!slug) {
    console.error('ServiceDetail: No slug parameter found in URL');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Service URL</h1>
          <p>No service identifier found in the URL</p>
          <Button className="mt-4" onClick={() => window.location.href = '/services'}>
            View All Services
          </Button>
        </div>
      </div>
    );
  }

  // Debug logging for production
  useEffect(() => {
    console.log('ServiceDetail: Initializing...');
    console.log('ServiceDetail: slug =', slug);
    console.log('ServiceDetail: location =', location);
    console.log('ServiceDetail: window.location =', window.location.href);
    console.log('ServiceDetail: services available =', siteConfig.taxonomy?.services?.length);
    console.log('ServiceDetail: siteConfig loaded =', !!siteConfig);
    
    // Simulate loading time with proper cleanup
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      clearTimeout(timer);
    };
  }, [slug, location]);
  
  if (isLoading) {
    return <div>Loading service details...</div>; // This will be handled by Suspense skeleton
  }
  
  // Add error handling for missing slug or service
  if (!slug) {
    console.error('ServiceDetail: No slug provided');
    console.error('ServiceDetail: Current URL:', window.location.href);
    console.error('ServiceDetail: useParams result:', useParams());
    setError('No service slug provided');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p>No service identifier provided in URL</p>
          <p className="text-sm mt-2">Current URL: {window.location.href}</p>
          <Button className="mt-4" onClick={() => window.location.href = '/services'}>
            View All Services
          </Button>
        </div>
      </div>
    );
  }
  
  const service = siteConfig.taxonomy?.services?.find((s) => s.slug === slug) ?? siteConfig.taxonomy?.services?.[0];
  
  // If no service found, show error
  if (!service) {
    console.error('ServiceDetail: No service found for slug:', slug);
    console.error('ServiceDetail: Available services:', siteConfig.taxonomy?.services?.map(s => s.slug));
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p>Service "{slug}" not found in our catalog</p>
          <p className="text-sm mt-2">Available services: {siteConfig.taxonomy?.services?.map(s => s.slug).join(', ')}</p>
          <Button className="mt-4" onClick={() => window.location.href = '/services'}>
            View All Services
          </Button>
        </div>
      </div>
    );
  }
  
  console.log('ServiceDetail: Found service:', service.name);
  
  const category = siteConfig.taxonomy?.categories?.find((c) => c.slug === service.categorySlug);

  const problem = getServiceProblem(service.slug);
  const agitation = getServiceAgitation(service.slug);
  const features = getServiceFeatures(service.slug);
  const benefits = getServiceBenefits(service.slug);

  // Enhanced schema markup
  const serviceLd = generateServiceSchema({
    serviceName: service.name,
    serviceSlug: service.slug,
    description: service.shortDescription || `Professional ${service.name.toLowerCase()} in ${siteConfig.business.hqAddress.city}, NJ. Licensed contractors with 24/7 emergency service and 10-year warranty.`,
    features: features
  });

  const businessLd = generateLocalBusinessSchema();

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}${siteConfig.routes.servicesIndex}` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}${siteConfig.routes.individualService(service.slug)}` },
    ],
  };
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Loading Error</h1>
          <p className="mb-4">There was an issue loading this service page.</p>
          <Button onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }}>Refresh Page</Button>
        </div>
      </div>
    }>
      <div>
        <Seo title={`${service.name} | ${siteConfig.business.name}`} description={service.shortDescription || `Learn about ${service.name}. Get a free estimate today.`} canonical={siteConfig.routes.individualService(service.slug)} />
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
          <script type="application/ld+json">{JSON.stringify(businessLd)}</script>
          <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        </Helmet>
        <Header />
      
      <ServiceHero 
        title={service.name}
        subtitle={service.shortDescription || "Professional, reliable, and hassle‑free service."}
        problem={problem}
        agitation={agitation}
        serviceSlug={service.slug}
        features={features}
      />

      <ServiceProofSection serviceSlug={service.slug} />
      
      <ServiceBenefits serviceSlug={service.slug} benefits={benefits} />
      
      <Process />
      
      <ReviewsTeaser />
      
      <WhyUs />
      
      <FAQ />
      
        <FinalCTA />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ServiceDetail;
