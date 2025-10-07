import React, { useState, useEffect } from 'react';
import { Check, HelpCircle, ArrowRight, Zap, Gift, Users, Star, Globe, ChevronDown, ChevronUp, Sparkles, CreditCard, Shield, TrendingUp, Award, Heart, MessageCircle, Crown, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const currencies = [
  { code: 'INR', symbol: '₹', flag: '🇮🇳', rates: { free: 0, pro: 199, elite: 499 } },
  { code: 'USD', symbol: '$', flag: '🇺🇸', rates: { free: 0, pro: 2.5, elite: 6 } },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', rates: { free: 0, pro: 2, elite: 5 } },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', rates: { free: 0, pro: 2.3, elite: 5.5 } }
];

const plans = [
  {
    id: 'free',
    name: 'WanderFree',
    tagline: 'Perfect for casual explorers',
    icon: '🎒',
    gradient: 'from-gray-400 to-gray-600',
    features: {
      price: 'free',
      itineraryLimit: '5',
      aiGenerator: 'Limited',
      bookingCashback: '❌',
      groupPlanner: '✅',
      expenseSplitter: '✅',
      communityAccess: 'View only',
      tripCredits: '❌',
      support: '❌'
    },
    highlights: ['Free forever', 'Basic trip planning', 'Community access'],
    cta: 'Start Free',
    popular: false
  },
  {
    id: 'pro',
    name: 'WanderPro',
    tagline: 'For passionate travelers',
    icon: '🚀',
    gradient: 'from-blue-500 to-purple-600',
    features: {
      price: 'pro',
      itineraryLimit: '25',
      aiGenerator: 'Full Access',
      bookingCashback: '3%',
      groupPlanner: '✅',
      expenseSplitter: '✅',
      communityAccess: 'Comment',
      tripCredits: '₹100/month',
      support: 'Email'
    },
    highlights: ['AI-powered planning', 'Booking cashback', 'Trip credits'],
    cta: 'Try Pro for Free',
    popular: true
  },
  {
    id: 'elite',
    name: 'WanderElite',
    tagline: 'For travel enthusiasts',
    icon: '👑',
    gradient: 'from-yellow-400 to-orange-500',
    features: {
      price: 'elite',
      itineraryLimit: 'Unlimited',
      aiGenerator: 'GPT-4o Powered +',
      bookingCashback: '7% + Travel Vouchers',
      groupPlanner: '✅',
      expenseSplitter: '✅',
      communityAccess: 'Post + Featured',
      tripCredits: '₹250/month',
      support: 'Priority Chat'
    },
    highlights: ['Unlimited everything', 'Premium AI', 'VIP treatment'],
    cta: 'Go Elite',
    popular: false
  }
];

const testimonials = [
  {
    id: 1,
    quote: "I planned my Goa trip in under 10 mins with WanderPro. Game changer!",
    author: "@RheaSolo",
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    plan: 'WanderPro',
    destination: '🇮🇳 Goa'
  },
  {
    id: 2,
    quote: "WanderElite gave me cashback worth ₹700 last month. Worth it.",
    author: "@NomadDev",
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    plan: 'WanderElite',
    destination: '🇹🇭 Thailand'
  },
  {
    id: 3,
    quote: "The AI suggestions are spot-on. Saved me hours of research!",
    author: "@TravelMama",
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    plan: 'WanderPro',
    destination: '🇯🇵 Japan'
  }
];

