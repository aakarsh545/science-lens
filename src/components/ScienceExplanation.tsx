import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Zap, 
  Dna, 
  Telescope, 
  Beaker,
  Calculator,
  Earth,
  Cpu,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DiagramProps {
  type: 'atom' | 'dna' | 'solar-system' | 'chemical-reaction' | 'wave' | 'cell' | 'circuit' | 'galaxy';
  animated?: boolean;
}

  const AnimatedDiagram = ({ type, animated = true }: DiagramProps) => {
  const [isPlaying, setIsPlaying] = useState(animated);
  const [step, setStep] = useState(0);

  const stepForward = () => setStep((s) => s + 1);
  const stepBack = () => setStep((s) => Math.max(0, s - 1));

  const AtomDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      {/* Nucleus */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Electron orbits */}
      {[1, 2, 3].map((orbit, index) => (
        <motion.div
          key={orbit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-blue-300 rounded-full"
          style={{ 
            width: `${60 + index * 40}px`, 
            height: `${60 + index * 40}px` 
          }}
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ 
            duration: 3 + index, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Electrons */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"
            animate={isPlaying ? { rotate: -360 } : {}}
            transition={{ 
              duration: 3 + index, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  const DNADiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        {/* DNA double helix */}
        <motion.path
          d="M50 20 Q100 60 150 20 Q100 100 50 80 Q100 140 150 100 Q100 180 50 160"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isPlaying ? { pathLength: 1 } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M150 20 Q100 60 50 20 Q100 100 150 80 Q100 140 50 100 Q100 180 150 160"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isPlaying ? { pathLength: 1 } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        
        {/* Base pairs */}
        {[40, 80, 120, 160].map((y, index) => (
          <motion.line
            key={index}
            x1="70"
            y1={y}
            x2="130"
            y2={y}
            stroke="#10b981"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={isPlaying ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );

  const SolarSystemDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      {/* Sun */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full"
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Planetary orbits */}
      {[{ size: 60, color: 'bg-gray-400', duration: 5 }, 
        { size: 80, color: 'bg-blue-500', duration: 8 }, 
        { size: 100, color: 'bg-red-500', duration: 12 }].map((planet, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full"
          style={{ 
            width: `${planet.size}px`, 
            height: `${planet.size}px` 
          }}
        >
          <motion.div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${planet.color} rounded-full`}
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ 
              duration: planet.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  const WaveDiagram = () => (
    <div className="w-48 h-24 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 200 100">
        <motion.path
          d="M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          animate={isPlaying ? { 
            d: [
              "M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50",
              "M0 50 Q25 80 50 50 Q75 20 100 50 Q125 80 150 50 Q175 20 200 50",
              "M0 50 Q25 20 50 50 Q75 80 100 50 Q125 20 150 50 Q175 80 200 50"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Amplitude indicators */}
        <motion.circle
          cx="50"
          cy="20"
          r="3"
          fill="#8b5cf6"
          animate={isPlaying ? { cy: [20, 80, 20] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );

  const CellDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <defs>
          <radialGradient id="nuc" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ffd6a5" />
            <stop offset="100%" stopColor="#ffb4a2" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="100"
          cy="100"
          r={60 + step * 2}
          fill="url(#nuc)"
          animate={isPlaying ? { rotate: [0, 360] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        {/* organelles as circles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx={40 + i * 35}
            cy={70 + ((i % 2) * 40)}
            r={8 + (i === step % 4 ? 4 : 0)}
            fill={['#7dd3fc', '#f9a8d4', '#a7f3d0', '#fbcfe8'][i]}
            initial={{ opacity: 0.8 }}
            animate={isPlaying ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 2 + i, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );

  const GalaxyDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="100"
            cy="100"
            rx={40 + i * 8}
            ry={15 + i * 3}
            stroke={i % 2 === 0 ? '#60a5fa' : '#a78bfa'}
            strokeWidth={1}
            fill="none"
            animate={isPlaying ? { rotate: 360 } : {}}
            transformOrigin="100 100"
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <motion.circle cx="100" cy="100" r={3 + (step % 3)} fill="#fff9c4" animate={isPlaying ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }} />
      </svg>
    </div>
  );

  const CircuitDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <motion.rect x="20" y="40" width="160" height="120" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={30 + i * 32}
            y1={60}
            x2={30 + i * 32}
            y2={140}
            stroke="#94a3b8"
            strokeWidth={2}
            animate={isPlaying ? { strokeDashoffset: [0, 10, 0] } : {}}
            transition={{ duration: 1.2 + i * 0.2, repeat: Infinity }}
          />
        ))}
        <motion.circle cx="100" cy="100" r={6 + (step % 2)} fill="#22c55e" animate={isPlaying ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1.4, repeat: Infinity }} />
      </svg>
    </div>
  );

  const renderDiagram = () => {
    switch (type) {
      case 'atom':
        return <AtomDiagram />;
      case 'dna':
        return <DNADiagram />;
      case 'solar-system':
        return <SolarSystemDiagram />;
      case 'wave':
        return <WaveDiagram />;
      case 'cell':
        return <CellDiagram />;
      case 'galaxy':
        return <GalaxyDiagram />;
      case 'circuit':
        return <CircuitDiagram />;
      default:
        return (
          <div className="w-48 h-48 mx-auto flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <Atom className="h-16 w-16 text-primary" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
      {renderDiagram()}
    </div>
  );
};

interface ExplanationSection {
  title: string;
  content: string;
  diagram?: DiagramProps;
  keyPoints?: string[];
  formula?: string;
  category: string;
}

interface ScienceExplanationProps {
  content: string;
  category?: string;
}

export function ScienceExplanation({ content, category = 'general' }: ScienceExplanationProps) {
  const [sections, setSections] = useState<ExplanationSection[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'biology': return <Dna className="h-5 w-5" />;
      case 'chemistry': return <Beaker className="h-5 w-5" />;
      case 'physics': return <Zap className="h-5 w-5" />;
      case 'astronomy': return <Telescope className="h-5 w-5" />;
      case 'earth-science': return <Earth className="h-5 w-5" />;
      case 'mathematics': return <Calculator className="h-5 w-5" />;
      case 'technology': return <Cpu className="h-5 w-5" />;
      default: return <Atom className="h-5 w-5" />;
    }
  };

  // Parse and structure the content into sections
  useEffect(() => {
    const parsedSections: ExplanationSection[] = [];
    
    // Split content into sections and analyze for diagrams
    const lines = content.split('\n').filter(line => line.trim());
    let currentTitle = 'Explanation';
    let currentContent = '';
    let currentKeyPoints: string[] = [];

    const emojiMarkers = ['🧪', '🔬', '⚛️', '🌟'];
    for (const line of lines) {
      if (emojiMarkers.some((e) => line.includes(e))) {
        if (currentContent) {
          parsedSections.push({
            title: currentTitle,
            content: currentContent,
            keyPoints: currentKeyPoints.length > 0 ? currentKeyPoints : undefined,
            category,
            diagram: detectDiagramType(currentContent + ' ' + currentKeyPoints.join(' '))
          });
          currentContent = '';
          currentKeyPoints = [];
        }
  // Remove known emoji markers using split/join for compatibility
  currentTitle = emojiMarkers.reduce((s, e) => s.split(e).join(''), line).trim() || 'Key Concept';
      } else if (line.startsWith('•') || line.startsWith('-')) {
        currentKeyPoints.push(line.substring(1).trim());
      } else {
        currentContent += line + '\n';
      }
    }

    // Add the final section
    if (currentContent || currentKeyPoints.length > 0) {
      parsedSections.push({
        title: currentTitle,
        content: currentContent,
        keyPoints: currentKeyPoints.length > 0 ? currentKeyPoints : undefined,
        category,
        diagram: detectDiagramType(currentContent + ' ' + currentKeyPoints.join(' '))
      });
    }

    // If no sections were created, create a default one
    if (parsedSections.length === 0) {
      parsedSections.push({
        title: 'Scientific Explanation',
        content,
        category,
        diagram: detectDiagramType(content)
      });
    }

    setSections(parsedSections);
  }, [content, category]);

  const detectDiagramType = (text: string): DiagramProps | undefined => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('atom') || lowerText.includes('electron') || lowerText.includes('nucleus')) {
      return { type: 'atom' };
    }
    if (lowerText.includes('dna') || lowerText.includes('genetic') || lowerText.includes('gene')) {
      return { type: 'dna' };
    }
    if (lowerText.includes('planet') || lowerText.includes('solar') || lowerText.includes('orbit')) {
      return { type: 'solar-system' };
    }
    if (lowerText.includes('wave') || lowerText.includes('frequency') || lowerText.includes('vibration')) {
      return { type: 'wave' };
    }
    // New detections
    if (lowerText.includes('cell') || lowerText.includes('organelle') || lowerText.includes('membrane')) {
      return { type: 'cell' };
    }
    if (lowerText.includes('galaxy') || lowerText.includes('star') || lowerText.includes('nebula')) {
      return { type: 'galaxy' };
    }
    if (lowerText.includes('circuit') || lowerText.includes('voltage') || lowerText.includes('resistor') || lowerText.includes('current')) {
      return { type: 'circuit' };
    }
    
    return undefined;
  };

  if (sections.length === 0) {
    return (
      <Card className="p-6">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="flex items-center space-x-1">
          {getCategoryIcon(category)}
          <span className="capitalize">{category.replace('-', ' ')}</span>
        </Badge>
      </div>

      {/* Section Navigation */}
      {sections.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sections.map((_, index) => (
            <Button
              key={index}
              variant={currentSection === index ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSection(index)}
              className="whitespace-nowrap"
            >
              {index + 1}. {sections[index].title}
            </Button>
          ))}
        </div>
      )}

      {/* Current Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                {getCategoryIcon(category)}
                <span>{sections[currentSection]?.title}</span>
              </h3>
              
              {sections.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                    disabled={currentSection === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>

            {/* Diagram */}
            {sections[currentSection]?.diagram && (
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
                <AnimatedDiagram {...sections[currentSection].diagram!} />
              </div>
            )}

            {/* Content */}
            {sections[currentSection]?.content && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {sections[currentSection].content}
                </div>
              </div>
            )}

            {/* Key Points */}
            {sections[currentSection]?.keyPoints && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Key Points
                </h4>
                <div className="space-y-2">
                  {sections[currentSection].keyPoints!.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary-foreground font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula */}
            {sections[currentSection]?.formula && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Formula:</h4>
                <code className="text-lg font-mono">{sections[currentSection].formula}</code>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}