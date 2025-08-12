import { siteConfig } from "@/config/site-config";
import { useParams } from "react-router-dom";
import CityServiceLanding from "@/components/templates/CityServiceLanding";

const toTitle = (slug?: string) => (slug || "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const ServiceAreaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Guard against missing slug
  if (!slug) {
    console.error('ServiceAreaDetail: No slug parameter found');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Area URL</h1>
          <p>No area identifier found in the URL</p>
          <a href="/service-areas" className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded">
            View All Service Areas
          </a>
        </div>
      </div>
    );
  }

  const area = toTitle(slug) || "Service Area";
  const loc = siteConfig.locations.find((l) => l.serviceAreas.some((a) => a.slug === slug));
  const locationId = loc?.id;

  return <CityServiceLanding slug={slug} area={area} locationId={locationId || undefined} />;
};

export default ServiceAreaDetail;
