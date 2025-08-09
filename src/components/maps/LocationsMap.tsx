
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { siteConfig } from "@/config/site-config";

export type LocationsMapProps = {
  locationIds?: string[]; // if omitted, show all locations
  height?: number; // px
  zoom?: number;
};

const containerStyle = { width: "100%", height: "100%" } as const;

const LocationsMap: React.FC<LocationsMapProps> = ({ locationIds, height = 400, zoom }) => {
  const apiKey = siteConfig.integrations.googleMaps?.apiKey || "";
  const mapId = siteConfig.integrations.googleMaps?.mapId;
  const defaultCenter = siteConfig.integrations.googleMaps?.defaultCenter || { lat: 29.4252, lng: -98.4946 };
  const defaultZoom = zoom ?? siteConfig.integrations.googleMaps?.defaultZoom ?? 10;

  const { isLoaded } = useJsApiLoader({ 
    id: "gmaps-script", 
    googleMapsApiKey: apiKey, 
    libraries: ["places"] 
  });

  const locations = siteConfig.locations.filter(l => !locationIds || locationIds.includes(l.id));
  const center = locations[0]?.geo || defaultCenter;

  if (!apiKey) {
    return (
      <div className="w-full rounded-md border" style={{ height }}>
        <div className="h-full flex items-center justify-center text-sm opacity-70">
          Google Maps API key not configured
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="w-full rounded-md border animate-pulse" style={{ height }} />;
  }

  return (
    <div className="w-full rounded-md overflow-hidden border" style={{ height }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={defaultZoom} options={{ mapId }}>
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.geo} title={loc.name} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default LocationsMap;
