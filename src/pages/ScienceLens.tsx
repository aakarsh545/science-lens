import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Award, 
  History, 
  ChevronLeft, 
  Menu,
  MessageSquare,
  Image as ImageIcon,
  User
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
import { CreditsDisplay } from '@/components/CreditsDisplay';
import { CelebrationAnimation } from '@/components/CelebrationAnimation';
import { QuestionAnimation } from '@/components/QuestionAnimation';
import { ProfilePage } from '@/components/ProfilePage';
import { ScienceExplanation } from '@/components/ScienceExplanation';
import { ApiKeyPrompt } from '@/components/ApiKeyPrompt';
import { AuthModal } from '@/components/AuthModal';
import { getAIService, getOpenAIApiKey } from '@/services/openai';
import { supabase } from '@/lib/supabase';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { useCredits } from '@/hooks/useCredits';
import { useAchievements } from '@/hooks/useAchievements';
import type { Message, Conversation, Achievement, UserProfile } from '@/types';

// Categories for question classification (simplified)
const scienceCategories = {
  biology: ['biology', 'life', 'organism', 'cell', 'gene', 'evolution', 'plant', 'animal', 'body', 'health', 'medicine', 'brain', 'heart', 'blood', 'DNA', 'protein', 'bacteria', 'virus', 'ecosystem', 'photosynthesis', 'mitosis', 'genetic', 'anatomy', 'physiology'],
  chemistry: ['chemistry', 'chemical', 'molecule', 'atom', 'element', 'reaction', 'compound', 'acid', 'base', 'catalyst', 'polymer', 'organic', 'inorganic', 'periodic', 'bond', 'formula', 'solution', 'ph', 'oxidation', 'reduction', 'electrochemistry'],
  physics: ['physics', 'force', 'energy', 'motion', 'gravity', 'light', 'wave', 'quantum', 'relativity', 'thermodynamics', 'electricity', 'magnetism', 'nuclear', 'particle', 'velocity', 'acceleration', 'momentum', 'optics', 'acoustics', 'mechanics'],
  astronomy: ['astronomy', 'space', 'star', 'planet', 'galaxy', 'universe', 'solar', 'moon', 'sun', 'cosmic', 'nebula', 'black hole', 'comet', 'asteroid', 'orbit', 'telescope', 'constellation', 'meteor', 'spacecraft', 'astronaut'],
  'earth-science': ['earth', 'geology', 'climate', 'weather', 'ocean', 'atmosphere', 'volcano', 'earthquake', 'mineral', 'rock', 'fossil', 'plate', 'tectonic', 'erosion', 'sediment', 'groundwater', 'hurricane', 'tornado', 'glacier'],
  technology: ['technology', 'computer', 'artificial intelligence', 'robot', 'programming', 'software', 'hardware', 'internet', 'digital', 'electronics', 'semiconductor', 'transistor', 'algorithm', 'database', 'network', 'cybersecurity', 'blockchain'],
  mathematics: ['mathematics', 'math', 'number', 'equation', 'formula', 'algebra', 'geometry', 'calculus', 'statistics', 'probability', 'trigonometry', 'graph', 'function', 'derivative', 'integral', 'matrix', 'vector', 'theorem', 'proof'],
  general: []
};

const categorizeQuestion = (content: string): string => {
  const lowerContent = content.toLowerCase();
  
  for (const [category, keywords] of Object.entries(scienceCategories)) {
    if (category === 'general') continue;
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      return category;
    }
  }
  
  return 'general';
};

