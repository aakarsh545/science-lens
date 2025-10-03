import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, MessageCircle, Zap, Trophy, Sun, Moon, LogOut } from 'lucide-react';
import { ScienceParticles } from '@/components/ScienceParticles';
import { useTheme } from '@/components/ThemeProvider';
import { supabase } from '@/lib/supabase';
import { useConversations } from '@/hooks/useConversations';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { conversations } = useConversations();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    streak: 1,
    questions: 0,
    xp: 10,
    badges: 1
  });

  useEffect(() => {
    checkAuth();
    loadStats();
  }, [conversations]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/');
      return;
    }
    setUser(session.user);
  };

  const loadStats = () => {
    const totalQuestions = conversations.reduce((acc, conv) => 
      acc + conv.messages.filter(m => m.type === 'user').length, 0
    );
    
    setStats({
      streak: 1,
      questions: totalQuestions,
      xp: totalQuestions * 10,
      badges: totalQuestions > 0 ? 1 : 0
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ScienceParticles />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'Explorer'}!
            </h1>
            <p className="text-muted-foreground">Level 1 Science Explorer</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.streak}</div>
            <div className="text-sm text-muted-foreground mb-2">days</div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Flame className="w-4 h-4" />
              Streak
            </div>
            <p className="text-xs text-muted-foreground mt-1">Keep learning daily!</p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.questions}</div>
            <div className="text-sm text-muted-foreground mb-2">questions</div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              Questions
            </div>
            <p className="text-xs text-muted-foreground mt-1">Knowledge acquired</p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.xp}</div>
            <div className="text-sm text-muted-foreground mb-2">XP</div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Experience
            </div>
            <p className="text-xs text-muted-foreground mt-1">Level 1</p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.badges}</div>
            <div className="text-sm text-muted-foreground mb-2">badges</div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Trophy className="w-4 h-4" />
              Achievements
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unlocked badges</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button 
            size="lg"
            onClick={() => navigate('/explore')}
            className="px-8"
          >
            Start Learning
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/topics')}
            className="px-8"
          >
            Browse Topics
          </Button>
        </div>

        <div className="text-center mb-8">
          <Button 
            onClick={() => navigate('/explore')}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Choose Topic & Start
          </Button>
        </div>

        {/* Your Chats Section */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Your Chats</h2>
          </div>
          
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No conversations yet. Start learning to see your chat history!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => navigate('/explore', { state: { conversationId: conv.id } })}
                  className="w-full text-left p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border/50"
                >
                  <div className="font-medium truncate">{conv.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {conv.messages.filter(m => m.type === 'user').length} questions
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
