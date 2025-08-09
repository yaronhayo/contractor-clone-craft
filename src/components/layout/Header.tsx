import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site-config";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Blog Hub Page", href: "/blog" },
  { label: "Services", href: "/services", caret: true },
  { label: "Service Area Hub", href: "/service-areas", caret: true },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const areas = Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).slice(0, 6);
  return (
    <header className="w-full sticky top-0 z-40 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute left-2 top-2 bg-primary text-primary-foreground px-3 py-2 rounded-md">Skip to content</a>
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-xl">
          <span className="px-2 py-1 border rounded-md">GET</span>
          <span className="text-primary">BIZZY</span>
          <span className="sr-only">Home</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog Hub Page</Link>
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
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild><Link to="/services/service-number-1">Service #1</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/services/service-number-2">Service #2</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/services/service-number-3">Service #3</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/services/service-number-4">Service #4</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/services/service-number-5">Service #5</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/services/service-number-6">Service #6</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/services">All services</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                Service Area Hub <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
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
            <a href="/#build">Build Your Own Website!</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
