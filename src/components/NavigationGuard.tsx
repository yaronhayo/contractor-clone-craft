import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('=== NAVIGATION GUARD ===');
    console.log('Current route:', location.pathname);
    console.log('Search params:', location.search);
    console.log('Route state:', location.state);
    console.log('History length:', window.history.length);
    
    // Check if we're on a valid route
    const validRoutes = [
      '/',
      '/about',
      '/services',
      '/contact',
      '/faq', 
      '/reviews',
      '/blog',
      '/service-areas',
      '/gallery',
      '/locations',
      '/booking',
      '/health',
      '/debug-test'
    ];
    
    const isValidRoute = validRoutes.includes(location.pathname) || 
                        location.pathname.startsWith('/services/') ||
                        location.pathname.startsWith('/service-areas/') ||
                        location.pathname.startsWith('/blog/') ||
                        location.pathname.startsWith('/locations/');
    
    if (!isValidRoute && location.pathname !== '/') {
      console.warn('Invalid route detected:', location.pathname);
      // Don't automatically redirect, just log for now
    }
    
    console.log('Valid route:', isValidRoute);
    console.log('========================');
  }, [location, navigate]);

  return null;
};

export default NavigationGuard;