import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Achievement } from '@/types';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 right-4 z-50"
        >
          <Card className="p-4 bg-gradient-science text-white shadow-glow max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-white/20 rounded-full">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-sm">Achievement Unlocked!</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{achievement.icon}</span>
                  <span className="font-medium">{achievement.title}</span>
                </div>
                <p className="text-xs opacity-90">{achievement.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}