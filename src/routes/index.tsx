import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Speech Practice — Improve your English speaking" },
      { name: "description", content: "Free speaking, pronunciation and vocabulary practice in your browser." },
      { property: "og:title", content: "Speech Practice" },
      { property: "og:description", content: "Improve your English speaking skills, one sentence at a time." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: "🗣", title: "Speaking Practice", text: "Read sentences aloud and see what the browser heard." },
  { icon: "🔤", title: "Pronunciation Practice", text: "Tongue twisters and tricky sounds to sharpen clarity." },
  { icon: "📚", title: "Vocabulary Practice", text: "Topics from everyday chat to advanced ideas." },
  { icon: "🔥", title: "Daily Challenges", text: "A fresh speaking topic every single day." },
  { icon: "📈", title: "Progress Tracking", text: "Sessions, streaks and words — saved privately." },
];

function Home() {
  return (
    <Layout>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center fade-up md:py-32">
          <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">Free · No sign-up · Private</span>
          <h1 className="mt-6 text-5xl font-extrabold md:text-7xl"><span className="text-gradient">Speech Practice</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">Improve your English speaking skills, one sentence at a time.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/practice" className="btn-primary">🎙 Start Practice</Link>
            <Link to="/about" className="btn-outline">How It Works</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="features">
        <h2 id="features" className="text-center text-3xl font-bold">Everything you need to speak with confidence</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <div key={f.title} className="card-base p-6 transition hover:-translate-y-1 fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl" aria-hidden>{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-glow">
          <h2 className="text-3xl font-bold">Today's challenge is waiting</h2>
          <p className="mt-2 opacity-90">Keep your streak alive with a 1-minute speaking topic.</p>
          <Link to="/challenges" className="mt-6 inline-flex rounded-full bg-card px-6 py-3 font-semibold text-primary transition hover:-translate-y-0.5">Start Challenge →</Link>
        </div>
      </section>
    </Layout>
  );
}
