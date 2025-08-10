import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { Wrench, MapPin, Building2, Map as MapIcon, HelpCircle, Star, Info, Phone, Mail, Clock, Shield } from "lucide-react";

const Footer = () => {
  const serviceAreas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values());
  const topServices = siteConfig.taxonomy.services.slice(0, 6);
  const phone = siteConfig.business.phone;
  const email = siteConfig.business.email;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${email}`;

  return (
    <footer className="bg-muted/20 border-t mt-16">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Company Info with Logo */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              {siteConfig.business.branding.logos.light?.src ? (
                <img
                  src={siteConfig.business.branding.logos.light.src}
                  alt={siteConfig.business.branding.logos.light.alt || `${siteConfig.business.name} logo`}
                  width={siteConfig.business.branding.logos.light.width}
                  height={siteConfig.business.branding.logos.light.height}
                 className="h-[94px] w-auto"
                />
              ) : (
                <div className="text-2xl font-extrabold text-primary">{siteConfig.business.name}</div>
              )}
            </Link>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional garage door repair and installation services in Elmwood Park, Montclair, and surrounding New Jersey areas.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={telHref} className="hover:text-primary transition-colors font-medium">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={mailHref} className="hover:text-primary transition-colors">
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Elmwood Park, NJ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>24/7 Emergency Service</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-semibold">
                <Shield className="h-4 w-4" />
                <span>Licensed NJ #13VH13553300</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {siteConfig.business.social?.facebook && (
                <a 
                  href={siteConfig.business.social.facebook} 
                  className="text-muted-foreground hover:text-primary transition-colors" 
                  aria-label="Facebook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {siteConfig.business.social?.instagram && (
                <a 
                  href={siteConfig.business.social.instagram} 
                  className="text-muted-foreground hover:text-primary transition-colors" 
                  aria-label="Instagram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.297s-1.297-1.848-1.297-3.326c0-1.297.49-2.448 1.297-3.326s1.848-1.297 3.326-1.297c1.297 0 2.448.49 3.326 1.297s1.297 1.848 1.297 3.326c0 1.297-.49 2.448-1.297 3.326s-1.848 1.297-3.326 1.297z"/>
                  </svg>
                </a>
              )}
              {siteConfig.business.social?.googleBusiness && (
                <a 
                  href={siteConfig.business.social.googleBusiness} 
                  className="text-muted-foreground hover:text-primary transition-colors" 
                  aria-label="Google Business" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link 
                    to={siteConfig.routes.individualService(service.categorySlug, service.slug)} 
                    className="hover:text-primary transition-colors hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 text-sm"
              >
                View All Services <Wrench className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 3: Service Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Areas We Serve
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceAreas.slice(0, 8).map((area) => (
                <li key={area.slug}>
                  <Link 
                    to={siteConfig.routes.serviceAreaDetail(area.slug)} 
                    className="hover:text-primary transition-colors"
                  >
                    {area.name}, {area.state}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link 
                to="/service-areas" 
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 text-sm"
              >
                View All Areas <MapPin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 4: Quick Links & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Info className="h-4 w-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Star className="h-4 w-4" />
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/locations" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MapIcon className="h-4 w-4" />
                  Locations
                </Link>
              </li>
            </ul>

            {/* Emergency Contact Highlight */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                24/7 Emergency Service
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Garage door emergency? We're available around the clock.
              </p>
              <a 
                href={telHref}
                className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  try {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ event: "phone_click", source: "footer_emergency", phone });
                  } catch {}
                }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call {phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background/50">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.business.legalName || siteConfig.business.name}. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <span className="text-muted-foreground">
                NJ License #13VH13553300
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;