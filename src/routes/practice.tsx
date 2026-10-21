import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { PracticeSession } from "@/components/PracticeSession";
import { categories } from "@/lib/data";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Speech Practice" },
      { name: "description", content: "Choose a category and practise speaking English with your microphone." },
      { property: "og:title", content: "Practice — Speech Practice" },
      { property: "og:description", content: "Seven categories from Beginner to Public Speaking." },
    ],
  }),
  component: Practice,
});

function Practice() {
  const [catId, setCatId] = useState(categories[0].id);
  const [idx, setIdx] = useState(0);
  const cat = categories.find((c) => c.id === catId)!;
  const prompt = cat.items[idx % cat.items.length];

  return (
    <Layout>
      <PageHeader title="Practice" subtitle="Pick a category, read the sentence aloud, and review your result." />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[280px_1fr]">
        <div role="radiogroup" aria-label="Practice categories" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {categories.map((c) => (
            <button key={c.id} role="radio" aria-checked={c.id === catId} onClick={() => { setCatId(c.id); setIdx(0); }}
              className={`shrink-0 rounded-2xl border p-4 text-left transition ${c.id === catId ? "border-primary bg-secondary shadow-soft" : "bg-card hover:bg-muted"}`}>
              <span className="font-semibold">{c.emoji} {c.name}</span>
              <span className="mt-1 hidden text-xs text-muted-foreground lg:block">{c.description}</span>
            </button>
          ))}
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{cat.name} · {(idx % cat.items.length) + 1} of {cat.items.length}</span>
            <div className="flex gap-2">
              <button className="btn-outline !px-4 !py-2 text-sm" onClick={() => setIdx((i) => (i - 1 + cat.items.length) % cat.items.length)}>← Prev</button>
              <button className="btn-outline !px-4 !py-2 text-sm" onClick={() => setIdx((i) => i + 1)}>Next →</button>
            </div>
          </div>
          <PracticeSession key={`${catId}-${idx}`} prompt={prompt} category={cat.name} />
        </div>
      </div>
    </Layout>
  );
}
