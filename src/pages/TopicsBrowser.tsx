import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Atom, Beaker, Leaf, Sun, Moon, Microscope, Dna, Sprout, Thermometer, FlaskConical, TestTube } from 'lucide-react';
import { ScienceParticles } from '@/components/ScienceParticles';
import { useTheme } from '@/components/ThemeProvider';

const TopicsBrowser = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const topics = [
    {
      category: 'General',
      items: [
        {
          icon: Atom,
          title: 'General Science',
          description: 'Ask anything about science',
          difficulty: 'all',
        }
      ]
    },
    {
      category: 'Physics',
      items: [
        {
          icon: Atom,
          title: 'Basic Physics',
          description: 'Fundamental concepts of motion, forces, and energy',
          difficulty: 'beginner',
        },
        {
          icon: Atom,
          title: 'Quantum Mechanics',
          description: 'Explore the quantum world and particle behavior',
          difficulty: 'advanced',
        },
        {
          icon: Sprout,
          title: 'Astronomy',
          description: 'Stars, planets, and the universe',
          difficulty: 'beginner',
        },
        {
          icon: Thermometer,
          title: 'Thermodynamics',
          description: 'Heat, energy, and entropy',
          difficulty: 'intermediate',
        }
      ]
    },
    {
      category: 'Chemistry',
      items: [
        {
          icon: Beaker,
          title: 'Chemistry Basics',
          description: 'Elements, compounds, and chemical reactions',
          difficulty: 'beginner',
        },
        {
          icon: FlaskConical,
          title: 'Organic Chemistry',
          description: 'Carbon-based molecules and their reactions',
          difficulty: 'intermediate',
        },
        {
          icon: TestTube,
          title: 'Biochemistry',
          description: 'Chemical processes in living organisms',
          difficulty: 'advanced',
        }
      ]
    },
    {
      category: 'Biology',
      items: [
        {
          icon: Leaf,
          title: 'Cell Biology',
          description: 'Structure and function of living cells',
          difficulty: 'beginner',
        },
        {
          icon: Dna,
          title: 'Genetics',
          description: 'DNA, genes, and heredity',
          difficulty: 'intermediate',
        },
        {
          icon: Sprout,
          title: 'Ecology',
          description: 'Ecosystems and environmental interactions',
          difficulty: 'beginner',
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'advanced':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'all':
        return 'bg-primary/20 text-primary border-primary/30';
      default:
        return '';
    }
  };

  const handleTopicSelect = (topic: string) => {
    navigate('/explore', { state: { selectedTopic: topic } });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ScienceParticles />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Choose a Topic</h1>
          <p className="text-muted-foreground">Select a topic to start your learning journey</p>
        </div>

        {/* Topics Grid */}
        <div className="space-y-12">
          {topics.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <Card
                    key={item.title}
                    className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all cursor-pointer group"
                    onClick={() => handleTopicSelect(item.title)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{item.title}</h3>
                          <Badge className={getDifficultyColor(item.difficulty)}>
                            {item.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsBrowser;
