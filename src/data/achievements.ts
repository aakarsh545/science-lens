export interface AchievementCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const achievementCategories: AchievementCategory[] = [
  { id: 'biology', name: 'Biology', color: 'hsl(142 76% 55%)', icon: '🧬' },
  { id: 'chemistry', name: 'Chemistry', color: 'hsl(45 93% 58%)', icon: '⚗️' },
  { id: 'physics', name: 'Physics', color: 'hsl(217 91% 60%)', icon: '⚛️' },
  { id: 'astronomy', name: 'Astronomy', color: 'hsl(260 60% 65%)', icon: '🌟' },
  { id: 'earth-science', name: 'Earth Science', color: 'hsl(30 100% 50%)', icon: '🌍' },
  { id: 'technology', name: 'Technology', color: 'hsl(200 100% 50%)', icon: '💻' },
  { id: 'mathematics', name: 'Mathematics', color: 'hsl(300 60% 60%)', icon: '📊' },
  { id: 'general', name: 'General Science', color: 'hsl(220 25% 50%)', icon: '🔬' },
  { id: 'milestones', name: 'Milestones', color: 'hsl(50 100% 50%)', icon: '🏆' },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: number;
  bonusCredits?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: 'questions_in_category' | 'total_questions' | 'streak_days' | 'photos_uploaded' | 'special';
    count?: number;
    category?: string;
    special?: string;
  };
}

