import React from 'react';
import { Container } from '../ui/Container';
import { Sparkles, Users, MapPin, TrendingUp, Star, Heart } from 'lucide-react';

export const SEOContent: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-surface/50 to-background dark:from-dark-surface/30 dark:to-dark-background">
      <Container maxWidth="full">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary dark:text-dark-primary animate-pulse" />
              <span className="text-primary dark:text-dark-primary font-medium">Why Choose Wanderlust</span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary sm:text-4xl mb-6">
              India's Favorite Travel Planner
            </h2>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
              Trusted by over 100,000 travelers for creating unforgettable journeys across India and beyond
            </p>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-soft border border-border/50 dark:border-dark-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                  Smart Trip Planning Made Simple
                </h3>
              </div>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                Wanderlust lets you explore real itineraries, plan trips with friends, and book instantly with AI support. 
                Discover destinations like <span className="font-medium text-primary dark:text-dark-primary">Manali</span>, <span className="font-medium text-primary dark:text-dark-primary">Goa</span>, <span className="font-medium text-primary dark:text-dark-primary">Udaipur</span>, and beyond. Whether you're a solo traveler or planning 
                a college trip, our smart planner simplifies everything.
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                Our AI-powered platform analyzes millions of travel data points to suggest personalized itineraries 
                based on your preferences, budget, and travel style. From budget backpacking to luxury getaways, 
                we've got you covered.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-soft border border-border/50 dark:border-dark-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                  Community-Driven Travel Experiences
                </h3>
              </div>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                Join thousands of travelers sharing real experiences from destinations across India and beyond. 
                Get insider tips for popular destinations like <span className="font-medium text-primary dark:text-dark-primary">Rishikesh</span>, <span className="font-medium text-primary dark:text-dark-primary">Kerala backwaters</span>, 
                <span className="font-medium text-primary dark:text-dark-primary"> Ladakh</span>, <span className="font-medium text-primary dark:text-dark-primary">Andaman Islands</span>, and <span className="font-medium text-primary dark:text-dark-primary">Rajasthan heritage circuits</span>.
              </p>
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                Our community features verified reviews, photo galleries, and detailed expense breakdowns to help 
                you plan better. Connect with like-minded travelers, join group trips, and share your own adventures.
              </p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/30">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">
                  Popular Destinations
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Goa Beach Holidays
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Himachal Pradesh Treks
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Kerala Backwater Tours
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Rajasthan Heritage Trips
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Ladakh Adventure Expeditions
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">
                  Trip Types
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Solo Travel Adventures
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Family Vacation Packages
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  College Group Trips
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Honeymoon Destinations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Weekend Getaways
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">
                  Budget Options
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Budget Trips Under ₹5,000
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Mid-range ₹10,000-25,000
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Luxury Experiences ₹50,000+
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Backpacking Adventures
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  All-Inclusive Packages
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent p-8 rounded-3xl text-white text-center shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-white animate-pulse" />
              <Star className="h-6 w-6 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Start Your Journey Today
            </h3>
            <p className="text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed">
              Ready to explore India and beyond? Join over 100,000 travelers who trust Wanderlust for their 
              trip planning needs. From the snow-capped peaks of the Himalayas to the pristine beaches of 
              the Andaman Islands, your next adventure is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all">
                Start Planning Free
              </button>
              <button className="bg-white text-primary px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-all">
                Explore Destinations
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">100K+</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Happy Travelers</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">50K+</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Trip Plans Created</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">4.9★</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Average Rating</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-1">195+</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Destinations</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};