export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: number;
  category?: string; // Science category for achievement tracking
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
  category?: string; // Primary science category
}

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

export interface UserProfile {
  questionsAsked: number;
  photosUploaded: number;
  achievements: Achievement[];
  favoriteTopics: string[];
  discoveryStreak: number;
}