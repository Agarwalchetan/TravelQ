// Common types used throughout the application

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatar: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface TripTemplate {
  id: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  budget: string;
  region: string;
  interests: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}