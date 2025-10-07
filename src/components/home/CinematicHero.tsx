import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, MicOff, Sparkles, Play, Pause, Volume2, VolumeX, MapPin, Calendar, Users, DollarSign, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

const heroVideos = [
  {
    id: 1,
    location: 'Bir, Himachal Pradesh',
    activity: 'Paragliding',
    poster: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Soar through the clouds',
    budget: '₹8,000',
    duration: '3 days'
  },
  {
    id: 2,
    location: 'Kerala Backwaters',
    activity: 'Kayaking',
    poster: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Paddle through paradise',
    budget: '₹12,000',
    duration: '5 days'
  },
  {
    id: 3,
    location: 'Jaisalmer, Rajasthan',
    activity: 'Desert Camping',
    poster: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Sleep under the stars',
    budget: '₹15,000',
    duration: '4 days'
  }
];

const aiSuggestions = [
  'Beach trip under ₹15,000',
  'Weekend getaway from Delhi',
  'Solo adventure in Himachal',
  'Romantic escape to Udaipur',
  'Group trek in Western Ghats',
  'Cultural tour of Rajasthan'
];

const quickActions = [
  { icon: MapPin, label: 'Explore Popular', color: 'from-blue-500 to-cyan-500', darkColor: 'from-blue-400 to-cyan-400' },
  { icon: Calendar, label: 'Weekend Getaways', color: 'from-emerald-500 to-green-500', darkColor: 'from-emerald-400 to-green-400' },
  { icon: Users, label: 'Group Trips', color: 'from-purple-500 to-pink-500', darkColor: 'from-purple-400 to-pink-400' },
  { icon: DollarSign, label: 'Budget Friendly', color: 'from-amber-500 to-orange-500', darkColor: 'from-amber-400 to-orange-400' }
];

export const CinematicHero: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningText, setPlanningText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const planningMessages = [
    'Analyzing your preferences...',
    'Finding the best destinations...',
    'Calculating optimal routes...',
    'Checking weather conditions...',
    'Curating local experiences...',
    'Planning your perfect escape...'
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlanning) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < planningMessages.length) {
          setPlanningText(planningMessages[messageIndex]);
          messageIndex++;
        } else {
          setIsPlanning(false);
          setShowAIPlanner(true);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isPlanning]);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, implement speech recognition here
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsPlanning(true);
    setShowSuggestions(false);
  };

  const handleQuickSearch = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroVideos[currentVideo].poster}
              alt={heroVideos[currentVideo].location}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 dark:from-black/60 dark:via-black/40 dark:to-black/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Controls */}
      <div className="absolute top-6 right-6 flex gap-3 z-20">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/20"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/20"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>

      {/* Location Info */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white/15 dark:bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-white max-w-sm border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-white/90" />
            <span className="font-bold text-lg text-white">{heroVideos[currentVideo].location}</span>
          </div>
          <p className="text-white/80 text-sm mb-3">{heroVideos[currentVideo].description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-emerald-300" />
              <span className="text-white/90">{heroVideos[currentVideo].budget}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-blue-300" />
              <span className="text-white/90">{heroVideos[currentVideo].duration}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <Container maxWidth="full" className="relative h-full flex items-center justify-center z-10">
        <div className="text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Discover Your Next{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 dark:from-yellow-200 dark:to-orange-300 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-md">
              AI-powered trip planner, real traveler itineraries, and seamless booking — all in one place.
            </p>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-3xl mx-auto mb-8"
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 p-3 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Where do you want to go? (e.g., 'Beach trip under ₹15,000')"
                    className="w-full bg-transparent text-white placeholder-white/60 dark:placeholder-white/50 text-lg px-6 py-4 focus:outline-none"
                  />
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden z-30 shadow-2xl"
                    >
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion)}
                          className="w-full text-left px-6 py-4 text-gray-800 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className="h-4 w-4 text-primary dark:text-primary" />
                            <span className="font-medium">{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
                <button
                  onClick={handleVoiceInput}
                  className={`p-4 rounded-2xl transition-all border ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse border-red-400' 
                      : 'bg-white/20 dark:bg-white/10 text-white hover:bg-white/30 dark:hover:bg-white/20 border-white/20 dark:border-white/10'
                  }`}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                <Button
                  onClick={handleQuickSearch}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary text-white px-8 py-4 rounded-2xl hover:from-primary/90 hover:to-secondary/90 shadow-xl border-0"
                  rightIcon={<Zap className="h-5 w-5" />}
                >
                  Plan Trip
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Planning Animation */}
          <AnimatePresence>
            {isPlanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 p-8 max-w-lg mx-auto mb-8 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white animate-spin" />
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-lg">WanderAI</div>
                    <div className="text-white/70 text-sm">Planning your adventure...</div>
                  </div>
                </div>
                <p className="text-white/90 text-left text-lg">{planningText}</p>
                <div className="flex gap-2 mt-4 justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  className="group relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-all rounded-2xl p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} dark:${action.darkColor} opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity`}></div>
                  <Icon className="h-6 w-6 mb-3 mx-auto text-white" />
                  <div className="font-medium text-sm text-white">{action.label}</div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </Container>

      {/* Video Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentVideo
                ? 'bg-white w-12 shadow-lg'
                : 'bg-white/50 dark:bg-white/30 w-3 hover:bg-white/70 dark:hover:bg-white/50'
            }`}
          />
        ))}
      </div>

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
  );
};