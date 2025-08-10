import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const Footer = () => {
  return (
    <footer id="contact" className="border-t mt-16">
      <div className="container py-10">
        <section aria-labelledby="areas-heading">
          <h2 id="areas-heading" className="text-sm font-semibold tracking-wide text-muted-foreground">Areas we serve</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
            {Array.from(new Map(siteConfig.locations.flatMap(l => l.serviceAreas).map(a => [a.slug, a])).values()).map((a) => (
              <li key={a.slug}>
                <Link to={siteConfig.routes.serviceAreaDetail(a.slug)} className="hover:text-primary">
                  {a.name}, {a.state}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="py-4 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} {siteConfig.business.legalName || siteConfig.business.name}. All rights reserved.</div>
          <nav className="flex items-center gap-4">
            {siteConfig.business.social?.facebook && (<a href={siteConfig.business.social.facebook} className="hover:text-primary" aria-label="Facebook">Facebook</a>)}
            {siteConfig.business.social?.linkedin && (<a href={siteConfig.business.social.linkedin} className="hover:text-primary" aria-label="LinkedIn">LinkedIn</a>)}
            {siteConfig.business.social?.instagram && (<a href={siteConfig.business.social.instagram} className="hover:text-primary" aria-label="Instagram">Instagram</a>)}
            {siteConfig.business.social?.twitter && (<a href={siteConfig.business.social.twitter} className="hover:text-primary" aria-label="Twitter">Twitter</a>)}
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/setup" className="hover:text-primary" aria-label="Project Setup Checklist">Setup</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

