import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Play, Pause, Volume2, VolumeX, Heart, Users, Globe, Award, TrendingUp, Sparkles, MapPin, Calendar, Star, ArrowRight, Coffee, Camera, Code, Palette, Compass, Zap, Target, Eye, Lightbulb } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

// Enhanced team data with more details
const teamMembers = [
  {
    id: '1',
    name: 'Chetan Agarwal',
    role: 'Founder & Product Designer',
    image: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: 'https://www.linkedin.com/',
    funFact: 'Backpacked across 8 Indian states in college',
    expertise: 'Product Strategy',
    joinedYear: '2024',
    favoriteDestination: 'Ladakh',
    quote: 'Travel is the best teacher'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'AI Engineer',
    image: 'https://images.pexels.com/photos/4350099/pexels-photo-4350099.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: 'https://www.linkedin.com/',
    funFact: 'Built her first chatbot at age 16',
    expertise: 'Machine Learning',
    joinedYear: '2024',
    favoriteDestination: 'Kerala',
    quote: 'AI should make travel planning magical'
  },
  {
    id: '3',
    name: 'Arjun Mehta',
    role: 'Head of Content',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: 'https://www.linkedin.com/',
    funFact: 'Visited 25+ countries as a travel blogger',
    expertise: 'Content Strategy',
    joinedYear: '2024',
    favoriteDestination: 'Rajasthan',
    quote: 'Every destination has a story'
  },
  {
    id: '4',
    name: 'Sneha Patel',
    role: 'UX Director',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: 'https://www.linkedin.com/',
    funFact: 'Designed apps used by 1M+ travelers',
    expertise: 'User Experience',
    joinedYear: '2024',
    favoriteDestination: 'Goa',
    quote: 'Design should feel like magic'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'Travel Partnerships',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: 'https://www.linkedin.com/',
    funFact: 'Negotiated partnerships with 500+ hotels',
    expertise: 'Business Development',
    joinedYear: '2024',
    favoriteDestination: 'Himachal',
    quote: 'Great partnerships create great experiences'
  },
  {
    id: '6',
    name: 'Maya Reddy',
    role: 'Chief Marketing Officer',
    image: 'https://images.pexels.com/photos/4220563/pexels-photo-4220563.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: 'https://www.linkedin.com/',
    funFact: 'Grew a travel Instagram to 100K followers',
    expertise: 'Digital Marketing',
    joinedYear: '2024',
    favoriteDestination: 'Andaman',
    quote: 'Stories connect hearts across miles'
  }
];

// Enhanced timeline with more details
const milestones = [
  {
    year: 'March 2024',
    title: 'The Beginning',
    description: 'Concept born on a train ride from Jaipur to Delhi when Chetan struggled to plan a group trip with friends scattered across different cities.',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: 'Just an idea and a notebook'
  },
  {
    year: 'July 2024',
    title: 'MVP Launched',
    description: 'First version launched at HackwithMAIT. Won "Best Travel Innovation" award and gained our first 100 users overnight.',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: '100 early adopters'
  },
  {
    year: 'September 2024',
    title: 'First 1,000 Itineraries',
    description: 'Reached our first major milestone with 1,000 trip plans created. Users were loving the collaborative features.',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: '1,000 trips planned'
  },
  {
    year: 'January 2025',
    title: 'AI Planner Launched',
    description: 'Introduced WanderAI - our intelligent trip planning assistant powered by advanced machine learning.',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: '50,000+ AI-generated plans'
  },
  {
    year: 'Coming Soon',
    title: 'Global Expansion',
    description: 'Wanderlust App v2.0 with international destinations, real-time collaboration, and AR travel guides.',
    image: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: '100,000+ travelers expected'
  }
];

