import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesBar from "@/components/sections/FeaturesBar";
import Questions from "@/components/sections/Questions";
import Welcome from "@/components/sections/Welcome";
import CTABanner from "@/components/sections/CTABanner";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div>
      <Seo title="We Are The Best (Service) In (City)" description="Clone of Contractor Website Template – premium hero, services, and CTA sections." canonical="/" />
      <Header />
      <main>
        <Hero />
        <FeaturesBar />
        <Questions />
        <Welcome />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
