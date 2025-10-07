import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, MessageCircle, Bot, User, CreditCard, Compass, Smartphone, Brain, Users, HelpCircle, CheckCircle, AlertTriangle, Clock, ThumbsUp, ThumbsDown, Send, Paperclip, Star, ArrowUp, Phone, Globe, Shield, Zap, Heart, MapPin, Calendar, Sparkles, X, Play, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { faqs } from '../data/faqs';

// Help categories with enhanced data
const helpCategories = [
  {
    id: 'account',
    title: 'Account & Login',
    description: 'Access, password, email changes',
    icon: User,
    color: 'from-blue-400 to-blue-600',
    articleCount: 12,
    popular: true
  },
  {
    id: 'booking',
    title: 'Payments & Booking',
    description: 'Payment methods, refunds, booking edits',
    icon: CreditCard,
    color: 'from-green-400 to-green-600',
    articleCount: 18,
    popular: true
  },
  {
    id: 'planning',
    title: 'Trip Planning Help',
    description: 'How to use the planner, save trips',
    icon: Compass,
    color: 'from-purple-400 to-purple-600',
    articleCount: 25,
    popular: false
  },
  {
    id: 'technical',
    title: 'App & Website Issues',
    description: 'Loading errors, crashes, UI bugs',
    icon: Smartphone,
    color: 'from-red-400 to-red-600',
    articleCount: 8,
    popular: false
  },
  {
    id: 'ai',
    title: 'Using WanderAI',
    description: 'Tips for AI prompts, limitations',
    icon: Brain,
    color: 'from-yellow-400 to-orange-500',
    articleCount: 15,
    popular: true
  },
  {
    id: 'collaboration',
    title: 'Group Planning',
    description: 'Invites, trip sharing, collaboration',
    icon: Users,
    color: 'from-pink-400 to-pink-600',
    articleCount: 10,
    popular: false
  }
];

// Support options
const supportOptions = [
  {
    id: 'ai',
    title: 'Ask WanderBot',
    subtitle: 'Instant AI assistance',
    description: 'Get smart answers about trip planning, bookings, and features',
    icon: Bot,
    status: 'online',
    responseTime: 'Instant',
    color: 'from-primary to-secondary',
    available: true
  },
  {
    id: 'chat',
    title: 'Chat with Human',
    subtitle: 'Live agent support',
    description: 'Connect with our travel experts for personalized help',
    icon: MessageCircle,
    status: 'online',
    responseTime: '~2 minutes',
    color: 'from-green-400 to-emerald-500',
    available: true
  },
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'Detailed assistance',
    description: 'Send us your questions and get detailed replies',
    icon: Mail,
    status: 'available',
    responseTime: '~24 hours',
    color: 'from-blue-400 to-cyan-500',
    available: true
  }
];

// Quick suggestions
const quickSuggestions = [
  'How to invite friends to a trip?',
  'Where can I find my saved itineraries?',
  'How do I get a refund?',
  'Why is my booking not confirmed?',
  'How to use AI trip planner?',
  'Can I edit my trip after booking?'
];

