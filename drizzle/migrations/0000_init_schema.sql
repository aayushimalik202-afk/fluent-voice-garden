-- ============================================================
-- Fluent Voice Garden — database schema
-- Stores each learner's practice history and daily challenge
-- streaks on the server, so progress follows them across
-- devices instead of living in one browser.
--
-- Order per table: CREATE TABLE -> GRANT -> enable RLS -> POLICY
-- ============================================================

-- ---------- 1. Practice sessions ----------
-- One row per spoken attempt: the sentence that was read, what
-- was heard, and the score it earned.

CREATE TABLE public.practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  category text NOT NULL,
  prompt text NOT NULL,
  transcript text NOT NULL DEFAULT '',
  words integer NOT NULL DEFAULT 0,
  accuracy integer,
  practiced_on date NOT NULL DEFAULT (now())::date,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT practice_sessions_accuracy_range CHECK (accuracy IS NULL OR (accuracy >= 0 AND accuracy <= 100)),
  CONSTRAINT practice_sessions_words_check CHECK (words >= 0)
);

CREATE INDEX practice_sessions_user_recent_idx ON public.practice_sessions (user_id, created_at DESC);
CREATE INDEX practice_sessions_user_day_idx ON public.practice_sessions (user_id, practiced_on);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_sessions TO authenticated;
GRANT ALL ON public.practice_sessions TO service_role;

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON public.practice_sessions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can add their own sessions"
  ON public.practice_sessions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can edit their own sessions"
  ON public.practice_sessions FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own sessions"
  ON public.practice_sessions FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ---------- 2. Daily challenge completions ----------
-- One row per day a learner finished the daily challenge.
-- The pair (user, day) is unique, so a day can't be counted twice.

CREATE TABLE public.challenge_completions (
  user_id uuid NOT NULL DEFAULT auth.uid(),
  challenge_on date NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, challenge_on)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.challenge_completions TO authenticated;
GRANT ALL ON public.challenge_completions TO service_role;

ALTER TABLE public.challenge_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own challenge days"
  ON public.challenge_completions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can mark their own challenge days"
  ON public.challenge_completions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can clear their own challenge days"
  ON public.challenge_completions FOR DELETE TO authenticated
  USING (user_id = auth.uid());