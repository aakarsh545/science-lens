import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoModeProps {
  onSignUpClick: () => void;
}

const DEMO_QA_PAIRS = [
  {
    question: "Why is the sky blue?",
    answer: "🧪 The Physics of Light and Atmosphere\n\nThe sky appears blue due to a phenomenon called Rayleigh scattering. When sunlight enters Earth's atmosphere, it collides with gas molecules like nitrogen and oxygen.\n\n🔬 Key Principles:\n• Blue light has a shorter wavelength (~450nm) than other visible colors\n• Shorter wavelengths scatter more effectively in all directions\n• Our atmosphere is filled with tiny molecules much smaller than light wavelengths\n• The scattered blue light reaches our eyes from all parts of the sky\n\n⚛️ The Science:\nSunlight appears white because it contains all colors mixed together. When it hits atmospheric molecules, blue light bounces around more than red light. During sunset, light travels through more atmosphere, scattering away most blue light, leaving red and orange hues.\n\n🌟 Real-World Connection:\nThis same principle explains why oceans appear blue and why astronauts see a black sky in space (no atmosphere to scatter light)!",
    category: "physics"
  },
  {
    question: "How do plants make oxygen?",
    answer: "🧪 Photosynthesis: Nature's Energy Factory\n\nPlants produce oxygen through photosynthesis, one of the most important chemical reactions on Earth. This process converts light energy into chemical energy while releasing oxygen as a byproduct.\n\n🔬 The Process:\n• Chlorophyll in leaves captures sunlight energy\n• Water (H₂O) from roots is split into hydrogen and oxygen\n• Carbon dioxide (CO₂) from air combines with hydrogen\n• Glucose (C₆H₁₂O₆) is formed as energy storage\n• Oxygen (O₂) is released into the atmosphere\n\n⚛️ Chemical Equation:\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nThis elegant reaction powers almost all life on Earth!\n\n🌟 Impact:\nA single mature tree produces enough oxygen for two people per year. The Amazon rainforest alone produces 20% of Earth's oxygen, making it the planet's lungs!",
    category: "biology"
  },
  {
    question: "What makes stars shine?",
    answer: "🧪 Nuclear Fusion: The Power of Stars\n\nStars shine through nuclear fusion, where hydrogen atoms combine to form helium, releasing enormous amounts of energy. This process powers the Sun and all stars in the universe.\n\n🔬 The Fusion Process:\n• Core temperature reaches 15 million°C\n• Hydrogen nuclei (protons) overcome electromagnetic repulsion\n• Four hydrogen atoms fuse into one helium atom\n• Mass is converted directly into energy (E=mc²)\n• Energy radiates outward as light and heat\n\n⚛️ The Numbers:\nThe Sun converts 600 million tons of hydrogen into helium every second, releasing energy equivalent to 100 billion nuclear bombs. This has continued for 4.6 billion years!\n\n🌟 Stellar Life Cycles:\nLarger stars burn faster and hotter. When fusion fuel runs out, stars can become red giants, white dwarfs, neutron stars, or black holes depending on their mass.",
    category: "astronomy"
  }
];

export function DemoMode({ onSignUpClick }: DemoModeProps) {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium">
          <Sparkles className="w-4 h-4" />
          Try It Out - Demo Mode
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how Science Lens answers real questions with detailed, engaging explanations.
          Sign up to ask your own questions and unlock personalized learning!
        </p>
      </div>

      {/* Demo Q&A Display */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {DEMO_QA_PAIRS.map((demo, index) => (
            <Button
              key={index}
              variant={activeDemo === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveDemo(index)}
              className="transition-all"
            >
              {demo.question}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-accent/20">
              <CardContent className="p-6 space-y-4">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg max-w-[80%]">
                    <p className="font-medium">{DEMO_QA_PAIRS[activeDemo].question}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-muted px-6 py-4 rounded-lg max-w-[90%]">
                    <div className="whitespace-pre-wrap leading-relaxed text-sm">
                      {DEMO_QA_PAIRS[activeDemo].answer}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Category: {DEMO_QA_PAIRS[activeDemo].category} • Demo Response
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-science text-white">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to Ask Your Own Questions?</h3>
          <p className="text-white/90 max-w-2xl mx-auto">
            Sign up now to explore unlimited scientific discoveries, save your learning history,
            earn achievements, and access Pro features like voice mode and PDF exports.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={onSignUpClick}
            className="group"
          >
            Create Free Account
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}