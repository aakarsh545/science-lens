-- Fix ai_logs security issues by adding user tracking
ALTER TABLE public.ai_logs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Remove dangerous public policies from ai_logs
DROP POLICY IF EXISTS "Anyone can create ai_logs" ON public.ai_logs;
DROP POLICY IF EXISTS "Anyone can view ai_logs" ON public.ai_logs;

-- Add secure RLS policies for ai_logs
CREATE POLICY "Users can create ai_logs"
  ON public.ai_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can view their own ai_logs"
  ON public.ai_logs FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Remove dangerous public policies from articles
DROP POLICY IF EXISTS "Anyone can create articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can delete articles" ON public.articles;  
DROP POLICY IF EXISTS "Anyone can update articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can view articles" ON public.articles;

-- Add secure policies for articles (admin only for now)
CREATE POLICY "Authenticated users can view articles"
  ON public.articles FOR SELECT
  TO authenticated
  USING (true);

-- Add user activity tracking table
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own activity"
  ON public.user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own activity" 
  ON public.user_activity FOR SELECT
  USING (auth.uid() = user_id);