import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site-config";

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="hover-scale">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
  </Card>
);

const Welcome = () => {
  return (
    <section id="services" className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Welcome to {siteConfig.business.name}</p>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Trusted Locksmiths in {siteConfig.business.hqAddress.city}</h2>
        <a href={`tel:${siteConfig.business.phone}`} className="inline-block mt-4 text-primary underline">Call {siteConfig.business.phone}</a>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <FeatureCard title="We Are The Solution" description="Describe a feature as to why you are the solution to their problem." />
        <FeatureCard title="We Are The Solution" description="Describe a feature as to why you are the solution to their problem." />
        <FeatureCard title="We Are The Solution" description="Describe a feature as to why you are the solution to their problem." />
      </div>
    </section>
  );
};

export default Welcome;
