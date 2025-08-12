import { useLocation } from "react-router-dom";
import PageSkeleton from "./skeletons/PageSkeleton";
import ServicePageSkeleton from "./skeletons/ServicePageSkeleton";
import ServicesHubSkeleton from "./skeletons/ServicesHubSkeleton";
import ContentPageSkeleton from "./skeletons/ContentPageSkeleton";

interface SkeletonLoaderProps {
  text?: string;
  type?: 'page' | 'service' | 'services-hub' | 'content' | 'blog';
}

const SkeletonLoader = ({ text, type }: SkeletonLoaderProps) => {
  const location = useLocation();

  // Auto-detect skeleton type based on URL if not specified
  const getSkeletonType = (): string => {
    if (type) return type;
    
    const path = location.pathname;
    
    // Service detail pages
    if (path.startsWith('/services/') && path.split('/').length === 3) {
      return 'service';
    }
    
    // Services hub
    if (path === '/services') {
      return 'services-hub';
    }
    
    // Blog posts
    if (path.startsWith('/blog/') && path.split('/').length === 3) {
      return 'blog';
    }
    
    // Content pages (about, contact, etc.)
    if (['/about', '/contact', '/faq', '/reviews', '/gallery', '/locations'].includes(path)) {
      return 'content';
    }
    
    // Default to generic page skeleton
    return 'page';
  };

  const skeletonType = getSkeletonType();

  // Show loading text overlay if provided
  const LoadingOverlay = () => {
    if (!text) return null;
    
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-foreground font-medium">{text}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSkeleton = () => {
    switch (skeletonType) {
      case 'service':
        return <ServicePageSkeleton />;
      case 'services-hub':
        return <ServicesHubSkeleton />;
      case 'content':
        return <ContentPageSkeleton showImage={false} showSidebar={false} />;
      case 'blog':
        return <ContentPageSkeleton showImage={true} showSidebar={true} />;
      case 'page':
      default:
        return <PageSkeleton />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderSkeleton()}
      <LoadingOverlay />
    </div>
  );
};

export default SkeletonLoader;