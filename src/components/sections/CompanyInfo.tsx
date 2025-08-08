const CompanyInfo = () => {
  return (
    <section id="contact" className="container py-14 md:py-20">
      <div className="grid lg:grid-cols-3 gap-8">
        <article className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-2">Who We Are</h3>
          <p className="text-muted-foreground">
            (BRIEF BUSINESS DESCRIPTION) Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          </p>
        </article>
        <article className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: service@example.com</li>
            <li>Phone: (805) 555-5555</li>
            <li>Address: BUSINESS ADDRESS</li>
          </ul>
          <div className="mt-4">
            <h4 className="font-semibold">Hours Of Operation</h4>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2">
              <li>Mon–Fri: 8:00AM – 5:00PM</li>
              <li>Sat: 8:00AM – 2:00PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </article>
        <article className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-2">Service Area (Map)</h3>
          <div className="aspect-[4/3] rounded-lg overflow-hidden border">
            <iframe
              title="Service Area Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5%2C37.6%2C-122.2%2C37.85&layer=mapnik"
              className="w-full h-full"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default CompanyInfo;
