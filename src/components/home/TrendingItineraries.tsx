import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, DollarSign, Heart, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const trendingItineraries = [
  {
    id: 1,
    title: 'Bali Bliss: Temples & Beaches',
    creator: 'Sarah Chen',
    creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    duration: '7 days',
    destinations: ['Ubud', 'Canggu', 'Uluwatu'],
    budget: '$1,200',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Culture', 'Beach', 'Wellness'],
    likes: 1240,
    isInfluencer: true
  },
  {
    id: 2,
    title: 'Tokyo Tech & Tradition',
    creator: 'Alex Kim',
    creatorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    duration: '10 days',
    destinations: ['Shibuya', 'Kyoto', 'Osaka'],
    budget: '$2,500',
    rating: 4.8,
    reviews: 189,
    image: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Technology', 'Food', 'History'],
    likes: 987,
    isInfluencer: false
  },
  {
    id: 3,
    title: 'Greek Island Hopping',
    creator: 'Maria Santos',
    creatorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    duration: '12 days',
    destinations: ['Santorini', 'Mykonos', 'Crete'],
    budget: '$1,800',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Romance', 'Beach', 'Wine'],
    likes: 1456,
    isInfluencer: true
  },
  {
    id: 4,
    title: 'Iceland Northern Lights',
    creator: 'Erik Larsson',
    creatorAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    duration: '8 days',
    destinations: ['Reykjavik', 'Blue Lagoon', 'Jokulsarlon'],
    budget: '$2,200',
    rating: 4.7,
    reviews: 98,
    image: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Adventure', 'Nature', 'Photography'],
    likes: 743,
    isInfluencer: false
  }
];

export const TrendingItineraries: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-surface to-background dark:from-dark-surface to-dark-background">
      <Container maxWidth="full">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-medium">Trending Now</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
              Itineraries Everyone's Talking About
            </h2>
            <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary">
              Discover trips curated by travel influencers and top-rated by our community
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trendingItineraries.map((itinerary) => (
            <motion.div key={itinerary.id} variants={item}>
              <div className="group relative bg-white dark:bg-dark-surface rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {itinerary.isInfluencer && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                        ✨ Influencer
                      </Badge>
                    )}
                    <Badge className="bg-white/90 text-gray-800 border-0">
                      {itinerary.duration}
                    </Badge>
                  </div>
                  
                  {/* Like button */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  
                  {/* Creator info overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <img
                      src={itinerary.creatorAvatar}
                      alt={itinerary.creator}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-white text-sm font-medium">{itinerary.creator}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2">
                    {itinerary.title}
                  </h3>
                  
                  {/* Destinations */}
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {itinerary.destinations.join(' → ')}
                    </span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{itinerary.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{itinerary.rating}</span>
                      <span className="text-sm text-text-secondary dark:text-dark-text-secondary">({itinerary.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {itinerary.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-text-secondary dark:text-dark-text-secondary">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{itinerary.likes}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/explore">
            <Button
              size="lg"
              variant="outline"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Explore All Itineraries
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};