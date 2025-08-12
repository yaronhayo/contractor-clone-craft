import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const RouteDebugger = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    console.log('RouteDebugger - Location:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state
    });
    console.log('RouteDebugger - Params:', params);
    console.log('RouteDebugger - Full URL:', window.location.href);
  }, [location, params]);

  // Only show in production for debugging
  if (import.meta.env.PROD) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px'
      }}>
        <div>Path: {location.pathname}</div>
        <div>Params: {JSON.stringify(params)}</div>
      </div>
    );
  }

  return null;
};

export default RouteDebugger;