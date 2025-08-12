import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  showHeader?: boolean;
  showHero?: boolean;
  showContent?: boolean;
  showFooter?: boolean;
}

const PageSkeleton = ({ 
  showHeader = true, 
  showHero = true, 
  showContent = true, 
  showFooter = true 
}: PageSkeletonProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      {showHeader && (
        <header className="w-full border-b bg-background/90 backdrop-blur">
          <nav className="container flex items-center justify-between h-16">
            {/* Logo Skeleton */}
            <Skeleton className="h-8 w-32" />
            
            {/* Desktop Navigation Skeleton */}
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            {/* CTA Buttons Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </nav>
        </header>
      )}

      {/* Hero Section Skeleton */}
      {showHero && (
        <section className="relative min-h-[60vh] bg-gradient-to-br from-secondary/20 via-gray-100 to-background flex items-center">
          <div className="container">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-8">
              <Skeleton className="h-4 w-12" />
              <span className="text-muted-foreground">/</span>
              <Skeleton className="h-4 w-16" />
            </div>
            
            {/* Hero Content Skeleton */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge Skeleton */}
              <Skeleton className="h-6 w-48 rounded-full mx-auto mb-6" />
              
              {/* Title Skeleton */}
              <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-4" />
              <Skeleton className="h-12 w-3/4 max-w-xl mx-auto mb-6" />
              
              {/* Description Skeleton */}
              <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
              <Skeleton className="h-6 w-2/3 max-w-2xl mx-auto mb-8" />
              
              {/* Stats/Features Skeleton */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-36 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
              
              {/* CTA Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Skeleton className="h-12 w-48 rounded-full" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Sections Skeleton */}
      {showContent && (
        <div className="space-y-16 py-16">
          {/* First Content Section */}
          <section className="container">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto mb-2" />
              <Skeleton className="h-6 w-80 mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-16 w-16 rounded-2xl mx-auto mb-6" />
                  <Skeleton className="h-6 w-32 mx-auto mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          </section>

          {/* Second Content Section */}
          <section className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-6" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-0.5" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Footer Skeleton */}
      {showFooter && (
        <footer className="bg-foreground text-background py-16">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-6 w-24 mb-4 bg-muted/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-muted/20" />
                    <Skeleton className="h-4 w-16 bg-muted/20" />
                    <Skeleton className="h-4 w-24 bg-muted/20" />
                    <Skeleton className="h-4 w-18 bg-muted/20" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <Skeleton className="h-4 w-64 bg-muted/20" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded bg-muted/20" />
                <Skeleton className="h-8 w-8 rounded bg-muted/20" />
                <Skeleton className="h-8 w-8 rounded bg-muted/20" />
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PageSkeleton;