// Mission, Vision, Values with enhanced content
const coreValues = [
  {
    id: 'mission',
    title: 'Mission',
    subtitle: 'Why We Exist',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500',
    content: 'To simplify travel planning and make group journeys easier, more meaningful, and accessible to everyone.',
    details: 'We believe travel should bring people together, not stress them out with complex planning.',
    stats: '50,000+ trips planned together'
  },
  {
    id: 'vision',
    title: 'Vision',
    subtitle: 'Where We\'re Going',
    icon: Eye,
    gradient: 'from-purple-500 to-pink-500',
    content: 'To become the world\'s most trusted social travel platform that turns travel dreams into reality.',
    details: 'Imagine a world where planning your next adventure is as exciting as the journey itself.',
    stats: 'Expanding to 50+ countries'
  },
  {
    id: 'values',
    title: 'Values',
    subtitle: 'How We Work',
    icon: Heart,
    gradient: 'from-emerald-500 to-green-500',
    content: 'Community-first, transparency, personalization, accessibility, and adventure in everything we do.',
    details: 'Our values guide every decision, from product features to how we treat our community.',
    stats: '4.9★ community rating'
  }
];

// Why Wanderlust differentiators
const differentiators = [
  {
    id: 'ai',
    title: 'AI-Powered Planner',
    subtitle: 'Smart, not just digital',
    description: 'Get intelligent, real-time trip suggestions that learn from millions of traveler preferences.',
    icon: Sparkles,
    color: 'from-blue-400 to-purple-500',
    customerVoice: 'Helped me plan my first solo trip — Ananya, 22'
  },
  {
    id: 'collaboration',
    title: 'Group Collaboration',
    subtitle: 'Plan together, travel together',
    description: 'Real-time planning with your tribe. Vote, discuss, and decide together seamlessly.',
    icon: Users,
    color: 'from-green-400 to-emerald-500',
    customerVoice: 'Made planning with 8 friends actually fun — Rohit, 25'
  },
  {
    id: 'local',
    title: 'Local Secrets, Not Tourist Spots',
    subtitle: 'Authentic experiences',
    description: 'Real user itineraries with hidden gems and authentic local experiences.',
    icon: MapPin,
    color: 'from-orange-400 to-red-500',
    customerVoice: 'Found places I never would have discovered — Priya, 28'
  },
  {
    id: 'community',
    title: 'Built Around Community',
    subtitle: 'Wanderers help wanderers',
    description: 'A supportive community where experienced travelers help newcomers explore confidently.',
    icon: Heart,
    color: 'from-pink-400 to-purple-500',
    customerVoice: 'Like having travel buddies everywhere — Karan, 24'
  }
];

