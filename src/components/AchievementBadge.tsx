import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
  onCelebrate?: () => void;
}

export function AchievementBadge({ achievement, onCelebrate }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer"
      onClick={onCelebrate}
    >
      <Card className={`p-4 transition-all duration-300 ${
        achievement.unlocked 
          ? 'bg-gradient-science shadow-glow border-primary/50' 
          : 'bg-muted/50 opacity-60'
      }`}>
        <div className="text-center space-y-2">
          <div className="text-2xl">{achievement.icon}</div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">{achievement.title}</h4>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
          </div>
          {achievement.unlocked && (
            <Badge variant="secondary" className="text-xs">
              Unlocked!
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
}