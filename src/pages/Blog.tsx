import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = Array.from({ length: 6 }).map((_, i) => ({
  title: `How to Choose the Right (Service) #${i + 1}`,
  excerpt: "Practical tips to evaluate providers, compare quotes, and avoid common pitfalls.",
  date: "2025-01-01",
}));

const Blog = () => {
  return (
    <div>
      <Seo title="Blog Hub" description="Guides and tips about (service) for homeowners in (City)." canonical="/blog" />
      <Header />
      <main>
        <section className="container py-14 md:py-20">
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">Blog</h1>
            <p className="mt-3 text-muted-foreground">Insights, how‑tos, and expert advice to help you plan your next project.</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {posts.map((p) => (
              <Card key={p.title} className="hover-scale">
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>{p.excerpt}</p>
                  <p className="mt-3 text-xs opacity-70">{new Date(p.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
