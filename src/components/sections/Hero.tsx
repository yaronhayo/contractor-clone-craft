import heroImg from "@/assets/hero-house.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section aria-label="Hero" className="relative">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Modern home exterior with warm lights" className="w-full h-[70vh] md:h-[80vh] object-cover" loading="eager"/>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/80" />
      </div>

      <div className="relative container h-[70vh] md:h-[80vh] flex items-center justify-center text-center">
        <div className="max-w-4xl animate-fade-in">
          <h1 id="content" className="text-4xl md:text-6xl font-extrabold tracking-tight">
            We Are The Best (Service) In (City)
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Offering the best (service provided) in (City or location) and the surrounding area
            (how and what customer will get out of it)
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <a href="#build" aria-label="Get Templates Here">Get Templates Here</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
