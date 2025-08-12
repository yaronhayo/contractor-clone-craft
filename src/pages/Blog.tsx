import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, Tag, ArrowRight } from "lucide-react";
import heroHouse from "@/assets/hero-house.jpg";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import { useQuery } from "@tanstack/react-query";
import { getSanityClient } from "@/lib/sanity/client";
import { blogListQuery } from "@/lib/sanity/queries";
import { siteConfig } from "@/config/site-config";
import { Helmet } from "react-helmet-async";

const categories = ["Maintenance", "Repair Tips", "Installation", "Safety", "Troubleshooting"];

const fallbackPosts = Array.from({ length: 9 }).map((_, i) => {
  const images = [heroHouse, service1, service2];
  const img = images[i % images.length];
  return {
    title: `Garage Door Maintenance Tips #${i + 1}`,
    excerpt: "Essential maintenance tips to keep your garage door running smoothly and prevent costly repairs.",
    date: "2025-01-01",
    readTime: `${8 + (i % 4)} min read`,
    slug: `garage-door-maintenance-tips-${i + 1}`,
    category: categories[i % categories.length],
    image: img,
  };
});

const Blog = () => {
  const sanityOk = Boolean(siteConfig.integrations.sanity?.projectId);
  const { data: sanityPosts } = useQuery({
    enabled: sanityOk,
    queryKey: ["blog-list"],
    queryFn: async () => {
      const client = getSanityClient();
      if (!client.config().projectId) return [] as any[];
      return client.fetch(blogListQuery);
    },
  });
  const posts = (sanityOk && Array.isArray(sanityPosts) && sanityPosts.length
    ? sanityPosts.map((p: any) => ({
        title: p.title,
        excerpt: p.excerpt || "",
        date: p.publishedAt || new Date().toISOString(),
        readTime: "",
        slug: p.slug,
        category: p.categories?.[0]?.title || "News",
        image: p.imageUrl || heroHouse,
      }))
    : fallbackPosts);
  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
    ],
  };
  return (
    <div>
      <Seo title="Blog | Garage Door Tips & Guides" description="Expert garage door maintenance tips, repair guides, and installation advice for homeowners in Jersey City, Bergen County, and Hudson County." canonical="/blog" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        {/* Hero */}
        <section className="container py-14 md:py-20 animate-fade-in">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold">Garage Door Tips & Expert Guides</h1>
            <p className="mt-4 text-muted-foreground">Learn from our garage door experts—practical maintenance tips, repair guides, and installation advice to keep your garage door running smoothly.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
              ))}
            </div>
          </header>
        </section>

        {/* Posts Grid */}
        <section className="container pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.slug} className="group">
                <Link to={`/blog/${p.slug}`} className="block">
                  <Card className="overflow-hidden h-full">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={p.image}
                          alt={`${p.title} – ${p.category}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute left-3 top-3">
                        <Badge>{p.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:underline story-link">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" aria-hidden="true" />{new Date(p.date).toLocaleDateString()}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" />{p.readTime}</span>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1 text-primary">
                        <span className="text-sm">Read more</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination (static demo) */}
          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
            <Button variant="outline" size="sm">Previous</Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Page</span>
              <span className="font-medium text-foreground">1</span>
              <span>of 5</span>
            </div>
            <Button size="sm">Next</Button>
          </nav>
        </section>

        {/* CTA */}
        <section className="container pb-20">
          <div className="rounded-lg border p-6 md:p-10 text-center bg-card">
            <h2 className="text-xl md:text-2xl font-bold">Need Garage Door Service?</h2>
            <p className="mt-2 text-muted-foreground">Get a fast, no‑obligation garage door estimate from our certified technicians.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Get Free Garage Door Estimate</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services"><Tag className="h-4 w-4 mr-1" aria-hidden="true" />View Garage Door Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