const faqs = [
  {
    id: 'faq-1',
    question: 'Is Wanderlust free forever?',
    answer: 'Yes! WanderFree gives you access to basic trip planning features forever. You can create up to 5 itineraries, join group planning, and access our community - all at no cost.'
  },
  {
    id: 'faq-2',
    question: 'What happens if I cancel Pro?',
    answer: 'You can cancel anytime. Your account will remain active until the end of your billing period, then automatically switch to WanderFree. All your saved trips and data remain intact.'
  },
  {
    id: 'faq-3',
    question: 'Do unused Trip Credits roll over?',
    answer: 'Trip Credits expire at the end of each billing cycle to ensure fresh deals and partnerships. However, any credits earned from referrals never expire!'
  },
  {
    id: 'faq-4',
    question: 'How do refunds work on bookings?',
    answer: 'Refunds depend on the booking partner\'s policy. We facilitate the process and our Pro/Elite members get priority support for any booking issues.'
  },
  {
    id: 'faq-5',
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Absolutely! Upgrade instantly and pay the prorated difference. Downgrades take effect at your next billing cycle to ensure you get full value.'
  }
];

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [comparisonSlider, setComparisonSlider] = useState(1);
  const [referralProgress, setReferralProgress] = useState(2);

  useEffect(() => {
    document.title = 'Pricing - Fuel Your Wanderlust, Your Way';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const formatPrice = (planType: string) => {
    const rate = selectedCurrency.rates[planType as keyof typeof selectedCurrency.rates];
    if (rate === 0) return 'Free';
    const price = isAnnual ? rate * 10 : rate; // 17% discount for annual
    return `${selectedCurrency.symbol}${price}`;
  };

  const getSliderPlan = () => {
    if (comparisonSlider === 0) return plans[0];
    if (comparisonSlider === 1) return plans[1];
    return plans[2];
  };

  return (
    <div className="bg-background dark:bg-dark-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-primary/10 dark:to-dark-accent/10 py-16">
        <Container maxWidth="full">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  <span className="text-primary font-medium">Fuel Your Wanderlust, Your Way</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-5xl mb-6">
                  Whether you're a solo backpacker or leading a group of 10, Wanderlust has a plan for you.
                </h1>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-lg text-text-secondary dark:text-dark-text-secondary">
                      Free forever for casual explorers.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-lg text-text-secondary dark:text-dark-text-secondary">
                      Premium perks for power travelers.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Compare Plans
                  </Button>
                  <Button size="lg" variant="outline" leftIcon={<Zap className="h-5 w-5" />}>
                    Try Pro for Free
                  </Button>
                </div>
              </motion.div>

              {/* Right side - Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-8 border border-border dark:border-dark-border">
                  <div className="text-center">
                    <div className="flex justify-center gap-8 mb-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mb-3">
                          <span className="text-2xl">🗺️</span>
                        </div>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Free Map</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                          <span className="text-2xl">🎫</span>
                        </div>
                        <p className="text-sm font-medium text-primary">Premium Pass</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <span className="text-3xl">🧭</span>
                      </div>
                      <p className="font-medium text-text-primary dark:text-dark-text-primary">Choose Your Adventure</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      <Container maxWidth="full" className="py-16">
        {/* Currency Switcher & Billing Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 max-w-6xl mx-auto">
          {/* Currency Switcher */}
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
            <select
              value={selectedCurrency.code}
              onChange={(e) => setSelectedCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
              className="bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg px-3 py-2 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code}
                </option>
              ))}
            </select>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'text-text-primary dark:text-dark-text-primary font-medium' : 'text-text-secondary dark:text-dark-text-secondary'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-text-primary dark:text-dark-text-primary font-medium' : 'text-text-secondary dark:text-dark-text-secondary'}`}>
              Yearly
            </span>
            {isAnnual && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium"
              >
                💸 Save 17%
              </motion.div>
            )}
          </div>
        </div>

        {/* Interactive Pricing Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`h-full relative overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-primary dark:ring-dark-primary shadow-2xl' 
                    : 'shadow-lg'
                }`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-4 py-1">
                        ⭐ Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{plan.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-white/90 text-sm">{plan.tagline}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          {formatPrice(plan.features.price)}
                        </span>
                        {plan.features.price !== 'free' && (
                          <span className="text-white/80">/{isAnnual ? 'year' : 'month'}</span>
                        )}
                      </div>
                      {isAnnual && plan.features.price !== 'free' && (
                        <p className="text-white/70 text-xs mt-1">
                          Billed annually
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {plan.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-text-secondary dark:text-dark-text-secondary">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Detailed Features Table */}
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Itinerary Limit</span>
                        <span className="font-medium text-text-primary dark:text-dark-text-primary">{plan.features.itineraryLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">AI Generator</span>
                        <span className="font-medium text-text-primary dark:text-dark-text-primary">{plan.features.aiGenerator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Cashback</span>
                        <span className="font-medium text-text-primary dark:text-dark-text-primary">{plan.features.bookingCashback}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary dark:text-dark-text-secondary">Trip Credits</span>
                        <span className="font-medium text-text-primary dark:text-dark-text-primary">{plan.features.tripCredits}</span>
                      </div>
                    </div>

                    <Button
                      fullWidth
                      variant={plan.popular ? 'primary' : 'outline'}
                      className={plan.popular ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Why Upgrade Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Why Upgrade?
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Unlock the full potential of your travel planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                AI Power Trip Planner
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Auto-generate multi-day plans, adapt in real time, and get insider recommendations.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                Earn While You Travel
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                WanderPro gives you monthly Trip Credits + cashback on every booking.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                Boosted Visibility
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Featured badges, priority feed placement, and custom branding on shared itineraries.
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              See the Difference
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Move the slider to see how your experience transforms
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="mb-8">
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={comparisonSlider}
                  onChange={(e) => setComparisonSlider(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span>Free</span>
                  <span>Pro</span>
                  <span>Elite</span>
                </div>
              </div>

              <motion.div
                key={comparisonSlider}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className={`w-24 h-24 bg-gradient-to-r ${getSliderPlan().gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-4xl">{getSliderPlan().icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                  {getSliderPlan().name}
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                  {getSliderPlan().tagline}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-surface dark:bg-dark-surface rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{getSliderPlan().features.itineraryLimit}</div>
                    <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Itineraries</div>
                  </div>
                  <div className="text-center p-4 bg-surface dark:bg-dark-surface rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">{getSliderPlan().features.bookingCashback}</div>
                    <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Cashback</div>
                  </div>
                  <div className="text-center p-4 bg-surface dark:bg-dark-surface rounded-lg">
                    <div className="text-2xl font-bold text-secondary mb-1">{getSliderPlan().features.tripCredits}</div>
                    <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Credits</div>
                  </div>
                  <div className="text-center p-4 bg-surface dark:bg-dark-surface rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">{getSliderPlan().features.support}</div>
                    <div className="text-xs text-text-secondary dark:text-dark-text-secondary">Support</div>
                  </div>
                </div>
              </motion.div>
            </Card>
          </div>
        </motion.div>

        {/* Special Offers & Referrals */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Referral Program */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                    Unlock Pro for Free
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    Invite 3 friends who book with your code
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary dark:text-dark-text-secondary">Progress</span>
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">{referralProgress}/3 Invites</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(referralProgress / 3) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <Button fullWidth leftIcon={<Users className="h-4 w-4" />}>
                Invite Friends
              </Button>
            </Card>

            {/* Limited Time Offer */}
            <Card className="p-6 bg-gradient-to-r from-orange-400/10 to-red-500/10 border-orange-400/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                    Summer Bonanza
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    Get 2 months Pro at ₹99 only!
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>Offer ends in 5 days</span>
                </div>
              </div>
              
              <Button fullWidth className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                Claim Offer
              </Button>
            </Card>
          </div>
        </motion.div>

        {/* Social Proof / Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Real experiences from real adventurers
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].author}
                      className="w-16 h-16 rounded-full border-2 border-primary"
                    />
                    <div className="text-left">
                      <div className="font-bold text-text-primary dark:text-dark-text-primary">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {testimonials[currentTestimonial].plan} • {testimonials[currentTestimonial].destination}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-xl text-text-primary dark:text-dark-text-primary mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  <div className="flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentTestimonial
                            ? 'bg-primary w-8'
                            : 'bg-border dark:bg-dark-border'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex justify-between items-center w-full p-6 text-left"
                >
                  <span className="font-medium text-text-primary dark:text-dark-text-primary">
                    {faq.question}
                  </span>
                  {activeFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-text-secondary dark:text-dark-text-secondary border-t border-border dark:border-dark-border">
                        <p className="mt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary text-white p-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12" />
              <div className="text-left">
                <h2 className="text-3xl font-bold">Need a custom solution?</h2>
                <p className="text-white/90">Enterprise & Educational Plans</p>
              </div>
            </div>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We offer tailored plans for travel agencies, corporate travel departments, and educational institutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                leftIcon={<MessageCircle className="h-5 w-5" />}
              >
                Contact Sales
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                leftIcon={<Award className="h-5 w-5" />}
              >
                View Enterprise Features
              </Button>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default PricingPage;