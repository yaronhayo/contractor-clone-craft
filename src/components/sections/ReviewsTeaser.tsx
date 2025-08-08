import { Star } from "lucide-react";

const ReviewsTeaser = () => {
  return (
    <section className="container py-10">
      <div className="rounded-lg border p-6 bg-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Check Out Great Reviews On Our</h3>
          <p className="text-muted-foreground">(Service Area) + (Service Provided)</p>
        </div>
        <div className="flex items-center gap-1 text-primary" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsTeaser;
