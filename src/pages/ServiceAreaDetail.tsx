import { siteConfig } from "@/config/site-config";
import { useParams } from "react-router-dom";
import CityServiceLanding from "@/components/templates/CityServiceLanding";

const toTitle = (slug?: string) => (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const ServiceAreaDetail = () => {
  const { slug } = useParams();
  const area = toTitle(slug) || "Service Area";
  const loc = siteConfig.locations.find((l) => l.serviceAreas.some((a) => a.slug === slug));
  const locationId = loc?.id;

  return <CityServiceLanding slug={slug || ""} area={area} locationId={locationId || undefined} />;
};

export default ServiceAreaDetail;
