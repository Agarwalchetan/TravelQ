import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Calendar } from 'lucide-react';
import { Container } from '../ui/Container';

const steps = [
  {
    id: 1,
    name: 'Create',
    description: 'Start with a template or from scratch to build your perfect itinerary.',
    icon: Compass,
  },
  {
    id: 2,
    name: 'Collaborate',
    description: 'Invite friends and family to contribute ideas and vote on activities.',
    icon: Users,
  },
  {
    id: 3,
    name: 'Book',
    description: 'Secure the best deals on flights, accommodations, and experiences.',
    icon: Calendar,
  },
];

export const HowItWorks: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 sm:py-24 bg-surface dark:bg-dark-surface">
      <Container maxWidth="full">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            How Wanderlust works
          </h2>
          <p className="mt-4 text-text-secondary dark:text-dark-text-secondary">
            Our simple three-step process makes planning your next adventure effortless.
          </p>
        </div>

        <motion.div
          className="mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            
            return (
              <motion.div 
                key={step.id}
                className="relative"
                variants={item}
              >
                <div className="flow-root rounded-lg bg-white dark:bg-dark-surface px-6 pb-8 pt-6 shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary dark:bg-dark-primary p-3 shadow-lg">
                        <Icon className="h-6 w-6 text-white dark:text-dark-background" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary">
                      {step.name}
                    </h3>
                    <p className="mt-3 text-base text-text-secondary dark:text-dark-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {step.id < steps.length && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="h-0.5 w-8 bg-border dark:bg-dark-border"></div>
                  </div>
                )}

                {/* Step number */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full bg-background dark:bg-dark-background border border-border dark:border-dark-border h-8 w-8 flex items-center justify-center">
                  <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{step.id}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};