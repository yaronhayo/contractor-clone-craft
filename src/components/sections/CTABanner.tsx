import { Button } from "@/components/ui/button";

const CTABanner = () => {
  return (
    <section id="build" className="py-12">
      <div className="container">
        <div className="rounded-xl border bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground px-6 py-10 text-center shadow">
          <h3 className="text-2xl font-bold">Ready to build your own website?</h3>
          <p className="mt-2 opacity-90">Grab the templates and launch fast.</p>
          <div className="mt-6">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:opacity-90">
              Get Templates Here
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
