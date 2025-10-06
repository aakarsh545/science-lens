import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

interface OpenAISetupProps {
  onComplete: () => void;
}

export function OpenAISetup({ onComplete }: OpenAISetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTest = async () => {
    if (!apiKey.trim() || !apiKey.startsWith('sk-')) {
      setError('Please enter a valid OpenAI API key (starts with sk-)');
      return;
    }

    setTesting(true);
    setError('');
    setSuccess(false);

    try {
      // Store in localStorage for frontend use
      localStorage.setItem('openai_api_key', apiKey);

      // Test the connection by calling our edge function with the test flag
      const { data, error: testError } = await supabase.functions.invoke('ask', {
        body: { 
          prompt: 'Hello',
          test: true,
          apiKey: apiKey // Pass the key for testing
        }
      });

      if (testError || data?.error) {
        throw new Error(data?.error || testError?.message || 'Connection failed');
      }

      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 1500);

    } catch (err: any) {
      console.error('OpenAI test error:', err);
      setError(err.message || 'Failed to connect to OpenAI. Please check your API key.');
      localStorage.removeItem('openai_api_key');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-cosmic rounded-xl">
                <Key className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Setup OpenAI</CardTitle>
            <CardDescription>
              Enter your OpenAI API key to enable AI-powered science explanations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  ✅ OpenAI Connected Successfully
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium">
                    OpenAI API Key
                  </label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleTest()}
                    disabled={testing}
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{' '}
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      OpenAI Dashboard
                    </a>
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleTest}
                  disabled={!apiKey.trim() || testing}
                  className="w-full"
                >
                  {testing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing Connection...
                    </>
                  ) : (
                    <>
                      <Key className="mr-2 h-4 w-4" />
                      Connect OpenAI
                    </>
                  )}
                </Button>

                <Alert>
                  <AlertDescription className="text-sm">
                    Your API key is stored locally in your browser and used to communicate with OpenAI directly through our secure backend.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
