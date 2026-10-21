import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { categories } from "@/lib/data";
import { computeStreak, loadProgress, resetProgress, type Progress } from "@/lib/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Speech Practice" },
      { name: "description", content: "Your practice sessions, streak and words practised." },
      { property: "og:title", content: "Dashboard — Speech Practice" },
      { property: "og:description", content: "Track your English speaking progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [p, setP] = useState<Progress | null>(null);
  useEffect(() => setP(loadProgress()), []);
  if (!p) return <Layout><PageHeader title="Dashboard" subtitle="Loading your progress…" /></Layout>;

  const words = p.sessions.reduce((a, s) => a + s.words, 0);
  const scored = p.sessions.filter((s) => s.accuracy !== null);
  const avg = scored.length ? Math.round(scored.reduce((a, s) => a + (s.accuracy ?? 0), 0) / scored.length) : 0;
  const stats = [
    { label: "Sessions completed", value: p.sessions.length, icon: "✅" },
    { label: "Current streak", value: `${computeStreak(p)} days`, icon: "🔥" },
    { label: "Words practised", value: words, icon: "📝" },
    { label: "Avg. accuracy", value: `${avg}%`, icon: "🎯" },
  ];

  return (
    <Layout>
      <PageHeader title="Dashboard" subtitle="Your progress is saved privately in this browser." />
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-base p-6">
              <span className="text-2xl" aria-hidden>{s.icon}</span>
              <p className="mt-3 font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-base p-6">
            <h2 className="text-xl font-bold">Category progress</h2>
            <ul className="mt-4 space-y-4">
              {categories.map((c) => {
                const n = p.sessions.filter((s) => s.category === c.name).length;
                const pct = Math.min(100, Math.round((n / c.items.length) * 100));
                return (
                  <li key={c.id}>
                    <div className="flex justify-between text-sm"><span>{c.emoji} {c.name}</span><span className="text-muted-foreground">{n} sessions</span></div>
                    <div className="mt-1.5 h-2 rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={c.name}>
                      <div className="h-2 rounded-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-base p-6">
            <h2 className="text-xl font-bold">Recent activity</h2>
            {p.sessions.length === 0 ? (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">No practice yet. Your sessions will show up here.</p>
                <Link to="/practice" className="btn-primary mt-4">Start Practice</Link>
              </div>
            ) : (
              <ul className="mt-4 divide-y">
                {p.sessions.slice(0, 8).map((s) => (
                  <li key={s.id} className="py-3">
                    <div className="flex justify-between gap-2 text-sm">
                      <span className="font-medium">{s.category}</span>
                      <span className="text-muted-foreground">{new Date(s.ts).toLocaleString()}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{s.prompt}</p>
                    <p className="text-xs text-primary">{s.words} words{s.accuracy !== null ? ` · ${s.accuracy}% accuracy` : ""}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {p.sessions.length > 0 && (
          <div className="text-center">
            <button className="btn-outline" onClick={() => { if (window.confirm("Delete all saved progress?")) { resetProgress(); setP(loadProgress()); } }}>Reset progress</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