export default function ScienceLens() {
  // State management
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentView, setCurrentView] = useState<'chat' | 'profile'>('chat');
  const [showQuestionAnimation, setShowQuestionAnimation] = useState(false);
  const [celebrationAchievement, setCelebrationAchievement] = useState<Achievement | null>(null);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [hasShownApiPrompt, setHasShownApiPrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAskedFirstQuestion, setHasAskedFirstQuestion] = useState(false);

  // Persistent storage
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('science-lens-conversations', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('science-lens-favorites', []);

  // Custom hooks
  const { credits, hasCredits, useCredit } = useCredits();
  const { newAchievement, recordQuestion, dismissNewAchievement } = useAchievements();
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // AI response generator with enhanced scientific explanations
  const generateAIResponse = async (question: string, hasImage: boolean, category: string): Promise<string> => {
    const aiService = getAIService();
    
    if (aiService) {
      try {
        // Add realistic delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
        return await aiService.analyzeQuestion(question, category, hasImage);
      } catch (error) {
        console.error('AI service error:', error);
        // Fall through to mock response
      }
    }
    
    // Enhanced mock response as fallback
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const categoryResponses = {
      biology: `🧪 Biological Systems Analysis\n\nThis is a fascinating biological question! Let me break down the key life processes involved.\n\n🔬 Core Biological Principles:\n• Cellular metabolism and energy production\n• Molecular interactions in living systems\n• Evolutionary adaptations and natural selection\n• Homeostatic mechanisms maintaining balance\n• Genetic information flow from DNA to proteins\n\n⚛️ Molecular Foundation:\nAt the molecular level, all life processes involve precise chemical reactions. Enzymes catalyze reactions, proteins provide structure and function, and nucleic acids store and transmit information.\n\n🌟 Real-World Applications:\nUnderstanding these biological principles helps us develop medical treatments, improve agriculture, and conserve ecosystems.`,
      
      chemistry: `🧪 Chemical Analysis and Molecular Interactions\n\nExcellent chemistry question! Let me explain the molecular mechanisms at work.\n\n🔬 Chemical Principles:\n• Atomic structure and electron behavior\n• Chemical bonding and molecular geometry\n• Thermodynamics and reaction spontaneity\n• Kinetics and reaction mechanisms\n• Equilibrium and dynamic balance\n\n⚛️ Molecular Perspective:\nAtoms combine through sharing or transferring electrons to form stable compounds. The three-dimensional arrangement of atoms determines molecular properties and reactivity.\n\n🌟 Practical Applications:\nThese chemical principles are essential for drug design, materials science, and environmental chemistry.`,
      
      physics: `🧪 Physical Phenomena and Natural Laws\n\nGreat physics question! Let me explore the fundamental forces and principles involved.\n\n🔬 Physical Concepts:\n• Forces and their effects on matter and motion\n• Energy conservation and transformation\n• Wave behavior and electromagnetic radiation\n• Quantum mechanical effects at atomic scales\n• Relativistic effects in space and time\n\n⚛️ Mathematical Framework:\nPhysics uses mathematics to precisely describe natural phenomena. Equations capture the relationships between physical quantities and predict system behavior.\n\n🌟 Technological Impact:\nPhysical principles enable modern technology from computers to medical imaging devices.`,
      
      astronomy: `🧪 Cosmic Phenomena and Stellar Processes\n\nWonderful astronomy question! Let me explain the cosmic processes involved.\n\n🔬 Astronomical Concepts:\n• Gravitational interactions shaping cosmic structure\n• Nuclear fusion powering stars and creating elements\n• Light as a messenger carrying cosmic information\n• Planetary formation in stellar nurseries\n• Evolution of galaxies and cosmic structures\n\n⚛️ Scale and Time:\nAstronomical phenomena occur on vast scales of space and time, from seconds to billions of years, revealing the universe's dynamic history.\n\n🌟 Observational Methods:\nTelescopes and detectors across the electromagnetic spectrum reveal the universe's hidden processes.`,
      
      default: `🧪 Scientific Principles and Natural Understanding\n\nFascinating scientific question! Let me explain the underlying principles.\n\n🔬 Scientific Concepts:\n• Observable patterns in natural phenomena\n• Cause-and-effect relationships in nature\n• Mathematical models describing reality\n• Experimental methods revealing truth\n• Theoretical frameworks organizing knowledge\n\n⚛️ Interconnected Science:\nScientific disciplines connect to reveal nature's unified principles, from quantum mechanics to cosmic evolution.\n\n🌟 Human Discovery:\nScientific inquiry expands our understanding and enables technological progress for humanity's benefit.`
    };
    
    const response = categoryResponses[category as keyof typeof categoryResponses] || categoryResponses.default;
    
    if (hasImage) {
      return `${response}\n\n📸 Visual Analysis:\nBased on your uploaded image, I can identify key features that perfectly illustrate these scientific concepts. The visual elements demonstrate how theoretical principles manifest in observable phenomena, providing concrete examples of abstract scientific ideas.`;
    }
    
    return response;
  };

  // Handle achievement celebration
  useEffect(() => {
    if (newAchievement) {
      setCelebrationAchievement(newAchievement);
    }
  }, [newAchievement]);

  // Check if we should show API key prompt
  const checkForApiKeyPrompt = () => {
    if (!hasShownApiPrompt && !getOpenAIApiKey() && !localStorage.getItem('temp_openai_key')) {
      setShowApiKeyPrompt(true);
      setHasShownApiPrompt(true);
    }
  };

  // Message handling
  const handleSendMessage = async (content: string, image?: File) => {
    console.log('handleSendMessage: Starting with content:', content.slice(0, 100));
    
    if (!content.trim() && !image) {
      console.log('handleSendMessage: No content or image provided');
      return;
    }

    // Check if user has credits
    if (!hasCredits) {
      console.log('handleSendMessage: No credits available');
      toast({
        title: "Out of Credits",
        description: "You've used all your daily credits. Come back tomorrow for more!",
        variant: "destructive",
      });
      return;
    }

    // Use a credit
    if (!useCredit()) {
      console.log('handleSendMessage: Failed to use credit');
      toast({
        title: "Error",
        description: "Failed to use credit. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if we should prompt for API key on first question
      checkForApiKeyPrompt();

      // Show question animation
      setShowQuestionAnimation(true);

      // Categorize the question
      const category = categorizeQuestion(content);
      console.log('handleSendMessage: Question categorized as:', category);

      // Create or update conversation with immutable updates
      let conversation = currentConversation;
      if (!conversation) {
        conversation = {
          id: Date.now().toString(),
          title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
          messages: [],
          timestamp: Date.now(),
          category,
        };
        console.log('handleSendMessage: Created new conversation:', conversation.id);
      }

      // Create user message
      const userMessage: Message = {
        id: `user_${Date.now()}`,
        type: 'user',
        content,
        image: image ? URL.createObjectURL(image) : undefined,
        timestamp: Date.now(),
        category,
      };
      console.log('handleSendMessage: Created user message:', userMessage.id);

      // Immutable update: create new conversation with new message
      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, userMessage]
      };
      setCurrentConversation(updatedConversation);
      console.log('handleSendMessage: Updated conversation with user message, total messages:', updatedConversation.messages.length);

      // Record question for achievements
      recordQuestion(category, content, !!image);

      // Show auth modal after first question if not authenticated
      if (!hasAskedFirstQuestion && !isAuthenticated) {
        setHasAskedFirstQuestion(true);
        setShowAuthModal(true);
      }

      setIsLoading(true);

      // Generate AI response with category context
      const aiResponse = await generateAIResponse(content, !!image, category);
      console.log('handleSendMessage: Generated AI response, length:', aiResponse.length);
      
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        type: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
        category,
      };
      console.log('handleSendMessage: Created assistant message:', assistantMessage.id);

      // Immutable update: create new conversation with assistant message
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage]
      };
      setCurrentConversation(finalConversation);
      console.log('handleSendMessage: Updated conversation with assistant message, total messages:', finalConversation.messages.length);

      // Update conversations list with immutable operations
      const updatedConversations = conversations.filter(c => c.id !== finalConversation.id);
      updatedConversations.unshift(finalConversation);
      setConversations(updatedConversations);
      console.log('handleSendMessage: Updated conversations list, total conversations:', updatedConversations.length);

    } catch (error) {
      console.error('handleSendMessage: Error occurred:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log('handleSendMessage: Completed');
    }
  };

  const handleClearChat = () => {
    setCurrentConversation(null);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setActiveTab('chat');
    setCurrentView('chat');
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

  if (currentView === 'profile') {
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
                onClick={() => setCurrentView('chat')}
              >
                <ChevronLeft className="h-5 w-5" />
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
              <CreditsDisplay compact />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <ProfilePage />
        </div>

        {/* Celebration Animation */}
        <CelebrationAnimation
          achievement={celebrationAchievement}
          onComplete={() => {
            setCelebrationAchievement(null);
            dismissNewAchievement();
          }}
        />

        {/* Question Animation */}
        <QuestionAnimation
          isVisible={showQuestionAnimation}
          onComplete={() => setShowQuestionAnimation(false)}
        />

        {/* API Key Prompt */}
        {showApiKeyPrompt && (
          <ApiKeyPrompt
            onApiKeySet={(key) => {
              localStorage.setItem('temp_openai_key', key);
              setShowApiKeyPrompt(false);
            }}
            onDismiss={() => setShowApiKeyPrompt(false)}
          />
        )}
      </div>
    );
  }

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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('profile')}
              className="hidden sm:flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <CreditsDisplay compact />
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
              <div className="space-y-4">
                {/* Credits Display */}
                <CreditsDisplay />

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
                    <div className="space-y-4">
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentView('profile')}
                          className="w-full"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Full Profile
                        </Button>
                      </div>
                      
                      <Card className="h-[calc(100%-4rem)]">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Award className="h-5 w-5" />
                            <span>Recent Achievements</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center text-sm text-muted-foreground space-y-2">
                            <p>Start asking questions to unlock achievements!</p>
                            <p className="text-xs">🏆 100+ badges across 8 science categories</p>
                            <p className="text-xs">💎 Earn bonus credits for unlocking achievements</p>
                            <p className="text-xs">🔥 Build streaks and become a science master!</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          toast({
            title: "Welcome to ScienceLens!",
            description: "Your learning journey is now being tracked.",
          });
        }}
      />

      {/* API Key Prompt - Only show conditionally */}
      {showApiKeyPrompt && (
        <ApiKeyPrompt
          onApiKeySet={() => setShowApiKeyPrompt(false)}
          onDismiss={() => setShowApiKeyPrompt(false)}
        />
      )}

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement}
        onClose={dismissNewAchievement}
      />

      {/* Celebration Animation */}
      <CelebrationAnimation
        achievement={celebrationAchievement}
        onComplete={() => {
          setCelebrationAchievement(null);
          dismissNewAchievement();
        }}
      />

      {/* Question Animation */}
      <QuestionAnimation
        isVisible={showQuestionAnimation}
        onComplete={() => setShowQuestionAnimation(false)}
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