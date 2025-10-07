import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutTemplate, Users, DollarSign, MapPin, WifiOff } from 'lucide-react';
import { Container } from '../ui/Container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { featureCards } from '../../data/features';

export const FeatureHighlights: React.FC = () => {
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

  // Map of icon names to components
  const iconMap = {
    LayoutTemplate,
    Users,
    DollarSign,
    MapPin,
    WifiOff
  };

  return (
    <section className="py-16 sm:py-24 bg-background dark:bg-dark-background">
      <Container maxWidth="full">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Plan your dream trip with powerful features
          </h2>
          <p className="mt-4 text-text-secondary dark:text-dark-text-secondary">
            Everything you need to create, share, and enjoy your perfect travel experience.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featureCards.map((feature) => {
            // Dynamically select the icon component
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div key={feature.id} variants={item}>
                <Card hoverable className="h-full flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-dark-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary dark:text-dark-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow"></CardContent>
                  <CardFooter>
                    <Link 
                      to={feature.link}
                      className="text-sm font-medium text-primary dark:text-dark-primary inline-flex items-center hover:underline"
                    >
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};