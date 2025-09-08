import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyPromptProps {
  onApiKeySet: (key: string) => void;
  onDismiss: () => void;
}

export function ApiKeyPrompt({ onApiKeySet, onDismiss }: ApiKeyPromptProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async () => {
    if (!apiKey.trim()) return;
    
    setIsValidating(true);
    
    // Simple validation - just check if it starts with sk-
    if (apiKey.startsWith('sk-')) {
      // Store in localStorage for this session
      localStorage.setItem('temp_openai_key', apiKey);
      onApiKeySet(apiKey);
    } else {
      alert('Please enter a valid OpenAI API key (starts with sk-)');
    }
    
    setIsValidating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>Enable AI Responses</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                ScienceLens can provide enhanced AI responses using OpenAI's GPT-4. 
                Enter your API key below or continue using our detailed mock responses.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                OpenAI API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and never sent to our servers.
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSubmit}
                disabled={!apiKey.trim() || isValidating}
                className="flex-1"
              >
                {isValidating ? 'Validating...' : 'Enable AI'}
              </Button>
              <Button
                variant="outline"
                onClick={onDismiss}
                className="flex-1"
              >
                Use Mock Responses
              </Button>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">
                Need an API key?
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
              >
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get OpenAI API Key
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}