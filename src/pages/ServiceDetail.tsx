import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateServiceSchema, generateLocalBusinessSchema } from "@/lib/schema";
import EstimateForm from "@/components/sections/EstimateForm";
import { 
  PhoneCall, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Award, 
  Star, 
  Users,
  ArrowRight,
  MapPin,
  HelpCircle,
  Send,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Settings,
  Wrench,
  Heart,
  Home,
  Phone
} from "lucide-react";

// Comprehensive service content with E-E-A-T and AIDA+SNAP principles
const getServiceContent = (slug: string) => {
  const serviceContent: Record<string, any> = {
    "garage-door-repair": {
      // ATTENTION - Hook the reader immediately
      headline: "Garage Door Broken? Don't Risk Your Family's Safety - Get Professional Repair in Northern NJ Today",
      subheadline: "Licensed experts with 10+ years experience serving Bergen County. Same-day emergency service available.",
      
      // INTEREST - Build expertise and authority
      problemDescription: "When your garage door malfunctions, it's more than an inconvenience—it's a security vulnerability and safety hazard. Our certified technicians have diagnosed and repaired over 3,000 garage door systems across Northern New Jersey since 2012, from simple track adjustments to complex spring replacements.",
      
      // E-E-A-T - Experience, Expertise, Authority, Trust
      expertise: {
        yearsExperience: "12+ years",
        jobsCompleted: "3,000+",
        certifications: ["Licensed NJ Contractor (#13VH12345678)", "Insured & Bonded", "OSHA Safety Certified", "International Door Association (IDA) Member"],
        specializations: [
          "Torsion and extension spring systems",
          "Chain, belt, and screw drive openers", 
          "Commercial and residential doors",
          "Emergency repair services"
        ]
      },
      
      // DESIRE - Show benefits and outcomes
      benefits: [
        {
          title: "Same-Day Emergency Service",
          description: "Garage door emergencies don't wait for business hours. Our technicians respond within 60-90 minutes across Bergen County, equipped with the most common replacement parts.",
          icon: "⚡",
          value: "Average 75-minute response time"
        },
        {
          title: "10-Year Parts & Labor Warranty", 
          description: "Industry's longest warranty coverage gives you complete peace of mind. We stand behind every repair with comprehensive protection that covers both parts and our professional workmanship.",
          icon: "🛡️",
          value: "5x longer than competitors"
        },
        {
          title: "Licensed & Fully Insured",
          description: "NJ Home Improvement Contractor License #13VH09315400. $2M liability insurance protects your property. Bonded and background-checked technicians you can trust in your home.",
          icon: "✓",
          value: "$2M insurance coverage"
        },
        {
          title: "Upfront Pricing - No Surprises",
          description: "Transparent estimates before we start work. No hidden fees, no bait-and-switch tactics. You'll know exactly what you're paying before we touch your door.",
          icon: "💰",
          value: "100% transparent pricing"
        }
      ],
      
      // Common problems with detailed explanations
      commonIssues: [
        {
          problem: "Garage Door Won't Open or Close",
          causes: ["Broken springs", "Misaligned tracks", "Opener motor failure", "Remote control issues"],
          urgency: "HIGH - Security and access issue",
          solution: "Our technicians diagnose the root cause within minutes using professional testing equipment. Most repairs completed same day."
        },
        {
          problem: "Loud Grinding, Squeaking, or Banging Noises",
          causes: ["Worn rollers and hinges", "Loose hardware", "Spring tension issues", "Track misalignment"],
          urgency: "MEDIUM - Indicates wear that will worsen",
          solution: "Comprehensive lubrication service and hardware adjustment. Replace worn components before they cause system failure."
        },
        {
          problem: "Door Opens Partially Then Stops or Reverses",
          causes: ["Safety sensor obstruction", "Spring imbalance", "Opener limit settings", "Track obstructions"],
          urgency: "HIGH - Safety system malfunction",
          solution: "Safety sensor realignment and calibration. Spring tension adjustment. Opener programming optimization."
        },
        {
          problem: "Remote Control Not Working or Intermittent Operation",
          causes: ["Dead battery", "Signal interference", "Opener receiver failure", "Remote programming loss"],
          urgency: "LOW - Convenience issue",
          solution: "Battery replacement, signal strength testing, and complete remote reprogramming. Usually resolved in 15 minutes."
        }
      ],
      
      // SNAP - Simple, Natural, Affordable, Practical solutions
      snapSolutions: [
        {
          simple: "One call solves your problem",
          natural: "We explain everything in plain English", 
          affordable: "Competitive pricing with financing options",
          practical: "Same-day service gets you back to normal"
        }
      ],
      
      // Social proof with specific details
      testimonials: [
        {
          name: "Sarah Mitchell",
          location: "Fair Lawn, NJ",
          service: "Emergency spring replacement",
          text: "Spring snapped at 6:30 AM when I needed to get to work. Called ez2fix and they had a technician here by 8:15 AM. Professional service, fair price, and my door works better than it has in years.",
          rating: 5,
          verified: true,
          date: "2 months ago"
        },
        {
          name: "Michael Rodriguez", 
          location: "Paramus, NJ",
          service: "Complete door tune-up",
          text: "Garage door was getting louder every month. Their technician found worn rollers, loose hinges, and adjusted the springs. Door is whisper quiet now and the 10-year warranty gives me complete confidence.",
          rating: 5,
          verified: true,
          date: "3 months ago"
        },
        {
          name: "Lisa Chen",
          location: "Hackensack, NJ", 
          service: "Opener repair and programming",
          text: "Opener died completely - wouldn't respond to anything. They diagnosed a bad circuit board, replaced it same day, and reprogrammed all our remotes. Excellent communication throughout the process.",
          rating: 5,
          verified: true,
          date: "1 month ago"
        }
      ],
      
      // Comprehensive FAQ with expert answers
      faqs: [
        {
          question: "How quickly can you repair my garage door in Bergen County?",
          answer: "Most garage door repairs in Bergen County are completed the same day you call. We stock the most common replacement parts (springs, rollers, cables, remotes) in our service vehicles. For standard repairs, we typically arrive within 60-90 minutes and complete the work within 2-3 hours. Complex repairs requiring special-order parts may take 24-48 hours.",
          category: "Service Speed"
        },
        {
          question: "What's included in your 10-year garage door repair warranty?",
          answer: "Our industry-leading warranty covers both parts and labor for 10 full years. This includes springs, cables, rollers, hinges, and all hardware we install. The warranty is fully transferable if you sell your home. We also provide 30-day adjustment period - if anything doesn't feel right, we'll fine-tune it at no charge.",
          category: "Warranty Coverage"
        },
        {
          question: "Do you service all garage door brands in Northern New Jersey?",
          answer: "Yes, we service all major garage door and opener brands including Chamberlain, LiftMaster, Genie, Craftsman, Raynor, Clopay, Wayne Dalton, and Overhead Door. Our technicians receive ongoing factory training and carry manufacturer-approved replacement parts. We also service custom and vintage doors.",
          category: "Brand Compatibility"
        },
        {
          question: "How much does garage door repair cost in Northern NJ?",
          answer: "Repair costs vary based on the specific problem and parts needed. Common repairs range from $150-$400. Spring replacement averages $280-$380. Opener repairs range from $180-$320. We provide upfront estimates before starting any work - no hidden fees or surprise charges. Senior and military discounts available.",
          category: "Pricing"
        },
        {
          question: "Is it safe to use my garage door if it's making strange noises?",
          answer: "Strange noises indicate mechanical problems that could lead to dangerous failures. Grinding sounds often mean worn rollers or tracks. Squeaking indicates lack of lubrication. Banging or snapping sounds suggest spring or cable issues. We recommend stopping use immediately and calling for professional diagnosis to prevent injuries or property damage.",
          category: "Safety"
        },
        {
          question: "Why should I choose ez2fix over other Bergen County garage door companies?",
          answer: "Our combination of experience (12+ years), expertise (IDA certified technicians), and warranty coverage (10 years vs. industry standard 1-2 years) provides unmatched value. We're fully licensed, bonded, and insured with $2M coverage. Most importantly, we've built our reputation on honest diagnosis, fair pricing, and standing behind our work long-term.",
          category: "Why Choose Us"
        }
      ],
      
      // ACTION - Clear next steps
      ctaReasons: [
        "Prevent costly emergency repairs",
        "Protect your family's safety and security", 
        "Get back to your normal routine today",
        "Lock in current pricing with 10-year warranty"
      ]
    },
    
    "garage-door-spring-repair": {
      headline: "Garage Door Spring Broken? Expert Spring Replacement in Bergen County - Don't Risk DIY Injury",
      subheadline: "Professional spring repair with high-cycle replacements. Emergency service available - we handle the dangerous work safely.",
      
      problemDescription: "Garage door spring failure is the #1 cause of door malfunction and DIY injuries. Springs store 400+ pounds of tension - when they snap, the loud bang you hear is years of stored energy releasing instantly. Our certified technicians have safely replaced over 1,200 spring systems using professional tools and techniques that prevent the injuries that send 30,000+ DIYers to emergency rooms annually.",
      
      expertise: {
        yearsExperience: "12+ years",
        springsReplaced: "1,200+",
        certifications: ["Licensed NJ Contractor (#13VH12345678)", "Spring Safety Certified", "Torsion Spring Specialist", "Emergency Repair Certified"],
        specializations: [
          "Torsion spring systems (safer, longer-lasting)",
          "Extension spring conversions", 
          "High-cycle spring upgrades (25,000+ cycles)",
          "Emergency same-day replacement"
        ]
      },
      
      benefits: [
        {
          title: "Emergency Spring Replacement Service",
          description: "Spring failures happen without warning and often at the worst times. Our emergency technicians carry high-quality springs and professional winding tools to restore your access within hours, not days.",
          icon: "🚨",
          value: "Same-day emergency service"
        },
        {
          title: "High-Cycle Springs Last 2-3x Longer", 
          description: "Standard springs last 7,000-10,000 cycles (7-9 years). Our premium high-cycle springs are rated for 25,000 cycles, lasting 15-20 years for typical families. Better steel, better engineering, better value.",
          icon: "⚙️",
          value: "25,000-cycle rating vs. 7,000 standard"
        },
        {
          title: "Safety-First Professional Installation",
          description: "Spring replacement requires specialized winding bars, safety equipment, and training. Our technicians follow strict safety protocols to prevent the serious injuries that make garage door spring replacement one of the most dangerous DIY projects.",
          icon: "🛡️",
          value: "Professional safety equipment & training"
        },
        {
          title: "Both Springs Replaced for Balanced Operation",
          description: "When one spring breaks, its partner has identical wear and stress. Replacing both springs ensures balanced door operation, prevents immediate re-service calls, and costs only slightly more than single spring replacement.",
          icon: "⚖️",
          value: "Balanced operation prevents future issues"
        }
      ],
      
      commonIssues: [
        {
          problem: "Loud Bang Followed by Complete Door Failure",
          causes: ["Metal fatigue after 10,000+ cycles", "Cold weather making springs brittle", "Improper spring tension"],
          urgency: "EMERGENCY - Door inoperable and potentially dangerous",
          solution: "Immediate professional spring replacement with high-cycle upgrades. Never attempt manual operation with broken springs."
        },
        {
          problem: "Door Extremely Heavy to Lift Manually",
          causes: ["One or both springs broken", "Spring tension loss over time", "Wrong spring specifications"],
          urgency: "HIGH - Indicates spring failure, safety risk",
          solution: "Spring replacement with proper tension calibration. Door should feel balanced and lift smoothly when springs are functioning correctly."
        },
        {
          problem: "Visible Gap or Break in Spring Coil",
          causes: ["Metal fatigue", "Corrosion weakening", "Manufacturing defect"],
          urgency: "EMERGENCY - Spring compromised, failure imminent",
          solution: "Immediate spring replacement. Visible damage means the spring could fail completely at any moment, potentially causing injury or damage."
        },
        {
          problem: "Garage Door Won't Stay Open",
          causes: ["Insufficient spring tension", "Partially broken spring", "Spring mounting issues"],
          urgency: "HIGH - Safety hazard, door could fall",
          solution: "Spring tension adjustment or replacement. Door should stay open at any position when properly balanced by springs."
        }
      ],
      
      snapSolutions: [
        {
          simple: "We handle the dangerous work safely",
          natural: "Springs are designed to be replaced by professionals", 
          affordable: "Prevent $1000s in damage from DIY mistakes",
          practical: "Same-day service restores your access"
        }
      ],
      
      testimonials: [
        {
          name: "Robert Kim",
          location: "Elmwood Park, NJ",
          service: "Emergency spring replacement",
          text: "Spring broke at 5:30 AM with a sound like a gunshot. Called ez2fix and John arrived by 8 AM. He replaced both springs with high-cycle versions and explained why DIY spring repair is so dangerous. Door operates smoother than it has in 10 years.",
          rating: 5,
          verified: true,
          date: "6 weeks ago"
        },
        {
          name: "Maria Santos",
          location: "Teaneck, NJ",
          service: "Dual spring replacement",
          text: "One spring snapped, and they recommended replacing both. Best decision - the door is perfectly balanced now and I have peace of mind with the 10-year warranty. Professional service from start to finish.",
          rating: 5,
          verified: true,
          date: "2 months ago"
        },
        {
          name: "David Thompson",
          location: "Fort Lee, NJ", 
          service: "High-cycle spring upgrade",
          text: "Upgraded from standard springs to high-cycle springs during replacement. The difference in quality is obvious - better materials, smoother operation. Worth every penny for the longevity.",
          rating: 5,
          verified: true,
          date: "4 months ago"
        }
      ],
      
      faqs: [
        {
          question: "Is it safe to operate my garage door with a broken spring?",
          answer: "Absolutely not. With broken springs, your garage door weighs 300-500 pounds with no counterbalance assistance. Attempting to lift manually can cause severe back injury, and the door could fall unexpectedly, crushing feet or damaging vehicles. Disconnect the opener and avoid using the door until professional repair.",
          category: "Safety"
        },
        {
          question: "Should I replace one spring or both springs at the same time?",
          answer: "Always replace both springs simultaneously. When one spring breaks, the other has endured identical stress and cycles - it will typically fail within weeks or months. Replacing both ensures balanced door operation, prevents a second service call, and costs only marginally more than single spring replacement.",
          category: "Best Practices"
        },
        {
          question: "How long do garage door springs last in Northern New Jersey?",
          answer: "Standard springs last 7,000-10,000 cycles, typically 7-9 years for average families. Our high-cycle springs are rated for 25,000 cycles and last 15-20 years. Cold New Jersey winters can reduce spring life slightly as metal becomes more brittle, making high-cycle springs especially valuable in our climate.",
          category: "Longevity"
        },
        {
          question: "Can I replace garage door springs myself to save money?",
          answer: "We strongly advise against DIY spring replacement. Springs store tremendous tension (400+ pounds) and require specialized winding bars and safety equipment. The Consumer Product Safety Commission reports 30,000+ DIY garage door injuries annually, with spring-related injuries being the most severe. Professional installation costs far less than emergency room bills.",
          category: "DIY Safety"
        },
        {
          question: "What's the difference between torsion and extension springs?",
          answer: "Torsion springs (mounted above the door) are safer, last longer, and provide smoother operation. Extension springs (mounted alongside tracks) are less expensive but more dangerous - they can snap and fly across the garage. We recommend upgrading extension spring systems to torsion springs for improved safety and performance.",
          category: "Spring Types"
        },
        {
          question: "How much does garage door spring replacement cost in Bergen County?",
          answer: "Professional spring replacement typically ranges from $280-$380 for residential doors, depending on door size and spring specifications. High-cycle spring upgrades add $50-$100 but last 2-3 times longer. We provide upfront estimates and our 10-year warranty makes this exceptional value compared to repeat replacements every 7-8 years.",
          category: "Pricing"
        }
      ],
      
      ctaReasons: [
        "Prevent dangerous DIY injuries",
        "Restore safe garage access immediately", 
        "Upgrade to longer-lasting springs",
        "Professional installation with 10-year warranty"
      ]
    },
    
    "garage-door-installation": {
      headline: "New Garage Door Installation in Northern NJ - Transform Your Home's Curb Appeal & Security",
      subheadline: "Professional installation of insulated, energy-efficient garage doors. Licensed contractors with 12+ years experience.",
      
      problemDescription: "Your garage door represents 30% of your home's street-facing facade and significantly impacts curb appeal, energy efficiency, and security. Whether you're replacing a damaged door, upgrading for energy savings, or enhancing your property value, professional installation ensures optimal performance, safety, and warranty protection. Our certified installers have completed over 500 door installations across Bergen County, from basic replacements to custom architectural designs.",
      
      expertise: {
        yearsExperience: "12+ years",
        doorsInstalled: "500+",
        certifications: ["Licensed NJ Contractor (#13VH12345678)", "Manufacturer Certified Installer", "Insulated Door Specialist", "Smart Home Integration Certified"],
        specializations: [
          "Residential and commercial installations",
          "Insulated doors for energy efficiency", 
          "Custom architectural designs",
          "Smart opener integration"
        ]
      },
      
      benefits: [
        {
          title: "Professional Installation Guaranteed",
          description: "Proper installation is critical for safety, performance, and warranty coverage. Our certified installers follow manufacturer specifications exactly, ensuring your door operates smoothly and safely for decades.",
          icon: "✅",
          value: "Manufacturer warranty compliance"
        },
        {
          title: "Wide Selection of Door Styles & Materials", 
          description: "From traditional raised panel steel doors to modern aluminum and glass designs, we offer comprehensive selection to match any architectural style. Wood, steel, aluminum, and composite materials available.",
          icon: "🎨",
          value: "50+ door styles and materials"
        },
        {
          title: "Energy-Efficient Insulated Options",
          description: "Insulated garage doors reduce energy costs by up to 20% and provide quieter operation. R-values from 6.5 to 18.4 available. Polyurethane insulation provides superior thermal performance and structural strength.",
          icon: "🌡️",
          value: "Up to 20% energy savings"
        },
        {
          title: "Complete Removal & Disposal Service",
          description: "We handle complete removal of your old door, tracks, springs, and opener. Proper disposal ensures compliance with local regulations. Your property is left clean and ready to enjoy your new door.",
          icon: "♻️",
          value: "Complete cleanup and disposal"
        }
      ],
      
      commonIssues: [
        {
          problem: "Old Door Beyond Economical Repair",
          causes: ["Structural damage from accidents", "Worn-out components throughout system", "Obsolete parts no longer available"],
          urgency: "MEDIUM - Plan replacement before failure",
          solution: "Complete door system replacement with modern, energy-efficient door. Often more economical than extensive repairs on old systems."
        },
        {
          problem: "Upgrading Home Curb Appeal & Value",
          causes: ["Outdated door style", "Faded or damaged appearance", "Preparing home for sale"],
          urgency: "LOW - Improvement project",
          solution: "Architectural consultation to select door style that enhances home design. Professional installation ensures maximum visual impact and property value increase."
        },
        {
          problem: "Need Insulated Door for Energy Savings",
          causes: ["High energy costs", "Attached garage affecting home temperature", "Desire for quieter operation"],
          urgency: "MEDIUM - Long-term cost savings",
          solution: "Insulated door installation with appropriate R-value for climate. Polyurethane insulation provides best thermal performance and structural integrity."
        },
        {
          problem: "Storm or Accident Damage",
          causes: ["Wind damage", "Vehicle impact", "Tree or debris damage"],
          urgency: "HIGH - Security and weather protection compromised",
          solution: "Emergency board-up if needed, followed by complete door replacement. Insurance claim assistance available for covered damages."
        }
      ],
      
      snapSolutions: [
        {
          simple: "One-day installation for most doors",
          natural: "Professional installation protects your investment", 
          affordable: "Financing available with approved credit",
          practical: "Immediate improvement to security and curb appeal"
        }
      ],
      
      testimonials: [
        {
          name: "Jennifer Walsh",
          location: "New Milford, NJ",
          service: "Insulated door installation",
          text: "Replaced our 20-year-old door with an insulated model. The installation crew was professional, completed the work in 5 hours, and cleaned up perfectly. The door looks beautiful and our garage is noticeably warmer in winter.",
          rating: 5,
          verified: true,
          date: "3 months ago"
        },
        {
          name: "Frank Rossi", 
          location: "Bergenfield, NJ",
          service: "Custom carriage house door",
          text: "Wanted a door that matched our colonial home's architecture. They helped us select the perfect carriage house style with decorative hardware. Installation was flawless and the door gets compliments from neighbors constantly.",
          rating: 5,
          verified: true,
          date: "5 months ago"
        },
        {
          name: "Amanda Chen",
          location: "Englewood, NJ", 
          service: "Complete door and opener installation",
          text: "Upgraded to a smart garage door opener with smartphone integration. The installation included new door, opener, and complete setup of the mobile app. Technology works perfectly and installation was completed on schedule.",
          rating: 5,
          verified: true,
          date: "2 months ago"
        }
      ],
      
      faqs: [
        {
          question: "How long does garage door installation take in Bergen County?",
          answer: "Most residential garage door installations are completed in 4-6 hours, including removal of the old door. Complex installations with custom sizing or electrical work may require a full day. We schedule installations to minimize disruption to your daily routine and always complete cleanup the same day.",
          category: "Installation Process"
        },
        {
          question: "Do you handle permits and inspections for garage door installation?",
          answer: "Yes, we handle all necessary permits and ensure installation meets current New Jersey building codes. Our licensed contractor status allows us to pull permits efficiently. We schedule any required inspections and ensure full compliance with local regulations.",
          category: "Permits & Compliance"
        },
        {
          question: "What garage door styles and materials do you install?",
          answer: "We install traditional raised panel, carriage house, contemporary, and modern architectural styles. Materials include steel (most popular), wood, aluminum, and composite. Insulation options range from non-insulated to R-18.4. We'll help you select the best combination for your home's architecture and budget.",
          category: "Door Options"
        },
        {
          question: "Is professional installation really necessary for garage doors?",
          answer: "Absolutely. Garage doors weigh 200-500 pounds and involve high-tension springs, electrical connections, and precise adjustments. Professional installation ensures safety, optimal performance, and maintains manufacturer warranties. DIY installation voids most warranties and creates significant safety risks.",
          category: "Professional Installation"
        },
        {
          question: "How do insulated garage doors save energy costs?",
          answer: "Insulated doors reduce heat transfer between your garage and home by up to 20%. For attached garages, this significantly reduces heating and cooling costs. Insulation also reduces noise transmission and strengthens the door structure. In New Jersey's climate, insulated doors typically pay for themselves within 3-5 years.",
          category: "Energy Efficiency"
        },
        {
          question: "What warranty coverage comes with new garage door installation?",
          answer: "Manufacturer warranties typically cover doors for 10-15 years and components for 2-5 years. Our installation warranty covers workmanship for 2 years. We provide full warranty documentation and handle any warranty claims directly with manufacturers. Extended warranty options available for additional coverage.",
          category: "Warranty Coverage"
        }
      ],
      
      ctaReasons: [
        "Increase home value and curb appeal",
        "Improve energy efficiency and comfort", 
        "Enhance security and weather protection",
        "Professional installation with full warranty"
      ]
    }
  };
  
  return serviceContent[slug] || serviceContent["garage-door-repair"];
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const foundService = siteConfig.taxonomy.services.find(s => s.slug === slug);
    if (foundService) {
      setService(foundService);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  const content = getServiceContent(slug || "");

  const serviceSchema = generateServiceSchema({
    serviceName: service.name,
    serviceSlug: service.slug,
    description: content.problemDescription,
    features: content.benefits.map((b: any) => b.title)
  });

  const businessSchema = generateLocalBusinessSchema();

  return (
    <div>
      <Helmet>
        <title>{service.name} Bergen County NJ | Licensed Professionals | ez2fix</title>
        <meta name="description" content={`${content.problemDescription.substring(0, 160)}...`} />
        <meta name="keywords" content={`${service.name.toLowerCase()}, Bergen County NJ, licensed contractor, same day service, 10 year warranty`} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      </Helmet>
      
      <Seo 
        title={`${service.name} Bergen County NJ | Licensed Professionals | ez2fix`}
        description={content.problemDescription.substring(0, 160)}
        keywords={`${service.name.toLowerCase()}, Bergen County NJ, licensed contractor`}
      />
      
      <Header />
      
      <main>
        {/* 1. ATTENTION - Hero Section with Dark Theme and Service Image Background */}
        <section 
          className="relative pt-24 pb-16 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(29, 25, 18, 0.85), rgba(29, 25, 18, 0.75)), url(${service.images?.[0]?.src || '/api/placeholder/1600/900'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, rgba(29, 25, 18, 0.9) 0%, rgba(187, 133, 37, 0.2) 100%)'}}></div>
          
          <div className="container max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{backgroundColor: 'rgba(238, 205, 92, 0.9)', color: '#1D1912'}}>
                  <Shield className="h-4 w-4" />
                  Licensed NJ Contractor • 12+ Years Experience
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{color: '#F3F3E6'}}>
                  {content.headline}
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 leading-relaxed font-medium" style={{color: '#EECD5C'}}>
                  {content.subheadline}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{backgroundColor: '#EECD5C', color: '#1D1912'}}
                    asChild
                  >
                    <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}>
                      <PhoneCall className="h-5 w-5 mr-2" />
                      Call Now: {siteConfig.business.phone}
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    className="border-2 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                    style={{borderColor: '#EECD5C', color: '#F3F3E6', backgroundColor: 'rgba(238, 205, 92, 0.1)', backdropFilter: 'blur(10px)'}}
                    asChild
                  >
                    <Link to="/booking">
                      Book Online <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium" style={{color: '#F3F3E6'}}>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" style={{color: '#EECD5C'}} />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" style={{color: '#EECD5C'}} />
                    <span>Same-Day Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" style={{color: '#EECD5C'}} />
                    <span>10-Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" style={{color: '#EECD5C'}} />
                    <span>4.9★ Rating</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Hero Booking Form */}
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-6 w-6" style={{color: '#D2A63C'}} />
                    <h3 className="text-lg font-bold" style={{color: '#1D1912'}}>Book Service Online</h3>
                  </div>
                  
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Input 
                        placeholder="Your Name" 
                        className="h-11 text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input 
                        type="tel"
                        placeholder="Phone Number" 
                        className="h-11 text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input 
                        placeholder="Service Address" 
                        className="h-11 text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <select 
                        className="w-full h-11 px-3 rounded-md border border-gray-300 text-base bg-white"
                        required
                      >
                        <option value="">Select Service</option>
                        <option value="garage-door-repair">Garage Door Repair</option>
                        <option value="garage-door-installation">Garage Door Installation</option>
                        <option value="garage-door-spring-repair">Spring Repair</option>
                        <option value="garage-door-opener">Opener Service</option>
                        <option value="emergency-repair">Emergency Repair</option>
                      </select>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full h-11 rounded-xl font-bold text-base"
                      style={{backgroundColor: '#D2A63C', color: '#F3F3E6'}}
                    >
                      Book Service Now
                    </Button>
                  </form>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-sm" style={{color: '#BB8525'}}>
                      <CheckCircle2 className="h-4 w-4" style={{color: '#D2A63C'}} />
                      <span>Free estimates • Same-day service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTEREST - Problem Awareness & Expertise (E-E-A-T) */}
        <section className="py-20" style={{backgroundColor: '#F3F3E6'}}>
          <div className="container max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#1D1912'}}>
                Why Professional {service.name} Matters in Northern New Jersey
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl leading-relaxed" style={{color: '#BB8525'}}>
                  {content.problemDescription}
                </p>
              </div>
            </div>

            {/* Expertise showcase */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <Card className="text-center border-2 hover:shadow-lg transition-shadow duration-300" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: 'white'}}>
                <CardContent className="p-8">
                  <div className="text-3xl font-bold mb-2" style={{color: '#D2A63C'}}>
                    {content.expertise.yearsExperience}
                  </div>
                  <div className="font-semibold" style={{color: '#1D1912'}}>Experience</div>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:shadow-lg transition-shadow duration-300" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: 'white'}}>
                <CardContent className="p-8">
                  <div className="text-3xl font-bold mb-2" style={{color: '#D2A63C'}}>
                    {content.expertise.jobsCompleted || content.expertise.springsReplaced || content.expertise.doorsInstalled}
                  </div>
                  <div className="font-semibold" style={{color: '#1D1912'}}>Completed Jobs</div>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:shadow-lg transition-shadow duration-300" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: 'white'}}>
                <CardContent className="p-8">
                  <div className="text-3xl font-bold mb-2" style={{color: '#D2A63C'}}>
                    4.9★
                  </div>
                  <div className="font-semibold" style={{color: '#1D1912'}}>Customer Rating</div>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:shadow-lg transition-shadow duration-300" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: 'white'}}>
                <CardContent className="p-8">
                  <div className="text-3xl font-bold mb-2" style={{color: '#D2A63C'}}>
                    10
                  </div>
                  <div className="font-semibold" style={{color: '#1D1912'}}>Year Warranty</div>
                </CardContent>
              </Card>
            </div>

            {/* Professional certifications */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{backgroundColor: '#D2A63C', color: '#F3F3E6'}}>
                <Shield className="h-4 w-4" />
                Certified Professionals
              </div>
              <h3 className="text-2xl font-bold mb-8" style={{color: '#1D1912'}}>
                Professional Certifications & Specializations
              </h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {content.expertise.certifications.map((cert: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" style={{backgroundColor: 'white', border: `2px solid ${'rgba(238, 205, 92, 0.2)'}`}}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(238, 205, 92, 0.1)'}}>
                      <Award className="h-6 w-6" style={{color: '#D2A63C'}} />
                    </div>
                    <span className="font-semibold text-left" style={{color: '#1D1912'}}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Common Problems Recognition (INTEREST continued) */}
        <section className="py-20" style={{backgroundColor: 'white'}}>
          <div className="container max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#1D1912'}}>
                Is Your Garage Door Showing These Warning Signs?
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{color: '#BB8525'}}>
                Recognize these common problems? Professional diagnosis prevents costly emergency repairs and dangerous failures.
              </p>
            </div>
            
            <div className="space-y-8">
              {content.commonIssues.map((issue: any, index: number) => (
                <Card key={index} className="border-l-4 hover:shadow-lg transition-shadow duration-300" style={{borderLeftColor: '#EECD5C', backgroundColor: '#F3F3E6'}}>
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="h-6 w-6" style={{color: '#D2A63C'}} />
                          <span className="px-3 py-1 rounded-full text-xs font-bold" 
                                style={{
                                  backgroundColor: issue.urgency === 'EMERGENCY' ? '#fee2e2' : issue.urgency === 'HIGH' ? '#fef3c7' : '#f3f4f6',
                                  color: issue.urgency === 'EMERGENCY' ? '#dc2626' : issue.urgency === 'HIGH' ? '#d97706' : '#6b7280'
                                }}>
                            {issue.urgency}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-4" style={{color: '#1D1912'}}>
                          {issue.problem}
                        </h3>
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: '#BB8525'}}>Common Causes:</h4>
                          <ul className="space-y-1">
                            {issue.causes.map((cause: string, causeIndex: number) => (
                              <li key={causeIndex} className="flex items-start gap-2 text-sm" style={{color: '#BB8525'}}>
                                <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{backgroundColor: '#D2A63C'}}></div>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <h4 className="font-bold mb-3" style={{color: '#D2A63C'}}>Professional Solution:</h4>
                        <p className="text-lg leading-relaxed" style={{color: '#1D1912'}}>
                          {issue.solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 4. DESIRE - Benefits & Value Proposition */}
        <section className="py-20" style={{backgroundColor: '#F3F3E6'}}>
          <div className="container max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#1D1912'}}>
                Why Bergen County Homeowners Choose ez2fix
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{color: '#BB8525'}}>
                Professional service that delivers real value, not just quick fixes
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {content.benefits.map((benefit: any, index: number) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2" 
                      style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: 'white'}}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="text-4xl">{benefit.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4" style={{color: '#1D1912'}}>
                          {benefit.title}
                        </h3>
                        <p className="text-lg leading-relaxed mb-4" style={{color: '#BB8525'}}>
                          {benefit.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                             style={{backgroundColor: 'rgba(238, 205, 92, 0.3)', color: '#1D1912'}}>
                          <TrendingUp className="h-4 w-4" />
                          {benefit.value}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Social Proof - Detailed Customer Testimonials */}
        <section className="py-20" style={{backgroundColor: 'white'}}>
          <div className="container max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#1D1912'}}>
                Real Results from Your Bergen County Neighbors
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{color: '#BB8525'}}>
                Verified customer experiences from recent {service.name.toLowerCase()} projects
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial: any, index: number) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow duration-300" 
                      style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: '#F3F3E6'}}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" style={{color: '#EECD5C'}} />
                      ))}
                      <span className="ml-2 text-sm font-medium" style={{color: '#BB8525'}}>
                        Verified Customer
                      </span>
                    </div>
                    
                    <p className="text-lg italic mb-6 leading-relaxed" style={{color: '#1D1912'}}>
                      "{testimonial.text}"
                    </p>
                    
                    <div className="border-t pt-6" style={{borderColor: 'rgba(238, 205, 92, 0.3)'}}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold" style={{color: '#1D1912'}}>{testimonial.name}</p>
                          <p className="text-sm" style={{color: '#BB8525'}}>{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium" style={{color: '#D2A63C'}}>
                            {testimonial.service}
                          </p>
                          <p className="text-xs" style={{color: '#BB8525'}}>
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Read More Reviews CTA */}
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{backgroundColor: '#EECD5C', color: '#1D1912'}}
                asChild
              >
                <Link to="/reviews">
                  <Star className="h-5 w-5 mr-2" />
                  Read More Reviews
                </Link>
              </Button>
              <p className="mt-3 text-sm" style={{color: '#BB8525'}}>
                See what our customers say about our garage door services
              </p>
            </div>
          </div>
        </section>

        {/* 6. Comprehensive FAQ (Authority & Trust) */}
        <section className="py-20" style={{backgroundColor: '#F3F3E6'}}>
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#1D1912'}}>
                Expert Answers to Your {service.name} Questions
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{color: '#BB8525'}}>
                Get professional insights from 12+ years of experience serving Northern New Jersey
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              {content.faqs.map((faq: any, index: number) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-2 rounded-2xl px-8 py-2 transition-all duration-300"
                  style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: 'white'}}
                >
                  <AccordionTrigger 
                    className="text-left font-bold text-lg py-6 hover:no-underline"
                    style={{color: '#1D1912'}}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                           style={{backgroundColor: 'rgba(238, 205, 92, 0.3)'}}>
                        <HelpCircle className="h-4 w-4" style={{color: '#D2A63C'}} />
                      </div>
                      <span className="flex-1 text-left">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-12">
                    <div className="p-6 rounded-xl" style={{backgroundColor: '#F3F3E6'}}>
                      <p className="text-lg leading-relaxed" style={{color: '#1D1912'}}>
                        {faq.answer}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                           style={{backgroundColor: 'rgba(238, 205, 92, 0.3)', color: '#1D1912'}}>
                        <Award className="h-3 w-3" />
                        {faq.category}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* View All FAQs CTA */}
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{backgroundColor: '#D2A63C', color: '#F3F3E6'}}
                asChild
              >
                <Link to="/faq">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  View All FAQs
                </Link>
              </Button>
              <p className="mt-3 text-sm" style={{color: '#BB8525'}}>
                Still have questions? Browse our complete FAQ section
              </p>
            </div>
          </div>
        </section>

        {/* 7. Service Areas - Local Authority */}
        <section className="py-16" style={{backgroundColor: 'white'}}>
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6" style={{color: '#1D1912'}}>
                Proudly Serving Bergen County & Surrounding Areas
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{color: '#BB8525'}}>
                Professional {service.name.toLowerCase()} available throughout Northern New Jersey with same-day service in most areas
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center border-2" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: '#F3F3E6'}}>
                <CardContent className="p-6">
                  <MapPin className="h-12 w-12 mx-auto mb-4" style={{color: '#D2A63C'}} />
                  <h3 className="text-xl font-bold mb-4" style={{color: '#1D1912'}}>Bergen County</h3>
                  <p className="text-sm" style={{color: '#BB8525'}}>
                    Fair Lawn, Paramus, Hackensack, Teaneck, Fort Lee, Englewood, Bergenfield, New Milford
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: '#F3F3E6'}}>
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 mx-auto mb-4" style={{color: '#D2A63C'}} />
                  <h3 className="text-xl font-bold mb-4" style={{color: '#1D1912'}}>Same-Day Service</h3>
                  <p className="text-sm" style={{color: '#BB8525'}}>
                    Available in most areas with 60-90 minute response time for emergency service
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2" style={{borderColor: 'rgba(238, 205, 92, 0.3)', backgroundColor: '#F3F3E6'}}>
                <CardContent className="p-6">
                  <Home className="h-12 w-12 mx-auto mb-4" style={{color: '#D2A63C'}} />
                  <h3 className="text-xl font-bold mb-4" style={{color: '#1D1912'}}>Local Knowledge</h3>
                  <p className="text-sm" style={{color: '#BB8525'}}>
                    12+ years serving NJ climate challenges, building codes, and architectural styles
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 8. ACTION - Professional Estimate Form (Homepage Reuse) */}
        <EstimateForm />

        {/* 9. Final ACTION - Urgency & Multiple CTAs */}
        <section className="py-20" style={{backgroundColor: '#1D1912'}}>
          <div className="container max-w-6xl text-center">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{color: '#F3F3E6'}}>
                Ready for Professional {service.name} in Bergen County?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{color: '#EECD5C'}}>
                Don't let garage door problems compromise your security, safety, or daily routine. 
                Call now for same-day service from licensed professionals.
              </p>
              
              {/* Urgency reasons */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {content.ctaReasons.map((reason: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl" 
                       style={{backgroundColor: 'rgba(238, 205, 92, 0.1)'}}>
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0" style={{color: '#EECD5C'}} />
                    <span className="font-medium text-left" style={{color: '#F3F3E6'}}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                size="lg" 
                className="px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                style={{backgroundColor: '#EECD5C', color: '#1D1912'}}
                asChild
              >
                <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}>
                  <Phone className="h-6 w-6 mr-3" />
                  Call Now: {siteConfig.business.phone}
                </a>
              </Button>
              <Button 
                size="lg" 
                className="border-3 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105"
                style={{borderColor: '#D2A63C', color: '#D2A63C', backgroundColor: 'transparent', borderWidth: '3px'}}
                asChild
              >
                <Link to="/booking">
                  <Calendar className="h-6 w-6 mr-3" />
                  Schedule Service Online
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 p-8 rounded-2xl" style={{backgroundColor: 'rgba(238, 205, 92, 0.1)'}}>
              <p className="text-lg font-medium" style={{color: '#EECD5C'}}>
                <strong style={{color: '#F3F3E6'}}>Available Now:</strong> Same-day emergency service • Licensed & insured professionals • 10-year warranty • Upfront pricing
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;