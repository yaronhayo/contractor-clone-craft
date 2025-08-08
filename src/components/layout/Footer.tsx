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
            <li><a className="hover:text-primary" href="#services">Services</a></li>
            <li><a className="hover:text-primary" href="#areas">Service Areas</a></li>
            <li><a className="hover:text-primary" href="#about">About</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Get Started</h3>
          <p className="text-sm text-muted-foreground">Ready to launch? Build your own site today.</p>
          <a href="#build" className="inline-block mt-3 text-primary underline">Build Your Own Website</a>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Contractor Template Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
