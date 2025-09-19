import React from 'react';
import { GraduationCap, Baby, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type DifficultyLevel = 'child' | 'teen' | 'expert';

interface DifficultyToggleProps {
  difficulty: DifficultyLevel;
  onChange: (difficulty: DifficultyLevel) => void;
}

const difficulties = [
  {
    id: 'child' as DifficultyLevel,
    name: 'Explain like I\'m 5',
    icon: <Baby className="h-4 w-4" />,
    description: 'Simple, fun explanations with examples',
    color: 'text-green-600',
  },
  {
    id: 'teen' as DifficultyLevel,
    name: 'Teen Level',
    icon: <User className="h-4 w-4" />,
    description: 'Clear explanations with some detail',
    color: 'text-blue-600',
  },
  {
    id: 'expert' as DifficultyLevel,
    name: 'Expert Mode',
    icon: <GraduationCap className="h-4 w-4" />,
    description: 'Technical, in-depth explanations',
    color: 'text-purple-600',
  },
];

export const DifficultyToggle: React.FC<DifficultyToggleProps> = ({ difficulty, onChange }) => {
  const currentDifficulty = difficulties.find(d => d.id === difficulty) || difficulties[1];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Difficulty:</span>
      <Select value={difficulty} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className={currentDifficulty.color}>
                {currentDifficulty.icon}
              </span>
              <span className="text-sm">{currentDifficulty.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {difficulties.map((diff) => (
            <SelectItem key={diff.id} value={diff.id}>
              <div className="flex items-center space-x-2">
                <span className={diff.color}>{diff.icon}</span>
                <div>
                  <div className="font-medium">{diff.name}</div>
                  <div className="text-xs text-muted-foreground">{diff.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const getDifficultyPrompt = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'child':
      return 'Explain this in very simple terms that a 5-year-old would understand. Use fun analogies, simple words, and engaging examples. Make it playful and easy to imagine.';
    case 'teen':
      return 'Explain this at a high school level. Use clear language with some scientific terms, but make sure to explain complex concepts. Include relevant examples and context.';
    case 'expert':
      return 'Provide a detailed, technical explanation suitable for someone with advanced scientific knowledge. Include relevant formulas, precise terminology, and in-depth analysis.';
    default:
      return '';
  }
};