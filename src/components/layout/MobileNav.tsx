import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Wrench, MapPin, Building2, Map as MapIcon, HelpCircle, Star, Info, Phone } from "lucide-react";

const MobileNav = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values());

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">Menu</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[360px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-6 text-sm">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Services</div>
            <ul className="mt-2 space-y-2">
              {siteConfig.taxonomy.services.map((s) => (
                <li key={s.slug}>
                  <SheetClose asChild>
                    <Link to={siteConfig.routes.individualService(s.slug)} className="hover:text-primary">{s.name}</Link>
                  </SheetClose>
                </li>
              ))}
              <li>
                <SheetClose asChild>
                  <Link to={siteConfig.routes.servicesIndex} className="flex items-center gap-2 hover:text-primary">
                    <Wrench className="h-4 w-4" aria-hidden="true" />
                    <span>View All Services</span>
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Service Areas</div>
            <ul className="mt-2 space-y-2 max-h-56 overflow-auto pr-1">
              {areas.map((a) => (
                <li key={a.slug}>
                  <SheetClose asChild>
                    <Link to={siteConfig.routes.serviceAreaDetail(a.slug)} className="hover:text-primary">{a.name}, {a.state}</Link>
                  </SheetClose>
                </li>
              ))}
              <li>
                <SheetClose asChild>
                  <Link to="/service-areas" className="flex items-center gap-2 hover:text-primary">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>View All Service Areas</span>
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </div>

          <ul className="space-y-3">
            <li>
              <SheetClose asChild>
                <Link to={siteConfig.routes.servicesIndex} className="flex items-center gap-2 hover:text-primary">
                  <Wrench className="h-4 w-4" aria-hidden="true" />
                  <span>Services</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/cities" className="flex items-center gap-2 hover:text-primary">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span>Cities</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/service-areas" className="flex items-center gap-2 hover:text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>Service Areas</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/locations" className="flex items-center gap-2 hover:text-primary">
                  <MapIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Locations</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/reviews" className="flex items-center gap-2 hover:text-primary">
                  <Star className="h-4 w-4" aria-hidden="true" />
                  <span>Reviews</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/faq" className="flex items-center gap-2 hover:text-primary">
                  <HelpCircle className="h-4 w-4" aria-hidden="true" />
                  <span>FAQ</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/about" className="flex items-center gap-2 hover:text-primary">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  <span>About</span>
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Contact</span>
                </Link>
              </SheetClose>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
