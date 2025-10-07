import React, { useState, useEffect } from 'react';
import { Search, Filter, Map, List, ChevronDown, Shuffle, Globe, MapPin, Calendar, DollarSign, Users, Star, Heart, Eye, Compass, TrendingUp, Camera, Thermometer, Clock, Shield, Mic, MicOff, Sparkles, Play, Pause, Volume2, VolumeX, ArrowRight, Zap, Coffee, Mountain, Waves, Building, Sun, Moon, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

// Mood bubbles for interactive selection
const moodBubbles = [
  { id: 'peaceful', emoji: '🌿', label: 'Peaceful', color: 'from-green-400 to-emerald-500', description: 'Serene escapes' },
  { id: 'adventurous', emoji: '🏄‍♂️', label: 'Adventurous', color: 'from-orange-400 to-red-500', description: 'Thrill seekers' },
  { id: 'photogenic', emoji: '📸', label: 'Photogenic', color: 'from-pink-400 to-purple-500', description: 'Instagram worthy' },
  { id: 'spiritual', emoji: '🛕', label: 'Spiritual', color: 'from-yellow-400 to-orange-500', description: 'Soul searching' },
  { id: 'foodie', emoji: '🥘', label: 'Foodie', color: 'from-red-400 to-pink-500', description: 'Culinary journeys' },
  { id: 'cultural', emoji: '🏛️', label: 'Cultural', color: 'from-blue-400 to-indigo-500', description: 'Heritage tours' }
];

// Saved prompts for quick access
const savedPrompts = [
  'Waterfalls near Delhi under ₹5K',
  'Cultural trips for 2 days',
  'Beach destinations in monsoon',
  'Mountain treks for beginners',
  'Heritage sites in Rajasthan',
  'Adventure sports in Himachal'
];

// Filter chips
const filterChips = [
  { id: 'solo', label: 'Solo', icon: '👤' },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'group', label: 'Group', icon: '👥' },
  { id: 'weekend', label: 'Weekend', icon: '📅' },
  { id: 'hills', label: 'Hills', icon: '⛰️' },
  { id: 'beach', label: 'Beach', icon: '🏖️' }
];

// Trending destinations with live data
const trendingDestinations = [
  {
    id: 1,
    name: 'Goa',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
    costPerDay: '₹2,500',
    bestMonths: 'Nov-Mar',
    itineraryCount: 234,
    trending: 95,
    distance: '450 km',
    tags: ['Beach', 'Nightlife', 'Food'],
    weather: '28°C',
    safety: 'High',
    planningNow: 12,
    vibe: 'Party'
  },
  {
    id: 2,
    name: 'Manali',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600',
    costPerDay: '₹1,800',
    bestMonths: 'Mar-Jun',
    itineraryCount: 189,
    trending: 88,
    distance: '280 km',
    tags: ['Mountains', 'Adventure', 'Snow'],
    weather: '15°C',
    safety: 'High',
    planningNow: 8,
    vibe: 'Adventure'
  },
  {
    id: 3,
    name: 'Udaipur',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=600',
    costPerDay: '₹2,200',
    bestMonths: 'Oct-Mar',
    itineraryCount: 156,
    trending: 92,
    distance: '320 km',
    tags: ['Heritage', 'Romance', 'Culture'],
    weather: '25°C',
    safety: 'High',
    planningNow: 15,
    vibe: 'Cultural'
  },
  {
    id: 4,
    name: 'Rishikesh',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600',
    costPerDay: '₹1,200',
    bestMonths: 'Sep-Apr',
    itineraryCount: 298,
    trending: 85,
    distance: '240 km',
    tags: ['Spiritual', 'Adventure', 'Yoga'],
    weather: '22°C',
    safety: 'High',
    planningNow: 6,
    vibe: 'Spiritual'
  }
];

// Community picks and trending itineraries
const communityPicks = [
  {
    id: 1,
    title: 'Goa Solo Adventure',
    creator: 'Priya Travels',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 1240,
    comments: 89,
    tags: ['Solo', 'Beach', 'Budget'],
    destination: 'Goa',
    duration: '5 days',
    budget: '₹15,000'
  },
  {
    id: 2,
    title: 'Manali Group Trek',
    creator: 'Mountain Mike',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 987,
    comments: 156,
    tags: ['Group', 'Adventure', 'Trekking'],
    destination: 'Manali',
    duration: '7 days',
    budget: '₹22,000'
  }
];

