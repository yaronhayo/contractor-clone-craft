import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy, useEffect } from "react";
import GTM from "@/components/integrations/GTM";
import PageViewTracker from "@/components/integrations/PageViewTracker";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonLoader from "@/components/SkeletonLoader";
import RouteDebugger from "@/components/RouteDebugger";
import TestPage from "@/components/TestPage";
import HealthCheck from "@/components/HealthCheck";
import NavigationGuard from "@/components/NavigationGuard";
import { initSentry, Sentry } from "@/lib/sentry";
import { useAccessibility, useKeyboardNavigation, useAriaLive } from "@/hooks/useAccessibility";

import MobileCallBar from "@/components/layout/MobileCallBar";
import Index from "./pages/Index";
// Re-enable lazy loading with skeleton preloaders
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const ServicesHub = lazy(() => import("./pages/ServicesHub"));
const ServiceAreasHub = lazy(() => import("./pages/ServiceAreasHub"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
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
const Cities = lazy(() => import("./pages/Cities"));
const CityServiceDetail = lazy(() => import("./pages/CityServiceDetail"));
const ServiceCategoryDetail = lazy(() => import("./pages/ServiceCategoryDetail"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));
// New "Locksmith in" and "Locksmith near" pages
const LocksmithInIndex = lazy(() => import("./pages/LocksmithInIndex"));
const LocksmithInState = lazy(() => import("./pages/LocksmithInState"));
const LocksmithInCounty = lazy(() => import("./pages/LocksmithInCounty"));
const LocksmithInCity = lazy(() => import("./pages/LocksmithInCity"));
const LocksmithInNeighborhood = lazy(() => import("./pages/LocksmithInNeighborhood"));
const LocksmithNear = lazy(() => import("./pages/LocksmithNear"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      throwOnError: false,
      // Add error handling to prevent query errors from breaking navigation
      onError: (error) => {
        console.warn('React Query Error (non-fatal):', error);
      },
    },
  },
});

// Initialize Sentry on app startup
initSentry();

const App = () => {
  // Temporarily disable accessibility features to test routing
  // useAccessibility();
  // useKeyboardNavigation();
  // useAriaLive();

  useEffect(() => {
    // Track app initialization
    Sentry.addBreadcrumb({
      message: 'App initialized',
      level: 'info',
    });
  }, []);

  return (
    // Temporarily disable Sentry error boundary for testing
    // <Sentry.ErrorBoundary fallback={({ error, resetError }) => (
    //   <div className="min-h-screen flex items-center justify-center p-8">
    //     <div className="text-center max-w-md">
    //       <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    //       <p className="text-gray-600 mb-6">
    //         We've been notified and are working on a fix. Please try refreshing the page.
    //       </p>
    //       <button 
    //         onClick={resetError}
    //         className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
    //       >
    //         Try again
    //       </button>
    //     </div>
    //   </div>
    // )}>
      <ErrorBoundary>
        <HelmetProvider>
          <GTM />
      
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <NavigationGuard />
            <RouteDebugger />
            <PageViewTracker />
            <main id="main-content">
              <Suspense fallback={<SkeletonLoader text="Loading page..." />}>
                <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/health" element={<HealthCheck />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/services" element={<ServicesHub />} />
              <Route path="/debug-test" element={<TestPage />} />
              <Route path="/debug-test/:slug" element={<TestPage />} />
              <Route path="/services/:serviceSlug-:citySlug" element={<CityServiceDetail />} />
              <Route path="/services/:slug" element={
                <ErrorBoundary fallback={
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">ServiceDetail Error</h1>
                    <p>There was an issue loading the service page.</p>
                    <p className="text-sm mt-2">URL: {window.location.href}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      Reload Page
                    </button>
                  </div>
                }>
                  <ServiceDetail />
                </ErrorBoundary>
              } />
              <Route path="/service-areas" element={<ServiceAreasHub />} />
              <Route path="/service-areas/:slug" element={<ServiceAreaDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/city" element={<Cities />} />
              <Route path="/locations/:slug" element={<LocationDetail />} />
              <Route path="/city/:slug" element={<CityHub />} />
              <Route path="/service-categories" element={<ServiceCategories />} />
              
              {/* Locksmith in hierarchy */}
              <Route path="/locksmith-in" element={<LocksmithInIndex />} />
              <Route path="/locksmith-in/:state" element={<LocksmithInState />} />
              <Route path="/locksmith-in/:state/counties/:county" element={<LocksmithInCounty />} />
              <Route path="/locksmith-in/:state/:city" element={<LocksmithInCity />} />
              <Route path="/locksmith-in/:state/:city/:neighborhood" element={<LocksmithInNeighborhood />} />
              {/* Locksmith near */}
              <Route path="/locksmith-near/:slug" element={<LocksmithNear />} />
              
              <Route path="/faq" element={<FAQ />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </BrowserRouter>
        <MobileCallBar />
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
