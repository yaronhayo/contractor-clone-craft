import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { siteConfig } from "@/config/site-config";

export type ServiceAreasMapProps = {
  locationId?: string; // limit to one location's service areas
  height?: number;
  zoom?: number;
};

const containerStyle = { width: "100%", height: "100%" } as const;

const ServiceAreasMap: React.FC<ServiceAreasMapProps> = ({ locationId, height = 400, zoom }) => {
  const apiKey = siteConfig.integrations.googleMaps?.apiKey || "";
  const mapId = siteConfig.integrations.googleMaps?.mapId;
  const defaultCenter = siteConfig.integrations.googleMaps?.defaultCenter || { lat: 29.4252, lng: -98.4946 };
  const defaultZoom = zoom ?? siteConfig.integrations.googleMaps?.defaultZoom ?? 10;

  const { isLoaded } = useJsApiLoader({ id: "gmaps-script", googleMapsApiKey: apiKey });

  const locations = siteConfig.locations.filter(l => !locationId || l.id === locationId);
  const areas = locations.flatMap(l => l.serviceAreas);
  const center = areas[0]?.center || locations[0]?.geo || defaultCenter;

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
        {areas.map((a) => (
          a.center ? <Marker key={a.slug} position={a.center} title={`${a.name}, ${a.state}`} /> : null
        ))}
      </GoogleMap>
    </div>
  );
};

export default ServiceAreasMap;
