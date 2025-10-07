import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Users, Heart, Filter, Globe } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';

const destinations = [
  {
    id: 1,
    name: 'Goa',
    position: { x: 35, y: 70 },
    trending: 95,
    category: 'Beach',
    itineraries: 234,
    avgBudget: '₹15,000',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
    topItinerary: 'Beach Hopping & Nightlife',
    creator: 'Priya S.',
    likes: 1240
  },
  {
    id: 2,
    name: 'Manali',
    position: { x: 32, y: 25 },
    trending: 88,
    category: 'Adventure',
    itineraries: 189,
    avgBudget: '₹22,000',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    topItinerary: 'Himalayan Adventure',
    creator: 'Arjun K.',
    likes: 987
  },
  {
    id: 3,
    name: 'Udaipur',
    position: { x: 28, y: 45 },
    trending: 92,
    category: 'Solo',
    itineraries: 156,
    avgBudget: '₹18,000',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400',
    topItinerary: 'Royal Rajasthan',
    creator: 'Sneha M.',
    likes: 1456
  },
  {
    id: 4,
    name: 'Rishikesh',
    position: { x: 30, y: 30 },
    trending: 85,
    category: 'Budget',
    itineraries: 298,
    avgBudget: '₹8,000',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    topItinerary: 'Yoga & Adventure',
    creator: 'Rahul G.',
    likes: 743
  },
  {
    id: 5,
    name: 'Munnar',
    position: { x: 33, y: 75 },
    trending: 78,
    category: 'Weekend',
    itineraries: 167,
    avgBudget: '₹12,000',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    topItinerary: 'Tea Gardens & Hills',
    creator: 'Maya P.',
    likes: 892
  },
  {
    id: 6,
    name: 'Andaman',
    position: { x: 55, y: 65 },
    trending: 82,
    category: 'Group',
    itineraries: 134,
    avgBudget: '₹35,000',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    topItinerary: 'Island Paradise',
    creator: 'Vikram S.',
    likes: 1123
  }
];

const filters = ['All', 'Adventure', 'Solo', 'Budget', 'Weekend', 'Group', 'Beach'];

const categoryColors = {
  Adventure: 'from-orange-400 to-red-500',
  Solo: 'from-purple-400 to-pink-500',
  Budget: 'from-green-400 to-emerald-500',
  Weekend: 'from-blue-400 to-cyan-500',
  Group: 'from-yellow-400 to-orange-500',
  Beach: 'from-cyan-400 to-blue-500'
};

