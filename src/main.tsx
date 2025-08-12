import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('main.tsx: Starting React application...');

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  console.log('main.tsx: Root element found, creating React root...');
  const root = createRoot(rootElement);
  
  console.log('main.tsx: Rendering App component...');
  root.render(<App />);
  
  console.log('main.tsx: App component rendered successfully');
} catch (error) {
  console.error('main.tsx: Failed to start React app:', error);
  
  // Fallback error display
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: red; font-family: system-ui;">
        <h2>React Application Error</h2>
        <p>Failed to initialize the React application.</p>
        <p style="font-size: 12px; color: gray;">Error: ${error.message}</p>
        <p style="font-size: 12px; color: gray;">URL: ${window.location.href}</p>
        <button onclick="location.reload()" style="margin-top: 10px; padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}

// Service worker registration temporarily disabled to debug routing issue
// TODO: Re-enable after confirming direct URL access works
/*
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, show update prompt
                if (confirm('New version available. Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
*/

// Force unregister any existing service workers to ensure clean slate
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      console.log('Unregistering service worker:', registration);
      registration.unregister();
    });
  });
}