const AboutPage: React.FC = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [currentDifferentiator, setCurrentDifferentiator] = useState(0);

  useEffect(() => {
    document.title = 'About Us - Who We Are & Why We Wander | Wanderlust';
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wanderlust",
      "description": "AI-powered travel planning platform that makes group travel planning simple and collaborative",
      "url": "https://wanderlust.com/about",
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "Chetan Agarwal"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDifferentiator((prev) => (prev + 1) % differentiators.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background dark:bg-dark-background">
      {/* Cinematic Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Travel journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 dark:from-black/60 dark:via-black/40 dark:to-black/80" />
        </div>

        {/* Video Controls */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/20"
          >
            {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/20"
          >
            {isVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Hero Content */}
        <Container maxWidth="full" className="relative h-full flex items-center justify-center z-10">
          <div className="text-center max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Compass className="h-8 w-8 text-white animate-pulse" />
                <span className="text-white/90 font-medium text-lg">Who We Are & Why We Wander</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                We Plan to{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 dark:from-yellow-200 dark:to-orange-300 bg-clip-text text-transparent">
                  Inspire
                </span>{' '}
                Your Next Journey
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto drop-shadow-md leading-relaxed">
                Not just a travel app. A movement that turns dreams into journeys, 
                built by travelers, for travelers — with AI, community, and emotion at its heart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-white hover:bg-white/30 dark:hover:bg-white/20"
                  rightIcon={<Users className="h-5 w-5" />}
                >
                  Meet the Team
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 dark:border-white/20 text-white hover:bg-white/10 dark:hover:bg-white/5"
                  rightIcon={<Heart className="h-5 w-5" />}
                >
                  Read Our Story
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 dark:border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 dark:bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Mission, Vision, Values - Emotional Storytelling */}
      <section className="py-16 bg-gradient-to-br from-surface/50 to-background dark:from-dark-surface/30 dark:to-dark-background">
        <Container maxWidth="full">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
              Every great journey begins with a purpose. Here's ours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <Card className="h-full p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border/50 dark:border-dark-border/50">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                        {value.title}
                      </h3>
                      <p className="text-primary dark:text-dark-primary font-medium text-sm">
                        {value.subtitle}
                      </p>
                    </div>
                    <p className="text-text-primary dark:text-dark-text-primary text-lg mb-4 leading-relaxed">
                      {value.content}
                    </p>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                      {value.details}
                    </p>
                    <div className="bg-gradient-to-r from-surface to-background dark:from-dark-surface/50 dark:to-dark-background/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">
                        {value.stats}
                      </div>
                      <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        and counting...
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Wanderlust - Differentiator Carousel */}
      <section className="py-16 bg-white dark:bg-dark-surface">
        <Container maxWidth="full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-4">
              Why Wanderlust?
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              What makes us different in the world of travel planning
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Carousel Content */}
              <div className="order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDifferentiator}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {(() => {
                      const diff = differentiators[currentDifferentiator];
                      const Icon = diff.icon;
                      return (
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-r ${diff.color} rounded-2xl flex items-center justify-center`}>
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                                {diff.title}
                              </h3>
                              <p className="text-primary dark:text-dark-primary font-medium">
                                {diff.subtitle}
                              </p>
                            </div>
                          </div>
                          <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                            {diff.description}
                          </p>
                          <div className="bg-gradient-to-r from-surface/50 to-background/50 dark:from-dark-surface/30 dark:to-dark-background/30 rounded-xl p-4 border-l-4 border-primary dark:border-dark-primary">
                            <p className="text-text-primary dark:text-dark-text-primary italic">
                              "{diff.customerVoice}"
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex gap-3 mt-8">
                  {differentiators.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDifferentiator(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentDifferentiator
                          ? 'bg-primary dark:bg-dark-primary w-8'
                          : 'bg-border dark:bg-dark-border hover:bg-primary/50 dark:hover:bg-dark-primary/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Visual Element */}
              <div className="order-1 lg:order-2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/10 dark:to-dark-accent/10 rounded-3xl p-8 border border-border/50 dark:border-dark-border/50">
                    <div className="grid grid-cols-2 gap-6">
                      {differentiators.map((diff, index) => {
                        const Icon = diff.icon;
                        return (
                          <motion.div
                            key={diff.id}
                            className={`p-6 rounded-2xl transition-all ${
                              index === currentDifferentiator
                                ? 'bg-white dark:bg-dark-surface shadow-lg scale-105'
                                : 'bg-surface/50 dark:bg-dark-surface/30'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className={`w-12 h-12 bg-gradient-to-r ${diff.color} rounded-xl flex items-center justify-center mb-4`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary text-sm mb-1">
                              {diff.title}
                            </h4>
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                              {diff.subtitle}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Team Showcase */}
      <section className="py-16 bg-gradient-to-br from-background via-surface to-background dark:from-dark-background via-dark-surface to-dark-background">
        <Container maxWidth="full">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-4">
              The People Behind Wanderlust
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
              We're a diverse group of travelers, technologists, and dreamers committed to 
              changing the way people experience the world.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm mb-2">"{member.quote}"</p>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin className="h-3 w-3" />
                          <span>Loves: {member.favoriteDestination}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
                            {member.name}
                          </h3>
                          <p className="text-primary dark:text-dark-primary font-medium mb-2">
                            {member.role}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                            <Calendar className="h-3 w-3" />
                            <span>Joined {member.joinedYear}</span>
                          </div>
                        </div>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center text-primary dark:text-dark-primary hover:bg-primary/20 dark:hover:bg-dark-primary/20 transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="bg-surface dark:bg-dark-surface/50 rounded-lg p-3">
                          <div className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">Fun Fact</div>
                          <p className="text-sm text-text-primary dark:text-dark-text-primary">
                            {member.funFact}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {member.expertise}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-text-secondary dark:text-dark-text-secondary">
                            <Coffee className="h-3 w-3" />
                            <span>Coffee enthusiast</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-16 bg-white dark:bg-dark-surface">
        <Container maxWidth="full">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-4">
              Our Journey So Far
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              From a simple idea to a thriving community of travelers
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary dark:from-dark-primary dark:to-dark-accent"></div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent border-4 border-background dark:border-dark-background shadow-lg z-10"></div>

                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent text-white border-0">
                            {milestone.year}
                          </Badge>
                          <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            {milestone.stats}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                          {milestone.description}
                        </p>
                      </Card>
                    </div>

                    {/* Image */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Behind the Scenes / Founder's Story */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-dark-primary/5 dark:to-dark-accent/5">
        <Container maxWidth="full">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-4">
                The Story Behind Wanderlust
              </h2>
              <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
                Raw, emotional storytelling of why Wanderlust exists
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Founder's journey"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary dark:text-dark-text-primary">Chetan's Story</h3>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Founder & CEO</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    <p>
                      "It was 2 AM on a train from Jaipur to Delhi. My college friends and I had been trying to plan 
                      a group trip for weeks, but coordinating between 8 people across different cities felt impossible."
                    </p>
                    <p>
                      "Endless WhatsApp groups, shared spreadsheets that no one updated, conflicting preferences, 
                      and budget discussions that went nowhere. I realized we were spending more time planning than 
                      actually traveling."
                    </p>
                    <p className="text-text-primary dark:text-dark-text-primary font-medium">
                      "That's when I knew there had to be a better way. Travel should bring people together, 
                      not stress them out with complex planning."
                    </p>
                    <p>
                      "Wanderlust was born from that frustration, but more importantly, from the belief that 
                      every great journey should start with excitement, not exhaustion."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Where We've Been Map */}
      <section className="py-16 bg-background dark:bg-dark-background">
        <Container maxWidth="full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-4">
              Where We've Been
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Interactive map with pins of places planned by our community
            </p>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-8 border border-border/50 dark:border-dark-border/50">
              <div className="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/10 dark:to-dark-accent/10 rounded-2xl overflow-hidden">
                {/* Simplified India Map */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                >
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(124 58 237 / 0.1)" />
                      <stop offset="50%" stopColor="rgb(147 51 234 / 0.1)" />
                      <stop offset="100%" stopColor="rgb(99 102 241 / 0.1)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20,15 Q25,10 35,12 Q45,8 55,15 Q65,12 70,20 Q75,25 72,35 Q70,45 65,55 Q60,65 55,70 Q50,75 45,78 Q40,80 35,78 Q30,75 25,70 Q20,65 18,55 Q15,45 18,35 Q20,25 20,15 Z"
                    fill="url(#mapGradient)"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary dark:text-dark-primary"
                  />
                </svg>

                {/* Destination Pins */}
                {[
                  { x: 35, y: 70, name: 'Goa', trips: 1240 },
                  { x: 32, y: 25, name: 'Manali', trips: 987 },
                  { x: 28, y: 45, name: 'Udaipur', trips: 756 },
                  { x: 30, y: 30, name: 'Rishikesh', trips: 1456 },
                  { x: 33, y: 75, name: 'Kerala', trips: 892 },
                  { x: 55, y: 65, name: 'Andaman', trips: 543 }
                ].map((pin, index) => (
                  <motion.div
                    key={pin.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg border-2 border-white">
                      <div className="absolute inset-0 rounded-full animate-ping bg-primary/50"></div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="font-medium">{pin.name}</div>
                      <div className="text-white/80">{pin.trips} trips planned</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">50K+</div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Trips Planned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">195+</div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">100K+</div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">4.9★</div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Community Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Join Us / Careers */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent">
        <Container maxWidth="full">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Zap className="h-8 w-8 text-white animate-pulse" />
                <Users className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold mb-6 sm:text-4xl">
                Join Our Team
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                We're always looking for passionate people to join our mission. 
                Check out our open positions and become part of our story.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Code className="h-8 w-8 text-white mb-4 mx-auto" />
                  <h3 className="font-bold mb-2">Engineering</h3>
                  <p className="text-white/80 text-sm">Build the future of travel tech</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Palette className="h-8 w-8 text-white mb-4 mx-auto" />
                  <h3 className="font-bold mb-2">Design</h3>
                  <p className="text-white/80 text-sm">Craft beautiful user experiences</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <TrendingUp className="h-8 w-8 text-white mb-4 mx-auto" />
                  <h3 className="font-bold mb-2">Growth</h3>
                  <p className="text-white/80 text-sm">Help travelers discover us</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 dark:bg-dark-primary dark:text-dark-background dark:hover:bg-dark-primary/90"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  View Open Positions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  rightIcon={<Heart className="h-5 w-5" />}
                >
                  Learn About Our Culture
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;