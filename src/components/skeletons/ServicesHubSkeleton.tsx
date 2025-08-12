import { Skeleton } from "@/components/ui/skeleton";

const ServicesHubSkeleton = () => {
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

      {/* Services Hub Hero */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-secondary/20 via-gray-100 to-background flex items-center">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-16" />
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-6 w-48 rounded-full mx-auto mb-6" />
            <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-4" />
            <Skeleton className="h-12 w-3/4 max-w-xl mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
            <Skeleton className="h-6 w-2/3 max-w-2xl mx-auto mb-8" />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Skeleton className="h-12 w-48 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  
                  <div className="space-y-2 mb-6">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-9 w-24 rounded" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-56 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-card p-4 rounded-lg border text-center">
                <Skeleton className="h-5 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-16 w-16 rounded-2xl mx-auto mb-6" />
                <Skeleton className="h-6 w-32 mx-auto mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-5" />
                </div>
              </div>
            ))}
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
          <div className="border-t border-muted/20 pt-8">
            <Skeleton className="h-4 w-64 bg-muted/20 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesHubSkeleton;