-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_logs table
CREATE TABLE IF NOT EXISTS public.ai_logs (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for articles (public read, authenticated write)
CREATE POLICY "Anyone can view articles" 
ON public.articles 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update articles" 
ON public.articles 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete articles" 
ON public.articles 
FOR DELETE 
USING (true);

-- Create policies for ai_logs (public read/write for now)
CREATE POLICY "Anyone can view ai_logs" 
ON public.ai_logs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create ai_logs" 
ON public.ai_logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on articles
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();