import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import hero from "@/assets/hero-house.jpg";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";

const images = [
  { src: hero, alt: "Hero house exterior project photo" },
  { src: s1, alt: "Completed service project example 1" },
  { src: s2, alt: "Completed service project example 2" },
  { src: s1, alt: "Before and after service showcase" },
  { src: s2, alt: "Team at work on a project" },
];

const Gallery = () => {
  return (
    <div>
      <Seo title="Project Gallery" description="Browse photos of recent projects and workmanship quality." canonical="/gallery" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Project Gallery</h1>
            <p className="mt-3 text-muted-foreground">A look at our recent work and craftsmanship.</p>
          </header>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <figure key={i} className="overflow-hidden rounded-lg border bg-card">
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300" />
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
