import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, Award, Users, CheckCircle2, Phone, Zap } from "lucide-react";

interface ServiceProofSectionProps {
  serviceSlug: string;
}

const ServiceProofSection = ({ serviceSlug }: ServiceProofSectionProps) => {
  const recentJobs = [
    { location: "Elmwood Park, NJ", service: "Spring Replacement", time: "2 hours ago", rating: 5 },
    { location: "Jersey City, NJ", service: "Door Installation", time: "4 hours ago", rating: 5 },
    { location: "Montclair, NJ", service: "Opener Repair", time: "6 hours ago", rating: 5 },
    { location: "Fair Lawn, NJ", service: "Emergency Repair", time: "1 day ago", rating: 5 },
  ];

  const certifications = [
    { name: "NJ Licensed Contractor", code: "#13VH08751200" },
    { name: "Fully Insured", code: "$1M General Liability" },
    { name: "BBB A+ Rated", code: "Better Business Bureau" },
    { name: "Angie's List Super Service", code: "Award Winner 2024" }
  ];

  const guarantees = [
    { icon: Shield, title: "10-Year Parts Warranty", description: "Industry-leading warranty on all parts and labor" },
    { icon: Clock, title: "Same-Day Service", description: "Most repairs completed within 24 hours" },
    { icon: Award, title: "100% Satisfaction", description: "We don't leave until you're completely satisfied" },
    { icon: Zap, title: "No Hidden Fees", description: "Transparent pricing with written estimates" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Live Activity Feed */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Live Service Updates</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Currently serving customers in your area</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Recent Jobs */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Recent Jobs Completed
              </h3>
              <div className="space-y-4">
                {recentJobs.map((job, index) => (
                  <div key={index} className="border-l-2 border-green-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{job.location}</span>
                      <span className="text-xs text-muted-foreground">{job.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{job.service}</p>
                    <div className="flex items-center">
                      {Array.from({ length: job.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                      ))}
                      <span className="text-xs ml-2 text-green-600 font-semibold">Satisfied Customer</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Licensed & Certified
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.code}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <Shield className="h-3 w-3 inline mr-1" />
                  All work performed by licensed NJ contractors with full insurance coverage
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guarantees */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Our Guarantees
              </h3>
              <div className="space-y-4">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <guarantee.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{guarantee.title}</p>
                      <p className="text-xs text-muted-foreground">{guarantee.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">750+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5.0★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15 min</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Same-Day Service</div>
            </div>
          </div>
        </div>

        {/* Urgency Banner */}
        <div className="mt-12 text-center">
          <div className="bg-red-600 text-white rounded-lg p-6 inline-block max-w-2xl">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Phone className="h-5 w-5 animate-bounce" />
              <span className="font-bold text-lg">Don't wait - garage door problems get worse!</span>
            </div>
            <p className="text-red-100">
              Call now for immediate service. Every hour you delay could mean more damage and higher repair costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProofSection;