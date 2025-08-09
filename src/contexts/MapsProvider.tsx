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
  // Always call the hook with centralized, identical options to avoid mismatches
  const { isLoaded } = useJsApiLoader(getMapsLoaderOptions(apiKey));

  return (
    <MapsContext.Provider value={{ isLoaded, hasApiKey: Boolean(apiKey) }}>
      {children}
    </MapsContext.Provider>
  );
};

export const useMaps = () => useContext(MapsContext);
