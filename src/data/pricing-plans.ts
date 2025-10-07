import { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Explorer',
    price: {
      monthly: 0,
      annual: 0
    },
    description: 'Perfect for occasional travelers who want to plan a single trip.',
    features: [
      'Plan 1 trip at a time',
      '3 trip templates',
      'Basic budget tracking',
      'Solo planning only',
      'Email support'
    ],
    cta: 'Start for Free'
  },
  {
    id: 'pro',
    name: 'Voyager',
    price: {
      monthly: 9.99,
      annual: 99.99
    },
    description: 'Ideal for frequent travelers and families planning multiple trips.',
    features: [
      'Plan up to 5 trips simultaneously',
      'Access to all templates',
      'Advanced budget tracking',
      'Collaborate with up to 5 people',
      'Offline access',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    id: 'premium',
    name: 'Globetrotter',
    price: {
      monthly: 19.99,
      annual: 199.99
    },
    description: 'For avid travelers who want the ultimate planning experience.',
    features: [
      'Unlimited trip planning',
      'Premium templates & exclusive destinations',
      'Real-time currency conversion',
      'Unlimited collaborators',
      'Custom trip sharing',
      'Local recommendations',
      '24/7 priority support'
    ],
    cta: 'Start Free Trial'
  }
];