import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, Eye, TrendingUp, Sparkles, User, Calendar, Clock, ArrowRight, Camera, Video, Mic, Send, X, ChevronDown, MapPin, Star, Users, Zap } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

// Blog posts data with enhanced metadata
const blogPosts = [
  {
    id: 1,
    title: 'How I Did Kasol in ₹3,000 - Complete Solo Guide',
    excerpt: 'From Delhi to the mountains of Himachal, here\'s how I managed a 4-day solo trip to Kasol without breaking the bank.',
    author: 'Priya Travels',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-01-10',
    readTime: '5 min read',
    category: 'Solo Travel',
    tags: ['Budget', 'Himachal', 'Solo', 'Mountains'],
    likes: 1240,
    comments: 89,
    views: 15600,
    type: 'article',
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: 'Goa Monsoon Magic: Why July is Perfect',
    excerpt: 'Contrary to popular belief, monsoon is the best time to experience Goa\'s true beauty. Here\'s my rain-soaked adventure.',
    author: 'Coastal Wanderer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-01-08',
    readTime: '7 min read',
    category: 'Seasonal Travel',
    tags: ['Goa', 'Monsoon', 'Beach', 'Photography'],
    likes: 987,
    comments: 156,
    views: 12400,
    type: 'video',
    featured: false,
    trending: true
  },
  {
    id: 3,
    title: 'Rajasthan Heritage Circuit: 10 Days, 8 Cities',
    excerpt: 'A comprehensive guide to exploring Rajasthan\'s royal heritage, from Jaipur\'s palaces to Jaisalmer\'s golden sands.',
    author: 'Heritage Hunter',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-01-05',
    readTime: '12 min read',
    category: 'Heritage',
    tags: ['Rajasthan', 'Culture', 'Heritage', 'Photography'],
    likes: 1456,
    comments: 203,
    views: 18900,
    type: 'article',
    featured: true,
    trending: false
  },
  {
    id: 4,
    title: 'Kerala Backwaters: Houseboat vs Homestay',
    excerpt: 'I tried both experiences in Alleppey and Kumarakom. Here\'s which one offers better value and authentic experience.',
    author: 'Backwater Explorer',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-01-03',
    readTime: '8 min read',
    category: 'Comparison',
    tags: ['Kerala', 'Backwaters', 'Accommodation', 'Local'],
    likes: 743,
    comments: 92,
    views: 9800,
    type: 'reel',
    featured: false,
    trending: true
  },
  {
    id: 5,
    title: 'Ladakh on a Motorcycle: Complete Route Guide',
    excerpt: 'Delhi to Leh via Manali - everything you need to know about the ultimate Indian road trip adventure.',
    author: 'Road Warrior',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-01-01',
    readTime: '15 min read',
    category: 'Adventure',
    tags: ['Ladakh', 'Motorcycle', 'Adventure', 'Road Trip'],
    likes: 2100,
    comments: 340,
    views: 25600,
    type: 'article',
    featured: true,
    trending: true
  },
  {
    id: 6,
    title: 'Andaman Islands: Hidden Beaches Guide',
    excerpt: 'Beyond Radhanagar and Elephant Beach - discover pristine shores that most tourists never find.',
    author: 'Island Hopper',
    avatar: 'https://images.pexels.com/photos/4350099/pexels-photo-4350099.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2024-12-28',
    readTime: '6 min read',
    category: 'Hidden Gems',
    tags: ['Andaman', 'Beaches', 'Hidden', 'Islands'],
    likes: 892,
    comments: 127,
    views: 11200,
    type: 'video',
    featured: false,
    trending: false
  }
];

// Community creators data
const communityCreators = [
  {
    id: 1,
    name: 'Priya Travels',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    specialty: 'Solo Female Travel',
    followers: '12.5K',
    posts: 45,
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: 'Mountain Mike',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    specialty: 'Trekking & Adventure',
    followers: '8.9K',
    posts: 32,
    verified: false,
    featured: false
  },
  {
    id: 3,
    name: 'Heritage Hunter',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    specialty: 'Cultural Photography',
    followers: '15.2K',
    posts: 67,
    verified: true,
    featured: true
  }
];