export const InteractiveTravelMap: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [isGlobeView, setIsGlobeView] = useState(false);

  const filteredDestinations = destinations.filter(dest => 
    selectedFilter === 'All' || dest.category === selectedFilter
  );

  return (
    <section className="py-16 bg-gradient-to-br from-background to-surface dark:from-dark-background to-dark-surface">
      <Container maxWidth="full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">Real-Time Travel Trends</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Discover India's Hottest Destinations
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary">
            Interactive map with live data from our travel community
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border dark:border-dark-border hover:border-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <motion.div
                className="relative bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Map Toggle */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setIsGlobeView(!isGlobeView)}
                    className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Globe className="h-4 w-4 inline mr-1" />
                    {isGlobeView ? 'Map View' : 'Globe View'}
                  </button>
                </div>

                {/* India Map */}
                <div className="relative w-full h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotateY: isGlobeView ? 15 : 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                    >
                      <defs>
                        <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(124 58 237 / 0.1)" />
                          <stop offset="50%" stopColor="rgb(147 51 234 / 0.1)" />
                          <stop offset="100%" stopColor="rgb(99 102 241 / 0.1)" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <path
                        d="M20,15 Q25,10 35,12 Q45,8 55,15 Q65,12 70,20 Q75,25 72,35 Q70,45 65,55 Q60,65 55,70 Q50,75 45,78 Q40,80 35,78 Q30,75 25,70 Q20,65 18,55 Q15,45 18,35 Q20,25 20,15 Z"
                        fill="url(#indiaGradient)"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-primary"
                        filter="url(#glow)"
                      />
                    </svg>

                    {/* Destination Markers */}
                    <AnimatePresence>
                      {filteredDestinations.map((destination) => (
                        <motion.div
                          key={destination.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            left: `${destination.position.x}%`,
                            top: `${destination.position.y}%`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          onMouseEnter={() => setHoveredDestination(destination.id)}
                          onMouseLeave={() => setHoveredDestination(null)}
                          onClick={() => setSelectedDestination(
                            selectedDestination === destination.id ? null : destination.id
                          )}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {/* Trending Pulse */}
                          {destination.trending > 90 && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-yellow-400"
                              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                          
                          {/* Main Pin */}
                          <div className={`w-6 h-6 bg-gradient-to-r ${categoryColors[destination.category as keyof typeof categoryColors]} rounded-full shadow-lg border-2 border-white relative`}>
                            <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                              {destination.itineraries > 200 ? '!' : ''}
                            </div>
                          </div>
                          
                          {/* Hover Card */}
                          <AnimatePresence>
                            {(hoveredDestination === destination.id || selectedDestination === destination.id) && (
                              <motion.div
                                className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-surface rounded-xl shadow-2xl p-4 min-w-64 z-30"
                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-dark-surface rotate-45"></div>
                                
                                <div className="relative">
                                  <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-24 object-cover rounded-lg mb-3"
                                  />
                                  <div className="absolute top-2 right-2">
                                    <Badge variant="primary" className="text-xs">
                                      {destination.trending}% trending
                                    </Badge>
                                  </div>
                                  
                                  <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">
                                    {destination.name}
                                  </h4>
                                  
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-text-secondary dark:text-dark-text-secondary">Itineraries:</span>
                                      <span className="font-medium text-text-primary dark:text-dark-text-primary">{destination.itineraries}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-text-secondary dark:text-dark-text-secondary">Avg Budget:</span>
                                      <span className="font-medium text-success">{destination.avgBudget}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 p-2 bg-surface dark:bg-dark-surface/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                                      <span className="text-xs font-medium text-text-primary dark:text-dark-text-primary">{destination.creator}</span>
                                    </div>
                                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-2">"{destination.topItinerary}"</p>
                                    <div className="flex items-center gap-1">
                                      <Heart className="h-3 w-3 text-red-500" />
                                      <span className="text-xs text-text-secondary dark:text-dark-text-secondary">{destination.likes} likes</span>
                                    </div>
                                  </div>
                                  
                                  <button className="w-full mt-3 bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg text-sm font-medium hover:from-primary/90 hover:to-secondary/90 transition-all">
                                    View Itineraries
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Heat Zones Legend */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                    <span className="text-text-secondary dark:text-dark-text-secondary">Budget Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                    <span className="text-text-secondary dark:text-dark-text-secondary">Adventure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    <span className="text-text-secondary dark:text-dark-text-secondary">Beach</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                    <span className="text-text-secondary dark:text-dark-text-secondary">Solo Travel</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trending Stats Panel */}
            <div className="space-y-6">
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Live Trends
                </h3>
                
                <div className="space-y-4">
                  {filteredDestinations.slice(0, 3).map((dest, index) => (
                    <div key={dest.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryColors[dest.category as keyof typeof categoryColors]} flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-text-primary dark:text-dark-text-primary">{dest.name}</div>
                        <div className="text-sm text-text-secondary dark:text-dark-text-secondary">{dest.trending}% trending</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-success">{dest.avgBudget}</div>
                        <div className="text-xs text-text-secondary dark:text-dark-text-secondary">{dest.itineraries} trips</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-bold mb-4">Community Insights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Active Planners</span>
                    <span className="font-medium">2.4K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trips This Week</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Searched</span>
                    <span className="font-medium">Goa Beaches</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Trip Duration</span>
                    <span className="font-medium">5.2 days</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};