import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "page_view",
        path: location.pathname + location.search,
        title: document.title,
      });
    } catch {}
  }, [location]);

  return null;
};

export default PageViewTracker;
