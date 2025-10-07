import { FeatureCard } from '../types';

export const featureCards: FeatureCard[] = [
  {
    id: '1',
    title: 'Smart Templates',
    description: 'Start planning with expert-designed trip templates for any destination or travel style.',
    icon: 'LayoutTemplate',
    link: '/explore'
  },
  {
    id: '2',
    title: 'Collaborative Planning',
    description: 'Invite friends and family to contribute ideas and vote on activities in real-time.',
    icon: 'Users',
    link: '/features/collaboration'
  },
  {
    id: '3',
    title: 'Budget Tracking',
    description: 'Keep your expenses in check with automatic budget calculations and alerts.',
    icon: 'DollarSign',
    link: '/features/budget'
  },
  {
    id: '4',
    title: 'Local Insights',
    description: 'Access insider tips and hidden gems from locals and experienced travelers.',
    icon: 'MapPin',
    link: '/features/insights'
  },
  {
    id: '5',
    title: 'Offline Access',
    description: 'Download your itinerary for offline access during your travels.',
    icon: 'WifiOff',
    link: '/features/offline'
  }
];