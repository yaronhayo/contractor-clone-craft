import { siteConfig } from "@/config/site-config";

const steps = [
  {
    title: "Step 1: Reach Out to Us",
    text: "Tell us what you need—repair, installation, emergency service—and your location.",
  },
  {
    title: "Step 2: Schedule Your Service",
    text: "We confirm details and give you clear pricing with a convenient time window.",
  },
  {
    title: "Step 3: We Do the Work",
    text: "A licensed technician arrives on time and completes the job with care.",
  },
  {
    title: "Step 4: You're All Set",
    text: "We test everything, tidy up, and make sure you’re satisfied before we leave.",
  },
];

const Process = () => {
  return (
    <section id="process" className="container py-14 md:py-20">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">How Our Garage Door Service Works in {siteConfig.business.hqAddress.city}</h2>
        <p className="mt-2 text-muted-foreground">Simple, transparent, and fast—just four easy steps.</p>
      </header>
      <ol className="grid md:grid-cols-4 gap-6 mt-10">
        {steps.map((s, idx) => (
          <li key={s.title} className="rounded-lg border p-6 bg-card">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">{idx + 1}</div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Process;
