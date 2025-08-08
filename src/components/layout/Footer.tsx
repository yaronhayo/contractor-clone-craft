const Footer = () => {
  return (
    <footer id="contact" className="border-t mt-16">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-muted-foreground text-sm">
            This is a clone of the Contractor Website Template, built with a clean
            design system and responsive layout.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-primary" href="/services">Services</a></li>
            <li><a className="hover:text-primary" href="/service-areas">Service Areas</a></li>
            <li><a className="hover:text-primary" href="/about">About</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Get Started</h3>
          <p className="text-sm text-muted-foreground">Ready to launch? Build your own site today.</p>
          <a href="#build" className="inline-block mt-3 text-primary underline">Build Your Own Website</a>
        </div>
      </div>
      <div className="py-4 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Contractor Template Clone. All rights reserved.</div>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary">Terms & Conditions</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
