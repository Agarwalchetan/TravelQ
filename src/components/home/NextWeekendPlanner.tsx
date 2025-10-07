import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock, Zap, Shuffle, TrendingUp, Users, Star, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const getNextLongWeekend = () => {
  const now = new Date();
  const nextWeekend = new Date(now);
  nextWeekend.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
  
  const timeDiff = nextWeekend.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return {
    days: daysDiff,
    date: nextWeekend.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  };
};

const weekendDestinations = [
  {
    id: 1,
    name: 'Lonavala',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: '65 km from Mumbai',
    budget: '₹2,500',
    duration: '2 days',
    highlights: ['Waterfalls', 'Caves', 'Hill Station'],
    weather: '24°C',
    bookings: 156,
    rating: 4.6,
    trending: true
  },
  {
    id: 2,
    name: 'Rishikesh',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: '240 km from Delhi',
    budget: '₹3,200',
    duration: '2-3 days',
    highlights: ['Adventure', 'Yoga', 'Ganges'],
    weather: '28°C',
    bookings: 234,
    rating: 4.8,
    trending: false
  },
  {
    id: 3,
    name: 'Mahabaleshwar',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: '120 km from Pune',
    budget: '₹2,800',
    duration: '2 days',
    highlights: ['Strawberries', 'Viewpoints', 'Cool Weather'],
    weather: '22°C',
    bookings: 189,
    rating: 4.5,
    trending: true
  }
];

const flashDeals = [
  { text: '🔥 Goa beach resorts 40% off this weekend!', expires: '2 days' },
  { text: '⚡ Manali adventure packages starting ₹1,999', expires: '5 hours' },
  { text: '🌊 Andaman ferry + stay combo deals live now', expires: '1 day' },
  { text: '🏔️ Himachal homestays flat 50% discount', expires: '3 days' }
];

export const NextWeekendPlanner: React.FC = () => {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [surpriseMode, setSurpriseMode] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const weekend = getNextLongWeekend();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % flashDeals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSurpriseMe = () => {
    setSurpriseMode(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * weekendDestinations.length);
      setSelectedDestination(randomIndex);
      setSurpriseMode(false);
    }, 2000);
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
            <Calendar className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">Weekend Escape Planner</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Next Long Weekend: {weekend.date}
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary">
            {weekend.days} days to go! Perfect time to plan a quick getaway
          </p>
        </motion.div>

        {/* Flash Deals Ticker */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center">
              <TrendingUp className="h-5 w-5 mr-3 animate-bounce" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentDeal}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="font-medium"
                >
                  {flashDeals[currentDeal].text}
                </motion.span>
              </AnimatePresence>
              <Badge className="ml-3 bg-white/20 text-white border-0">
                Expires in {flashDeals[currentDeal].expires}
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Weekend Destinations */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                  Perfect Weekend Escapes
                </h3>
                <Button
                  onClick={handleSurpriseMe}
                  variant="outline"
                  leftIcon={<Shuffle className="h-4 w-4" />}
                  className={surpriseMode ? 'animate-pulse' : ''}
                >
                  {surpriseMode ? 'Finding magic...' : 'Surprise Me!'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weekendDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    className={`group relative cursor-pointer ${
                      selectedDestination === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedDestination(selectedDestination === index ? null : index)}
                    whileHover={{ y: -5 }}
                    // transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Trending Badge */}
                        {destination.trending && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                              🔥 Trending
                            </Badge>
                          </div>
                        )}

                        {/* Quick Stats Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-bold text-lg mb-1">{destination.name}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              {destination.budget}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              {destination.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span className="text-text-secondary dark:text-dark-text-secondary">{destination.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-primary" />
                            <span className="text-text-secondary dark:text-dark-text-secondary">{destination.bookings} bookings</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {destination.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                              {destination.rating}
                            </span>
                          </div>
                          <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            {destination.weather}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedDestination === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-border dark:border-dark-border p-4 bg-surface dark:bg-dark-surface/50"
                          >
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-text-secondary dark:text-dark-text-secondary">Best for:</span>
                                  <div className="font-medium text-text-primary dark:text-dark-text-primary">Couples, Friends</div>
                                </div>
                                <div>
                                  <span className="text-text-secondary dark:text-dark-text-secondary">Travel time:</span>
                                  <div className="font-medium text-text-primary dark:text-dark-text-primary">2-3 hours</div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="flex-1">
                                  Plan Trip
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weekend Planner Sidebar */}
            <div className="space-y-6">
              {/* Countdown Timer */}
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">
                    Weekend Countdown
                  </h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-surface dark:bg-dark-surface/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">{weekend.days}</div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Days</div>
                    </div>
                    <div className="text-center p-2 bg-surface dark:bg-dark-surface/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">{new Date().getHours()}</div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Hours</div>
                    </div>
                    <div className="text-center p-2 bg-surface dark:bg-dark-surface/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">{new Date().getMinutes()}</div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Mins</div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Time to start planning your escape!
                  </p>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-4">
                  Quick Weekend Plans
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: '🏔️', title: 'Mountain Escape', subtitle: 'Cool weather, fresh air' },
                    { icon: '🏖️', title: 'Beach Getaway', subtitle: 'Sun, sand, relaxation' },
                    { icon: '🏛️', title: 'Heritage Tour', subtitle: 'Culture and history' },
                    { icon: '🧘', title: 'Wellness Retreat', subtitle: 'Yoga and meditation' }
                  ].map((plan, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 bg-surface dark:bg-dark-surface/50 rounded-lg hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors text-left"
                    >
                      <span className="text-2xl">{plan.icon}</span>
                      <div>
                        <div className="font-medium text-text-primary dark:text-dark-text-primary">
                          {plan.title}
                        </div>
                        <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                          {plan.subtitle}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary ml-auto" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Weather Alert */}
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold">Weather Alert</h4>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  Perfect weather for hill stations this weekend! Clear skies and cool breeze expected.
                </p>
                <Button
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                >
                  View Forecast
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};