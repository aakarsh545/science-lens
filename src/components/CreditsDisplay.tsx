import { motion } from 'framer-motion';
import { Coins, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCredits } from '@/hooks/useCredits';

interface CreditsDisplayProps {
  className?: string;
  compact?: boolean;
}

export function CreditsDisplay({ className = '', compact = false }: CreditsDisplayProps) {
  const { credits, hasCredits, getTimeUntilReset, bonusCredits, totalEarned } = useCredits();

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-1 text-sm">
          <Coins className="h-4 w-4 text-primary" />
          <span className={hasCredits ? 'text-foreground' : 'text-destructive'}>
            {credits}
          </span>
        </div>
        {bonusCredits > 0 && (
          <Badge variant="secondary" className="text-xs">
            <Gift className="h-3 w-3 mr-1" />
            {bonusCredits}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Credits</h3>
                <p className="text-sm text-muted-foreground">Daily questions</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${hasCredits ? 'text-foreground' : 'text-destructive'}`}>
                {credits}
              </div>
              <div className="text-xs text-muted-foreground">
                of 5 daily
              </div>
            </div>
          </div>

          {bonusCredits > 0 && (
            <div className="flex items-center justify-between p-2 bg-accent/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Bonus Credits</span>
              </div>
              <Badge variant="secondary">+{bonusCredits}</Badge>
            </div>
          )}

          {!hasCredits && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Out of Credits</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Credits reset in {getTimeUntilReset()}
              </p>
              <p className="text-xs text-muted-foreground">
                💡 Earn bonus credits by unlocking achievements!
              </p>
            </motion.div>
          )}

          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>Total earned: {totalEarned}</span>
            <span>Resets daily at midnight</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}