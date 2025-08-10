import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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
              {siteConfig.taxonomy.categories.map((c) => (
                <li key={c.slug}>
                  <SheetClose asChild>
                    <Link to={siteConfig.routes.serviceCategory(c.slug)} className="hover:text-primary">{c.name}</Link>
                  </SheetClose>
                </li>
              ))}
              <li>
                <SheetClose asChild>
                  <Link to={siteConfig.routes.servicesIndex} className="hover:text-primary">View All Services</Link>
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
                  <Link to="/service-areas" className="hover:text-primary">View All Service Areas</Link>
                </SheetClose>
              </li>
            </ul>
          </div>

          <ul className="space-y-3">
            <li><SheetClose asChild><Link to="/faq" className="hover:text-primary">FAQ</Link></SheetClose></li>
            <li><SheetClose asChild><Link to="/reviews" className="hover:text-primary">Reviews</Link></SheetClose></li>
            <li><SheetClose asChild><Link to="/about" className="hover:text-primary">About</Link></SheetClose></li>
            <li><SheetClose asChild><Link to="/contact" className="hover:text-primary">Contact</Link></SheetClose></li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
