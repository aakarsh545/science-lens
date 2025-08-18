export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface UserProfile {
  questionsAsked: number;
  photosUploaded: number;
  achievements: Achievement[];
  favoriteTopics: string[];
  discoveryStreak: number;
}