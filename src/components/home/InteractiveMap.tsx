import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, DollarSign, Calendar, Thermometer } from 'lucide-react';
import { Container } from '../ui/Container';

const destinations = [
  {
    id: 1,
    name: 'Goa',
    position: { x: 35, y: 70 },
    season: 'Nov-Mar',
    avgBudget: '₹15,000',
    trending: 95,
    temperature: '25-32°C',
    highlights: ['Beaches', 'Nightlife', 'Portuguese Heritage'],
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 2,
    name: 'Kerala',
    position: { x: 32, y: 75 },
    season: 'Oct-Mar',
    avgBudget: '₹20,000',
    trending: 88,
    temperature: '23-30°C',
    highlights: ['Backwaters', 'Ayurveda', 'Spices'],
    color: 'from-success to-emerald-400'
  },
  {
    id: 3,
    name: 'Rajasthan',
    position: { x: 28, y: 45 },
    season: 'Oct-Mar',
    avgBudget: '₹18,000',
    trending: 92,
    temperature: '15-28°C',
    highlights: ['Palaces', 'Desert', 'Culture'],
    color: 'from-orange-400 to-red-400'
  },
  {
    id: 4,
    name: 'Himachal',
    position: { x: 32, y: 25 },
    season: 'Mar-Jun',
    avgBudget: '₹22,000',
    trending: 85,
    temperature: '10-25°C',
    highlights: ['Mountains', 'Adventure', 'Valleys'],
    color: 'from-secondary to-accent'
  },
  {
    id: 5,
    name: 'Ladakh',
    position: { x: 38, y: 20 },
    season: 'Jun-Sep',
    avgBudget: '₹35,000',
    trending: 78,
    temperature: '5-20°C',
    highlights: ['High Altitude', 'Monasteries', 'Lakes'],
    color: 'from-gray-400 to-blue-400'
  },
  {
    id: 6,
    name: 'Andaman',
    position: { x: 55, y: 65 },
    season: 'Nov-Apr',
    avgBudget: '₹40,000',
    trending: 82,
    temperature: '24-30°C',
    highlights: ['Islands', 'Diving', 'Beaches'],
    color: 'from-primary to-blue-400'
  }
];

export const InteractiveMap: React.FC = () => {
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-background to-surface dark:from-dark-background to-dark-surface">
      <Container maxWidth="full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Discover India's Trending Destinations
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary">
            Hover over hotspots to explore the best times to visit and budget insights
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <motion.div
                className="relative bg-white dark:bg-dark-surface rounded-2xl shadow-2xl p-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* India Map SVG Background */}
                <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                  >
                    {/* Simplified India outline */}
                    <path
                      d="M20,15 Q25,10 35,12 Q45,8 55,15 Q65,12 70,20 Q75,25 72,35 Q70,45 65,55 Q60,65 55,70 Q50,75 45,78 Q40,80 35,78 Q30,75 25,70 Q20,65 18,55 Q15,45 18,35 Q20,25 20,15 Z"
                      fill="url(#indiaGradient)"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary"
                    />
                    <defs>
                      <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(124 58 237 / 0.1)" />
                        <stop offset="50%" stopColor="rgb(147 51 234 / 0.1)" />
                        <stop offset="100%" stopColor="rgb(99 102 241 / 0.1)" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Destination Markers */}
                  {destinations.map((destination) => (
                    <motion.div
                      key={destination.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{
                        left: `${destination.position.x}%`,
                        top: `${destination.position.y}%`,
                      }}
                      onMouseEnter={() => setHoveredDestination(destination.id)}
                      onMouseLeave={() => setHoveredDestination(null)}
                      onClick={() => setSelectedDestination(
                        selectedDestination === destination.id ? null : destination.id
                      )}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className={`w-4 h-4 bg-gradient-to-r ${destination.color} rounded-full shadow-lg border-2 border-white`}>
                        <div className="absolute inset-0 rounded-full animate-ping bg-white/50"></div>
                      </div>
                      
                      {/* Destination Label */}
                      <motion.div
                        className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-surface px-2 py-1 rounded-lg shadow-lg text-xs font-medium text-text-primary dark:text-dark-text-primary whitespace-nowrap"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ 
                          opacity: hoveredDestination === destination.id || selectedDestination === destination.id ? 1 : 0,
                          y: hoveredDestination === destination.id || selectedDestination === destination.id ? 0 : -10
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {destination.name}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-dark-surface rotate-45"></div>
                      </motion.div>

                      {/* Trending Pulse */}
                      {destination.trending > 90 && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-yellow-400"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Coastal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-success to-emerald-400 rounded-full"></div>
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Tropical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Desert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Mountain</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Destination Details Panel */}
            <div className="space-y-6">
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4">Destination Insights</h3>
                
                {selectedDestination ? (
                  <motion.div
                    key={selectedDestination}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      const dest = destinations.find(d => d.id === selectedDestination)!;
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-r ${dest.color} rounded-full`}></div>
                            <h4 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{dest.name}</h4>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Best Season</div>
                                <div className="font-medium text-text-primary dark:text-dark-text-primary">{dest.season}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-success" />
                              <div>
                                <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Avg Budget</div>
                                <div className="font-medium text-text-primary dark:text-dark-text-primary">{dest.avgBudget}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-orange-500" />
                              <div>
                                <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Trending</div>
                                <div className="font-medium text-text-primary dark:text-dark-text-primary">{dest.trending}%</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-red-500" />
                              <div>
                                <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Temperature</div>
                                <div className="font-medium text-text-primary dark:text-dark-text-primary">{dest.temperature}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-text-secondary dark:text-dark-text-secondary mb-2">Highlights</div>
                            <div className="flex flex-wrap gap-2">
                              {dest.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="px-2 py-1 bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary text-xs rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg font-medium hover:from-primary/90 hover:to-secondary/90 transition-all">
                            Plan Trip to {dest.name}
                          </button>
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <div className="text-center py-8 text-text-secondary dark:text-dark-text-secondary">
                    <MapPin className="h-12 w-12 mx-auto mb-3 text-text-secondary/50 dark:text-dark-text-secondary/50" />
                    <p>Click on a destination to see details</p>
                  </div>
                )}
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-bold mb-4">Travel Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Most Popular</span>
                    <span className="font-medium">Goa (95%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Value</span>
                    <span className="font-medium">Kerala</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adventure</span>
                    <span className="font-medium">Ladakh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luxury</span>
                    <span className="font-medium">Andaman</span>
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