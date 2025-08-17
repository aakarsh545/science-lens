import { useState } from 'react';
import { PhotoUpload } from '@/components/PhotoUpload';
import { ScienceExplanation } from '@/components/ScienceExplanation';
import { Button } from '@/components/ui/button';
import { Atom, Microscope, Telescope, Dna, Beaker, Zap } from 'lucide-react';
import scienceHero from '@/assets/science-hero.jpg';

export default function ScienceLens() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [objectName, setObjectName] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handlePhotoUpload = async (file: File, question: string) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate AI analysis (in real app, this would call an AI service)
    setTimeout(() => {
      // Mock object identification
      const mockObjectName = "Flowering Plant (Daisy Family)";
      
      const mockExplanation = question 
        ? `🔬 Great question! Let me explain what's happening here.

🌟 Your Question: "${question}"

🧪 The Science Behind It:
Based on your photo, I can see fascinating scientific principles at work! The colors, patterns, and structures visible demonstrate complex physical and chemical processes.

• Light and Color: The colors you see are created when light waves of different frequencies bounce off or pass through materials. Each color corresponds to a specific wavelength of electromagnetic radiation!

• Structure and Form: The shape and texture reveal information about molecular arrangements, crystalline structures, or biological adaptations that have evolved over time.

• Environmental Factors: Temperature, pressure, humidity, and other environmental conditions all play a role in what you're observing.

🚀 Why This Matters:
Understanding these principles helps us appreciate the incredible complexity and beauty of our natural world. From the smallest atoms to the largest galaxies, similar scientific laws govern everything around us!

💡 Want to explore more? Try uploading different photos to discover new scientific phenomena. Every image tells a unique scientific story!`
        : `🔬 Amazing discovery! This image shows fascinating scientific principles at work.

🌟 What I can see:
The object/scene in your photo demonstrates several key scientific concepts. The colors, patterns, and structures visible here are the result of complex physical and chemical processes.

🧪 The Science Behind It:
• Light and Color: The colors you see are created when light waves of different frequencies bounce off or pass through materials. Each color corresponds to a specific wavelength of electromagnetic radiation!

• Structure and Form: The shape and texture reveal information about molecular arrangements, crystalline structures, or biological adaptations that have evolved over time.

• Environmental Factors: Temperature, pressure, humidity, and other environmental conditions all play a role in what you're observing.

🚀 Why This Matters:
Understanding these principles helps us appreciate the incredible complexity and beauty of our natural world. From the smallest atoms to the largest galaxies, similar scientific laws govern everything around us!

💡 Want to explore more? Try uploading different photos to discover new scientific phenomena. Every image tells a unique scientific story!`;

      setObjectName(mockObjectName);
      setExplanation(mockExplanation);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleTryAnother = () => {
    setUploadedFile(null);
    setShowResults(false);
    setExplanation('');
    setObjectName('');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${scienceHero})` }}
        />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            {/* Floating Science Icons */}
            <div className="flex justify-center space-x-8 mb-8">
              <Atom className="w-8 h-8 text-primary animate-float" />
              <Microscope className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '0.5s' }} />
              <Telescope className="w-8 h-8 text-accent animate-float" style={{ animationDelay: '1s' }} />
              <Dna className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '1.5s' }} />
              <Beaker className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '2s' }} />
              <Zap className="w-8 h-8 text-accent animate-float" style={{ animationDelay: '2.5s' }} />
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                  ScienceLens
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                See the Science Behind Anything! 🔬
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload any photo and discover the amazing science hiding in plain sight! 
              Perfect for curious minds who love to explore and learn! 🚀
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                🌱 Plants & Nature
              </div>
              <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                🧪 Experiments
              </div>
              <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                🔍 Everyday Objects
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                ⚡ Physics in Action
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {!showResults ? (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Explore? 🎯
                </h3>
                <p className="text-lg text-muted-foreground">
                  Drop your photo below and let's uncover the science together!
                </p>
              </div>
              
              <PhotoUpload 
                onPhotoUpload={handlePhotoUpload}
                isAnalyzing={isAnalyzing}
              />
            </div>
          ) : (
            <ScienceExplanation 
              objectName={objectName}
              explanation={explanation}
              onTryAnother={handleTryAnother}
            />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-cosmic text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Atom className="w-6 h-6 animate-pulse" />
              <Microscope className="w-6 h-6 animate-pulse" />
              <Telescope className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="text-2xl font-bold">Keep Exploring! 🌟</h4>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Science is everywhere - in your backyard, kitchen, and beyond. 
              Every photo has a story waiting to be discovered!
            </p>
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Zap className="w-5 h-5" />
                Start New Discovery
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}