import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Atom, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

interface ScienceExplanationProps {
  explanation: string;
  onTryAnother: () => void;
}

export const ScienceExplanation = ({ explanation, onTryAnother }: ScienceExplanationProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-subtle border-primary/20 shadow-science">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-3">
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Science Explanation
            </h2>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <div className="flex justify-center space-x-4">
            <Atom className="w-6 h-6 text-primary animate-float" />
            <Lightbulb className="w-6 h-6 text-secondary animate-float" style={{ animationDelay: '1s' }} />
            <BookOpen className="w-6 h-6 text-accent animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Explanation Content */}
        <div className="bg-card rounded-xl p-6 border border-primary/10">
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </div>

        {/* Fun Science Fact */}
        <Card className="bg-gradient-science p-4 border-none">
          <div className="flex items-center space-x-3">
            <Atom className="w-6 h-6 text-white animate-pulse" />
            <p className="text-white font-medium">
              🌟 Fun Fact: Science is everywhere! Every photo tells a story about physics, 
              chemistry, biology, or earth science. Keep exploring! 🚀
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onTryAnother}
            className="font-semibold"
          >
            <Sparkles className="w-5 h-5" />
            Try Another Photo!
          </Button>
          <Button 
            variant="cosmic" 
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Atom className="w-5 h-5" />
            Back to Top
          </Button>
        </div>
      </div>
    </Card>
  );
};