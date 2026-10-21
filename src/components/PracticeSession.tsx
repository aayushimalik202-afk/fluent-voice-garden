import { useState } from "react";
import { useSpeech } from "@/hooks/use-speech";
import { addSession, countWords, scoreAccuracy } from "@/lib/progress";

type Props = { prompt: string; category: string; freeTopic?: boolean; onComplete?: () => void };

export function PracticeSession({ prompt, category, freeTopic, onComplete }: Props) {
  const sp = useSpeech();
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<{ words: number; accuracy: number | null; text: string } | null>(null);
  const textMode = sp.supported === false;

  function finish(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const words = countWords(clean);
    const accuracy = freeTopic ? null : scoreAccuracy(prompt, clean);
    setResult({ words, accuracy, text: clean });
    addSession({ category, prompt, transcript: clean, words, accuracy });
    onComplete?.();
  }

  function stopAndScore() {
    sp.stop();
    finish(sp.transcript + " " + sp.interim);
  }

  function tryAgain() { setResult(null); setTyped(""); sp.reset(); }

  return (
    <div className="card-base p-6 md:p-8 fade-up">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{freeTopic ? "Speaking topic" : "Read this aloud"}</p>
      <p className="mt-3 font-display text-2xl font-semibold leading-snug md:text-3xl">“{prompt}”</p>

      {result ? (
        <div className="mt-8" role="status">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Words spoken" value={String(result.words)} />
            <Stat label="Accuracy" value={result.accuracy === null ? "Free talk" : `${result.accuracy}%`} />
            <Stat label="Status" value="✓ Completed" />
          </div>
          {result.accuracy !== null && (
            <p className="mt-4 text-sm text-muted-foreground">
              {result.accuracy >= 85 ? "Excellent! Your speech closely matched the sentence." : result.accuracy >= 60 ? "Good job! A few words were missed — try once more." : "Keep going! Speak slowly and clearly, then try again."}
            </p>
          )}
          <div className="mt-4 rounded-xl bg-muted p-4 text-sm"><span className="font-semibold">You said: </span>{result.text}</div>
          <button className="btn-primary mt-6" onClick={tryAgain}>↻ Try Again</button>
        </div>
      ) : textMode ? (
        <div className="mt-6">
          <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
            Your browser doesn't support speech recognition. Try Chrome or Edge for voice practice — or practise by typing below (say it aloud as you type!).
          </div>
          <label htmlFor="typed" className="mt-4 block text-sm font-medium">Type what you said</label>
          <textarea id="typed" value={typed} onChange={(e) => setTyped(e.target.value)} rows={4}
            className="mt-2 w-full rounded-xl border bg-background p-3 focus:outline-none focus:ring-2 focus:ring-ring" />
          <button className="btn-primary mt-4" disabled={!typed.trim()} onClick={() => finish(typed)}>Submit Practice</button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            {!sp.listening ? (
              <button className="btn-primary" onClick={sp.start} disabled={sp.supported === null}>🎙 Start Practice</button>
            ) : (
              <button className="btn-primary pulse-ring" onClick={stopAndScore}>■ Stop & See Results</button>
            )}
            {(sp.transcript || sp.error) && !sp.listening && (
              <>
                <button className="btn-outline" onClick={() => finish(sp.transcript)} disabled={!sp.transcript}>See Results</button>
                <button className="btn-outline" onClick={sp.start}>↻ Restart</button>
              </>
            )}
            {sp.listening && <span className="flex items-center gap-2 text-sm text-destructive"><span className="h-2 w-2 animate-pulse rounded-full bg-destructive" /> Listening…</span>}
          </div>
          {sp.error && <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive" role="alert">{sp.error}</p>}
          <div className="mt-6 min-h-24 rounded-xl border border-dashed bg-muted/50 p-4" aria-live="polite">
            {sp.transcript || sp.interim ? (
              <p>{sp.transcript} <span className="text-muted-foreground">{sp.interim}</span></p>
            ) : (
              <p className="text-sm text-muted-foreground">Your recognised speech will appear here.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
