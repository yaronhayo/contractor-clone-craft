import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site-config";
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

        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          </li>
          <li>
            <Link to="/locations" className="hover:text-primary transition-colors">Locations</Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 bg-popover border shadow-md" sideOffset={6}>
                {siteConfig.taxonomy.services.slice(0, 6).map((s) => (
                  <DropdownMenuItem asChild key={s.slug}>
                    <Link to={siteConfig.routes.individualService(s.slug)}>{s.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild><Link to={siteConfig.routes.servicesIndex}>All services</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                Service Areas <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 bg-popover border shadow-md" sideOffset={6}>
                {areas.map((a) => (
                  <DropdownMenuItem asChild key={a.slug}>
                    <Link to={siteConfig.routes.serviceAreaDetail(a.slug)}>
                      {a.name}, {a.state}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild><Link to="/service-areas">All areas</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-full">
            <a href={`tel:${siteConfig.business.phone}`} aria-label={`Call ${siteConfig.business.name}`} onClick={() => { try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "phone_click", source: "header", phone: siteConfig.business.phone }); } catch {} }}>Call Now</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
