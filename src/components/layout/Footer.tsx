const Footer = () => {
  return (
    <footer id="contact" className="border-t mt-16">
      <div className="py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} (Business Name) All rights reserved.</div>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

