import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesBar from "@/components/sections/FeaturesBar";
import Questions from "@/components/sections/Questions";
import Welcome from "@/components/sections/Welcome";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import EstimateForm from "@/components/sections/EstimateForm";
import CompanyInfo from "@/components/sections/CompanyInfo";
import CTABanner from "@/components/sections/CTABanner";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div>
      <Seo title="We Are The Best (Service) In (City)" description="Clone of Contractor Website Template – hero, services, process, estimate form, and contact." canonical="/" />
      <Header />
      <main>
        <Hero />
        <FeaturesBar />
        <Questions />
        <Welcome />
        <Services />
        <WhyUs />
        <Process />
        <EstimateForm />
        <CompanyInfo />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
