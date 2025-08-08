const steps = [
  {
    title: "Step 1: Reach Out to Us",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  },
  {
    title: "Step 2: Schedule (Service)",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa cum sociis natoque penatibus.",
  },
  {
    title: "Step 3: (We Provide Service)",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Venenatis vitae justo.",
  },
  {
    title: "Step 4: Enjoy the Results",
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla consequat massa quis enim.",
  },
];

const Process = () => {
  return (
    <section id="process" className="container py-14 md:py-20">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold">How Our (Service) Works (What Customer Can Expect)</h2>
        <p className="mt-2 text-muted-foreground">Our Process Is Nice And Easy Just Look At Our Four Steps</p>
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
