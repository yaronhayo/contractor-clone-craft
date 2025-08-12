import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  Star, 
  Award, 
  Users, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Wrench, 
  Target, 
  Heart, 
  TrendingUp,
  Calendar,
  ThumbsUp
} from "lucide-react";

const About = () => {
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    ],
  };

  const companyStats = [
    { icon: Users, number: "750+", label: "Satisfied Customers", color: "text-primary" },
    { icon: Star, number: "5.0/5", label: "Average Rating", color: "text-primary" },
    { icon: Clock, number: "24/7", label: "Emergency Service", color: "text-accent" },
    { icon: Award, number: "10+", label: "Years Experience", color: "text-accent" }
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Safety & Expertise",
      description: "Licensed NJ contractors with $1M insurance coverage. Every technician is certified and follows strict safety protocols for high-tension spring work and electrical installations.",
      features: ["Licensed & Bonded", "Certified Technicians", "$1M Insurance Coverage"]
    },
    {
      icon: Heart,
      title: "Customer-First Service",
      description: "We treat every home like our own. Honest assessments, transparent pricing, and genuine care for your family's safety and satisfaction drive everything we do.",
      features: ["Honest Assessments", "Transparent Pricing", "Family-Owned Business"]
    },
    {
      icon: Target,
      title: "Quality & Reliability",
      description: "We use only premium parts from trusted manufacturers. Every installation and repair comes with comprehensive warranties because we stand behind our work.",
      features: ["Premium Parts Only", "Comprehensive Warranties", "Quality Guarantee"]
    }
  ];

  const timeline = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Started with a mission to provide honest, professional garage door service in Hudson County",
      achievement: "First 50 customers served"
    },
    {
      year: "2018",
      title: "Service Expansion",
      description: "Extended coverage to Bergen County, building a reputation for emergency response excellence",
      achievement: "24/7 emergency service launched"
    },
    {
      year: "2021", 
      title: "Technology Integration",
      description: "Embraced smart garage door technology and advanced diagnostic equipment for better service",
      achievement: "500th garage door serviced"
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Achieved top ratings across all service areas with consistent 5-star customer experiences",
      achievement: "750+ satisfied customers"
    }
  ];

  const teamStrengths = [
    "Licensed garage door specialists in New Jersey",
    "Ongoing training on latest garage door technology", 
    "Emergency response team available 24/7",
    "All major garage door brands certified",
    "Safety-first approach to high-tension springs",
    "Smart opener installation and programming expertise"
  ];

  return (
    <div>
      <Seo 
        title={`About ${siteConfig.business.name}`} 
        description={`Learn about our garage door experts serving Jersey City, Bergen County, Hudson County—licensed, insured, and trusted for all garage door needs.`} 
        canonical="/about" 
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      
      <main id="content">
        {/* Hero Section - Matching other pages */}
        <section className="relative min-h-[60vh] bg-gradient-to-br from-secondary via-gray-800 to-foreground flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,158,37,0.15),transparent)]" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          
          <div className="relative container">
            <nav aria-label="Breadcrumb" className="text-sm text-white mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
              <span className="mx-2">/</span> 
              <span className="text-white font-medium">About Us</span>
            </nav>
            
            <header className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Heart className="h-4 w-4" />
                Family-Owned & Trusted Since 2015
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                About ez2fix Garage Door Experts
              </h1>
              <p className="mt-6 text-lg text-white leading-relaxed">
                <strong>Your garage door problems, solved right.</strong> We're a family-owned business serving Bergen and Hudson Counties with honest, professional garage door service. From emergency repairs to new installations, we treat every customer like family.
              </p>
              
              {/* Quick Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="text-sm font-semibold text-white">750+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Shield className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-white">Licensed & $1M Insured</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 border border-muted">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-white">10+ Years Experience</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a
                    href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}
                    onClick={() => {
                      try {
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({ event: "phone_click", source: "about_hero", phone: siteConfig.business.phone });
                      } catch {}
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-4 text-lg font-bold border-2 border-muted text-foreground bg-background hover:bg-muted hover:text-foreground transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </header>
          </div>
        </section>

        {/* Company Stats Section */}
        <section className="relative py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <Card key={index} className={`text-center hover:shadow-lg transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                    <div className="text-sm text-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Target className="h-4 w-4" />
                Our Core Values
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                What Makes{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ez2fix Different
                </span>
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                We're not just another service company. We're your neighbors, committed to keeping Bergen and Hudson County families safe with reliable garage door service you can trust.
              </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className={`h-full hover:shadow-xl transition-all duration-300 animate-fade-in border-2 hover:border-primary/20`} style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-foreground leading-relaxed mb-6">
                      {value.description}
                    </p>
                    
                    <div className="space-y-3">
                      {value.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Story Timeline */}
        <section className="relative py-16 md:py-24 bg-background">
          <div className="container">
            <header className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Calendar className="h-4 w-4" />
                Our Journey
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Building Trust{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Since 2015
                </span>
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                From a small local operation to the most trusted garage door service in Northern New Jersey—here's how we've grown by putting customers first.
              </p>
            </header>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-start gap-8 animate-fade-in`} style={{ animationDelay: `${index * 200}ms` }}>
                    <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center relative z-10 border-4 border-background shadow-lg">
                      <TrendingUp className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    <Card className="flex-1 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-primary border-primary font-bold">
                            {item.year}
                          </Badge>
                          <div className="text-sm text-accent font-semibold">
                            {item.achievement}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team & Expertise Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Wrench className="h-4 w-4" />
                  Expert Team
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Meet Your{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Garage Door Experts
                  </span>
                </h2>
                <p className="text-lg text-foreground leading-relaxed mb-8">
                  <strong>Experience you can trust.</strong> Our certified technicians bring years of expertise to every job. We're not just fixing garage doors—we're protecting your family's safety and your home's security.
                </p>
                
                <div className="space-y-4">
                  {teamStrengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Local Coverage</h3>
                        <p className="text-sm text-foreground">Serving 25+ communities</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      Jersey City to Montclair, Fair Lawn to Hoboken—we know the unique garage door challenges in every neighborhood we serve.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <ThumbsUp className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Customer Satisfaction</h3>
                        <p className="text-sm text-foreground">98% satisfaction rate</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      Our commitment to excellence shows in every review. We don't just fix garage doors—we build lasting relationships.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="relative py-16 bg-background">
          <div className="container">
            <header className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why Homeowners Choose ez2fix
              </h3>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                The credentials and commitments that make us Northern New Jersey's most trusted garage door service.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Licensed & Insured</h4>
                  <p className="text-foreground leading-relaxed mb-4">
                    Fully licensed New Jersey contractors with $1M liability insurance for your complete peace of mind.
                  </p>
                  <Badge variant="secondary" className="text-xs">NJ License Verified</Badge>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Emergency Available</h4>
                  <p className="text-foreground leading-relaxed mb-4">
                    24/7 emergency response for urgent garage door failures, break-ins, and safety hazards.
                  </p>
                  <Badge variant="secondary" className="text-xs">Always Available</Badge>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Quality Guarantee</h4>
                  <p className="text-foreground leading-relaxed mb-4">
                    Comprehensive warranties on all work and parts. We stand behind everything we do.
                  </p>
                  <Badge variant="secondary" className="text-xs">100% Guaranteed</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-20 bg-background">
          <div className="container">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience the ez2fix Difference?
              </h3>
              <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who trust us with their garage door needs. Professional service, honest pricing, and guaranteed satisfaction.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300" asChild>
                  <a href={`tel:${siteConfig.business.phone.replace(/[^+\\d]/g, "")}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call {siteConfig.business.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-4 text-lg font-bold transition-all duration-300" asChild>
                  <Link to="/contact">
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;