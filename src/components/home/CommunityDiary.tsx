import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, MapPin, Calendar, Users, Camera, Plane, Star } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const communityActivities = [
  {
    id: 1,
    user: 'Ritika Sharma',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'completed',
    trip: 'Goa Solo Adventure',
    location: 'Goa',
    duration: '5 days',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
    timeAgo: '2 hours ago',
    likes: 24,
    comments: 8,
    rating: 5,
    highlight: 'Amazing sunset at Anjuna Beach! 🌅'
  },
  {
    id: 2,
    user: 'Anmol Gupta',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'planning',
    trip: 'Manali-Leh Road Trip',
    location: 'Ladakh',
    duration: '12 days',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    timeAgo: '4 hours ago',
    likes: 18,
    comments: 12,
    progress: 75,
    highlight: 'Looking for travel buddies! 🚐'
  },
  {
    id: 3,
    user: 'Priya Patel',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'shared',
    trip: 'Kerala Backwater Experience',
    location: 'Alleppey',
    duration: '3 days',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    timeAgo: '6 hours ago',
    likes: 31,
    comments: 15,
    photos: 24,
    highlight: 'Houseboat life is pure bliss! 🛥️'
  },
  {
    id: 4,
    user: 'Rahul Singh',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'started',
    trip: 'Rajasthan Heritage Tour',
    location: 'Udaipur',
    duration: '8 days',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400',
    timeAgo: '8 hours ago',
    likes: 15,
    comments: 6,
    day: 1,
    highlight: 'City of Lakes, here I come! 🏰'
  },
  {
    id: 5,
    user: 'Sneha Reddy',
    avatar: 'https://images.pexels.com/photos/4350099/pexels-photo-4350099.jpeg?auto=compress&cs=tinysrgb&w=150',
    action: 'reviewed',
    trip: 'Himachal Hill Station Hop',
    location: 'Shimla',
    duration: '6 days',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    timeAgo: '12 hours ago',
    likes: 42,
    comments: 18,
    rating: 4,
    highlight: 'Perfect weather for mountain adventures! ⛰️'
  }
];

const getActionIcon = (action: string) => {
  switch (action) {
    case 'completed': return <Star className="h-4 w-4" />;
    case 'planning': return <Calendar className="h-4 w-4" />;
    case 'shared': return <Camera className="h-4 w-4" />;
    case 'started': return <Plane className="h-4 w-4" />;
    case 'reviewed': return <MessageCircle className="h-4 w-4" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'completed': return 'from-green-400 to-emerald-500';
    case 'planning': return 'from-blue-400 to-cyan-500';
    case 'shared': return 'from-purple-400 to-pink-500';
    case 'started': return 'from-orange-400 to-red-500';
    case 'reviewed': return 'from-yellow-400 to-orange-500';
    default: return 'from-gray-400 to-gray-500';
  }
};

export const CommunityDiary: React.FC = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [likedActivities, setLikedActivities] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % communityActivities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = (activityId: number) => {
    setLikedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-surface to-background dark:from-dark-surface to-dark-background">
      <Container maxWidth="full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-primary font-medium">Live Community</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Travel Stories Unfolding
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Real-time updates from our travel community. Share your journey and get inspired by others.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Featured Activity */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentActivity}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {(() => {
                      const activity = communityActivities[currentActivity];
                      return (
                        <div>
                          {/* Header */}
                          <div className="p-6 border-b border-border dark:border-dark-border">
                            <div className="flex items-center gap-4">
                              <img
                                src={activity.avatar}
                                alt={activity.user}
                                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-text-primary dark:text-dark-text-primary">
                                    {activity.user}
                                  </span>
                                  <span className="text-text-secondary dark:text-dark-text-secondary">
                                    {activity.action}
                                  </span>
                                  <div className={`w-6 h-6 bg-gradient-to-r ${getActionColor(activity.action)} rounded-full flex items-center justify-center text-white`}>
                                    {getActionIcon(activity.action)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {activity.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {activity.duration}
                                  </span>
                                  <span>{activity.timeAgo}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative">
                            <img
                              src={activity.image}
                              alt={activity.trip}
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-xl font-bold mb-2">{activity.trip}</h3>
                              <p className="text-white/90 mb-3">{activity.highlight}</p>
                              
                              {/* Progress Bar for Planning */}
                              {activity.action === 'planning' && activity.progress && (
                                <div className="mb-3">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Planning Progress</span>
                                    <span>{activity.progress}%</span>
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${activity.progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Rating for Completed/Reviewed */}
                              {(activity.action === 'completed' || activity.action === 'reviewed') && activity.rating && (
                                <div className="flex items-center gap-1 mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < activity.rating ? 'text-yellow-400 fill-current' : 'text-white/40'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm">{activity.rating}/5</span>
                                </div>
                              )}

                              {/* Day Counter for Started */}
                              {activity.action === 'started' && activity.day && (
                                <div className="mb-3">
                                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                    Day {activity.day} of {activity.duration.split(' ')[0]}
                                  </span>
                                </div>
                              )}

                              {/* Photo Count for Shared */}
                              {activity.action === 'shared' && activity.photos && (
                                <div className="mb-3">
                                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                    📸 {activity.photos} photos shared
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <button
                                  onClick={() => handleLike(activity.id)}
                                  className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary hover:text-red-500 transition-colors"
                                >
                                  <Heart 
                                    className={`h-5 w-5 ${
                                      likedActivities.includes(activity.id) 
                                        ? 'text-red-500 fill-current' 
                                        : ''
                                    }`} 
                                  />
                                  <span className="text-sm">
                                    {activity.likes + (likedActivities.includes(activity.id) ? 1 : 0)}
                                  </span>
                                </button>
                                <button className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">
                                  <MessageCircle className="h-5 w-5" />
                                  <span className="text-sm">{activity.comments}</span>
                                </button>
                              </div>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Activity Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {communityActivities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentActivity(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentActivity
                        ? 'bg-primary w-8'
                        : 'bg-border dark:bg-dark-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Community Stats & Quick Actions */}
            <div className="space-y-6">
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Community Pulse
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Active Now</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-text-primary dark:text-dark-text-primary">1,247</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Trips Today</span>
                    <span className="font-medium text-text-primary dark:text-dark-text-primary">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Photos Shared</span>
                    <span className="font-medium text-text-primary dark:text-dark-text-primary">342</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary dark:text-dark-text-secondary">New Members</span>
                    <span className="font-medium text-text-primary dark:text-dark-text-primary">+156</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-bold mb-4">Join The Tribe</h3>
                <p className="text-white/90 mb-6 text-sm">
                  Connect with fellow travelers, share your adventures, and discover hidden gems together.
                </p>
                <div className="space-y-3">
                  <Button
                    fullWidth
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                  >
                    Share Your Trip
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Browse Community
                  </Button>
                </div>
              </motion.div>

              {/* Recent Activities List */}
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4">Recent Updates</h3>
                <div className="space-y-3">
                  {communityActivities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface dark:hover:bg-dark-surface/50 transition-colors">
                      <img
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary dark:text-dark-text-primary truncate">
                          <span className="font-medium">{activity.user}</span> {activity.action} {activity.trip}
                        </p>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{activity.timeAgo}</p>
                      </div>
                      <div className={`w-4 h-4 bg-gradient-to-r ${getActionColor(activity.action)} rounded-full flex items-center justify-center text-white text-xs`}>
                        {getActionIcon(activity.action)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};