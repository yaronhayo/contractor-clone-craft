import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Share2, UserRound } from "lucide-react";
import heroHouse from "@/assets/hero-house.jpg";

const toTitle = (slug?: string) =>
  (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const BlogPost = () => {
  const { slug } = useParams();
  const title = toTitle(slug) || "Blog Post";
  const articleUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;
  const readTime = "8 min read";
  const published = "2025-01-01";
  const featuredImage = heroHouse;

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(articleUrl);
  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  } as const;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: { "@type": "Person", name: "Editorial Team" },
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: articleUrl,
    image: [articleUrl + "/featured.jpg"],
  };

  return (
    <div>
      <Seo title={`${title} | Blog`} description={`Read ${title} and learn practical tips from our team.`} canonical={`/blog/${slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>
      <Header />
      <main>
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span className="text-foreground">{title}</span>
          </nav>

          {/* Title & Meta */}
          <header className="mt-4">
            <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" aria-hidden="true" />{new Date(published).toLocaleDateString()}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" />{readTime}</span>
              <Badge variant="secondary">How‑To</Badge>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={shareLinks.x} target="_blank" rel="noreferrer"><Share2 className="h-4 w-4 mr-1" aria-hidden="true" />Share</a>
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mt-8 rounded-lg overflow-hidden border">
            <AspectRatio ratio={16 / 9}>
              <img src={featuredImage} alt={`${title} featured`} loading="lazy" className="h-full w-full object-cover" />
            </AspectRatio>
          </div>

          {/* Content + TOC */}
          <div className="mt-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <section className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  This is a sample article page generated for your template. Replace with your content.
                </p>
                <h2 id="introduction">Introduction</h2>
                <p>
                  Start with the problem, clarify the outcome, and help readers understand the scope before they begin.
                </p>
                <h2 id="benefits">Benefits</h2>
                <ul>
                  <li>Understand the basics of choosing the right contractor</li>
                  <li>Compare quotes with apples‑to‑apples scopes</li>
                  <li>Check licensing, insurance, and reviews</li>
                </ul>
                <h2 id="steps">Steps</h2>
                <ol>
                  <li>Define your scope and budget</li>
                  <li>Shortlist providers with proven reviews</li>
                  <li>Verify credentials and sign a clear contract</li>
                </ol>
              </section>

              {/* Author */}
              <div className="mt-12">
                <Card>
                  <CardHeader className="flex-row items-center gap-3">
                    <div className="rounded-full border p-2"><UserRound className="h-5 w-5 text-primary" aria-hidden="true" /></div>
                    <CardTitle className="text-base">Written by Editorial Team</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Our in‑house experts share practical guidance to help you plan and execute your project with confidence.
                  </CardContent>
                </Card>
              </div>

              {/* Prev/Next */}
              <nav className="mt-8 flex items-center justify-between" aria-label="Article pagination">
                <Link to="/blog/choose-right-service-1" className="text-sm text-primary story-link">← Previous</Link>
                <Link to="/blog/choose-right-service-2" className="text-sm text-primary story-link">Next →</Link>
              </nav>
            </div>

            {/* TOC */}
            <aside className="lg:col-span-4">
              <div className="rounded-lg border p-6 bg-card">
                <h2 className="font-semibold">On this page</h2>
                <nav className="mt-3 text-sm">
                  <ul className="space-y-2 text-muted-foreground">
                    <li><a href="#introduction" className="story-link">Introduction</a></li>
                    <li><a href="#benefits" className="story-link">Benefits</a></li>
                    <li><a href="#steps" className="story-link">Steps</a></li>
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;

