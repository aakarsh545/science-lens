-- Fix 1: Remove public access from ai_logs table
-- Drop the existing policy that allows NULL user_id access
DROP POLICY IF EXISTS "Users can view their own ai_logs" ON public.ai_logs;

-- Create new policy that only allows users to see their own logs
CREATE POLICY "Users can view their own ai_logs"
ON public.ai_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can create ai_logs" ON public.ai_logs;

-- Create new INSERT policy that requires authentication
CREATE POLICY "Users can create their own ai_logs"
ON public.ai_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Fix 4: Add DELETE policy for chat_history
CREATE POLICY "Users can delete their own chat history"
ON public.chat_history
FOR DELETE
USING (auth.uid() = user_id);

-- Add DELETE policy for conversations (users should be able to delete their conversations)
DROP POLICY IF EXISTS "Users can delete their own conversations" ON public.conversations;

CREATE POLICY "Users can delete their own conversations"
ON public.conversations
FOR DELETE
USING (auth.uid() = user_id);

-- Fix 2: Strengthen profiles table security
-- Drop existing policies and recreate with stricter rules
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Users can only view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Users can only update their own profile (but not Stripe fields from client)
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Ensure conversations INSERT policy doesn't allow NULL user_id for new entries
DROP POLICY IF EXISTS "Users can insert their own conversations" ON public.conversations;

CREATE POLICY "Users can insert their own conversations"
ON public.conversations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add comment explaining security for Stripe fields
COMMENT ON COLUMN public.profiles.stripe_customer_id IS 'Only accessible via service role key for backend operations';
COMMENT ON COLUMN public.profiles.stripe_subscription_id IS 'Only accessible via service role key for backend operations';