export const achievements: Achievement[] = [
  // Biology (10 achievements)
  { id: 'bio-beginner', title: 'Biology Beginner', description: 'Ask 5 biology questions', icon: '🌱', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'biology' } },
  { id: 'bio-explorer', title: 'Biology Explorer', description: 'Ask 10 biology questions', icon: '🔬', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'biology' } },
  { id: 'bio-master', title: 'Biology Master', description: 'Ask 25 biology questions', icon: '🧬', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'biology' } },
  { id: 'bio-expert', title: 'Biology Expert', description: 'Ask 50 biology questions', icon: '🦋', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'biology' } },
  { id: 'bio-genius', title: 'Biology Genius', description: 'Ask 100 biology questions', icon: '🧠', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'biology' } },
  { id: 'plant-lover', title: 'Plant Lover', description: 'Ask about plant life', icon: '🌿', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'plants' } },
  { id: 'animal-researcher', title: 'Animal Researcher', description: 'Ask about animal behavior', icon: '🦁', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'animals' } },
  { id: 'cell-scientist', title: 'Cell Scientist', description: 'Ask about cellular biology', icon: '🦠', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'cells' } },
  { id: 'dna-detective', title: 'DNA Detective', description: 'Ask about genetics', icon: '🧬', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'genetics' } },
  { id: 'evolution-scholar', title: 'Evolution Scholar', description: 'Ask about evolution', icon: '🐒', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'evolution' } },

  // Chemistry (10 achievements)
  { id: 'chem-beginner', title: 'Chemistry Beginner', description: 'Ask 5 chemistry questions', icon: '🧪', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'chemistry' } },
  { id: 'chem-explorer', title: 'Chemistry Explorer', description: 'Ask 10 chemistry questions', icon: '⚗️', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'chemistry' } },
  { id: 'chem-master', title: 'Chemistry Master', description: 'Ask 25 chemistry questions', icon: '💥', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'chemistry' } },
  { id: 'chem-expert', title: 'Chemistry Expert', description: 'Ask 50 chemistry questions', icon: '⚛️', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'chemistry' } },
  { id: 'chem-genius', title: 'Chemistry Genius', description: 'Ask 100 chemistry questions', icon: '🧙‍♂️', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'chemistry' } },
  { id: 'element-hunter', title: 'Element Hunter', description: 'Ask about elements', icon: '📊', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'elements' } },
  { id: 'reaction-master', title: 'Reaction Master', description: 'Ask about chemical reactions', icon: '💥', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'reactions' } },
  { id: 'molecule-builder', title: 'Molecule Builder', description: 'Ask about molecules', icon: '🔗', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'molecules' } },
  { id: 'acid-base-pro', title: 'Acid-Base Pro', description: 'Ask about acids and bases', icon: '🧪', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'acid-base' } },
  { id: 'organic-chemist', title: 'Organic Chemist', description: 'Ask about organic chemistry', icon: '🌿', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'organic' } },

  // Physics (10 achievements)
  { id: 'physics-beginner', title: 'Physics Beginner', description: 'Ask 5 physics questions', icon: '📐', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'physics' } },
  { id: 'physics-explorer', title: 'Physics Explorer', description: 'Ask 10 physics questions', icon: '⚛️', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'physics' } },
  { id: 'physics-master', title: 'Physics Master', description: 'Ask 25 physics questions', icon: '⚡', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'physics' } },
  { id: 'physics-expert', title: 'Physics Expert', description: 'Ask 50 physics questions', icon: '🌀', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'physics' } },
  { id: 'physics-genius', title: 'Physics Genius', description: 'Ask 100 physics questions', icon: '🧠', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'physics' } },
  { id: 'motion-detective', title: 'Motion Detective', description: 'Ask about motion and forces', icon: '🏃‍♂️', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'motion' } },
  { id: 'energy-expert', title: 'Energy Expert', description: 'Ask about energy', icon: '⚡', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'energy' } },
  { id: 'quantum-explorer', title: 'Quantum Explorer', description: 'Ask about quantum physics', icon: '🌀', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'quantum' } },
  { id: 'wave-master', title: 'Wave Master', description: 'Ask about waves and sound', icon: '🌊', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'waves' } },
  { id: 'light-specialist', title: 'Light Specialist', description: 'Ask about light and optics', icon: '🌈', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'light' } },

  // Astronomy (10 achievements)
  { id: 'astro-beginner', title: 'Astronomy Beginner', description: 'Ask 5 astronomy questions', icon: '⭐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'astronomy' } },
  { id: 'astro-explorer', title: 'Astronomy Explorer', description: 'Ask 10 astronomy questions', icon: '🔭', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'astronomy' } },
  { id: 'astro-master', title: 'Astronomy Master', description: 'Ask 25 astronomy questions', icon: '🌌', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'astronomy' } },
  { id: 'astro-expert', title: 'Astronomy Expert', description: 'Ask 50 astronomy questions', icon: '🚀', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'astronomy' } },
  { id: 'astro-genius', title: 'Astronomy Genius', description: 'Ask 100 astronomy questions', icon: '🌠', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'astronomy' } },
  { id: 'star-gazer', title: 'Star Gazer', description: 'Ask about stars', icon: '⭐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'stars' } },
  { id: 'planet-hunter', title: 'Planet Hunter', description: 'Ask about planets', icon: '🪐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'planets' } },
  { id: 'galaxy-explorer', title: 'Galaxy Explorer', description: 'Ask about galaxies', icon: '🌌', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'galaxies' } },
  { id: 'space-pioneer', title: 'Space Pioneer', description: 'Ask about space exploration', icon: '🚀', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'space-exploration' } },
  { id: 'cosmic-detective', title: 'Cosmic Detective', description: 'Ask about black holes', icon: '🕳️', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'black-holes' } },

  // Earth Science (10 achievements)
  { id: 'earth-beginner', title: 'Earth Science Beginner', description: 'Ask 5 earth science questions', icon: '🌍', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'earth-science' } },
  { id: 'earth-explorer', title: 'Earth Science Explorer', description: 'Ask 10 earth science questions', icon: '🗻', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'earth-science' } },
  { id: 'earth-master', title: 'Earth Science Master', description: 'Ask 25 earth science questions', icon: '🌋', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'earth-science' } },
  { id: 'earth-expert', title: 'Earth Science Expert', description: 'Ask 50 earth science questions', icon: '🏔️', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'earth-science' } },
  { id: 'earth-genius', title: 'Earth Science Genius', description: 'Ask 100 earth science questions', icon: '🌎', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'earth-science' } },
  { id: 'rock-hound', title: 'Rock Hound', description: 'Ask about rocks and minerals', icon: '🪨', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'rocks' } },
  { id: 'weather-watcher', title: 'Weather Watcher', description: 'Ask about weather and climate', icon: '⛈️', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'weather' } },
  { id: 'ocean-explorer', title: 'Ocean Explorer', description: 'Ask about oceans', icon: '🌊', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'oceans' } },
  { id: 'earthquake-expert', title: 'Earthquake Expert', description: 'Ask about earthquakes', icon: '🌋', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'earthquakes' } },
  { id: 'climate-champion', title: 'Climate Champion', description: 'Ask about climate change', icon: '🌡️', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'climate' } },

  // Technology (10 achievements)
  { id: 'tech-beginner', title: 'Technology Beginner', description: 'Ask 5 technology questions', icon: '💻', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'technology' } },
  { id: 'tech-explorer', title: 'Technology Explorer', description: 'Ask 10 technology questions', icon: '🔧', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'technology' } },
  { id: 'tech-master', title: 'Technology Master', description: 'Ask 25 technology questions', icon: '⚙️', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'technology' } },
  { id: 'tech-expert', title: 'Technology Expert', description: 'Ask 50 technology questions', icon: '🤖', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'technology' } },
  { id: 'tech-genius', title: 'Technology Genius', description: 'Ask 100 technology questions', icon: '🚀', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'technology' } },
  { id: 'ai-enthusiast', title: 'AI Enthusiast', description: 'Ask about artificial intelligence', icon: '🤖', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'ai' } },
  { id: 'code-cracker', title: 'Code Cracker', description: 'Ask about programming', icon: '💻', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'programming' } },
  { id: 'robot-researcher', title: 'Robot Researcher', description: 'Ask about robotics', icon: '🤖', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'robotics' } },
  { id: 'internet-investigator', title: 'Internet Investigator', description: 'Ask about internet technology', icon: '🌐', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'internet' } },
  { id: 'space-tech-specialist', title: 'Space Tech Specialist', description: 'Ask about space technology', icon: '🛰️', category: 'technology', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'space-tech' } },

  // Mathematics (10 achievements)
  { id: 'math-beginner', title: 'Mathematics Beginner', description: 'Ask 5 mathematics questions', icon: '🔢', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'mathematics' } },
  { id: 'math-explorer', title: 'Mathematics Explorer', description: 'Ask 10 mathematics questions', icon: '📊', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'mathematics' } },
  { id: 'math-master', title: 'Mathematics Master', description: 'Ask 25 mathematics questions', icon: '📐', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'mathematics' } },
  { id: 'math-expert', title: 'Mathematics Expert', description: 'Ask 50 mathematics questions', icon: '🧮', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'mathematics' } },
  { id: 'math-genius', title: 'Mathematics Genius', description: 'Ask 100 mathematics questions', icon: '∞', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'mathematics' } },
  { id: 'number-ninja', title: 'Number Ninja', description: 'Ask about numbers and arithmetic', icon: '🔢', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'numbers' } },
  { id: 'geometry-guru', title: 'Geometry Guru', description: 'Ask about shapes and geometry', icon: '📐', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'geometry' } },
  { id: 'algebra-ace', title: 'Algebra Ace', description: 'Ask about algebra', icon: '🔤', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'algebra' } },
  { id: 'calculus-champion', title: 'Calculus Champion', description: 'Ask about calculus', icon: '📈', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'calculus' } },
  { id: 'statistics-specialist', title: 'Statistics Specialist', description: 'Ask about statistics', icon: '📊', category: 'mathematics', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'statistics' } },

  // General Science (10 achievements)
  { id: 'science-beginner', title: 'Science Beginner', description: 'Ask 5 general science questions', icon: '🔬', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'general' } },
  { id: 'science-explorer', title: 'Science Explorer', description: 'Ask 10 general science questions', icon: '🧪', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 10, category: 'general' } },
  { id: 'science-master', title: 'Science Master', description: 'Ask 25 general science questions', icon: '🔬', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'questions_in_category', count: 25, category: 'general' } },
  { id: 'science-expert', title: 'Science Expert', description: 'Ask 50 general science questions', icon: '👨‍🔬', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'questions_in_category', count: 50, category: 'general' } },
  { id: 'science-genius', title: 'Science Genius', description: 'Ask 100 general science questions', icon: '🏆', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'general' } },
  { id: 'hypothesis-hero', title: 'Hypothesis Hero', description: 'Ask about scientific method', icon: '💡', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'scientific-method' } },
  { id: 'experiment-expert', title: 'Experiment Expert', description: 'Ask about experiments', icon: '🧪', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'experiments' } },
  { id: 'theory-thinker', title: 'Theory Thinker', description: 'Ask about scientific theories', icon: '🤔', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'theories' } },
  { id: 'discovery-detective', title: 'Discovery Detective', description: 'Ask about scientific discoveries', icon: '🔍', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'discoveries' } },
  { id: 'innovation-investigator', title: 'Innovation Investigator', description: 'Ask about scientific innovations', icon: '💡', category: 'general', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'innovations' } },

  // Milestones (20 achievements)
  { id: 'first-question', title: 'First Question', description: 'Ask your very first question', icon: '🌟', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'total_questions', count: 1 } },
  { id: 'curious-mind', title: 'Curious Mind', description: 'Ask 10 questions total', icon: '🤔', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'total_questions', count: 10 } },
  { id: 'knowledge-seeker', title: 'Knowledge Seeker', description: 'Ask 25 questions total', icon: '🔍', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'total_questions', count: 25 } },
  { id: 'science-enthusiast', title: 'Science Enthusiast', description: 'Ask 50 questions total', icon: '💪', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'total_questions', count: 50 } },
  { id: 'dedicated-learner', title: 'Dedicated Learner', description: 'Ask 100 questions total', icon: '📚', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'total_questions', count: 100 } },
  { id: 'master-questioner', title: 'Master Questioner', description: 'Ask 250 questions total', icon: '🎓', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'total_questions', count: 250 } },
  { id: 'science-legend', title: 'Science Legend', description: 'Ask 500 questions total', icon: '👑', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'total_questions', count: 500 } },
  
  { id: 'photo-pioneer', title: 'Photo Pioneer', description: 'Upload your first photo', icon: '📷', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'photos_uploaded', count: 1 } },
  { id: 'visual-learner', title: 'Visual Learner', description: 'Upload 10 photos', icon: '📸', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'photos_uploaded', count: 10 } },
  { id: 'photo-collector', title: 'Photo Collector', description: 'Upload 50 photos', icon: '🖼️', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'photos_uploaded', count: 50 } },
  
  { id: 'daily-scholar', title: 'Daily Scholar', description: 'Maintain a 3-day streak', icon: '📅', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'streak_days', count: 3 } },
  { id: 'weekly-warrior', title: 'Weekly Warrior', description: 'Maintain a 7-day streak', icon: '🗓️', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'streak_days', count: 7 } },
  { id: 'monthly-master', title: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '📆', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'streak_days', count: 30 } },
  { id: 'streak-legend', title: 'Streak Legend', description: 'Maintain a 100-day streak', icon: '🔥', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'streak_days', count: 100 } },
  
  { id: 'early-bird', title: 'Early Bird', description: 'Ask a question before 6 AM', icon: '🌅', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'early-question' } },
  { id: 'night-owl', title: 'Night Owl', description: 'Ask a question after 10 PM', icon: '🦉', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'special', special: 'night-question' } },
  { id: 'weekend-warrior', title: 'Weekend Warrior', description: 'Ask questions on weekends', icon: '🎉', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'weekend-questions' } },
  { id: 'multi-disciplinary', title: 'Multi-Disciplinary', description: 'Ask questions in 5 different categories', icon: '🎯', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'rare', requirements: { type: 'special', special: 'multi-category' } },
  { id: 'renaissance-scholar', title: 'Renaissance Scholar', description: 'Ask questions in all categories', icon: '👨‍🎓', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'epic', requirements: { type: 'special', special: 'all-categories' } },
  { id: 'science-completionist', title: 'Science Completionist', description: 'Unlock 50 achievements', icon: '🏆', category: 'milestones', unlocked: false, bonusCredits: 1, rarity: 'legendary', requirements: { type: 'special', special: 'achievement-master' } },
];