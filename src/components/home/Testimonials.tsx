import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Container } from '../ui/Container';
import { testimonials } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-background dark:bg-dark-background">
      <Container maxWidth="full">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl text-center">
            Loved by travelers worldwide
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary text-center">
            Hear from our users who have transformed their travel experiences with Wanderlust.
          </p>
          
          <div className="mt-12 relative">
            <div className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6">
              <Quote className="h-12 w-12 text-primary/20 dark:text-dark-primary/20" />
            </div>
            
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-dark-surface rounded-lg shadow-lg p-8 md:p-10"
            >
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:flex-1">
                  <p className="text-xl text-text-primary dark:text-dark-text-primary md:text-2xl md:leading-8">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={testimonials[currentIndex].avatar} 
                        alt={testimonials[currentIndex].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-semibold text-text-primary dark:text-dark-text-primary">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-6 flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex
                      ? 'bg-primary dark:bg-dark-primary'
                      : 'bg-border dark:bg-dark-border'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-dark-surface border border-border dark:border-dark-border shadow-sm hover:bg-surface dark:hover:bg-dark-surface/80 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-text-primary dark:text-dark-text-primary" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-dark-surface border border-border dark:border-dark-border shadow-sm hover:bg-surface dark:hover:bg-dark-surface/80 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-text-primary dark:text-dark-text-primary" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};