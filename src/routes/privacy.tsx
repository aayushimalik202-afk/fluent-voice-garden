import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Speech Practice" },
      { name: "description", content: "How Speech Practice handles your data: it stays in your browser." },
      { property: "og:title", content: "Privacy — Speech Practice" },
      { property: "og:description", content: "Your progress stays in your browser." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Layout>
      <PageHeader title="Privacy" subtitle="Simple and transparent." />
      <div className="card-base mx-auto max-w-3xl space-y-4 p-8 text-muted-foreground">
        <p>Speech Practice has no accounts and no server database. Your practice history is stored only in your browser's local storage, and you can delete it any time from the Dashboard.</p>
        <p>Voice recognition is provided by your browser's built-in Web Speech API. Depending on your browser, audio may be processed by the browser vendor's speech service. We never record or store your audio.</p>
      </div>
    </Layout>
  );
}
