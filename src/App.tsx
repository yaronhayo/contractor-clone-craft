import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GTM from "@/components/integrations/GTM";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ServicesHub from "./pages/ServicesHub";
import ServiceAreasHub from "./pages/ServiceAreasHub";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import BlogPost from "./pages/BlogPost";
import ServiceAreaDetail from "./pages/ServiceAreaDetail";
import Gallery from "./pages/Gallery";
import Locations from "./pages/Locations";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <GTM />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/service-areas" element={<ServiceAreasHub />} />
            <Route path="/service-areas/:slug" element={<ServiceAreaDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
