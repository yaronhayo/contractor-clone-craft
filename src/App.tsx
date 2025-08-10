import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import GTM from "@/components/integrations/GTM";

import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const ServicesHub = lazy(() => import("./pages/ServicesHub"));
const ServiceAreasHub = lazy(() => import("./pages/ServiceAreasHub"));
const Contact = lazy(() => import("./pages/Contact"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceAreaDetail = lazy(() => import("./pages/ServiceAreaDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Locations = lazy(() => import("./pages/Locations"));
const Setup = lazy(() => import("./pages/Setup"));
const LocationDetail = lazy(() => import("./pages/LocationDetail"));
const ServiceCategories = lazy(() => import("./pages/ServiceCategories"));
const CityHub = lazy(() => import("./pages/CityHub"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <GTM />
    
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="container py-20">Loading...</div>}>
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
              <Route path="/locations/:slug" element={<LocationDetail />} />
              <Route path="/city/:slug" element={<CityHub />} />
              <Route path="/service-categories" element={<ServiceCategories />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
      </QueryClientProvider>
    
  </HelmetProvider>
);

export default App;
