import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import ScienceUniverse from '@/components/ScienceUniverse';

const Pricing: React.FC = () => {
  const { tier, createCheckout, openCustomerPortal, loading } = useSubscription();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with science exploration',
      icon: <Sparkles className="h-6 w-6" />,
      features: [
        '5 questions per day',
        'Basic science explanations',
        'Standard response time',
        'Mobile responsive',
        'Basic achievements',
      ],
      limitations: [
        'Limited daily questions',
        'Shorter answer lengths',
        'No chat history',
        'No PDF export',
      ],
      cta: tier === 'free' ? 'Current Plan' : 'Downgrade',
      disabled: tier === 'free',
    },
    {
      id: 'plus',
      name: 'Science Lens Plus',
      price: '$9.99',
      period: 'per month',
      description: 'Unlimited learning with enhanced features',
      icon: <Zap className="h-6 w-6" />,
      priceId: 'price_1S91k2PaNATHSu6a5C1LtA1T',
      popular: true,
      features: [
        'Unlimited questions',
        'Detailed explanations',
        'Enhanced animations',
        'Priority support',
        'Advanced achievements',
        'Mobile optimized',
      ],
      cta: tier === 'plus' ? 'Current Plan' : 'Upgrade to Plus',
      disabled: tier === 'plus',
    },
    {
      id: 'pro',
      name: 'Science Lens Pro',
      price: '$19.99',
      period: 'per month',
      description: 'Everything you need for serious science exploration',
      icon: <Crown className="h-6 w-6" />,
      priceId: 'price_1S91nlPaNATHSu6aTyhGfZaM',
      features: [
        'Everything in Plus',
        'PDF export of answers',
        'Persistent chat history',
        'Voice mode (AI reads answers)',
        'Difficulty adjustment',
        'Share capabilities',
        'Priority support',
        'Exclusive achievements',
      ],
      cta: tier === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      disabled: tier === 'pro',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <ScienceUniverse />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-science bg-clip-text text-transparent mb-4">
            Choose Your Science Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the mysteries of science with our flexible pricing plans designed for every level of curiosity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <Card className={`h-full relative overflow-hidden ${
                plan.popular 
                  ? 'border-primary/50 shadow-glow bg-gradient-to-b from-primary/5 to-background' 
                  : 'border-border hover:border-primary/30'
              } transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-science text-white text-center py-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={plan.popular ? 'pt-12' : 'pt-6'}>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.popular ? 'bg-primary/20' : 'bg-muted/50'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                  <CardDescription className="text-center">{plan.description}</CardDescription>
                  
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations && (
                    <div className="space-y-2 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground font-medium">Limitations:</p>
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="h-1 w-1 bg-muted-foreground rounded-full flex-shrink-0 ml-1.5" />
                          <span className="text-xs text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-science hover:shadow-glow' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.disabled || loading}
                    onClick={() => {
                      if (plan.priceId) {
                        createCheckout(plan.priceId);
                      } else if (tier !== 'free') {
                        openCustomerPortal();
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {tier !== 'free' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="ghost" onClick={openCustomerPortal}>
              Manage Subscription
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade, downgrade, or cancel your subscription at any time through your account settings.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens to my data if I downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your achievements and profile data are always preserved. Chat history and premium features will be limited based on your new plan.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;