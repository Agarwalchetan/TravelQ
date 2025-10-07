import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Backpack, CreditCard, CheckCircle, ExternalLink, Calculator, FileText, Plane } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const essentialTools = [
  {
    id: 'insurance',
    title: 'Travel Insurance',
    subtitle: 'Protect your journey',
    icon: Shield,
    description: 'Get instant quotes from top insurers',
    features: ['Medical coverage', 'Trip cancellation', 'Baggage protection'],
    cta: 'Get Quote',
    color: 'from-blue-500 to-cyan-500',
    sponsored: true
  },
  {
    id: 'gear',
    title: 'Travel Gear',
    subtitle: 'Pack like a pro',
    icon: Backpack,
    description: 'Curated essentials for every trip type',
    features: ['Destination-specific', 'Expert recommendations', 'Best prices'],
    cta: 'Shop Now',
    color: 'from-green-500 to-emerald-500',
    sponsored: true
  },
  {
    id: 'currency',
    title: 'Currency Converter',
    subtitle: 'Real-time rates',
    icon: CreditCard,
    description: 'Live exchange rates and budget calculator',
    features: ['170+ currencies', 'Offline mode', 'Rate alerts'],
    cta: 'Convert',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'checklist',
    title: 'Packing Checklist',
    subtitle: 'Never forget anything',
    icon: CheckCircle,
    description: 'Smart checklists based on destination',
    features: ['Weather-based', 'Activity-specific', 'Shareable'],
    cta: 'Create List',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'visa',
    title: 'Visa Checker',
    subtitle: 'Coming soon',
    icon: FileText,
    description: 'Check visa requirements instantly',
    features: ['195+ countries', 'Processing times', 'Document lists'],
    cta: 'Notify Me',
    color: 'from-gray-400 to-gray-600',
    comingSoon: true
  },
  {
    id: 'flights',
    title: 'Flight Tracker',
    subtitle: 'Best deals',
    icon: Plane,
    description: 'Track prices and get alerts',
    features: ['Price predictions', 'Deal alerts', 'Flexible dates'],
    cta: 'Track Flights',
    color: 'from-indigo-500 to-blue-500'
  }
];

const currencyData = {
  from: 'INR',
  to: 'USD',
  rate: 0.012,
  amount: 10000,
  converted: 120
};

export const TravelEssentials: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [currencyAmount, setCurrencyAmount] = useState(10000);

  const handleToolClick = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
  };

  return (
    <section className="py-16 bg-background dark:bg-dark-background">
      <Container maxWidth="full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Backpack className="h-6 w-6 text-primary" />
            <span className="text-primary font-medium">Travel Utilities</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Pack Light, Travel Far
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Essential tools and resources to make your journey smooth and worry-free
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {essentialTools.map((tool, index) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-primary scale-105' : 'hover:shadow-lg'
                    } ${tool.comingSoon ? 'opacity-75' : ''}`}
                    onClick={() => !tool.comingSoon && handleToolClick(tool.id)}
                  >
                    {/* Sponsored Badge */}
                    {tool.sponsored && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                        Sponsored
                      </div>
                    )}

                    {/* Coming Soon Badge */}
                    {tool.comingSoon && (
                      <div className="absolute top-3 right-3 bg-gray-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Coming Soon
                      </div>
                    )}

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary dark:text-dark-text-primary">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            {tool.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-4">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Content */}
                      {isSelected && tool.id === 'currency' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-surface dark:bg-dark-surface rounded-lg p-4 mb-4"
                        >
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-text-secondary dark:text-dark-text-secondary">From</label>
                                <select className="w-full p-2 border border-border dark:border-dark-border rounded text-sm">
                                  <option>INR</option>
                                  <option>USD</option>
                                  <option>EUR</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-text-secondary dark:text-dark-text-secondary">To</label>
                                <select className="w-full p-2 border border-border dark:border-dark-border rounded text-sm">
                                  <option>USD</option>
                                  <option>EUR</option>
                                  <option>GBP</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Amount</label>
                              <input
                                type="number"
                                value={currencyAmount}
                                onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                                className="w-full p-2 border border-border dark:border-dark-border rounded text-sm"
                              />
                            </div>
                            <div className="bg-primary/10 rounded p-3 text-center">
                              <div className="text-lg font-bold text-primary">
                                ${(currencyAmount * 0.012).toFixed(2)}
                              </div>
                              <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                Rate: 1 INR = 0.012 USD
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {isSelected && tool.id === 'checklist' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-surface dark:bg-dark-surface rounded-lg p-4 mb-4"
                        >
                          <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-3">
                            Beach Trip Essentials
                          </h4>
                          <div className="space-y-2">
                            {['Sunscreen SPF 50+', 'Swimwear', 'Beach towel', 'Flip flops', 'Waterproof phone case'].map((item, idx) => (
                              <label key={idx} className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{item}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* CTA Button */}
                      <Button
                        fullWidth
                        variant={tool.comingSoon ? 'outline' : 'primary'}
                        className={tool.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}
                        rightIcon={!tool.comingSoon && tool.sponsored ? <ExternalLink className="h-4 w-4" /> : undefined}
                      >
                        {tool.cta}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Claim Success Rate</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-success mb-1">₹2.5L</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Avg Coverage</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-secondary mb-1">24/7</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Support</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-accent mb-1">50K+</div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Happy Travelers</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};