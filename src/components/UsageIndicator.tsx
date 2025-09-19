import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Crown, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UsageIndicatorProps {
  requestsToday: number;
  maxRequests: number;
  tier: 'free' | 'plus' | 'pro';
  onUpgrade: () => void;
}

export const UsageIndicator: React.FC<UsageIndicatorProps> = ({
  requestsToday,
  maxRequests,
  tier,
  onUpgrade,
}) => {
  const percentage = Math.min((requestsToday / maxRequests) * 100, 100);
  const isUnlimited = maxRequests >= 999999;
  const isNearLimit = percentage >= 80;
  const isAtLimit = requestsToday >= maxRequests;

  const getTierConfig = () => {
    switch (tier) {
      case 'free':
        return {
          icon: <Sparkles className="h-4 w-4" />,
          name: 'Free',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
      case 'plus':
        return {
          icon: <Zap className="h-4 w-4" />,
          name: 'Plus',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
        };
      case 'pro':
        return {
          icon: <Crown className="h-4 w-4" />,
          name: 'Pro',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
        };
    }
  };

  const config = getTierConfig();

  if (isUnlimited) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2"
      >
        <Badge variant="secondary" className={`${config.bgColor} ${config.color} border-0`}>
          <span className="mr-1">{config.icon}</span>
          {config.name}
        </Badge>
        <span className="text-sm text-muted-foreground">Unlimited questions</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className={`${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-orange-200 bg-orange-50' : ''}`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={`${config.bgColor} ${config.color} border-0`}>
                  <span className="mr-1">{config.icon}</span>
                  {config.name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {requestsToday} / {maxRequests} questions today
                </span>
              </div>
              
              {tier === 'free' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onUpgrade}
                  className="text-xs"
                >
                  Upgrade
                </Button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress 
                value={percentage} 
                className={`h-2 ${
                  isAtLimit ? '[&>div]:bg-red-500' : 
                  isNearLimit ? '[&>div]:bg-orange-500' : 
                  '[&>div]:bg-green-500'
                }`}
              />
              
              {/* Status Message */}
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${
                  isAtLimit ? 'text-red-600' : 
                  isNearLimit ? 'text-orange-600' : 
                  'text-green-600'
                }`}>
                  {isAtLimit ? (
                    '🚫 Daily limit reached'
                  ) : isNearLimit ? (
                    '⚠️ Approaching limit'
                  ) : (
                    '✅ Plenty of questions left'
                  )}
                </span>
                
                <span className="text-muted-foreground">
                  {maxRequests - requestsToday} remaining
                </span>
              </div>
            </div>

            {/* Upgrade Prompt */}
            {isAtLimit && tier === 'free' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
              >
                <div className="text-sm">
                  <p className="font-medium text-gray-800 mb-1">
                    🚀 Want to keep exploring?
                  </p>
                  <p className="text-gray-600 text-xs mb-2">
                    Upgrade to Plus for unlimited questions and enhanced features!
                  </p>
                  <Button 
                    size="sm" 
                    onClick={onUpgrade}
                    className="bg-gradient-science hover:shadow-glow text-xs"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};