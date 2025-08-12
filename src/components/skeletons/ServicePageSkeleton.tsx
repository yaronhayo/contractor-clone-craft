import { Skeleton } from "@/components/ui/skeleton";

const ServicePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="w-full border-b bg-background/90 backdrop-blur">
        <nav className="container flex items-center justify-between h-16">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
        </nav>
      </header>

      {/* Service Hero Skeleton */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-secondary/20 via-gray-100 to-background flex items-center">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-20" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Emergency Badge */}
              <Skeleton className="h-6 w-32 rounded-full mb-4" />
              
              {/* Main Title */}
              <Skeleton shimmer className="h-10 w-full mb-4" />
              <Skeleton shimmer className="h-10 w-3/4 mb-6" />
              
              {/* Problem Description */}
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-5/6 mb-6" />
              
              {/* Key Features */}
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-full max-w-xs" />
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 w-48 rounded-full" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
            
            {/* Right Image */}
            <div>
              <Skeleton shimmer className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Features Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="text-center p-6 border rounded-lg">
                <Skeleton className="h-16 w-16 rounded-2xl mx-auto mb-6" />
                <Skeleton className="h-6 w-32 mx-auto mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="relative mb-6">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-8 rounded mx-auto mt-2" />
                </div>
                <Skeleton className="h-6 w-24 mx-auto mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Teaser */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-56 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card p-6 rounded-lg border">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Skeleton key={star} className="h-4 w-4 mr-1" />
                  ))}
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
            <Skeleton className="h-16 w-16 mx-auto mb-6" />
            <Skeleton className="h-8 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Skeleton className="h-12 w-48 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
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
        </div>
      </footer>
    </div>
  );
};

export default ServicePageSkeleton;