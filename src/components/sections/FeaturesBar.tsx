const FeaturesBar = () => {
  const items = ["24/7 Emergency Service", "Licensed & Insured", "All Brands Serviced"];
  return (
    <section aria-label="Features quick bar" className="bg-primary text-primary-foreground shadow">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        {items.map((item, i) => (
          <div key={i} className="w-full md:w-1/3 text-center py-3 font-semibold tracking-wide uppercase border-b md:border-b-0 md:border-r border-primary-foreground/20 last:border-0">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesBar;
