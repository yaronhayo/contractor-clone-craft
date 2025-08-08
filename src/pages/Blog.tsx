import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const posts = Array.from({ length: 6 }).map((_, i) => ({
  title: `How to Choose the Right (Service) #${i + 1}`,
  excerpt: "Practical tips to evaluate providers, compare quotes, and avoid common pitfalls.",
  date: "2025-01-01",
  slug: `choose-right-service-${i + 1}`,
}));

const Blog = () => {
  return (
    <div>
      <Seo title="Blog Hub Page" description="Guides and tips about (service) for homeowners in (City)." canonical="/blog" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Blog Hub Page</h1>
            <p className="mt-3 text-muted-foreground">Insights, how‑tos, and expert advice to help you plan your next project.</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {posts.map((p) => (
              <Link key={p.title} to={`/blog/${p.slug}`} className="hover-scale block">
                <Card className="">
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>{p.excerpt}</p>
                    <p className="mt-3 text-xs opacity-70">{new Date(p.date).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
