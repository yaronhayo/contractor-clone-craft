import { useMemo, useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CalendarDays, ChevronLeft, ChevronRight, Image as ImageIcon, Star, Tag } from "lucide-react";
import hero from "@/assets/hero-house.jpg";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import { Helmet } from "react-helmet-async";

const allImages = [
  { src: hero, alt: "Exterior remodeling project – modern home facade", category: "Exteriors", date: "2025-01-01" },
  { src: s1, alt: "Kitchen renovation – quartz countertops and backsplash", category: "Kitchens", date: "2025-01-05" },
  { src: s2, alt: "Bathroom remodel – tile and glass shower", category: "Bathrooms", date: "2025-01-08" },
  { src: s1, alt: "Before & after – open concept living space", category: "Interiors", date: "2025-01-12" },
  { src: s2, alt: "Deck and patio build – outdoor living space", category: "Exteriors", date: "2025-01-15" },
  { src: hero, alt: "Curb appeal upgrade – siding and windows", category: "Exteriors", date: "2025-01-20" },
  { src: s2, alt: "Spa-style bathroom – freestanding tub", category: "Bathrooms", date: "2025-01-22" },
  { src: s1, alt: "Chef’s kitchen – island and custom cabinetry", category: "Kitchens", date: "2025-01-25" },
];

const categories = ["All", "Exteriors", "Kitchens", "Bathrooms", "Interiors"] as const;

const Stat = ({ value, label }: { value: string; label: string }) => (
  <Card className="text-center">
    <CardHeader>
      <CardTitle className="text-2xl font-extrabold">{value}</CardTitle>
    </CardHeader>
    <CardContent className="text-muted-foreground text-xs md:text-sm">{label}</CardContent>
  </Card>
);

const Gallery = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = useMemo(() => (active === "All" ? allImages : allImages.filter((img) => img.category === active)), [active]);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const onPrev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const onNext = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  const galleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Project Gallery",
    image: images.map((img) => img.src),
  };

  return (
    <div>
      <Seo title="Project Gallery | Recent Work" description="Browse our (service) project gallery—before & afters, kitchens, bathrooms, and exteriors." canonical="/gallery" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(galleryLd)}</script>
      </Helmet>
      <Header />
      <main>
        {/* Hero */}
        <section className="container py-14 md:py-20 animate-fade-in">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold">Project Gallery</h1>
            <p className="mt-4 text-muted-foreground">A look at our recent work and craftsmanship across kitchens, baths, and exteriors.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={active === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActive(cat)}
                >
                  <Tag className="h-4 w-4 mr-1" aria-hidden="true" /> {cat}
                </Button>
              ))}
            </div>
          </header>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value={`${allImages.length}+`} label="Featured Projects" />
            <Stat value="10+" label="Years of Craftsmanship" />
            <Stat value="4.9/5" label="Average Rating" />
            <Stat value="48h" label="Average Estimate Turnaround" />
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="container pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <figure key={`${img.alt}-${i}`} className="group overflow-hidden rounded-lg border bg-card">
                <button onClick={() => openAt(i)} className="block w-full text-left">
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </button>
                <figcaption className="flex items-center justify-between p-3 text-xs md:text-sm">
                  <span className="text-foreground/90 truncate">{img.alt}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {new Date(img.date).toLocaleDateString()}
                  </span>
                </figcaption>
                <div className="absolute" aria-hidden="true" />
              </figure>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg border p-6 md:p-10 text-center bg-card">
            <h2 className="text-xl md:text-2xl font-bold">Like what you see?</h2>
            <p className="mt-2 text-muted-foreground">Tell us about your project—we'll provide a fast, friendly estimate.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild>
                <a href="/contact">Get Free Estimate</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/services"><ImageIcon className="h-4 w-4 mr-1" aria-hidden="true" />View Services</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <div className="relative bg-background">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={images[index]?.src}
                  alt={images[index]?.alt || "Selected project image"}
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
              <div className="absolute inset-x-0 bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{images[index]?.category}</Badge>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {images[index] ? new Date(images[index].date).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={onPrev} aria-label="Previous image">
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button size="icon" onClick={onNext} aria-label="Next image">
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;

