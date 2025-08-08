import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="container py-14 md:py-20">
      <div className="rounded-xl border bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground px-6 py-10 text-center shadow">
        <h3 className="text-2xl font-bold">FINAL CALL TO ACTION</h3>
        <p className="mt-2 opacity-90">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="rounded-full bg-background text-foreground hover:opacity-90">
            <a href="tel:0005555555" className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" /> Call (000) 555 5555
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