// Filter categories
const categories = ['All', 'Solo Travel', 'Adventure', 'Budget', 'Heritage', 'Beach', 'Mountains', 'Food & Culture'];
const contentTypes = ['All', 'Articles', 'Videos', 'Reels', 'AI Generated'];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'masonry' | 'list'>('masonry');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [showAIWriter, setShowAIWriter] = useState(false);
  const [featuredVideoPlaying, setFeaturedVideoPlaying] = useState(false);
  const [featuredVideoMuted, setFeaturedVideoMuted] = useState(true);

  useEffect(() => {
    document.title = 'Travel Stories & Tips - Real Journeys, Raw Emotions | Wanderlust Blog';
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    const matchesType = selectedType === 'All' || 
      (selectedType === 'Articles' && post.type === 'article') ||
      (selectedType === 'Videos' && post.type === 'video') ||
      (selectedType === 'Reels' && post.type === 'reel');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const trendingPosts = blogPosts.filter(post => post.trending).slice(0, 3);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSave = (postId: number) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="bg-background dark:bg-dark-background min-h-screen">
      {/* Hero Section - Visual Discovery + Smart Filters */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/10 dark:to-dark-accent/10 py-16">
        <Container maxWidth="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left - Search & Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-primary animate-pulse" />
                <span className="text-primary font-medium">Stories That Make You Pack</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-5xl mb-6">
                Real journeys. Raw emotions. Relatable travel advice.
              </h1>
              
              {/* Smart Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
                </div>
                <input
                  type="text"
                  placeholder="Solo travel in Goa, Budget Manali tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border border-border dark:border-dark-border rounded-2xl bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary text-lg"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border dark:border-dark-border hover:border-primary dark:hover:border-dark-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* AI Writer CTA */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h3 className="font-bold text-text-primary dark:text-dark-text-primary">
                    WanderAI Blog Generator
                  </h3>
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                  Create engaging travel blogs using AI. Share your experiences with the community!
                </p>
                <Button
                  onClick={() => setShowAIWriter(true)}
                  leftIcon={<Zap className="h-4 w-4" />}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  Generate Blog with AI
                </Button>
              </div>
            </motion.div>

            {/* Right - Featured Video/Reel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {featuredPost && (
                <div className="relative aspect-[9/16] max-w-sm mx-auto bg-white dark:bg-dark-surface rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Video Controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setFeaturedVideoPlaying(!featuredVideoPlaying)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                    >
                      {featuredVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => setFeaturedVideoMuted(!featuredVideoMuted)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                    >
                      {featuredVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 mb-3">
                      🔥 Featured
                    </Badge>
                    <h3 className="font-bold text-lg mb-2">{featuredPost.title}</h3>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {featuredPost.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {featuredPost.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {featuredPost.comments}
                      </span>
                    </div>
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                      Read Full Story
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </div>

      <Container maxWidth="full" className="py-12">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? "primary" : "outline"}
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            <div className="flex items-center gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-primary text-white'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg p-1 flex">
              <button
                className={`p-2 rounded ${viewMode === 'masonry' ? 'bg-primary text-white' : 'text-text-secondary dark:text-dark-text-secondary'}`}
                onClick={() => setViewMode('masonry')}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary dark:text-dark-text-secondary'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
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
                    Sort By
                  </label>
                  <select className="w-full p-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                    <option>Latest</option>
                    <option>Popular</option>
                    <option>Most Liked</option>
                    <option>Most Viewed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                    Read Time
                  </label>
                  <select className="w-full p-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                    <option>Any Duration</option>
                    <option>Quick Read (1-5 min)</option>
                    <option>Medium (5-10 min)</option>
                    <option>Long Read (10+ min)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                    Author Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Verified', 'Community', 'AI Generated'].map((type) => (
                      <button
                        key={type}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary border border-border dark:border-dark-border hover:border-primary dark:hover:border-dark-primary"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full p-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Masonry Blog Grid */}
            {viewMode === 'masonry' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedPost(post.id)}
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Content Type Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`${
                            post.type === 'video' ? 'bg-red-500' :
                            post.type === 'reel' ? 'bg-purple-500' :
                            'bg-blue-500'
                          } text-white border-0`}>
                            {post.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                            {post.type === 'reel' && <Camera className="h-3 w-3 mr-1" />}
                            {post.type === 'article' && <User className="h-3 w-3 mr-1" />}
                            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                          </Badge>
                        </div>

                        {/* Trending Badge */}
                        {post.trending && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                              🔥 Trending
                            </Badge>
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(post.id);
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              likedPosts.includes(post.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                            }`}
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSave(post.id);
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              savedPosts.includes(post.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                            }`}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.avatar}
                              alt={post.author}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                              {post.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-text-secondary dark:text-dark-text-secondary">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPost(post.id)}>
                      <div className="md:flex">
                        <div className="md:w-1/3 relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          {post.trending && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                                🔥 Trending
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="md:w-2/3 p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                            {post.title}
                          </h3>

                          <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={post.avatar}
                                alt={post.author}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <div className="font-medium text-text-primary dark:text-dark-text-primary">
                                  {post.author}
                                </div>
                                <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                  {new Date(post.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {post.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Picks & Reels */}
            <Card className="p-6">
              <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                What's Popular This Week
              </h3>
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <div key={post.id} className="flex gap-3 cursor-pointer hover:bg-surface dark:hover:bg-dark-surface/50 p-2 rounded-lg transition-colors">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary dark:text-dark-text-primary text-sm line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                          {post.author}
                        </span>
                        <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                          {post.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Featured Creators */}
            <Card className="p-6">
              <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Featured Creators
              </h3>
              <div className="space-y-4">
                {communityCreators.filter(creator => creator.featured).map((creator) => (
                  <div key={creator.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {creator.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-text-primary dark:text-dark-text-primary">
                        {creator.name}
                      </div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {creator.specialty}
                      </div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {creator.followers} followers • {creator.posts} posts
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Newsletter Signup */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Travel Stories in Your Inbox
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-4">
                Get the best travel stories and tips delivered weekly
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary"
                />
                <Button fullWidth className="bg-gradient-to-r from-primary to-secondary">
                  Subscribe
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* AI Writer Modal */}
        <AnimatePresence>
          {showAIWriter && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAIWriter(false)}
            >
              <motion.div
                className="bg-white dark:bg-dark-surface rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary dark:text-dark-text-primary">
                        WanderAI Blog Generator
                      </h3>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        Create engaging travel content with AI
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIWriter(false)}
                    className="w-8 h-8 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center hover:bg-border dark:hover:bg-dark-border transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Goa, Manali, Kerala..."
                      className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Trip Duration
                      </label>
                      <select className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                        <option>1-3 days</option>
                        <option>4-7 days</option>
                        <option>1-2 weeks</option>
                        <option>2+ weeks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Trip Type
                      </label>
                      <select className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                        <option>Solo Travel</option>
                        <option>Family Trip</option>
                        <option>Group Adventure</option>
                        <option>Romantic Getaway</option>
                        <option>Business Travel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Personal Tone
                    </label>
                    <select className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary">
                      <option>Casual & Friendly</option>
                      <option>Professional & Informative</option>
                      <option>Humorous & Light</option>
                      <option>Inspirational & Motivating</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      placeholder="Share any specific experiences, challenges, or highlights you want to include..."
                      rows={4}
                      className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setShowAIWriter(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-secondary"
                      leftIcon={<Sparkles className="h-4 w-4" />}
                    >
                      Generate Blog
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default BlogPage;