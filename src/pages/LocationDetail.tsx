import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/Seo";
import LocationsMap from "@/components/maps/LocationsMap";
import { siteConfig } from "@/config/site-config";
import { MapsProvider } from "@/contexts/MapsProvider";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LocationDetail = () => {
  const { slug } = useParams();
  const location = siteConfig.locations.find((l) => l.slug === slug) || siteConfig.locations[0];
  const title = location ? `${location.name} | ${siteConfig.business.name}` : `Location | ${siteConfig.business.name}`;

  const siteUrl = siteConfig.seo.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${siteUrl}${siteConfig.routes.locationsIndex}` },
      { "@type": "ListItem", position: 3, name: location.name, item: `${siteUrl}${siteConfig.routes.locationDetail(location.slug)}` },
    ],
  };

  const tel = (location.phone || siteConfig.business.phone).replace(/[^+\d]/g, "");
  const telHref = `tel:${tel}`;
  const mailHref = location.email ? `mailto:${location.email}` : undefined;

  const openingHoursSpecification = (() => {
    const dayMap: Record<string, string> = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
    const parseTime = (t: string) => {
      const m = t?.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!m) return null;
      let h = parseInt(m[1], 10);
      const min = parseInt(m[2] || "0", 10);
      const ampm = m[3].toUpperCase();
      if (ampm === "AM") { if (h === 12) h = 0; } else { if (h !== 12) h += 12; }
      return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    };
    const specs: any[] = [];
    (Object.keys(dayMap) as Array<keyof typeof dayMap>).forEach((k) => {
      const val = (location.hours as any)[k];
      if (!val || /closed/i.test(val)) return;
      const parts = val.split(/[–-]/);
      if (parts.length !== 2) return;
      const open = parseTime(parts[0]);
      const close = parseTime(parts[1]);
      if (open && close) specs.push({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${dayMap[k]}`, opens: open, closes: close });
    });
    return specs;
  })();

  const locationLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: location.name,
    url: `${siteUrl}${siteConfig.routes.locationDetail(location.slug)}`,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.line1,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country || "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: location.geo.lat, longitude: location.geo.lng },
    areaServed: location.serviceAreas.map((a) => ({ "@type": "City", name: `${a.name}, ${a.state}` })),
    openingHoursSpecification: openingHoursSpecification.length ? openingHoursSpecification : undefined,
  };
  return (
    <div>
      <Seo title={title} description={`Visit or contact ${location.name}. View address, phone, and service coverage.`} canonical={siteConfig.routes.locationDetail(location.slug)} />
      <Seo title={title} description={`Visit or contact ${location.name} for garage door services. Professional repair, installation, and emergency service in Edison and surrounding NJ areas.`} canonical={siteConfig.routes.locationDetail(location.slug)} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(locationLd)}</script>
      </Helmet>
      <Header />
      <main id="content">
        <article className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/">Home</Link> / <Link to={siteConfig.routes.locationsIndex}>Locations</Link> / <span className="text-foreground">{location.name}</span>
          </nav>

          <header className="mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{location.name}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">Professional garage door services in {location.address.city}, {location.address.state} and surrounding Bergen County, Hudson County areas.</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <section className="lg:col-span-2">
              <MapsProvider>
                <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                  <LocationsMap height={420} locationIds={[location.id]} />
                </div>
              </MapsProvider>
            </section>
            <aside className="space-y-4">
              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Contact</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {location.address.line1}, {location.address.city}, {location.address.state} {location.address.postalCode}
                </p>
                <p className="text-sm mt-1">
                  Phone: <a href={telHref} className="story-link" aria-label={`Call ${location.name}`}
                    onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "location_detail", phone: location.phone, location: location.name }); } catch {} }}
                  >{location.phone}</a>
                </p>
                {location.email && (
                  <p className="text-sm">
                    Email: <a href={mailHref as string} className="story-link" aria-label={`Email ${location.name}`}
                      onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "email_click", source: "location_detail", email: location.email, location: location.name }); } catch {} }}
                    >{location.email}</a>
                  </p>
                )}
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Hours</h2>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Mon: {location.hours.mon}</li>
                  <li>Tue: {location.hours.tue}</li>
                  <li>Wed: {location.hours.wed}</li>
                  <li>Thu: {location.hours.thu}</li>
                  <li>Fri: {location.hours.fri}</li>
                  <li>Sat: {location.hours.sat}</li>
                  <li>Sun: {location.hours.sun}</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Service Areas</h2>
                <ul className="text-sm mt-2 space-y-1">
                  {location.serviceAreas.map((a) => (
                    <li key={a.slug}>
                      <Link className="hover:text-primary" to={siteConfig.routes.serviceAreaDetail(a.slug)}>
                        {a.name}, {a.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default LocationDetail;

