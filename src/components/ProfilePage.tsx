import { motion } from 'framer-motion';
import { Trophy, Star, Calendar, Award, TrendingUp, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AchievementBadge } from './AchievementBadge';
import { CreditsDisplay } from './CreditsDisplay';
import { useAchievements } from '@/hooks/useAchievements';
import { achievementCategories } from '@/data/achievements';

export function ProfilePage() {
  const { 
    achievements, 
    stats, 
    getUnlockedCount, 
    getTotalBonusCredits,
    getAchievementsByCategory 
  } = useAchievements();

  const achievementsByCategory = getAchievementsByCategory();
  const unlockedCount = getUnlockedCount();
  const totalAchievements = achievements.length;
  const progressPercentage = (unlockedCount / totalAchievements) * 100;

  const rarityStats = achievements.reduce((acc, achievement) => {
    if (achievement.unlocked) {
      acc[achievement.rarity] = (acc[achievement.rarity] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="p-6 bg-gradient-cosmic rounded-full">
            <Trophy className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
          Science Explorer Profile
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Track your learning journey and celebrate your scientific discoveries
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{unlockedCount}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Questions Asked</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-secondary/10 rounded-lg w-fit mx-auto mb-2">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold">{stats.streakDays}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-yellow-500/10 rounded-lg w-fit mx-auto mb-2">
              <Coins className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold">{getTotalBonusCredits()}</div>
            <div className="text-sm text-muted-foreground">Bonus Credits</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Achievement Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{unlockedCount}/{totalAchievements}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {Object.entries(rarityStats).map(([rarity, count]) => (
                  <div key={rarity} className="text-center">
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-xs text-muted-foreground capitalize">{rarity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Category Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievementCategories.map(category => {
                  const categoryAchievements = achievementsByCategory[category.id] || [];
                  const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
                  const totalInCategory = categoryAchievements.length;
                  const percentage = totalInCategory > 0 ? (unlockedInCategory / totalInCategory) * 100 : 0;

                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {unlockedInCategory}/{totalInCategory}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-1" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credits Display */}
        <div className="space-y-6">
          <CreditsDisplay />
          
          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements
                  .filter(a => a.unlocked)
                  .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
                  .slice(0, 5)
                  .map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.unlockedAt ? 
                            new Date(achievement.unlockedAt).toLocaleDateString() : 
                            'Recently unlocked'
                          }
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.rarity}
                      </Badge>
                    </div>
                  ))}
                {achievements.filter(a => a.unlocked).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Start asking questions to unlock achievements!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>All Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
              <TabsTrigger value="biology">Biology</TabsTrigger>
              <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
              <TabsTrigger value="physics">Physics</TabsTrigger>
              <TabsTrigger value="astronomy">Astronomy</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {achievements.map(achievement => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unlocked" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {achievements
                  .filter(a => a.unlocked)
                  .map(achievement => (
                    <AchievementBadge key={achievement.id} achievement={achievement} />
                  ))}
              </div>
            </TabsContent>

            {achievementCategories.slice(0, 4).map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {(achievementsByCategory[category.id] || []).map(achievement => (
                    <AchievementBadge key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}