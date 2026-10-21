import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { projectConfig } from "@/lib/config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How It Works — Speech Practice" },
      { name: "description", content: "Choose a topic, speak into your microphone, review and try again." },
      { property: "og:title", content: "How It Works — Speech Practice" },
      { property: "og:description", content: "Three simple steps to better English speaking." },
    ],
  }),
  component: About,
});

const steps = [
  { title: "Choose a practice topic", text: "Pick from seven categories, from Beginner to Interview Practice." },
  { title: "Speak using your microphone", text: "Your browser listens and shows the words it recognised in real time." },
  { title: "Review and try again", text: "See words spoken and accuracy, then repeat until it feels natural." },
];

function About() {
  return (
    <Layout>
      <PageHeader title="How It Works" subtitle="Speech Practice is a free tool that uses your browser's built-in speech recognition. No accounts, no paid services." />
      <div className="mx-auto max-w-5xl px-4">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="card-base p-6 fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary font-display text-xl font-bold text-primary-foreground">{i + 1}</span>
              <h2 className="mt-4 text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center"><Link to="/practice" className="btn-primary">Start Practice</Link></div>
        <div className="card-base mt-12 p-6">
          <h2 className="text-lg font-semibold">Tips for best results</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Use Chrome, Edge or Safari for voice recognition.</li>
            <li>Allow microphone access when your browser asks.</li>
            <li>Speak clearly at a natural pace in a quiet room.</li>
          </ul>
        </div>
        <section aria-labelledby="config" className="mt-12 rounded-2xl border border-dashed bg-muted/50 p-6">
          <h2 id="config" className="text-lg font-semibold">Project Configuration</h2>
          <p className="mt-1 text-xs text-muted-foreground">Editable placeholders (public values only — no secret keys).</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-medium">Published Key</dt><dd className="break-all font-mono text-muted-foreground">{projectConfig.publishedKey}</dd></div>
            <div><dt className="font-medium">Project URL</dt><dd className="break-all font-mono text-muted-foreground">{projectConfig.projectUrl}</dd></div>
          </dl>
        </section>
      </div>
    </Layout>
  );
}
