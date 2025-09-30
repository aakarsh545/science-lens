import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, TestTube } from 'lucide-react';

export default function ApiTest() {
  const [isTestingOpenAI, setIsTestingOpenAI] = useState(false);
  const [isTestingAsk, setIsTestingAsk] = useState(false);
  const [isTestingData, setIsTestingData] = useState(false);
  const [openAIResult, setOpenAIResult] = useState<Record<string, any> | null>(null);
  const [askResult, setAskResult] = useState<Record<string, any> | null>(null);
  const [dataResult, setDataResult] = useState<Record<string, any> | null>(null);
  const [testQuestion, setTestQuestion] = useState('Explain gravity in 5 words');
  const [articleTitle, setArticleTitle] = useState('Test Article');
  const [articleContent, setArticleContent] = useState('This is a test article content.');
  
  const { toast } = useToast();

  const isResult = (v: unknown): v is { success?: boolean; response?: unknown; error?: string } => {
    return typeof v === 'object' && v !== null;
  };

  const testOpenAIEndpoint = async () => {
    setIsTestingOpenAI(true);
    setOpenAIResult(null);
    
    try {
      console.log('Testing OpenAI endpoint...');
      const { data, error } = await supabase.functions.invoke('test-openai');
      
      if (error) {
        console.error('OpenAI test error:', error);
        setOpenAIResult({ error: error.message, success: false });
        toast({
          title: "Test Failed",
          description: "OpenAI test endpoint failed",
          variant: "destructive",
        });
      } else {
        console.log('OpenAI test success:', data);
        setOpenAIResult({ ...data, success: true });
        toast({
          title: "Test Passed",
          description: "OpenAI connection is working!",
        });
      }
    } catch (error) {
      console.error('OpenAI test exception:', error);
  setOpenAIResult({ error: error instanceof Error ? error.message : String(error), success: false });
      toast({
        title: "Test Error",
        description: "Failed to call OpenAI test endpoint",
        variant: "destructive",
      });
    } finally {
      setIsTestingOpenAI(false);
    }
  };

  const testAskEndpoint = async () => {
    if (!testQuestion.trim()) return;
    
    setIsTestingAsk(true);
    setAskResult(null);
    
    try {
      console.log('Testing Ask endpoint with question:', testQuestion);
      const { data, error } = await supabase.functions.invoke('ask', {
        body: { prompt: testQuestion }
      });
      
      if (error) {
        console.error('Ask test error:', error);
        setAskResult({ error: error.message, success: false });
        toast({
          title: "Test Failed",
          description: "Ask endpoint failed",
          variant: "destructive",
        });
      } else {
        console.log('Ask test success:', data);
        setAskResult({ ...data, success: true });
        toast({
          title: "Test Passed",
          description: "Ask endpoint is working and logged to database!",
        });
      }
    } catch (error) {
      console.error('Ask test exception:', error);
  setAskResult({ error: error instanceof Error ? error.message : String(error), success: false });
      toast({
        title: "Test Error",
        description: "Failed to call Ask endpoint",
        variant: "destructive",
      });
    } finally {
      setIsTestingAsk(false);
    }
  };

  const testDataEndpoint = async () => {
    setIsTestingData(true);
    setDataResult(null);
    
    try {
      console.log('Testing Data endpoint - creating article...');
      
      // Test creating an article
      const { data: createData, error: createError } = await supabase.functions.invoke('data', {
        body: { 
          title: articleTitle,
          content: articleContent
        }
      });
      
      if (createError) {
        console.error('Data test error:', createError);
        setDataResult({ error: createError.message, success: false });
        toast({
          title: "Test Failed",
          description: "Data endpoint failed",
          variant: "destructive",
        });
        return;
      }

      // Test fetching articles
      const { data: fetchData, error: fetchError } = await supabase.functions.invoke('data');
      
      if (fetchError) {
        console.error('Data fetch error:', fetchError);
        setDataResult({ error: fetchError.message, success: false });
        return;
      }

      console.log('Data test success:', { created: createData, fetched: fetchData });
      setDataResult({ 
        created: createData, 
        fetched: fetchData,
        success: true 
      });
      
      toast({
        title: "Test Passed",
        description: "Data endpoint is working! Article created and fetched.",
      });
      
    } catch (error) {
      console.error('Data test exception:', error);
  setDataResult({ error: error instanceof Error ? error.message : String(error), success: false });
      toast({
        title: "Test Error",
        description: "Failed to call Data endpoint",
        variant: "destructive",
      });
    } finally {
      setIsTestingData(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <TestTube className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">API Test Suite</h1>
          </div>
          <p className="text-muted-foreground">
            Test the Supabase Edge Functions for OpenAI integration
          </p>
        </div>

        {/* OpenAI Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test OpenAI Connection
              {isResult(openAIResult) && (
                <Badge variant={openAIResult.success ? "default" : "destructive"}>
                  {openAIResult.success ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Pass</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1" /> Fail</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tests the /api/test-openai endpoint to verify OpenAI API key is working
            </p>
            
            <Button 
              onClick={testOpenAIEndpoint} 
              disabled={isTestingOpenAI}
              className="w-full"
            >
              {isTestingOpenAI ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
              ) : (
                'Test OpenAI Connection'
              )}
            </Button>
            
            {openAIResult && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(openAIResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ask Endpoint Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Ask Endpoint
              {askResult && (
                <Badge variant={askResult.success ? "default" : "destructive"}>
                  {askResult.success ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Pass</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1" /> Fail</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tests the /api/ask endpoint to verify OpenAI integration and database logging
            </p>
            
            <Input
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              placeholder="Enter a question to test..."
            />
            
            <Button 
              onClick={testAskEndpoint} 
              disabled={isTestingAsk || !testQuestion.trim()}
              className="w-full"
            >
              {isTestingAsk ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
              ) : (
                'Test Ask Endpoint'
              )}
            </Button>
            
              {isResult(askResult) && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Result:</h4>
                {askResult.success && askResult.response && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-1">AI Response:</h5>
                    <div className="p-3 rounded bg-background border">
                      {String(askResult.response)}
                    </div>
                  </div>
                )}
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(askResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Endpoint Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Data Endpoint
              {isResult(dataResult) && (
                <Badge variant={dataResult.success ? "default" : "destructive"}>
                  {dataResult.success ? (
                    <><CheckCircle className="h-4 w-4 mr-1" /> Pass</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1" /> Fail</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tests the /api/data endpoint for CRUD operations on articles
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Article title..."
              />
              <Textarea
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                placeholder="Article content..."
              />
            </div>
            
            <Button 
              onClick={testDataEndpoint} 
              disabled={isTestingData || !articleTitle.trim() || !articleContent.trim()}
              className="w-full"
            >
              {isTestingData ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
              ) : (
                'Test Data Endpoint'
              )}
            </Button>
            
            {dataResult && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Result:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(dataResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}