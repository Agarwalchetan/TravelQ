import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, MessageCircle, Heart, Plane } from 'lucide-react';
import { Container } from '../ui/Container';

const liveActivities = [
  {
    id: 1,
    user: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'started planning',
    destination: 'Kerala Backwaters',
    duration: '5 days',
    timeAgo: '2 min ago',
    type: 'planning'
  },
  {
    id: 2,
    user: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'just booked',
    destination: 'Goa Beach Resort',
    duration: '7 days',
    timeAgo: '5 min ago',
    type: 'booking'
  },
  {
    id: 3,
    user: 'Rahul Gupta',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'shared photos from',
    destination: 'Ladakh Adventure',
    duration: '10 days',
    timeAgo: '8 min ago',
    type: 'sharing'
  },
  {
    id: 4,
    user: 'Sneha Patel',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'invited friends to',
    destination: 'Rajasthan Heritage Tour',
    duration: '12 days',
    timeAgo: '12 min ago',
    type: 'collaboration'
  },
  {
    id: 5,
    user: 'Arjun Singh',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'completed trip to',
    destination: 'Himachal Pradesh',
    duration: '8 days',
    timeAgo: '15 min ago',
    type: 'completed'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'planning': return <MapPin className="h-4 w-4" />;
    case 'booking': return <Plane className="h-4 w-4" />;
    case 'sharing': return <MessageCircle className="h-4 w-4" />;
    case 'collaboration': return <Users className="h-4 w-4" />;
    case 'completed': return <Heart className="h-4 w-4" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'planning': return 'from-blue-400 to-blue-600';
    case 'booking': return 'from-success to-green-600';
    case 'sharing': return 'from-secondary to-purple-600';
    case 'collaboration': return 'from-accent to-orange-600';
    case 'completed': return 'from-pink-400 to-pink-600';
    default: return 'from-gray-400 to-gray-600';
  }
};

export const CommunityBoard: React.FC = () => {
  const [activities, setActivities] = useState(liveActivities);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activities.length]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-dark-primary/5 dark:to-dark-accent/5">
      <Container maxWidth="full">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">Live Activity</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
              Who's Planning What?
            </h2>
            <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary">
              Real-time updates from our travel community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Live Feed */}
            <motion.div
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-success to-primary rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary dark:text-dark-text-primary">Live Community Feed</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">See what travelers are up to</p>
                </div>
              </div>

              <div className="space-y-4 max-h-80 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: index === currentIndex ? 1 : 0.6,
                        y: 0,
                        scale: index === currentIndex ? 1 : 0.95
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20' 
                          : 'bg-surface dark:bg-dark-surface/50'
                      }`}
                    >
                      <img
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-text-primary dark:text-dark-text-primary">{activity.user}</span>
                          <span className="text-text-secondary dark:text-dark-text-secondary">{activity.action}</span>
                          <div className={`w-6 h-6 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-full flex items-center justify-center text-white`}>
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                          <span className="font-medium text-primary dark:text-dark-primary">{activity.destination}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.duration}
                          </span>
                          <span>{activity.timeAgo}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6 text-center">
                <button className="text-primary dark:text-dark-primary font-medium hover:text-primary/80 dark:hover:text-dark-primary/80 transition-colors">
                  View All Activity →
                </button>
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4">Community Highlights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl">
                    <div className="text-2xl font-bold text-primary">2.4K</div>
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Active Planners</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl">
                    <div className="text-2xl font-bold text-secondary">156</div>
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Trips This Week</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl">
                    <div className="text-2xl font-bold text-accent">89%</div>
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/20 rounded-xl">
                    <div className="text-2xl font-bold text-success">4.9★</div>
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Avg Rating</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-6 text-white">
                <h3 className="font-bold mb-2">Join the Community</h3>
                <p className="text-white/90 mb-4">
                  Connect with fellow travelers, share experiences, and get inspired for your next adventure.
                </p>
                <button className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Join Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};