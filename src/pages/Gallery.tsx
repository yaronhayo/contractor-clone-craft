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
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
const allImages = [
  { src: hero, alt: "New garage door installation – modern steel door with windows", category: "Installation", date: "2025-01-01" },
  { src: s1, alt: "Garage door spring repair – professional spring replacement", category: "Repair", date: "2025-01-05" },
  { src: s2, alt: "Garage door opener installation – LiftMaster chain drive", category: "Openers", date: "2025-01-08" },
  { src: s1, alt: "Emergency garage door repair – broken spring replacement", category: "Emergency", date: "2025-01-12" },
  { src: s2, alt: "Commercial garage door service – industrial overhead door", category: "Commercial", date: "2025-01-15" },
  { src: hero, alt: "Garage door maintenance – roller and track service", category: "Maintenance", date: "2025-01-20" },
  { src: s2, alt: "Insulated garage door installation – energy efficient upgrade", category: "Installation", date: "2025-01-22" },
  { src: s1, alt: "Garage door panel replacement – matching existing door", category: "Repair", date: "2025-01-25" },
];

const categories = ["All", "Installation", "Repair", "Emergency", "Openers", "Commercial", "Maintenance"] as const;

const Stat = ({ value, label }: { value: string; label: string }) => (
  <Card className="text-center">
    <CardHeader>
      <CardTitle className="text-2xl font-extrabold">{value}</CardTitle>
    </CardHeader>
    <CardContent className="text-foreground text-xs md:text-sm">{label}</CardContent>
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
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${siteUrl}/gallery` },
    ],
  };

  return (
    <div>
      <Seo title="Project Gallery | Recent Work" description="Browse recent locksmith projects—lock installs, rekeys, car keys, and smart locks." canonical="/gallery" />
      <Seo title="Garage Door Gallery | Recent Projects" description="Browse recent garage door installations, repairs, spring replacements, and opener services in Jersey City, Bergen County, and Hudson County." canonical="/gallery" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(galleryLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero */}
        <section className="container py-14 md:py-20 animate-fade-in">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold">Garage Door Project Gallery</h1>
            <p className="mt-4 text-foreground">Recent garage door installations, repairs, and service work across Jersey City, Bergen County, and Hudson County.</p>
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
            <Stat value={`${allImages.length}+`} label="Recent Projects" />
            <Stat value="10+" label="Years of Garage Door Service" />
            <Stat value="5.0/5" label="Average Rating" />
            <Stat value="24/7" label="Emergency Service Available" />
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
                  <span className="inline-flex items-center gap-1 text-foreground">
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
            <h2 className="text-xl md:text-2xl font-bold">Need Garage Door Service?</h2>
            <p className="mt-2 text-foreground">Tell us about your garage door needs—we'll provide a fast, professional estimate for repair or installation.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Get Free Garage Door Estimate</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services"><ImageIcon className="h-4 w-4 mr-1" aria-hidden="true" />View Garage Door Services</Link>
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
                    <span className="inline-flex items-center gap-1 text-foreground">
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

