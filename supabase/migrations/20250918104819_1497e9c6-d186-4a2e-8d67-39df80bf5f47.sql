-- Create enum for subscription tiers
CREATE TYPE public.subscription_tier AS ENUM ('free', 'plus', 'pro');

-- Create enum for achievement keys
CREATE TYPE public.achievement_key AS ENUM (
  'first_steps', 'curious_learner', 'knowledge_seeker', 'marathon_session', 
  'science_explorer', 'night_owl', 'upgrade_unlocked', 'pro_explorer', 
  'pdf_master', 'time_traveler', 'lightning_brain', 'perfectionist', 
  'collector', 'mystery_badge'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  tier subscription_tier NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create usage tracking table
CREATE TABLE public.usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  requests_today INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_key achievement_key NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_key)
);

-- Create chat history table (Pro feature)
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID NOT NULL DEFAULT gen_random_uuid(),
  message_role TEXT NOT NULL CHECK (message_role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage
CREATE POLICY "Users can view their own usage"
  ON public.usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
  ON public.usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage"
  ON public.usage FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Users can view their own achievements"
  ON public.achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_history
CREATE POLICY "Users can view their own chat history"
  ON public.chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat history"
  ON public.chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, tier)
  VALUES (NEW.id, NEW.email, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usage_updated_at
  BEFORE UPDATE ON public.usage
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();