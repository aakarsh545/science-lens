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
  { id: 'medicine', name: 'Medicine', color: 'hsl(0 84% 60%)', icon: '🏥' },
  { id: 'engineering', name: 'Engineering', color: 'hsl(200 100% 50%)', icon: '⚙️' },
  { id: 'ecology', name: 'Ecology', color: 'hsl(120 60% 50%)', icon: '🌱' },
  { id: 'psychology', name: 'Psychology', color: 'hsl(300 60% 60%)', icon: '🧠' },
  { id: 'general', name: 'General', color: 'hsl(220 25% 50%)', icon: '🔬' },
  { id: 'milestones', name: 'Milestones', color: 'hsl(50 100% 50%)', icon: '🏆' },
  { id: 'special', name: 'Special', color: 'hsl(320 100% 70%)', icon: '✨' }
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
    type: 'questions_in_category' | 'total_questions' | 'streak_days' | 'photos_uploaded' | 'time_spent' | 'special';
    count?: number;
    category?: string;
    special?: string;
  };
}

export const achievements: Achievement[] = [
  // Biology Achievements (25)
  { id: 'bio-curious', title: 'Bio Curious', description: 'Asked your first biology question', icon: '🔬', category: 'biology', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 1, category: 'biology' } },
  { id: 'plant-detective', title: 'Plant Detective', description: 'Asked 5 biology questions', icon: '🌿', category: 'biology', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'biology' } },
  { id: 'cell-explorer', title: 'Cell Explorer', description: 'Asked 10 biology questions', icon: '🦠', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 10, category: 'biology' } },
  { id: 'dna-decoder', title: 'DNA Decoder', description: 'Asked 15 biology questions', icon: '🧬', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'questions_in_category', count: 15, category: 'biology' } },
  { id: 'evolution-expert', title: 'Evolution Expert', description: 'Asked 25 biology questions', icon: '🐒', category: 'biology', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'questions_in_category', count: 25, category: 'biology' } },
  { id: 'bio-master', title: 'Biology Master', description: 'Asked 50 biology questions', icon: '🦋', category: 'biology', unlocked: false, bonusCredits: 15, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 50, category: 'biology' } },
  { id: 'marine-biologist', title: 'Marine Biologist', description: 'Asked about ocean life', icon: '🐋', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'ocean' } },
  { id: 'botanist', title: 'Botanist', description: 'Asked about plants', icon: '🌺', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'plants' } },
  { id: 'zoologist', title: 'Zoologist', description: 'Asked about animals', icon: '🦁', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'animals' } },
  { id: 'microbiologist', title: 'Microbiologist', description: 'Asked about bacteria and viruses', icon: '🦠', category: 'biology', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'microbes' } },
  { id: 'geneticist', title: 'Geneticist', description: 'Asked about genetics', icon: '🧬', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'genetics' } },
  { id: 'ecologist', title: 'Ecologist', description: 'Asked about ecosystems', icon: '🌳', category: 'biology', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'ecosystem' } },
  { id: 'anatomist', title: 'Anatomist', description: 'Asked about human body', icon: '🫀', category: 'biology', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'anatomy' } },
  { id: 'ornithologist', title: 'Ornithologist', description: 'Asked about birds', icon: '🦅', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'birds' } },
  { id: 'entomologist', title: 'Entomologist', description: 'Asked about insects', icon: '🐛', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'insects' } },
  { id: 'biochemist', title: 'Biochemist', description: 'Asked about biological chemistry', icon: '⚗️', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'special', special: 'biochemistry' } },
  { id: 'neuroscientist', title: 'Neuroscientist', description: 'Asked about the brain', icon: '🧠', category: 'biology', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'brain' } },
  { id: 'immunologist', title: 'Immunologist', description: 'Asked about immune system', icon: '🛡️', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'immune' } },
  { id: 'physiologist', title: 'Physiologist', description: 'Asked about body functions', icon: '❤️', category: 'biology', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'physiology' } },
  { id: 'paleontologist', title: 'Paleontologist', description: 'Asked about dinosaurs and fossils', icon: '🦕', category: 'biology', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'fossils' } },
  { id: 'mycologist', title: 'Mycologist', description: 'Asked about fungi', icon: '🍄', category: 'biology', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'fungi' } },
  { id: 'virologist', title: 'Virologist', description: 'Asked about viruses', icon: '🦠', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'virus' } },
  { id: 'developmental-biologist', title: 'Developmental Biologist', description: 'Asked about growth and development', icon: '🐣', category: 'biology', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'development' } },
  { id: 'conservation-biologist', title: 'Conservation Biologist', description: 'Asked about species conservation', icon: '🐼', category: 'biology', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'conservation' } },
  { id: 'life-scientist', title: 'Life Scientist', description: 'Master of all biology', icon: '🌍', category: 'biology', unlocked: false, bonusCredits: 20, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'biology' } },

  // Chemistry Achievements (20)
  { id: 'chem-curious', title: 'Chem Curious', description: 'Asked your first chemistry question', icon: '⚗️', category: 'chemistry', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 1, category: 'chemistry' } },
  { id: 'element-hunter', title: 'Element Hunter', description: 'Asked 5 chemistry questions', icon: '🧪', category: 'chemistry', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'chemistry' } },
  { id: 'reaction-master', title: 'Reaction Master', description: 'Asked 10 chemistry questions', icon: '💥', category: 'chemistry', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 10, category: 'chemistry' } },
  { id: 'molecule-builder', title: 'Molecule Builder', description: 'Asked 15 chemistry questions', icon: '⚛️', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'questions_in_category', count: 15, category: 'chemistry' } },
  { id: 'periodic-pro', title: 'Periodic Pro', description: 'Asked 25 chemistry questions', icon: '📊', category: 'chemistry', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'questions_in_category', count: 25, category: 'chemistry' } },
  { id: 'chem-wizard', title: 'Chemistry Wizard', description: 'Asked 50 chemistry questions', icon: '🧙‍♂️', category: 'chemistry', unlocked: false, bonusCredits: 15, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 50, category: 'chemistry' } },
  { id: 'organic-chemist', title: 'Organic Chemist', description: 'Asked about organic compounds', icon: '🌿', category: 'chemistry', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'organic' } },
  { id: 'inorganic-specialist', title: 'Inorganic Specialist', description: 'Asked about inorganic chemistry', icon: '💎', category: 'chemistry', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'inorganic' } },
  { id: 'acid-base-expert', title: 'Acid-Base Expert', description: 'Asked about acids and bases', icon: '🧪', category: 'chemistry', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'acid-base' } },
  { id: 'thermodynamics-guru', title: 'Thermodynamics Guru', description: 'Asked about chemical thermodynamics', icon: '🌡️', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'thermodynamics' } },
  { id: 'catalyst-master', title: 'Catalyst Master', description: 'Asked about catalysts', icon: '⚡', category: 'chemistry', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'catalyst' } },
  { id: 'polymer-scientist', title: 'Polymer Scientist', description: 'Asked about polymers', icon: '🔗', category: 'chemistry', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'polymer' } },
  { id: 'electrochemist', title: 'Electrochemist', description: 'Asked about electrochemistry', icon: '🔋', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'electrochemistry' } },
  { id: 'analytical-chemist', title: 'Analytical Chemist', description: 'Asked about chemical analysis', icon: '🔬', category: 'chemistry', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'analytical' } },
  { id: 'physical-chemist', title: 'Physical Chemist', description: 'Asked about physical chemistry', icon: '⚖️', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'epic', requirements: { type: 'special', special: 'physical-chemistry' } },
  { id: 'quantum-chemist', title: 'Quantum Chemist', description: 'Asked about quantum chemistry', icon: '🌀', category: 'chemistry', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'special', special: 'quantum-chemistry' } },
  { id: 'medicinal-chemist', title: 'Medicinal Chemist', description: 'Asked about pharmaceutical chemistry', icon: '💊', category: 'chemistry', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'medicinal' } },
  { id: 'environmental-chemist', title: 'Environmental Chemist', description: 'Asked about environmental chemistry', icon: '🌍', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'environmental' } },
  { id: 'materials-scientist', title: 'Materials Scientist', description: 'Asked about materials chemistry', icon: '🏗️', category: 'chemistry', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'materials' } },
  { id: 'chemical-master', title: 'Chemical Master', description: 'Master of all chemistry', icon: '👨‍🔬', category: 'chemistry', unlocked: false, bonusCredits: 20, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'chemistry' } },

  // Physics Achievements (20)
  { id: 'physics-newbie', title: 'Physics Newbie', description: 'Asked your first physics question', icon: '⚛️', category: 'physics', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 1, category: 'physics' } },
  { id: 'motion-detective', title: 'Motion Detective', description: 'Asked 5 physics questions', icon: '🏃‍♂️', category: 'physics', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'physics' } },
  { id: 'force-master', title: 'Force Master', description: 'Asked 10 physics questions', icon: '💪', category: 'physics', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 10, category: 'physics' } },
  { id: 'energy-expert', title: 'Energy Expert', description: 'Asked 15 physics questions', icon: '⚡', category: 'physics', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'questions_in_category', count: 15, category: 'physics' } },
  { id: 'quantum-explorer', title: 'Quantum Explorer', description: 'Asked 25 physics questions', icon: '🌀', category: 'physics', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'questions_in_category', count: 25, category: 'physics' } },
  { id: 'physics-genius', title: 'Physics Genius', description: 'Asked 50 physics questions', icon: '🧠', category: 'physics', unlocked: false, bonusCredits: 15, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 50, category: 'physics' } },
  { id: 'mechanics-master', title: 'Mechanics Master', description: 'Asked about classical mechanics', icon: '⚙️', category: 'physics', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'mechanics' } },
  { id: 'thermodynamics-expert', title: 'Thermodynamics Expert', description: 'Asked about thermodynamics', icon: '🌡️', category: 'physics', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'thermodynamics' } },
  { id: 'electromagnetism-guru', title: 'Electromagnetism Guru', description: 'Asked about electromagnetism', icon: '🧲', category: 'physics', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'electromagnetism' } },
  { id: 'optics-specialist', title: 'Optics Specialist', description: 'Asked about light and optics', icon: '🌈', category: 'physics', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'optics' } },
  { id: 'quantum-physicist', title: 'Quantum Physicist', description: 'Asked about quantum mechanics', icon: '⚛️', category: 'physics', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'special', special: 'quantum' } },
  { id: 'relativity-researcher', title: 'Relativity Researcher', description: 'Asked about relativity', icon: '🌌', category: 'physics', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'relativity' } },
  { id: 'particle-physicist', title: 'Particle Physicist', description: 'Asked about particle physics', icon: '🔬', category: 'physics', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'special', special: 'particles' } },
  { id: 'nuclear-physicist', title: 'Nuclear Physicist', description: 'Asked about nuclear physics', icon: '☢️', category: 'physics', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'nuclear' } },
  { id: 'acoustics-expert', title: 'Acoustics Expert', description: 'Asked about sound and waves', icon: '🔊', category: 'physics', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'acoustics' } },
  { id: 'fluid-dynamics-pro', title: 'Fluid Dynamics Pro', description: 'Asked about fluid mechanics', icon: '🌊', category: 'physics', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'fluids' } },
  { id: 'solid-state-physicist', title: 'Solid State Physicist', description: 'Asked about solid state physics', icon: '💎', category: 'physics', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'solid-state' } },
  { id: 'plasma-physicist', title: 'Plasma Physicist', description: 'Asked about plasma physics', icon: '⚡', category: 'physics', unlocked: false, bonusCredits: 7, rarity: 'epic', requirements: { type: 'special', special: 'plasma' } },
  { id: 'astrophysicist', title: 'Astrophysicist', description: 'Asked about space physics', icon: '🚀', category: 'physics', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'astrophysics' } },
  { id: 'physics-master', title: 'Physics Master', description: 'Master of all physics', icon: '🏆', category: 'physics', unlocked: false, bonusCredits: 20, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'physics' } },

  // Astronomy Achievements (15)
  { id: 'star-gazer', title: 'Star Gazer', description: 'Asked your first astronomy question', icon: '⭐', category: 'astronomy', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 1, category: 'astronomy' } },
  { id: 'planet-hunter', title: 'Planet Hunter', description: 'Asked 5 astronomy questions', icon: '🪐', category: 'astronomy', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'astronomy' } },
  { id: 'galaxy-explorer', title: 'Galaxy Explorer', description: 'Asked 10 astronomy questions', icon: '🌌', category: 'astronomy', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 10, category: 'astronomy' } },
  { id: 'cosmic-detective', title: 'Cosmic Detective', description: 'Asked 15 astronomy questions', icon: '🔭', category: 'astronomy', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'questions_in_category', count: 15, category: 'astronomy' } },
  { id: 'space-wizard', title: 'Space Wizard', description: 'Asked 25 astronomy questions', icon: '🧙‍♂️', category: 'astronomy', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'questions_in_category', count: 25, category: 'astronomy' } },
  { id: 'cosmic-master', title: 'Cosmic Master', description: 'Asked 50 astronomy questions', icon: '🌟', category: 'astronomy', unlocked: false, bonusCredits: 15, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 50, category: 'astronomy' } },
  { id: 'solar-system-expert', title: 'Solar System Expert', description: 'Asked about our solar system', icon: '☀️', category: 'astronomy', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'solar-system' } },
  { id: 'stellar-astronomer', title: 'Stellar Astronomer', description: 'Asked about stars', icon: '⭐', category: 'astronomy', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'stars' } },
  { id: 'black-hole-researcher', title: 'Black Hole Researcher', description: 'Asked about black holes', icon: '🕳️', category: 'astronomy', unlocked: false, bonusCredits: 6, rarity: 'epic', requirements: { type: 'special', special: 'black-holes' } },
  { id: 'nebula-observer', title: 'Nebula Observer', description: 'Asked about nebulae', icon: '🌫️', category: 'astronomy', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'nebula' } },
  { id: 'comet-tracker', title: 'Comet Tracker', description: 'Asked about comets and asteroids', icon: '☄️', category: 'astronomy', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'comets' } },
  { id: 'exoplanet-hunter', title: 'Exoplanet Hunter', description: 'Asked about planets outside our solar system', icon: '🌍', category: 'astronomy', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'exoplanets' } },
  { id: 'cosmologist', title: 'Cosmologist', description: 'Asked about the universe', icon: '🌌', category: 'astronomy', unlocked: false, bonusCredits: 8, rarity: 'epic', requirements: { type: 'special', special: 'cosmology' } },
  { id: 'radio-astronomer', title: 'Radio Astronomer', description: 'Asked about radio astronomy', icon: '📡', category: 'astronomy', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'radio-astronomy' } },
  { id: 'universe-master', title: 'Universe Master', description: 'Master of all astronomy', icon: '🚀', category: 'astronomy', unlocked: false, bonusCredits: 20, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 100, category: 'astronomy' } },

  // Earth Science Achievements (10)
  { id: 'earth-curious', title: 'Earth Curious', description: 'Asked your first earth science question', icon: '🌍', category: 'earth-science', unlocked: false, bonusCredits: 1, rarity: 'common', requirements: { type: 'questions_in_category', count: 1, category: 'earth-science' } },
  { id: 'rock-hound', title: 'Rock Hound', description: 'Asked 5 earth science questions', icon: '⛰️', category: 'earth-science', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'questions_in_category', count: 5, category: 'earth-science' } },
  { id: 'geologist', title: 'Geologist', description: 'Asked 10 earth science questions', icon: '🪨', category: 'earth-science', unlocked: false, bonusCredits: 3, rarity: 'rare', requirements: { type: 'questions_in_category', count: 10, category: 'earth-science' } },
  { id: 'climate-researcher', title: 'Climate Researcher', description: 'Asked about climate and weather', icon: '🌦️', category: 'earth-science', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'climate' } },
  { id: 'oceanographer', title: 'Oceanographer', description: 'Asked about oceans', icon: '🌊', category: 'earth-science', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'oceans' } },
  { id: 'seismologist', title: 'Seismologist', description: 'Asked about earthquakes', icon: '🏔️', category: 'earth-science', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'earthquakes' } },
  { id: 'volcanologist', title: 'Volcanologist', description: 'Asked about volcanoes', icon: '🌋', category: 'earth-science', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'special', special: 'volcanoes' } },
  { id: 'meteorologist', title: 'Meteorologist', description: 'Asked about weather patterns', icon: '⛈️', category: 'earth-science', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'weather' } },
  { id: 'mineralogist', title: 'Mineralogist', description: 'Asked about minerals and crystals', icon: '💎', category: 'earth-science', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'minerals' } },
  { id: 'earth-master', title: 'Earth Master', description: 'Master of earth sciences', icon: '🌍', category: 'earth-science', unlocked: false, bonusCredits: 15, rarity: 'legendary', requirements: { type: 'questions_in_category', count: 50, category: 'earth-science' } },

  // Milestone Achievements (10)
  { id: 'first-question', title: 'Curious Mind', description: 'Asked your first science question', icon: '🤔', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'total_questions', count: 1 } },
  { id: 'five-questions', title: 'Science Enthusiast', description: 'Asked 5 science questions', icon: '🔬', category: 'milestones', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'total_questions', count: 5 } },
  { id: 'ten-questions', title: 'Knowledge Seeker', description: 'Asked 10 science questions', icon: '📚', category: 'milestones', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'total_questions', count: 10 } },
  { id: 'twenty-five-questions', title: 'Science Explorer', description: 'Asked 25 science questions', icon: '🧭', category: 'milestones', unlocked: false, bonusCredits: 8, rarity: 'rare', requirements: { type: 'total_questions', count: 25 } },
  { id: 'fifty-questions', title: 'Discovery Expert', description: 'Asked 50 science questions', icon: '🏆', category: 'milestones', unlocked: false, bonusCredits: 15, rarity: 'epic', requirements: { type: 'total_questions', count: 50 } },
  { id: 'hundred-questions', title: 'Science Master', description: 'Asked 100 science questions', icon: '👨‍🔬', category: 'milestones', unlocked: false, bonusCredits: 25, rarity: 'epic', requirements: { type: 'total_questions', count: 100 } },
  { id: 'first-photo', title: 'Visual Explorer', description: 'Uploaded your first photo', icon: '📸', category: 'milestones', unlocked: false, bonusCredits: 2, rarity: 'common', requirements: { type: 'photos_uploaded', count: 1 } },
  { id: 'photo-expert', title: 'Photo Scientist', description: 'Uploaded 10 photos for analysis', icon: '📷', category: 'milestones', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'photos_uploaded', count: 10 } },
  { id: 'daily-streak', title: 'Daily Discoverer', description: 'Used ScienceLens for 3 days in a row', icon: '🔥', category: 'milestones', unlocked: false, bonusCredits: 5, rarity: 'rare', requirements: { type: 'streak_days', count: 3 } },
  { id: 'legendary-scientist', title: 'Legendary Scientist', description: 'Asked 500 science questions', icon: '🌟', category: 'milestones', unlocked: false, bonusCredits: 50, rarity: 'legendary', requirements: { type: 'total_questions', count: 500 } },

  // Special Achievements (5)
  { id: 'night-owl', title: 'Night Owl', description: 'Asked a question after midnight', icon: '🦉', category: 'special', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'night-question' } },
  { id: 'early-bird', title: 'Early Bird', description: 'Asked a question before 6 AM', icon: '🐦', category: 'special', unlocked: false, bonusCredits: 3, rarity: 'common', requirements: { type: 'special', special: 'early-question' } },
  { id: 'weekend-warrior', title: 'Weekend Warrior', description: 'Asked questions on both Saturday and Sunday', icon: '⚔️', category: 'special', unlocked: false, bonusCredits: 4, rarity: 'rare', requirements: { type: 'special', special: 'weekend-questions' } },
  { id: 'polymath', title: 'Polymath', description: 'Asked questions in at least 5 different categories', icon: '🎓', category: 'special', unlocked: false, bonusCredits: 10, rarity: 'epic', requirements: { type: 'special', special: 'multi-category' } },
  { id: 'renaissance-scientist', title: 'Renaissance Scientist', description: 'Asked questions in every category', icon: '👑', category: 'special', unlocked: false, bonusCredits: 20, rarity: 'legendary', requirements: { type: 'special', special: 'all-categories' } }
];