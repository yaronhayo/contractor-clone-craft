import type { Libraries } from "@react-google-maps/api";

export const MAPS_LOADER_ID = "gmaps-script";
export const MAPS_LIBRARIES: Libraries = ["places"];

export const getMapsLoaderOptions = (apiKey: string) => ({
  id: MAPS_LOADER_ID,
  googleMapsApiKey: apiKey || "",
  libraries: MAPS_LIBRARIES,
});
