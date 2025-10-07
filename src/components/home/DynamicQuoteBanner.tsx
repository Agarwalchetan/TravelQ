import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { Container } from '../ui/Container';

const quotes = [
  {
    id: 1,
    text: "Jobs fill your pocket, but travel fills your soul.",
    author: "Anonymous",
    type: 'inspiration'
  },
  {
    id: 2,
    text: "Travel is the only thing you buy that makes you richer.",
    author: "Anonymous",
    type: 'inspiration'
  },
  {
    id: 3,
    text: "Adventure awaits those who seek it.",
    author: "Explorer's Wisdom",
    type: 'inspiration'
  }
];

const trendingOffers = [
  {
    id: 1,
    text: "Trending: Rishikesh raft camps from ₹999!",
    location: "Rishikesh",
    discount: "40% OFF",
    type: 'offer'
  },
  {
    id: 2,
    text: "Weekend Special: Goa beach resorts starting ₹1,499",
    location: "Goa",
    discount: "30% OFF",
    type: 'offer'
  },
  {
    id: 3,
    text: "Flash Sale: Manali adventure packages from ₹2,999",
    location: "Manali",
    discount: "50% OFF",
    type: 'offer'
  }
];

const getNextLongWeekend = () => {
  const now = new Date();
  const nextWeekend = new Date(now);
  nextWeekend.setDate(now.getDate() + (6 - now.getDay() + 7) % 7); // Next Saturday
  
  const timeDiff = nextWeekend.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return daysDiff;
};

export const DynamicQuoteBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentType, setCurrentType] = useState<'quote' | 'countdown' | 'offer'>('quote');
  const [daysToWeekend, setDaysToWeekend] = useState(getNextLongWeekend());

  const allContent = [
    ...quotes,
    {
      id: 'countdown',
      text: `Next long weekend in: ${daysToWeekend} days`,
      type: 'countdown'
    },
    ...trendingOffers
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allContent.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allContent.length]);

  useEffect(() => {
    const current = allContent[currentIndex];
    if (current.type === 'inspiration') {
      setCurrentType('quote');
    } else if (current.type === 'countdown') {
      setCurrentType('countdown');
    } else {
      setCurrentType('offer');
    }
  }, [currentIndex, allContent]);

  const currentContent = allContent[currentIndex];

  const getBackgroundGradient = () => {
    switch (currentType) {
      case 'quote':
        return 'from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-500 dark:via-blue-500 dark:to-indigo-600';
      case 'countdown':
        return 'from-orange-500 via-red-500 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-500';
      case 'offer':
        return 'from-green-500 via-emerald-600 to-teal-700 dark:from-green-400 dark:via-emerald-500 dark:to-teal-600';
      default:
        return 'from-primary via-secondary to-accent dark:from-dark-primary dark:via-dark-accent dark:to-dark-primary';
    }
  };

  const getIcon = () => {
    switch (currentType) {
      case 'quote':
        return <Quote className="h-6 w-6" />;
      case 'countdown':
        return <Calendar className="h-6 w-6" />;
      case 'offer':
        return <TrendingUp className="h-6 w-6" />;
      default:
        return <Quote className="h-6 w-6" />;
    }
  };

  return (
    <section className="relative overflow-hidden">
      <motion.div
        className={`bg-gradient-to-r ${getBackgroundGradient()} py-12 relative`}
        animate={{ 
          background: `linear-gradient(to right, var(--tw-gradient-stops))` 
        }}
        transition={{ duration: 1 }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-white/30 dark:bg-white/20 rounded-full"
              initial={{ 
                opacity: Math.random() * 0.5 + 0.2,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
          
          {/* Larger Floating Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`large-particle-${i}`}
              className="absolute w-4 h-4 bg-white/20 dark:bg-white/10 rounded-full blur-sm"
              initial={{ 
                opacity: 0.3,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 2, 1],
                rotate: [0, 180, 360],
                y: [0, -50, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Gradient Orbs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute w-32 h-32 rounded-full opacity-10 dark:opacity-5 blur-3xl"
              style={{
                background: i === 0 ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' :
                           i === 1 ? 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' :
                                    'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Shooting Stars */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white/60 dark:bg-white/40 rounded-full"
              initial={{ 
                x: -10,
                y: Math.random() * 200 + 50,
                opacity: 0
              }}
              animate={{
                x: window.innerWidth + 10,
                y: Math.random() * 200 + 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 8 + Math.random() * 5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        <Container maxWidth="full" className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="text-white"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 dark:border-white/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    {getIcon()}
                  </motion.div>
                  <div className="text-left">
                    <div className="text-sm opacity-90 capitalize font-medium">{currentType}</div>
                    <div className="text-xs opacity-75">
                      {currentType === 'quote' && 'Daily Inspiration'}
                      {currentType === 'countdown' && 'Plan Ahead'}
                      {currentType === 'offer' && 'Limited Time'}
                    </div>
                  </div>
                </div>

                {currentType === 'quote' && (
                  <div>
                    <blockquote className="text-2xl md:text-3xl font-bold mb-4 leading-relaxed">
                      "{currentContent.text}"
                    </blockquote>
                    {currentContent.author && (
                      <cite className="text-lg opacity-90">— {currentContent.author}</cite>
                    )}
                  </div>
                )}

                {currentType === 'countdown' && (
                  <div>
                    <div className="text-3xl md:text-4xl font-bold mb-4">
                      Next long weekend in:
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <motion.div
                        className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] border border-white/30 dark:border-white/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="text-3xl font-bold">{daysToWeekend}</div>
                        <div className="text-sm opacity-90">Days</div>
                      </motion.div>
                      <motion.div
                        className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] border border-white/30 dark:border-white/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      >
                        <div className="text-3xl font-bold">
                          {new Date().getHours()}
                        </div>
                        <div className="text-sm opacity-90">Hours</div>
                      </motion.div>
                      <motion.div
                        className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] border border-white/30 dark:border-white/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      >
                        <div className="text-3xl font-bold">
                          {new Date().getMinutes()}
                        </div>
                        <div className="text-sm opacity-90">Minutes</div>
                      </motion.div>
                    </div>
                    <p className="text-lg opacity-90">Time to start planning your escape!</p>
                  </div>
                )}

                {currentType === 'offer' && (
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="bg-yellow-400 dark:bg-yellow-300 text-yellow-900 dark:text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                        {currentContent.discount}
                      </span>
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">{currentContent.location}</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-4">
                      {currentContent.text}
                    </div>
                    <motion.button
                      className="bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 dark:hover:bg-white/20 transition-all shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Progress Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {allContent.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all border border-white/30 dark:border-white/20 ${
                    index === currentIndex
                      ? 'bg-white w-8 shadow-lg'
                      : 'bg-white/50 dark:bg-white/30 w-2 hover:bg-white/70 dark:hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
};