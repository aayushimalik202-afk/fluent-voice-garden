import { useCallback, useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSpeech() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);
  const finalRef = useRef("");

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupported(!!SR);
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let fin = "", inter = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) fin += r[0].transcript + " "; else inter += r[0].transcript;
      }
      finalRef.current = fin.trim();
      setTranscript(fin.trim());
      setInterim(inter);
    };
    rec.onerror = (e: any) => {
      const map: Record<string, string> = {
        "not-allowed": "Microphone access was blocked. Please allow microphone permission in your browser settings.",
        "no-speech": "We didn't hear anything. Try speaking a little louder.",
        "audio-capture": "No microphone was found. Please connect one and try again.",
        network: "A network error occurred with speech recognition. Please try again.",
      };
      if (e.error !== "aborted") setError(map[e.error] ?? "Something went wrong with speech recognition.");
      setListening(false);
    };
    rec.onend = () => { setListening(false); setInterim(""); };
    recRef.current = rec;
    return () => { try { rec.abort(); } catch { /* ignore */ } };
  }, []);

  const start = useCallback(() => {
    if (!recRef.current) return;
    setError(null); setTranscript(""); setInterim(""); finalRef.current = "";
    try { recRef.current.start(); setListening(true); } catch { /* already started */ }
  }, []);
  const stop = useCallback(() => { try { recRef.current?.stop(); } catch { /* ignore */ } }, []);
  const reset = useCallback(() => {
    try { recRef.current?.abort(); } catch { /* ignore */ }
    setTranscript(""); setInterim(""); setError(null); setListening(false); finalRef.current = "";
  }, []);

  return { supported, listening, transcript, interim, error, start, stop, reset };
}
