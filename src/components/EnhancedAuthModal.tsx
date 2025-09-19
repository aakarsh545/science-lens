import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EnhancedAuthModal: React.FC<EnhancedAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (error) throw error;
      
      // The redirect will handle the success case
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Google Sign-in Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            name: name,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account Created! 🎉",
        description: "Please check your email to verify your account.",
      });
      
      onSuccess();
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Sign-up Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! 🚀",
        description: "Successfully signed in to your account.",
      });
      
      onSuccess();
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Sign-in Error", 
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="bg-gradient-science text-white text-center relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl">Join Science Lens</CardTitle>
              <CardDescription className="text-white/90">
                Unlock unlimited scientific exploration
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Google Sign-in Button */}
                <Button
                  variant="outline"
                  className="w-full mb-4 border-gray-300 hover:bg-gray-50"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Continue with Google
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <TabsContent value="signin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-science hover:shadow-glow" 
                    onClick={handleSignIn}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-science hover:shadow-glow" 
                    onClick={handleSignUp}
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};