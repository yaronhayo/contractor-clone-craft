import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesBar from "@/components/sections/FeaturesBar";
import Welcome from "@/components/sections/Welcome";
import Services from "@/components/sections/Services";
import PopularCityServices from "@/components/sections/PopularCityServices";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import ReviewsTeaser from "@/components/sections/ReviewsTeaser";
import EstimateForm from "@/components/sections/EstimateForm";
import FinalCTA from "@/components/sections/FinalCTA";
import CompanyInfo from "@/components/sections/CompanyInfo";
import Seo from "@/components/Seo";
import FAQ from "@/components/sections/FAQ";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import { siteConfig } from "@/config/site-config";
import { MapsProvider } from "@/contexts/MapsProvider";

const Index = () => {
  return (
    <MapsProvider>
      <PerformanceOptimizer />
      <Seo title={siteConfig.seo.defaultTitle} description={siteConfig.seo.defaultDescription} canonical="/" />
      <Header />
      <main id="content">
        <Hero />
        <FeaturesBar />
        <Services />
        <WhyUs />
        <Process />
        <FAQ />
        <ReviewsTeaser />
      </main>
      <Footer />
    </MapsProvider>
  );
};

export default Index;
