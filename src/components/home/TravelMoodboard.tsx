import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Mountain, Building, Compass, Heart, Sun, Moon, Coffee, Zap } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const moodCategories = [
  {
    id: 'beach',
    title: 'Waves & Chill',
    subtitle: 'Beach Vibes',
    icon: Waves,
    gradient: 'from-cyan-400 to-blue-500',
    darkGradient: 'from-cyan-300 to-blue-400',
    bgImage: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=600',
    destinations: ['Goa', 'Andaman', 'Kerala Backwaters'],
    avgBudget: '₹15,000',
    duration: '4-7 days',
    vibe: 'Relaxed & Refreshing'
  },
  {
    id: 'mountains',
    title: 'Escape to Altitude',
    subtitle: 'Hills & Treks',
    icon: Mountain,
    gradient: 'from-green-400 to-emerald-600',
    darkGradient: 'from-green-300 to-emerald-500',
    bgImage: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600',
    destinations: ['Manali', 'Rishikesh', 'Dharamshala'],
    avgBudget: '₹18,000',
    duration: '5-10 days',
    vibe: 'Adventurous & Peaceful'
  },
  {
    id: 'city',
    title: 'City Nights, Lights & Sights',
    subtitle: 'Urban Exploration',
    icon: Building,
    gradient: 'from-purple-400 to-pink-500',
    darkGradient: 'from-purple-300 to-pink-400',
    bgImage: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=600',
    destinations: ['Mumbai', 'Delhi', 'Bangalore'],
    avgBudget: '₹12,000',
    duration: '3-5 days',
    vibe: 'Energetic & Cultural'
  },
  {
    id: 'heritage',
    title: 'Royal Rajasthan',
    subtitle: 'Heritage & Culture',
    icon: Compass,
    gradient: 'from-orange-400 to-red-500',
    darkGradient: 'from-orange-300 to-red-400',
    bgImage: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=600',
    destinations: ['Udaipur', 'Jaipur', 'Jodhpur'],
    avgBudget: '₹20,000',
    duration: '7-12 days',
    vibe: 'Majestic & Historic'
  }
];

const moodSelectors = [
  { id: 'morning', icon: Sun, label: 'Morning Energy', color: 'text-yellow-500 dark:text-yellow-400' },
  { id: 'evening', icon: Moon, label: 'Evening Calm', color: 'text-blue-500 dark:text-blue-400' },
  { id: 'coffee', icon: Coffee, label: 'Cozy Vibes', color: 'text-amber-600 dark:text-amber-500' },
  { id: 'adventure', icon: Zap, label: 'Adrenaline Rush', color: 'text-red-500 dark:text-red-400' }
];

export const TravelMoodboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoodIndex((prev) => (prev + 1) % moodCategories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    // In a real app, this would update the theme and trip suggestions
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-surface to-background dark:from-dark-background via-dark-surface to-dark-background">
      <Container maxWidth="full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-red-500 dark:text-red-400 animate-pulse" />
            <span className="text-primary dark:text-dark-primary font-medium">Personalized for You</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Your Travel Moodboard
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            AI-powered suggestions that adapt to your travel personality and current mood
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-2 shadow-lg border border-border dark:border-dark-border">
            <div className="flex gap-2">
              {moodSelectors.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                      selectedMood === mood.id
                        ? 'bg-primary dark:bg-dark-primary text-white shadow-lg scale-105'
                        : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface dark:hover:bg-dark-surface/50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${selectedMood === mood.id ? 'text-white' : mood.color}`} />
                    <span className="text-sm font-medium hidden sm:block">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mood Categories Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {moodCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = index === currentMoodIndex;
              
              return (
                <motion.div
                  key={category.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative h-80 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${
                    isActive ? 'ring-4 ring-primary/50 dark:ring-dark-primary/50 scale-105' : ''
                  }`}>
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={category.bgImage}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} dark:${category.darkGradient} opacity-80`} />
                      <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-6 text-white">
                      {/* Header */}
                      <div>
                        <motion.div
                          className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
                          animate={isActive ? { rotate: 360 } : {}}
                          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                        <p className="text-white/90 text-sm">{category.subtitle}</p>
                      </div>

                      {/* Details */}
                      <AnimatePresence>
                        {(hoveredCard === category.id || isActive) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                          >
                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-3">
                              <div className="text-xs text-white/80 mb-1">Popular Destinations</div>
                              <div className="flex flex-wrap gap-1">
                                {category.destinations.map((dest) => (
                                  <span key={dest} className="text-xs bg-white/20 dark:bg-white/10 px-2 py-1 rounded-full">
                                    {dest}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-2">
                                <div className="text-white/80">Budget</div>
                                <div className="font-medium">{category.avgBudget}</div>
                              </div>
                              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-2">
                                <div className="text-white/80">Duration</div>
                                <div className="font-medium">{category.duration}</div>
                              </div>
                            </div>
                            
                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-2">
                              <div className="text-xs text-white/80 mb-1">Vibe</div>
                              <div className="text-sm font-medium">{category.vibe}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === category.id || isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          className="w-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-white hover:bg-white/30 dark:hover:bg-white/20"
                          size="sm"
                        >
                          Explore {category.title.split(' ')[0]}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 dark:bg-yellow-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mood Insights */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 text-center border border-border dark:border-dark-border">
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Your Travel Personality
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6 max-w-2xl mx-auto">
              Based on your browsing patterns and preferences, we've curated these personalized recommendations. 
              Your mood selector helps us fine-tune suggestions throughout the day.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">Preference Learning</h4>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  AI learns from your clicks, saves, and bookings to improve recommendations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent dark:from-dark-accent dark:to-dark-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">Real-time Adaptation</h4>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  Suggestions change based on time of day, weather, and current trends
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary dark:from-dark-primary dark:to-dark-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">Mood Matching</h4>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  Select your current mood to get perfectly matched travel experiences
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};