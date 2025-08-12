import { siteConfig } from "@/config/site-config";
import LocationsMap from "@/components/maps/LocationsMap";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/cms";

const CompanyInfo = () => {
  const { data } = useQuery({ queryKey: ["site-settings"], queryFn: getSiteSettings, staleTime: 60_000 });

  const businessName = data?.businessName || siteConfig.business.name;
  const email = data?.email || siteConfig.business.email;
  const phone = data?.phone || siteConfig.business.phone;
  const address = {
    line1: data?.address?.line1 || siteConfig.business.hqAddress.line1,
    city: data?.address?.city || siteConfig.business.hqAddress.city,
    state: data?.address?.state || siteConfig.business.hqAddress.state,
    postalCode: data?.address?.postalCode || siteConfig.business.hqAddress.postalCode,
  };
  const description = data?.defaultDescription || siteConfig.seo.defaultDescription;
  const garageDescription = data?.defaultDescription || "Professional garage door installation, repair, and emergency services in Jersey City, Bergen County, Hudson County, and surrounding NJ areas. Licensed, insured, and available 24/7.";

  const telHref = `tel:${(phone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${email}`;

  return (
    <section id="contact" className="container py-14 md:py-20">
      <div className="grid lg:grid-cols-3 gap-8">
        <article className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-2">About {businessName} - Garage Door Experts</h3>
          <p className="text-muted-foreground">
            {garageDescription}
          </p>
        </article>
        <article className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <ul className="space-y-1 text-sm">
              <li>Email: <a href={mailHref} className="story-link" aria-label={`Email ${businessName}`}
                onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "email_click", source: "company_info", email }); } catch {} }}
              >{email}</a></li>
              <li>Phone: <a href={telHref} className="story-link" aria-label={`Call ${businessName}`}
                onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "company_info", phone }); } catch {} }}
              >{phone}</a></li>
              <li>Address: {address.line1}, {address.city}, {address.state} {address.postalCode}</li>
            </ul>
          <div className="mt-4">
            <h4 className="font-semibold">Hours Of Operation</h4>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2">
              <li>Mon: {siteConfig.business.hours.mon}</li>
              <li>Tue: {siteConfig.business.hours.tue}</li>
              <li>Wed: {siteConfig.business.hours.wed}</li>
              <li>Thu: {siteConfig.business.hours.thu}</li>
              <li>Fri: {siteConfig.business.hours.fri}</li>
              <li>Sat: {siteConfig.business.hours.sat}</li>
              <li>Sun: {siteConfig.business.hours.sun}</li>
            </ul>
          </div>
        </article>
        <article className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-2">Service Area</h3>
          <div className="aspect-[4/3] rounded-lg overflow-hidden border">
            <LocationsMap height={320} />
          </div>
        </article>
      </div>
    </section>
  );
};

export default CompanyInfo;
