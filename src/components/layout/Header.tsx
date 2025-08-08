import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Blog Hub Page", href: "#blog" },
  { label: "Services", href: "#services", caret: true },
  { label: "Service Area Hub", href: "#areas", caret: true },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  return (
    <header className="w-full sticky top-0 z-40 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-xl">
          <span className="px-2 py-1 border rounded-md">GET</span>
          <span className="text-primary">BIZZY</span>
          <span className="sr-only">Home</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-primary transition-colors inline-flex items-center gap-1">
                {item.label}
                {item.caret && <ChevronDown className="h-4 w-4" aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-full">
            <a href="#build">Build Your Own Website!</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