// Weekend trip ideas
const weekendIdeas = [
  {
    id: 1,
    name: 'Lonavala',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '65 km',
    duration: '2 days',
    budget: '₹3,500',
    highlights: ['Waterfalls', 'Caves', 'Hill Station']
  },
  {
    id: 2,
    name: 'Mahabaleshwar',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '120 km',
    duration: '2 days',
    budget: '₹4,200',
    highlights: ['Strawberries', 'Viewpoints', 'Cool Weather']
  }
];

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isMapView, setIsMapView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [surpriseAnimation, setSurpriseAnimation] = useState(false);
  const [compareDestinations, setCompareDestinations] = useState<number[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    document.title = 'Explore Trips Across India – Budget to Luxury | Wanderlust';
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TravelAction",
      "name": "Explore Travel Destinations",
      "description": "Find curated destinations, real traveler plans, and AI-suggested itineraries from the Wanderlust community.",
      "url": "https://wanderlust.com/explore"
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
      setCurrentPromptIndex((prev) => (prev + 1) % savedPrompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSurpriseMe = () => {
    setSurpriseAnimation(true);
    setTimeout(() => {
      setSurpriseAnimation(false);
      // In a real app, this would generate a random destination
    }, 2000);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleCompareDestination = (id: number) => {
    if (compareDestinations.includes(id)) {
      setCompareDestinations(compareDestinations.filter(destId => destId !== id));
    } else if (compareDestinations.length < 3) {
      setCompareDestinations([...compareDestinations, id]);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, implement speech recognition here
  };

  return (
    <div className="bg-background dark:bg-dark-background min-h-screen">
      {/* Smart Discovery Hero */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/10 dark:to-dark-accent/10 py-16">
        <Container maxWidth="full">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Compass className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-medium">Find Your Kind of Travel</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-5xl mb-4">
              Curated by Wanderlust AI
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Loved by explorers like you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Panel - AI-powered Smart Search */}
            <motion.div
              className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-border/50 dark:border-dark-border/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">AI Smart Search</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">GPT-style trip planning</p>
                </div>
              </div>

              {/* Main Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="I want a beach trip under ₹15K in July..."
                  className="w-full px-6 py-4 bg-surface dark:bg-dark-surface/50 border border-border dark:border-dark-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary text-text-primary dark:text-dark-text-primary text-lg"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-xl transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary'
                    }`}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  <Button size="sm" className="px-4">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Search
                  </Button>
                </div>

                {/* Search Suggestions */}
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border shadow-2xl z-30 max-h-64 overflow-y-auto"
                  >
                    {savedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(prompt);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 text-text-primary dark:text-dark-text-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors border-b border-border dark:border-dark-border last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          {prompt}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Saved Prompts Carousel */}
              <div className="mb-6">
                <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-3">Saved prompts:</p>
                <div className="bg-surface dark:bg-dark-surface/50 rounded-xl p-3 border border-border dark:border-dark-border">
                  <AnimatePresence mode="wait">
                    <motion.button
                      key={currentPromptIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => setSearchQuery(savedPrompts[currentPromptIndex])}
                      className="w-full text-left p-2 text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                    >
                      "{savedPrompts[currentPromptIndex]}"
                    </motion.button>
                  </AnimatePresence>
                </div>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {filterChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => toggleFilter(chip.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedFilters.includes(chip.id)
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border dark:border-dark-border hover:border-primary dark:hover:border-dark-primary'
                    }`}
                  >
                    <span>{chip.icon}</span>
                    {chip.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Panel - Mood Board Picker */}
            <motion.div
              className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-border/50 dark:border-dark-border/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Travel Mood</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Interactive bubbles</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {moodBubbles.map((mood) => (
                  <motion.button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`relative p-6 rounded-2xl text-center transition-all ${
                      selectedMood === mood.id
                        ? 'ring-2 ring-primary scale-105 shadow-lg'
                        : 'hover:scale-102'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${mood.color} rounded-2xl opacity-20`}></div>
                    <div className="relative">
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className="font-bold text-text-primary dark:text-dark-text-primary text-sm mb-1">
                        {mood.label}
                      </div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {mood.description}
                      </div>
                    </div>
                    {selectedMood === mood.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(45deg, ${mood.color.split(' ')[1]}, ${mood.color.split(' ')[3]})`,
                          opacity: 0.1
                        }}
                        layoutId="moodSelector"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Surprise Generator */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">
                  Stuck on where to go?
                </h4>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3">
                  Let AI surprise you with a perfect destination
                </p>
                <Button
                  onClick={handleSurpriseMe}
                  fullWidth
                  leftIcon={<Shuffle className="h-4 w-4" />}
                  className={`bg-gradient-to-r from-primary to-secondary ${surpriseAnimation ? 'animate-pulse' : ''}`}
                >
                  {surpriseAnimation ? 'Finding magic...' : '🧠 Surprise Me'}
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container maxWidth="full" className="py-12">
        {/* Live Destination Map + Hotspot Scanner */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Live Destination Map
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Real-time travel hotspots with live planning data
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={showFilters ? "primary" : "outline"}
                leftIcon={<Filter className="h-4 w-4" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <div className="bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg p-1 flex">
                <button
                  className={`p-2 rounded ${!isMapView ? 'bg-primary text-white' : 'text-text-secondary dark:text-dark-text-secondary'}`}
                  onClick={() => setIsMapView(false)}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 rounded ${isMapView ? 'bg-primary text-white' : 'text-text-secondary dark:text-dark-text-secondary'}`}
                  onClick={() => setIsMapView(true)}
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg p-6 mb-8 border border-border dark:border-dark-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Budget Range
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                      <span>₹1,000</span>
                      <span>₹50,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Duration
                    </label>
                    <select className="w-full p-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                      <option>Any Duration</option>
                      <option>1-3 days</option>
                      <option>4-7 days</option>
                      <option>8-14 days</option>
                      <option>14+ days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Activities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Adventure', 'Culture', 'Beach', 'Mountains'].map((activity) => (
                        <button
                          key={activity}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border dark:border-dark-border hover:border-primary dark:hover:border-dark-primary"
                        >
                          {activity}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Safety Level
                    </label>
                    <select className="w-full p-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                      <option>Any Level</option>
                      <option>Solo Female Friendly</option>
                      <option>Night Travel Safe</option>
                      <option>Family Friendly</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Destination Grid (Pinterest-Style Masonry) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Live Activity Indicator */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                        {destination.planningNow} planning now
                      </span>
                    </div>

                    {/* Trending Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                        🔥 {destination.trending}%
                      </Badge>
                    </div>

                    {/* Compare Checkbox */}
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => toggleCompareDestination(destination.id)}
                        className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-colors ${
                          compareDestinations.includes(destination.id)
                            ? 'bg-primary text-white'
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                        }`}
                      >
                        {compareDestinations.includes(destination.id) && <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Quick Info Overlay */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-bold text-lg mb-1">{destination.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {destination.costPerDay}/day
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {destination.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span className="text-text-secondary dark:text-dark-text-secondary">{destination.bestMonths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-primary" />
                        <span className="text-text-secondary dark:text-dark-text-secondary">{destination.weather}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-primary" />
                        <span className="text-text-secondary dark:text-dark-text-secondary">{destination.itineraryCount} trips</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-success" />
                        <span className="text-text-secondary dark:text-dark-text-secondary">{destination.safety}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {destination.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={`${
                        destination.vibe === 'Party' ? 'bg-pink-100 text-pink-800' :
                        destination.vibe === 'Adventure' ? 'bg-orange-100 text-orange-800' :
                        destination.vibe === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {destination.vibe}
                      </Badge>
                      <div className="text-sm font-medium text-success">
                        {destination.costPerDay}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button size="sm" className="flex-1">
                        Start with AI Plan
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Picks + Trending This Week */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Travelers Are Loving Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                🔥 Travelers Are Loving
              </h3>
            </div>
            
            <div className="space-y-4">
              {communityPicks.map((pick) => (
                <Card key={pick.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <img
                      src={pick.avatar}
                      alt={pick.creator}
                      className="w-12 h-12 rounded-full border-2 border-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-text-primary dark:text-dark-text-primary">
                          {pick.title}
                        </h4>
                        <Badge variant="primary" className="text-xs">
                          {pick.creator}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                        <span>{pick.destination}</span>
                        <span>{pick.duration}</span>
                        <span className="text-success font-medium">{pick.budget}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {pick.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            {pick.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {pick.comments}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Follow</Button>
                          <Button size="sm">Fork Itinerary</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Weekend Trip Ideas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                📅 Weekend Trip Ideas
              </h3>
            </div>
            
            <div className="space-y-4">
              {weekendIdeas.map((idea) => (
                <Card key={idea.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <img
                      src={idea.image}
                      alt={idea.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-1">
                        {idea.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                        <span>{idea.distance} away</span>
                        <span>{idea.duration}</span>
                        <span className="text-success font-medium">{idea.budget}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" fullWidth>
                        Plan Weekend Trip
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* WanderAI Surprise Generator */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
              Stuck on where to go? Let AI surprise you.
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Gamified discovery tool for spontaneous travelers
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shuffle className={`h-10 w-10 text-white ${surpriseAnimation ? 'animate-spin' : ''}`} />
              </div>
              <h4 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                AI Trip Generator
              </h4>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                Let our AI pick a perfect destination based on current trends, weather, and your preferences
              </p>
              <Button
                onClick={handleSurpriseMe}
                size="lg"
                fullWidth
                className="bg-gradient-to-r from-primary to-secondary"
                leftIcon={<Zap className="h-5 w-5" />}
              >
                {surpriseAnimation ? 'Generating...' : '🧠 Surprise Me'}
              </Button>
              {surpriseAnimation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary"
                >
                  <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2">Finding your perfect adventure...</p>
                </motion.div>
              )}
            </Card>
          </div>
        </motion.div>

        {/* Compare Destinations Tool */}
        <AnimatePresence>
          {compareDestinations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-6 right-6 bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-border dark:border-dark-border p-4 z-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary dark:text-dark-text-primary">
                      Compare Destinations ({compareDestinations.length}/3)
                    </h4>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Side-by-side comparison of costs, weather, and more
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" disabled={compareDestinations.length < 2}>
                    Pick Winner → Start Trip Plan
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCompareDestinations([])}>
                    Clear
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default ExplorePage;