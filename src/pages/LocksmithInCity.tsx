import CityServiceLanding from "@/components/templates/CityServiceLanding";
import { useParams } from "react-router-dom";

const toTitle = (slug?: string) => (slug || "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const LocksmithInCity = () => {
  const { state, city } = useParams();
  const stateCode = String(state || "").toUpperCase();
  const cityParam = String(city || "");
  const areaSlug = `${cityParam}-${stateCode.toLowerCase()}`;
  const areaName = `${toTitle(cityParam)}, ${stateCode}`;
  return <CityServiceLanding slug={areaSlug} area={areaName} />;
};

export default LocksmithInCity;
