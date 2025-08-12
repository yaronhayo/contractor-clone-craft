import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Phone, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import MobileNav from "@/components/layout/MobileNav";
import { useCallTracking } from "@/hooks/useCallTracking";
// cleaned unused navItems

export const Header = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0, 6);
  return (
    <header className="w-full sticky top-0 z-40 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute left-2 top-2 bg-primary text-primary-foreground px-3 py-2 rounded-md">Skip to content</a>
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-xl" aria-label={siteConfig.business.name}>
          {siteConfig.business.branding.logos.light?.src ? (
            <img
              src={siteConfig.business.branding.logos.light.src}
              alt={siteConfig.business.branding.logos.light.alt || `${siteConfig.business.name} logo`}
              width={siteConfig.business.branding.logos.light.width}
              height={siteConfig.business.branding.logos.light.height}
             className="h-8 w-auto"
              loading="eager"
            />
          ) : (
            <span className="text-primary">{siteConfig.business.name}</span>
          )}
          <span className="sr-only">Home</span>
        </Link>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore - component exists */}
          <MobileNav />
        </div>


        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 bg-background border shadow-md" sideOffset={6}>
                {siteConfig.taxonomy.services.map((s) => (
                  <DropdownMenuItem asChild key={s.slug}>
                    <Link to={siteConfig.routes.individualService(s.slug)}>{s.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to={siteConfig.routes.servicesIndex}>View All Services</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                Service Areas <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 bg-background border shadow-md" sideOffset={6}>
                {areas.map((a) => (
                  <DropdownMenuItem asChild key={a.slug}>
                    <Link to={siteConfig.routes.serviceAreaDetail(a.slug)}>
                      {a.name}, {a.state}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild><Link to="/service-areas">View All Service Areas</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          </li>
          <li>
            <Link to="/reviews" className="hover:text-primary transition-colors">Reviews</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300">
            <Link to="/booking">
              <Calendar className="h-4 w-4 mr-2" />
              Book Service
            </Link>
          </Button>
          {(() => { const { phone, telHref } = useCallTracking(siteConfig.business.phone); return (
            <Button asChild size="sm" className="rounded-full">
              <a href={telHref} aria-label={`Call ${siteConfig.business.name}`} onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "header", phone }); } catch {} }}>
                <Phone className="h-4 w-4 mr-2" />
                Call {phone}
              </a>
            </Button>
          ); })()}
        </div>
      </nav>
    </header>
  );
};

export default Header;
