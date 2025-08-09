import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site-config";

const Footer = () => {
  return (
    <footer id="contact" className="border-t mt-16">
      <div className="py-4">
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

