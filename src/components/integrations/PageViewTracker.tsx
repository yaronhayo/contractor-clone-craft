import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('=== PAGE NAVIGATION ===');
    console.log('New Location:', location.pathname + location.search);
    console.log('Previous Title:', document.title);
    console.log('Timestamp:', new Date().toISOString());
    console.log('=======================');
    
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "page_view",
        path: location.pathname + location.search,
        title: document.title,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('PageViewTracker error:', error);
    }
  }, [location]);

  return null;
};

export default PageViewTracker;
