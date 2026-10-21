import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { PracticeSession } from "@/components/PracticeSession";
import { todayKey, topicForDate } from "@/lib/data";
import { completeChallenge, computeStreak, loadProgress, type Progress } from "@/lib/progress";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Daily Challenge — Speech Practice" },
      { name: "description", content: "A new English speaking topic every day. Build your streak." },
      { property: "og:title", content: "Daily Challenge — Speech Practice" },
      { property: "og:description", content: "One speaking topic per day with local progress tracking." },
    ],
  }),
  component: Challenges,
});

function Challenges() {
  const [p, setP] = useState<Progress | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => setP(loadProgress()), []);
  const today = todayKey();
  const topic = topicForDate();
  const done = !!p?.challenges[today];

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return { key: todayKey(d), label: d.toLocaleDateString(undefined, { weekday: "short" }) };
  });

  return (
    <Layout>
      <PageHeader title="Daily Challenge" subtitle="One topic a day. Speak for about a minute and keep your streak going." />
      <div className="mx-auto max-w-3xl space-y-6 px-4">
        <div className="card-base flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <p className="text-sm text-muted-foreground">Today's status</p>
            <p className={`font-display text-xl font-bold ${done ? "text-success" : "text-primary"}`}>{done ? "✓ Completed" : "Not completed yet"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current streak</p>
            <p className="font-display text-xl font-bold">🔥 {p ? computeStreak(p) : 0} days</p>
          </div>
          <ul className="flex w-full justify-between gap-2" aria-label="Last 7 days">
            {last7.map((d) => (
              <li key={d.key} className="flex flex-1 flex-col items-center gap-1 text-xs text-muted-foreground">
                <span className={`grid h-9 w-9 place-items-center rounded-full ${p?.challenges[d.key] ? "bg-gradient-primary text-primary-foreground" : "bg-muted"}`}>{p?.challenges[d.key] ? "✓" : ""}</span>
                {d.label}
              </li>
            ))}
          </ul>
        </div>
        {started ? (
          <PracticeSession prompt={topic} category="Daily Challenge" freeTopic onComplete={() => { completeChallenge(today); setP(loadProgress()); }} />
        ) : (
          <div className="card-base p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Today's topic</p>
            <p className="mt-3 font-display text-2xl font-semibold">{topic}</p>
            <button className="btn-primary mt-6" onClick={() => setStarted(true)}>{done ? "Practise Again" : "Start Challenge"}</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
