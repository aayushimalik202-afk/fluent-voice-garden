import { todayKey } from "./data";

export type Session = { id: string; date: string; ts: number; category: string; prompt: string; transcript: string; words: number; accuracy: number | null };
export type Progress = { sessions: Session[]; challenges: Record<string, boolean> };

const KEY = "speech-practice-progress-v1";
const empty = (): Progress => ({ sessions: [], challenges: {} });

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw);
    return { sessions: Array.isArray(p.sessions) ? p.sessions : [], challenges: p.challenges ?? {} };
  } catch {
    return empty();
  }
}

function save(p: Progress) {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage full or blocked */ }
}

export function addSession(s: Omit<Session, "id" | "date" | "ts">) {
  const p = loadProgress();
  const now = new Date();
  p.sessions.unshift({ ...s, id: `${now.getTime()}-${Math.floor(Math.random() * 1e6)}`, date: todayKey(now), ts: now.getTime() });
  p.sessions = p.sessions.slice(0, 200);
  save(p);
}

export function completeChallenge(date = todayKey()) {
  const p = loadProgress();
  p.challenges[date] = true;
  save(p);
}

export function resetProgress() { save(empty()); }

/** Consecutive days (ending today or yesterday) with at least one session or challenge. */
export function computeStreak(p: Progress, now = new Date()) {
  const days = new Set([...p.sessions.map((s) => s.date), ...Object.keys(p.challenges).filter((k) => p.challenges[k])]);
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(todayKey(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
export const countWords = (t: string) => norm(t).length;

/** Percentage of target words that appear in the spoken text. */
export function scoreAccuracy(target: string, spoken: string) {
  const t = norm(target);
  if (!t.length) return 0;
  const bag = new Map<string, number>();
  norm(spoken).forEach((w) => bag.set(w, (bag.get(w) ?? 0) + 1));
  let hit = 0;
  for (const w of t) { const c = bag.get(w) ?? 0; if (c > 0) { hit++; bag.set(w, c - 1); } }
  return Math.round((hit / t.length) * 100);
}
