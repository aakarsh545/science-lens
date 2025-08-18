import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Award, 
  History, 
  ChevronLeft, 
  Menu,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/ChatInterface';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AchievementBadge } from '@/components/AchievementBadge';
import { AchievementNotification } from '@/components/AchievementNotification';
import { DiscoveryHistory } from '@/components/DiscoveryHistory';
import { ScienceParticles } from '@/components/ScienceParticles';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import type { Message, Conversation, Achievement, UserProfile } from '@/types';

const initialAchievements: Achievement[] = [
  {
    id: 'first-question',
    title: 'Curious Mind',
    description: 'Asked your first science question',
    icon: '🤔',
    unlocked: false,
  },
  {
    id: 'first-photo',
    title: 'Visual Explorer',
    description: 'Uploaded your first photo',
    icon: '📸',
    unlocked: false,
  },
  {
    id: 'five-questions',
    title: 'Science Enthusiast',
    description: 'Asked 5 science questions',
    icon: '🔬',
    unlocked: false,
  },
  {
    id: 'daily-streak',
    title: 'Daily Discoverer',
    description: 'Used ScienceLens for 3 days in a row',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'photo-expert',
    title: 'Photo Scientist',
    description: 'Uploaded 10 photos for analysis',
    icon: '📷',
    unlocked: false,
  },
];

export default function ScienceLens() {
  // State management
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Persistent storage
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('science-lens-conversations', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('science-lens-achievements', initialAchievements);
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('science-lens-profile', {
    questionsAsked: 0,
    photosUploaded: 0,
    achievements: [],
    favoriteTopics: [],
    discoveryStreak: 0,
  });
  const [favorites, setFavorites] = useLocalStorage<string[]>('science-lens-favorites', []);

  const { toast } = useToast();

  // Mock AI response generator
  const generateAIResponse = async (question: string, hasImage: boolean): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const responses = [
      `Great question! ${question} is fascinating from a scientific perspective. Let me explain the key principles involved...`,
      `Excellent observation! The science behind this involves several important concepts...`,
      `This is a wonderful example of how physics and chemistry work together in nature...`,
      `I love this question! It touches on some fundamental scientific principles that govern our world...`,
    ];

    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (hasImage) {
      return `${baseResponse}\n\n📸 Based on your photo, I can see some really interesting details that help illustrate these concepts perfectly! The visual elements show exactly how these scientific principles work in real life.\n\n🔬 Here's what's happening: [Detailed scientific explanation would go here based on actual AI analysis of the image and question]`;
    }
    
    return `${baseResponse}\n\n🧪 The key concepts involved are:\n• Fundamental forces and interactions\n• Molecular behavior and chemical reactions\n• Energy transfer and conservation\n• Biological processes and evolution\n\n💡 This demonstrates how scientific principles are interconnected and observable in everyday phenomena!`;
  };

  // Achievement checking
  const checkAchievements = (profile: UserProfile, hasPhoto: boolean) => {
    const updatedAchievements = [...achievements];
    let hasNewAchievement = false;

    // Check for new achievements
    if (profile.questionsAsked === 1 && !achievements.find(a => a.id === 'first-question')?.unlocked) {
      const achievement = updatedAchievements.find(a => a.id === 'first-question');
      if (achievement) {
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();
        setNewAchievement(achievement);
        hasNewAchievement = true;
      }
    }

    if (hasPhoto && profile.photosUploaded === 1 && !achievements.find(a => a.id === 'first-photo')?.unlocked) {
      const achievement = updatedAchievements.find(a => a.id === 'first-photo');
      if (achievement) {
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();
        setNewAchievement(achievement);
        hasNewAchievement = true;
      }
    }

    if (profile.questionsAsked === 5 && !achievements.find(a => a.id === 'five-questions')?.unlocked) {
      const achievement = updatedAchievements.find(a => a.id === 'five-questions');
      if (achievement) {
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();
        setNewAchievement(achievement);
        hasNewAchievement = true;
      }
    }

    if (hasNewAchievement) {
      setAchievements(updatedAchievements);
    }
  };

  // Message handling
  const handleSendMessage = async (content: string, image?: File) => {
    if (!content.trim() && !image) return;

    // Create or update conversation
    let conversation = currentConversation;
    if (!conversation) {
      conversation = {
        id: Date.now().toString(),
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [],
        timestamp: Date.now(),
      };
      setCurrentConversation(conversation);
    }

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      image: image ? URL.createObjectURL(image) : undefined,
      timestamp: Date.now(),
    };

    conversation.messages.push(userMessage);
    setCurrentConversation({ ...conversation });

    // Update user profile
    const updatedProfile = {
      ...userProfile,
      questionsAsked: userProfile.questionsAsked + 1,
      photosUploaded: image ? userProfile.photosUploaded + 1 : userProfile.photosUploaded,
    };
    setUserProfile(updatedProfile);

    // Check achievements
    checkAchievements(updatedProfile, !!image);

    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(content, !!image);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      conversation.messages.push(assistantMessage);
      setCurrentConversation({ ...conversation });

      // Update conversations list
      const updatedConversations = conversations.filter(c => c.id !== conversation.id);
      updatedConversations.unshift(conversation);
      setConversations(updatedConversations);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setCurrentConversation(null);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setActiveTab('chat');
    setSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(conversations.filter(c => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ScienceParticles />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-cosmic rounded-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                ScienceLens
              </h1>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {userProfile.questionsAsked} questions asked
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 border-r bg-card p-4 overflow-y-auto lg:relative absolute inset-y-0 left-0 z-30 lg:translate-x-0"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="history" className="flex items-center space-x-2">
                    <History className="h-4 w-4" />
                    <span>History</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>Badges</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="mt-4 h-[calc(100%-3rem)]">
                  <DiscoveryHistory
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    onDeleteConversation={handleDeleteConversation}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                </TabsContent>

                <TabsContent value="achievements" className="mt-4 h-[calc(100%-3rem)]">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Achievements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {achievements.map((achievement) => (
                          <AchievementBadge
                            key={achievement.id}
                            achievement={achievement}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {!currentConversation ? (
              // Welcome Screen
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto text-center space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex justify-center space-x-4 mb-8">
                    {[Atom, ImageIcon, MessageSquare].map((Icon, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.5 
                        }}
                      >
                        <Icon className="h-12 w-12 text-primary" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                    Ask Science Anything
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your AI-powered science companion. Ask questions, upload photos, 
                    and discover the fascinating science behind everything around you!
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    "Why is the sky blue?",
                    "How do plants make oxygen?",
                    "What causes rainbows?",
                    "Why do ice cubes float?"
                  ].map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSendMessage(question)}
                      className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>

                <Card className="p-8 shadow-science">
                  <ChatInterface
                    messages={[]}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    onClearChat={handleClearChat}
                  />
                </Card>
              </motion.div>
            ) : (
              // Chat View
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentConversation(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-2xl font-bold truncate">
                    {currentConversation.title}
                  </h2>
                </div>

                <ChatInterface
                  messages={currentConversation.messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  onClearChat={handleClearChat}
                />
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}