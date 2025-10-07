import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-primary dark:bg-dark-primary/20">
      <Container maxWidth="full">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-white dark:text-dark-text-primary sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to plan your next adventure?
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-white/80 dark:text-dark-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of travelers who use Wanderlust to create unforgettable experiences.
            Start for free, no credit card required.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/signup">
              <Button 
                size="lg" 
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="bg-white text-primary hover:bg-white/90 dark:bg-dark-primary dark:text-dark-background dark:hover:bg-dark-primary/90"
              >
                Start planning for free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 dark:border-dark-text-primary dark:text-dark-text-primary dark:hover:bg-dark-primary/10"
              >
                View pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};