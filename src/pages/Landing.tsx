import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Camera, MessageCircle, Sparkles, Upload, Microscope, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-accent" />,
      title: "AI-Powered Science Assistant",
      description: "Upload photos or describe objects to get instant, accurate scientific explanations tailored to your curiosity level."
    },
    {
      icon: <Camera className="w-8 h-8 text-accent" />,
      title: "Visual Discovery Engine",
      description: "Capture the world around you and uncover the fascinating science behind everyday objects and phenomena."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: "Interactive Learning Coach",
      description: "Guided questions that help you explore deeper scientific concepts and build understanding step by step."
    },
    {
      icon: <Microscope className="w-8 h-8 text-accent" />,
      title: "Detailed Scientific Analysis",
      description: "Get comprehensive explanations covering physics, chemistry, biology, and more with visual aids and examples."
    },
    {
      icon: <Upload className="w-8 h-8 text-accent" />,
      title: "Discovery History",
      description: "Keep track of your scientific journey with saved explanations, photos, and insights you can revisit anytime."
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Wonder-Driven Learning",
      description: "Transform everyday curiosity into deep scientific understanding with personalized, engaging explanations."
    }
  ];

  const steps = [
    {
      number: "1",
      icon: <Upload className="w-6 h-6" />,
      title: "Upload or Describe",
      description: "Take a photo or tell us about something you're curious about."
    },
    {
      number: "2", 
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Let AI Explore with You",
      description: "Our science assistant analyzes and asks thoughtful questions to understand your curiosity."
    },
    {
      number: "3",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Discover & Learn",
      description: "Receive detailed scientific explanations and explore deeper concepts at your own pace."
    }
  ];

  const testimonials = [
    {
      quote: "Science Lens helped me understand the physics behind my morning coffee brewing. The explanations are clear and make complex concepts accessible.",
      author: "Emma K.",
      role: "Curious Student"
    },
    {
      quote: "As a parent, I love how this app turns my kids' endless 'why' questions into amazing learning opportunities. The visual explanations are perfect.",
      author: "Michael R.", 
      role: "Parent & Educator"
    },
    {
      quote: "The AI assistant makes science feel approachable and exciting. I've learned more about the world around me in weeks than I did in years.",
      author: "Sofia L.",
      role: "Lifelong Learner"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium mb-6">
            <Microscope className="w-4 h-4" />
            Your AI-powered science companion
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent leading-tight">
            Explore with
            <br />
            <span className="text-accent">Wonder</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Turn your curiosity into scientific understanding with our AI-powered
            assistant. Upload photos, ask questions, and discover the fascinating
            science behind everything around you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="science"
              onClick={() => navigate('/explore')}
              className="group"
            >
              Start Exploring with Wonder
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="text-accent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, step-by-step process designed to turn your curiosity into
            scientific discovery and understanding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Smart Tools for <span className="text-accent">Scientific Discovery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our thoughtfully designed features help you navigate the exciting journey of
            scientific exploration, making complex concepts accessible and engaging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-science transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Stories of <span className="text-accent">Scientific Wonder</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real people sharing how Science Lens helped them discover the amazing
            science hidden in everyday life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-accent">Scientific Journey</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of curious minds exploring the science behind everyday wonders.
          </p>
          <Button 
            size="lg" 
            variant="science"
            onClick={() => navigate('/explore')}
            className="group"
          >
            Begin Exploring Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;