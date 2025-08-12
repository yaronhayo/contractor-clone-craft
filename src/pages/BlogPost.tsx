import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Share2, UserRound, Link2 } from "lucide-react";
import heroHouse from "@/assets/hero-house.jpg";
import ReadingProgress from "@/components/blog/ReadingProgress";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import { useQuery } from "@tanstack/react-query";
import { getSanityClient } from "@/lib/sanity/client";
import { blogPostBySlugQuery } from "@/lib/sanity/queries";
import { siteConfig } from "@/config/site-config";

const toTitle = (slug?: string) =>
  (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const related = [
  { title: "Garage Door Maintenance Checklist", slug: "garage-door-maintenance-checklist", image: service1 },
  { title: "Signs Your Garage Door Spring Needs Replacement", slug: "garage-door-spring-replacement", image: service2 },
  { title: "Choosing the Right Garage Door for Your Home", slug: "choosing-right-garage-door", image: heroHouse },
];

const BlogPost = () => {
  const { slug } = useParams();
  const sanityOk = Boolean(siteConfig.integrations.sanity?.projectId);
  const { data: post } = useQuery({
    enabled: sanityOk && Boolean(slug),
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const client = getSanityClient();
      if (!client.config().projectId) return null;
      return client.fetch(blogPostBySlugQuery, { slug });
    },
  });
  const baseTitle = toTitle(slug) || "Blog Post";
  const title = (post as any)?.title || baseTitle;
  const articleUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;
  const readTime = "8 min read";
  const published = (post as any)?.publishedAt || "2025-01-01";
  const featuredImage = (post as any)?.imageUrl || heroHouse;
  const tags = [((post as any)?.category || "News")] as string[];

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(articleUrl);
  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  } as const;

  const imageAbs = typeof window !== "undefined" ? new URL(featuredImage, window.location.origin).toString() : featuredImage;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: { "@type": "Person", name: "Editorial Team" },
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: articleUrl,
    image: [imageAbs],
    publisher: {
      "@type": "Organization",
      name: "Your Company",
      logo: {
        "@type": "ImageObject",
        url: typeof window !== "undefined" ? `${window.location.origin}/favicon.ico` : "/favicon.ico",
      },
    },
  };

  const siteUrl = typeof window !== "undefined" ? window.location.origin : ("" as string);
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: articleUrl },
    ],
  };
  const CopyLinkButton = () => {
    const onCopy = async () => {
      try {
        await navigator.clipboard.writeText(articleUrl);
        const el = document.getElementById("copy-label");
        if (el) {
          el.textContent = "Copied!";
          setTimeout(() => (el.textContent = "Copy link"), 1500);
        }
      } catch {}
    };
    return (
      <Button variant="outline" size="sm" onClick={onCopy} aria-describedby="copy-label">
        <Link2 className="h-4 w-4 mr-1" aria-hidden="true" />
        <span id="copy-label">Copy link</span>
      </Button>
    );
  };

  return (
    <div>
      <Seo title={`${title} | Blog`} description={`Read ${title} and learn practical tips from our team.`} canonical={`/blog/${slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <ReadingProgress />
      <Header />
      <main id="content">
        {/* Hero / Meta */}
        <section className="border-b bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span className="text-foreground">{title}</span>
            </nav>
            <header className="mt-4">
              <Badge className="mb-3">How‑To</Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
              <p className="mt-3 text-muted-foreground max-w-3xl">Insights, how‑tos, and expert advice to help you plan your next project.</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border"><UserRound className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                  By Editorial Team
                </span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" aria-hidden="true" />{new Date(published).toLocaleDateString()}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" />{readTime}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={shareLinks.x} target="_blank" rel="noreferrer"><Share2 className="h-4 w-4 mr-1" aria-hidden="true" />Share</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={shareLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={shareLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                </Button>
                <CopyLinkButton />
              </div>
            </header>
          </div>
        </section>

        <article className="container py-10 md:py-16">
          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden border">
            <AspectRatio ratio={16 / 9}>
              <img src={featuredImage} alt={`${title} featured image`} loading="lazy" className="h-full w-full object-cover" />
            </AspectRatio>
          </div>

          {/* Content + TOC */}
          <div className="mt-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <section className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  Proper garage door maintenance can extend the life of your garage door system and prevent costly emergency repairs. Understanding the basics of garage door care helps homeowners keep their doors operating safely and efficiently.
                </p>
                <blockquote>
                  "Regular garage door maintenance and professional service are essential for safe, reliable operation and long-term value."
                </blockquote>
                <h2 id="introduction">Introduction</h2>
                <p>
                  Understanding your garage door system helps you identify potential issues early and know when to call a professional for service.
                </p>
                <div className="rounded-lg border p-4 bg-card">
                  <strong className="block">Pro tip</strong>
                  <p className="text-sm text-muted-foreground mt-1">Schedule annual garage door maintenance to catch small issues before they become expensive repairs.</p>
                </div>
                <h2 id="benefits">Benefits of Professional Garage Door Service</h2>
                <ul>
                  <li>Extended garage door lifespan with proper maintenance</li>
                  <li>Improved safety with professional spring and opener service</li>
                  <li>Better home security with properly functioning garage doors</li>
                  <li>Avoid costly emergency repairs with preventive care</li>
                </ul>
                <h2 id="steps">When to Call a Garage Door Professional</h2>
                <ol>
                  <li>Garage door won't open or close properly</li>
                  <li>Strange noises during operation (grinding, squeaking)</li>
                  <li>Visible spring damage or wear</li>
                  <li>Garage door opener malfunctions</li>
                  <li>Annual maintenance and safety inspection</li>
                </ol>
              </section>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>

              {/* Author */}
              <div className="mt-10">
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
                <Link to="/blog/choose-right-garage-door-company-1" className="text-sm text-primary story-link">← Previous</Link>
                <Link to="/blog/choose-right-garage-door-company-2" className="text-sm text-primary story-link">Next →</Link>
              </nav>
            </div>

            {/* TOC */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 h-max">
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

          {/* Related Posts */}
          <section className="mt-16">
            <h2 className="text-xl md:text-2xl font-bold">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="block group">
                  <Card className="overflow-hidden h-full">
                    <AspectRatio ratio={16 / 9}>
                      <img src={r.image} alt={`${r.title} related article`} loading="lazy" className="h-full w-full object-cover" />
                    </AspectRatio>
                    <CardHeader>
                      <CardTitle className="text-base group-hover:underline story-link">{r.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;


