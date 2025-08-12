import { Skeleton } from "@/components/ui/skeleton";

interface ContentPageSkeletonProps {
  showImage?: boolean;
  showSidebar?: boolean;
  showBreadcrumb?: boolean;
}

const ContentPageSkeleton = ({ 
  showImage = false, 
  showSidebar = false, 
  showBreadcrumb = true 
}: ContentPageSkeletonProps) => {
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

      {/* Content Area */}
      <main className="py-16">
        <div className="container">
          {/* Breadcrumb */}
          {showBreadcrumb && (
            <div className="flex items-center gap-2 mb-8">
              <Skeleton className="h-4 w-12" />
              <span className="text-muted-foreground">/</span>
              <Skeleton className="h-4 w-16" />
              <span className="text-muted-foreground">/</span>
              <Skeleton className="h-4 w-24" />
            </div>
          )}

          <div className={`grid gap-12 ${showSidebar ? 'lg:grid-cols-3' : 'max-w-4xl mx-auto'}`}>
            {/* Main Content */}
            <div className={showSidebar ? 'lg:col-span-2' : ''}>
              {/* Title */}
              <div className="mb-8">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-3/4 mb-6" />
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Featured Image */}
              {showImage && (
                <Skeleton className="h-64 w-full rounded-lg mb-8" />
              )}

              {/* Content Blocks */}
              <div className="prose prose-gray max-w-none">
                {/* Paragraph blocks */}
                <div className="space-y-6 mb-8">
                  <div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                  </div>
                  
                  <div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                  </div>
                </div>

                {/* Subheading */}
                <Skeleton className="h-8 w-2/3 mb-6" />
                
                {/* More content */}
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>

                {/* List */}
                <div className="space-y-3 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-2 w-2 rounded-full flex-shrink-0 mt-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>

                {/* Another subheading */}
                <Skeleton className="h-8 w-1/2 mb-6" />
                
                {/* Final paragraph */}
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              {/* Share/Actions */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-24 rounded" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            {showSidebar && (
              <div className="space-y-8">
                {/* Related Articles */}
                <div>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <Skeleton className="h-32 w-full rounded mb-3" />
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <Skeleton className="h-6 w-24 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Skeleton className="h-6 w-16 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

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

export default ContentPageSkeleton;