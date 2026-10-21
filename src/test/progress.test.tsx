import { describe, expect, it } from "vitest";
import { computeStreak, scoreAccuracy } from "@/lib/progress";

describe("progress rules", () => {
  it("scores accuracy as percent of target words spoken", () => {
    expect(scoreAccuracy("The weather is nice", "the weather is")).toBe(75);
  });
  it("counts streak of consecutive days", () => {
    const now = new Date(2026, 9, 21);
    const p = { sessions: [], challenges: { "2026-10-21": true, "2026-10-20": true, "2026-10-18": true } };
    expect(computeStreak(p, now)).toBe(2);
  });
});
