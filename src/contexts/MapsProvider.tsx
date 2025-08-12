import React, { createContext, useContext, type ReactNode } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { siteConfig } from "@/config/site-config";
import { getMapsLoaderOptions } from "@/lib/maps";

export type MapsContextValue = {
  isLoaded: boolean;
  hasApiKey: boolean;
};

const MapsContext = createContext<MapsContextValue>({ isLoaded: false, hasApiKey: false });

export const MapsProvider = ({ children }: { children: ReactNode }) => {
  const apiKey = siteConfig.integrations.googleMaps?.apiKey || "";
  const hasValidApiKey = Boolean(apiKey && apiKey.trim() !== '');
  
  // Only load Google Maps if we have a valid API key, otherwise provide a no-op loader
  const loaderOptions = hasValidApiKey 
    ? getMapsLoaderOptions(apiKey)
    : {
        googleMapsApiKey: '', // Empty string to prevent loading
        libraries: [],
        id: 'no-maps-placeholder',
        preventGoogleFontsLoading: true
      };
      
  const { isLoaded } = useJsApiLoader(loaderOptions);

  return (
    <MapsContext.Provider value={{ isLoaded: hasValidApiKey && isLoaded, hasApiKey: hasValidApiKey }}>
      {children}
    </MapsContext.Provider>
  );
};

export const useMaps = () => useContext(MapsContext);
