import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Calendar, MessageCircle, User, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'explore', icon: Compass, label: 'Explore', path: '/explore' },
  { id: 'plan', icon: Calendar, label: 'Plan', path: '/plan' },
  { id: 'ai', icon: MessageCircle, label: 'AI Chat', path: '/ai-chat', special: true },
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' }
];

export const StickyBottomBar: React.FC = () => {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const location = useLocation();

  // Don't show on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const handleAIClick = () => {
    setShowAIPrompt(true);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white/95 dark:bg-dark-surface/95 backdrop-blur-lg border-t border-border dark:border-dark-border">
          <div className="flex items-center justify-around py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isAI = item.special;
              
              return (
                <motion.div
                  key={item.id}
                  className="relative"
                  whileTap={{ scale: 0.95 }}
                >
                  {isAI ? (
                    <button
                      onClick={handleAIClick}
                      className="relative flex flex-col items-center gap-1 p-2"
                    >
                      <motion.div
                        className="relative w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
                        animate={{ 
                          boxShadow: [
                            '0 0 0 0 rgba(124, 58, 237, 0.4)',
                            '0 0 0 10px rgba(124, 58, 237, 0)',
                            '0 0 0 0 rgba(124, 58, 237, 0)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Sparkles className="h-2 w-2 text-yellow-900" />
                        </motion.div>
                      </motion.div>
                      <span className="text-xs font-medium text-primary dark:text-dark-primary">
                        {item.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex flex-col items-center gap-1 p-2"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-primary/10 dark:bg-dark-primary/10' 
                          : 'hover:bg-surface dark:hover:bg-dark-surface/50'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          isActive 
                            ? 'text-primary dark:text-dark-primary' 
                            : 'text-text-secondary dark:text-dark-text-secondary'
                        }`} />
                      </div>
                      <span className={`text-xs font-medium ${
                        isActive 
                          ? 'text-primary dark:text-dark-primary' 
                          : 'text-text-secondary dark:text-dark-text-secondary'
                      }`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary dark:bg-dark-primary rounded-full"
                          layoutId="activeIndicator"
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Chat Prompt Modal */}
      <AnimatePresence>
        {showAIPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAIPrompt(false)}
          >
            <motion.div
              className="bg-white dark:bg-dark-surface rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden"
              initial={{ y: '100%', scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: '100%', scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">WanderAI</h3>
                      <p className="text-white/90 text-sm">Your AI Travel Assistant</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIPrompt(false)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-white/90 text-sm">
                  Got trip ideas? Ask me anything about destinations, budgets, or planning!
                </p>
              </div>

              {/* Quick Actions */}
              <div className="p-6 space-y-4">
                <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-3">
                  Quick Actions
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-surface dark:bg-dark-surface/50 rounded-xl text-left hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-text-primary dark:text-dark-text-primary text-sm">Plan Trip</span>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      Get instant itinerary
                    </p>
                  </button>
                  
                  <button className="p-4 bg-surface dark:bg-dark-surface/50 rounded-xl text-left hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-text-primary dark:text-dark-text-primary text-sm">Find Places</span>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      Discover destinations
                    </p>
                  </button>
                </div>

                {/* Sample Prompts */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                    Try asking:
                  </h5>
                  {[
                    "Plan a weekend trip under ₹10k",
                    "Best time to visit Ladakh?",
                    "Solo travel safety tips"
                  ].map((prompt, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 bg-surface dark:bg-dark-surface/50 rounded-lg hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-3 w-3 text-primary" />
                        <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          "{prompt}"
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Chatting with AI
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Hint (Desktop) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleAIClick}
          className="relative w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              '0 10px 30px rgba(124, 58, 237, 0.3)',
              '0 10px 40px rgba(124, 58, 237, 0.5)',
              '0 10px 30px rgba(124, 58, 237, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageCircle className="h-6 w-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Sparkles className="h-2 w-2 text-yellow-900" />
          </motion.div>
          
          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.3 }}
          >
            Got trip ideas?
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </motion.div>
        </motion.button>
      </div>
    </>
  );
};