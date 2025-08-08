import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const toTitle = (slug?: string) =>
  (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const BlogPost = () => {
  const { slug } = useParams();
  const title = toTitle(slug) || "Blog Post";
  const articleUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: {
      "@type": "Person",
      name: "Editorial Team",
    },
    datePublished: "2025-01-01",
    mainEntityOfPage: articleUrl,
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

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Insights, how‑tos, and expert advice to help you plan your next project.</p>
          </header>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              This is a sample article page generated for your template. Replace with your content.
            </p>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Understand the basics of choosing the right contractor</li>
              <li>Compare quotes with apples‑to‑apples scopes</li>
              <li>Check licensing, insurance, and reviews</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
