import { Button } from "@/components/ui/button";

const WhyUs = () => {
  return (
    <section className="container py-14 md:py-20">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">What Makes Us Different From Other (Service Area) + (Service)?</h2>
        <p className="mt-4 text-muted-foreground">
          TELL CUSTOMERS WHAT MAKES YOU DIFFERENT – Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
        <div className="mt-6">
          <Button asChild>
            <a href="#build">Get Templates Here</a>
          </Button>
        </div>
      </header>
    </section>
  );
};

export default WhyUs;
