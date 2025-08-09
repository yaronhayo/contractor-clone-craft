import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const NotFound = () => {
  return (
    <div>
      <Seo title="Page Not Found (404)" description="The page you are looking for doesn't exist. Return to the homepage." canonical="/404" />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main id="content">
        <section className="container py-20 text-center">
          <p className="text-sm text-muted-foreground">Error 404</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Page not found</h1>
          <p className="mt-3 text-muted-foreground">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/">Go back home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact support</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

