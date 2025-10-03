import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Zap, Dna, Telescope, Beaker, Calculator, Earth, Cpu, ChevronRight, Play, Pause } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// This component was refactored to address Bito's review:
// - emoji removal uses a performant regex
// - step controls (Previous/Next) are exposed to users
// - visual elements (nucleus radius) are clamped to avoid overflow
// - parsing logic separates title/points/content reliably

interface DiagramProps {
  type: 'atom' | 'dna' | 'solar-system' | 'chemical-reaction' | 'wave' | 'cell' | 'circuit' | 'galaxy';
  animated?: boolean;
}

const AnimatedDiagram: React.FC<DiagramProps> = ({ type, animated = true }) => {
  const [isPlaying, setIsPlaying] = useState(animated);
  const [step, setStep] = useState(0);

  const stepForward = () => setStep((s) => s + 1);
  const stepBack = () => setStep((s) => Math.max(0, s - 1));

  // Small set of diagrams; keep implementations compact and safe
  const AtomDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full" animate={isPlaying ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 2, repeat: Infinity }} />
    </div>
  );

  const DNADiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <motion.path d="M50 20 Q100 60 150 20 Q100 100 50 80 Q100 140 150 100 Q100 180 50 160" fill="none" stroke="#3b82f6" strokeWidth="3" initial={{ pathLength: 0 }} animate={isPlaying ? { pathLength: 1 } : {}} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }} />
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
        {/* Clamp radius to a safe maximum so the svg never overflows */}
        <motion.circle cx="100" cy="100" r={Math.min(80, 60 + step * 2)} fill="url(#nuc)" animate={isPlaying ? { rotate: [0, 360] } : {}} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
      </svg>
    </div>
  );

  const GalaxyDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        {[...Array(6)].map((_, i) => (
          <motion.ellipse key={i} cx="100" cy="100" rx={40 + i * 8} ry={15 + i * 3} stroke={i % 2 === 0 ? '#60a5fa' : '#a78bfa'} strokeWidth={1} fill="none" animate={isPlaying ? { rotate: 360 } : {}} transformOrigin="100 100" transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }} />
        ))}
      </svg>
    </div>
  );

  const CircuitDiagram = () => (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <motion.rect x="20" y="40" width="160" height="120" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
      </svg>
    </div>
  );

  const renderDiagram = () => {
    switch (type) {
      case 'atom': return <AtomDiagram />;
      case 'dna': return <DNADiagram />;
      case 'cell': return <CellDiagram />;
      case 'galaxy': return <GalaxyDiagram />;
      case 'circuit': return <CircuitDiagram />;
      default: return <AtomDiagram />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
      {renderDiagram()}
      <div className="flex items-center justify-center space-x-2 mt-2">
        <Button size="sm" variant="outline" onClick={stepBack}>Previous</Button>
        <Button size="sm" variant="outline" onClick={stepForward}>Next</Button>
      </div>
    </div>
  );
};

interface ExplanationSection { title: string; content: string; diagram?: DiagramProps; keyPoints?: string[]; formula?: string; category: string }
interface ScienceExplanationProps { content: string; category?: string }

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

  useEffect(() => {
    // Parse sections: title lines marked by emoji, bullet points start with • or -
    const emojiRegex = /[🧪🔬⚛️🌟]/g;
    const lines = content.split('\n').filter(Boolean).map((l) => l.trim());
    const parsed: ExplanationSection[] = [];
    let title = 'Explanation';
    let body = '';
    let points: string[] = [];

    for (const line of lines) {
      if (emojiRegex.test(line)) {
        // push previous
        if (body || points.length) parsed.push({ title, content: body, keyPoints: points.length ? points : undefined, category, diagram: undefined });
        title = line.replace(emojiRegex, '').trim() || 'Key Concept';
        body = '';
        points = [];
      } else if (line.startsWith('•') || line.startsWith('-')) {
        points.push(line.substring(1).trim());
      } else {
        body += line + '\n';
      }
    }
    if (body || points.length) parsed.push({ title, content: body, keyPoints: points.length ? points : undefined, category, diagram: undefined });
    if (parsed.length === 0) parsed.push({ title: 'Scientific Explanation', content, category, diagram: undefined });

    // detect diagram type per section (lightweight)
    function detectDiagramType(text: string): DiagramProps | undefined {
      const lower = (text || '').toLowerCase();
      if (/atom|electron|nucleus/.test(lower)) return { type: 'atom' };
      if (/dna|genetic|gene/.test(lower)) return { type: 'dna' };
      if (/planet|solar|orbit/.test(lower)) return { type: 'solar-system' };
      if (/wave|frequency|vibration/.test(lower)) return { type: 'wave' };
      if (/cell|organelle|membrane/.test(lower)) return { type: 'cell' };
      if (/galaxy|star|nebula/.test(lower)) return { type: 'galaxy' };
      if (/circuit|voltage|resistor|current/.test(lower)) return { type: 'circuit' };
      return undefined;
    }

    const enriched = parsed.map((s) => ({ ...s, diagram: detectDiagramType((s.content || '') + ' ' + (s.keyPoints || []).join(' ')) }));
    setSections(enriched);
  }, [content, category]);

  if (!sections.length) return <Card className="p-6"><div className="whitespace-pre-wrap text-sm leading-relaxed">{content}</div></Card>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="flex items-center space-x-1">{getCategoryIcon(category)}<span className="capitalize">{category.replace('-', ' ')}</span></Badge>
      </div>

      {sections.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sections.map((_, i) => (
            <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm" onClick={() => setCurrentSection(i)} className="whitespace-nowrap">{i + 1}. {sections[i].title}</Button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={currentSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center space-x-2">{getCategoryIcon(category)}<span>{sections[currentSection].title}</span></h3>
              {sections.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0}>Previous</Button>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))} disabled={currentSection === sections.length - 1}>Next<ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              )}
            </div>

            {sections[currentSection].diagram && <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6"><AnimatedDiagram {...sections[currentSection].diagram!} /></div>}

            {sections[currentSection].content && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap leading-relaxed space-y-4">
                  {sections[currentSection].content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {sections[currentSection].keyPoints && (
              <div className="space-y-3"><h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Key Points</h4><div className="space-y-2">{sections[currentSection].keyPoints!.map((p, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"><div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs text-primary-foreground font-medium">{idx + 1}</span></div><p className="text-sm">{p}</p></motion.div>))}</div></div>
            )}

            {sections[currentSection].formula && (<div className="bg-muted p-4 rounded-lg"><h4 className="font-medium mb-2">Formula:</h4><code className="text-lg font-mono">{sections[currentSection].formula}</code></div>)}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ScienceExplanation;
