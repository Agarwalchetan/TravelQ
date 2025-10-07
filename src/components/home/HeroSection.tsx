import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Users, Star, Play, Pause, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const travelReels = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    video: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    duration: '7 days',
    budget: '$1,200',
    highlights: ['Temples', 'Beaches', 'Culture']
  },
  {
    id: 2,
    destination: 'Tokyo, Japan',
    video: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg',
    duration: '10 days',
    budget: '$2,500',
    highlights: ['Tech', 'Food', 'Tradition']
  },
  {
    id: 3,
    destination: 'Santorini, Greece',
    video: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    duration: '5 days',
    budget: '$1,800',
    highlights: ['Sunsets', 'Wine', 'Romance']
  }
];

const stats = [
  { label: 'Active Travelers', value: 100000, icon: Users, suffix: '+' },
  { label: 'Destinations', value: 195, icon: Globe, suffix: '+' },
  { label: 'Trip Reviews', value: 50000, icon: Star, suffix: '+' },
];

const formatter = (value: number) => {
  if (value >= 1000) {
    return `${Math.floor(value / 1000)}k`;
  }
  return value.toString();
};

export const HeroSection: React.FC = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentReel((prev) => (prev + 1) % travelReels.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // In a real app, this would trigger AI planning
      console.log('AI Planning for:', chatMessage);
      setChatMessage('');
      setShowAIChat(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Container maxWidth="full" className="relative py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="mx-auto max-w-2xl lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-6"
              >
                <Sparkles className="h-6 w-6 text-white" />
                <span className="text-white/90 font-medium">AI-Powered Travel Planning</span>
              </motion.div>

              <motion.h1 
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your Next Adventure{' '}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Awaits
                  </span>
                  <motion.div
                    className="absolute -inset-2 rounded-lg bg-white/10 backdrop-blur-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-lg leading-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover breathtaking destinations, plan with AI assistance, and create memories 
                that last a lifetime. Join millions of travelers exploring the world.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Plan Your Next Adventure
                  </Button>
                </Link>
                
                <button
                  onClick={() => setShowAIChat(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5" />
                  Ask AI Planner
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <motion.div 
                        className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm p-3 mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <p className="text-2xl font-bold text-white">
                        <AnimatedCounter
                          from={0}
                          to={stat.value}
                          formatter={(value) => `${formatter(value)}${stat.suffix}`}
                        />
                      </p>
                      <p className="text-sm text-white/80">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Content - Travel Reels */}
            <motion.div 
              className="relative mx-auto w-full max-w-sm lg:max-w-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Reel Display */}
                <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-white shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReel}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={travelReels[currentReel].video}
                        alt={travelReels[currentReel].destination}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Reel Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.h3 
                          className="text-xl font-bold mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {travelReels[currentReel].destination}
                        </motion.h3>
                        
                        <motion.div 
                          className="flex items-center gap-4 mb-3"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                            {travelReels[currentReel].duration}
                          </span>
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                            {travelReels[currentReel].budget}
                          </span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {travelReels[currentReel].highlights.map((highlight, idx) => (
                            <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              {highlight}
                            </span>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                </div>

                {/* Reel Navigation Dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {travelReels.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReel(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentReel
                          ? 'bg-white w-6'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating Action Cards */}
                <motion.div 
                  className="absolute -left-8 top-1/4 w-32 rounded-xl bg-white/90 backdrop-blur-sm p-3 shadow-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs font-medium text-gray-800">195+ Countries</p>
                    <p className="text-xs text-gray-600">Explore</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute -right-8 bottom-1/4 w-32 rounded-xl bg-white/90 backdrop-blur-sm p-3 shadow-lg"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="h-4 w-4 text-secondary" />
                    </div>
                    <p className="text-xs font-medium text-gray-800">4.9★ Rating</p>
                    <p className="text-xs text-gray-600">Trusted</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* AI Chat Popup */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAIChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">AI Travel Planner</h3>
                  <p className="text-sm text-gray-600">Powered by GPT-4o</p>
                </div>
              </div>
              
              <form onSubmit={handleAISubmit}>
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Tell me where you want to go... (e.g., 'I want a 7-day romantic trip to Europe under $3000')"
                  className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <div className="flex gap-3 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAIChat(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                    disabled={!chatMessage.trim()}
                  >
                    Plan My Trip
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};