// Live alerts (mock data)
const liveAlerts = [
  {
    id: 1,
    type: 'weather',
    title: 'Weather Alert',
    message: 'Heavy rains expected in Goa this week',
    icon: AlertTriangle,
    color: 'text-orange-500',
    urgent: false
  },
  {
    id: 2,
    type: 'travel',
    title: 'Flight Reminder',
    message: 'Your flight to Jaipur leaves in 3 days',
    icon: Calendar,
    color: 'text-blue-500',
    urgent: false
  }
];

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    bookingId: '',
    category: '',
    message: '',
    urgent: false
  });

  useEffect(() => {
    document.title = 'Help Center - Wander with Confidence | Wanderlust';
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleFaq = (id: string) => {
    // Navigate to individual FAQ page
    navigate(`/help/${id}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to category page
    navigate(`/help/category/${categoryId}`);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    setShowTicketForm(false);
    // Reset form
    setTicketForm({
      name: '',
      email: '',
      bookingId: '',
      category: '',
      message: '',
      urgent: false
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background dark:bg-dark-background min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/10 dark:to-dark-accent/10 py-16">
        <Container maxWidth="full">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-primary animate-pulse" />
                  <span className="text-primary font-medium">Wander with Confidence</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-5xl mb-6">
                  Need Help? Let's Get You Back on Track.
                </h1>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
                  Search FAQs, talk to our AI, or chat with a real human — we're here to support your journey, 
                  whether it's planning help, booking issues, or just trip jitters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => setShowAIChat(true)}
                    leftIcon={<Bot className="h-5 w-5" />}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    Start AI Chat
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                    leftIcon={<Search className="h-5 w-5" />}
                  >
                    Search Articles
                  </Button>
                </div>
              </motion.div>

              {/* Right side - Support illustration */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-8 border border-border dark:border-dark-border">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <HelpCircle className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                      We're Here to Help
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">24/7 Support</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Instant AI</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Expert Team</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Join 100K+ travelers who trust our support
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      <Container maxWidth="full" className="py-12">
        {/* Smart Search Section */}
        <motion.div
          id="search-section"
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                What can we help you with?
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Search our knowledge base or browse popular topics
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search for help articles, guides, or ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-border dark:border-dark-border rounded-2xl bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary text-lg shadow-sm"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary rounded-full text-sm hover:bg-primary/10 dark:hover:bg-dark-primary/10 hover:text-primary dark:hover:text-dark-primary transition-colors border border-border dark:border-dark-border"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Support Options */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Get Instant Support
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Choose how you'd like to get help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 relative`}>
                        <Icon className="h-8 w-8 text-white" />
                        {option.status === 'online' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                      <p className="text-sm text-primary font-medium">{option.subtitle}</p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                        {option.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
                        <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          {option.responseTime}
                        </span>
                      </div>
                      <Button
                        fullWidth
                        className={`bg-gradient-to-r ${option.color}`}
                        onClick={() => {
                          if (option.id === 'ai') setShowAIChat(true);
                          else if (option.id === 'email') setShowTicketForm(true);
                          else setSelectedSupport(option.id);
                        }}
                      >
                        {option.id === 'ai' ? 'Start AI Chat' : 
                         option.id === 'chat' ? 'Start Live Chat' : 
                         'Send Email'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Help Categories Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Browse by Topic
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Find answers organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                              {category.title}
                            </h3>
                            {category.popular && (
                              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-3">
                            {category.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                              {category.articleCount} articles
                            </span>
                            <ArrowRight className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              {activeCategory && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-text-secondary dark:text-dark-text-secondary">Showing:</span>
                  <Badge variant="primary">{activeCategory}</Badge>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.slice(0, 6).map((faq) => (
                  <motion.div 
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group" onClick={() => handleToggleFaq(faq.id)}>
                      <div className="flex justify-between items-center w-full p-6">
                        <span className="font-medium text-text-primary dark:text-dark-text-primary pr-4 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                          {faq.question}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {faq.category}
                          </Badge>
                          <ArrowRight className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-text-secondary dark:text-dark-text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                    No results found
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary max-w-md mx-auto mb-4">
                    We couldn't find answers matching your search. Try different keywords or contact our support team.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory(null);
                      }}
                    >
                      Clear filters
                    </Button>
                    <Button onClick={() => setShowAIChat(true)}>
                      Ask AI Assistant
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {filteredFaqs.length > 6 && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/help/all-faqs')}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  View All FAQs ({filteredFaqs.length})
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Live Trip Alerts */}
        {liveAlerts.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6 text-center">
                Live Trip Updates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveAlerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <Card key={alert.id} className="p-4 border-l-4 border-l-primary">
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 ${alert.color} mt-0.5`} />
                        <div>
                          <h4 className="font-medium text-text-primary dark:text-dark-text-primary">
                            {alert.title}
                          </h4>
                          <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Options */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Still Need Help?
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Our team is here to support your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary dark:text-dark-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Email Support
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                Our team typically responds within 24 hours on business days.
              </p>
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => setShowTicketForm(true)}
              >
                Send an Email
              </Button>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary dark:text-dark-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Live Chat
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                Available Monday to Friday, 9am-5pm Eastern Time.
              </p>
              <Button fullWidth>
                Start Chat
              </Button>
            </Card>
          </div>
        </motion.div>
      </Container>

      {/* Ticket Form Modal */}
      <AnimatePresence>
        {showTicketForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTicketForm(false)}
          >
            <motion.div
              className="bg-white dark:bg-dark-surface rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                  Submit a Support Ticket
                </h3>
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="w-8 h-8 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center hover:bg-border dark:hover:bg-dark-border transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleTicketSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Booking/Trip ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={ticketForm.bookingId}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, bookingId: e.target.value }))}
                      className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account & Login</option>
                      <option value="booking">Booking & Payments</option>
                      <option value="planning">Trip Planning</option>
                      <option value="technical">Technical Issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Please describe your issue in detail..."
                    className="w-full p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={ticketForm.urgent}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, urgent: e.target.checked }))}
                    className="rounded border-border dark:border-dark-border"
                  />
                  <label htmlFor="urgent" className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Mark as urgent (affects travel plans)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                    leftIcon={<Send className="h-4 w-4" />}
                  >
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAIChat(false)}
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
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary dark:text-dark-text-primary">WanderBot</h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">AI Travel Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIChat(false)}
                  className="w-8 h-8 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center hover:bg-border dark:hover:bg-dark-border transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-surface dark:bg-dark-surface/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-text-primary dark:text-dark-text-primary">
                        Hi! I'm WanderBot, your AI travel assistant. I can help you with:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        <li>• Trip planning questions</li>
                        <li>• Booking and payment issues</li>
                        <li>• Feature explanations</li>
                        <li>• Travel recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-text-primary dark:text-dark-text-primary">Quick questions:</h4>
                {[
                  "How do I invite friends to my trip?",
                  "What's included in the Pro plan?",
                  "How do I get a refund?",
                  "Can you help me plan a trip to Goa?"
                ].map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 bg-surface dark:bg-dark-surface rounded-lg hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-text-primary dark:text-dark-text-primary">
                        {question}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border dark:border-dark-border">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    className="flex-1 p-3 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-40"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button 
          onClick={() => setShowAIChat(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 group"
          aria-label="Open AI chat"
        >
          <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
            <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HelpPage;