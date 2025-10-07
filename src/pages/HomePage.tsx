import React, { useEffect } from 'react';
import { CinematicHero } from '../components/home/CinematicHero';
import { MultilingualGreeting } from '../components/home/MultilingualGreeting';
import { InteractiveTravelMap } from '../components/home/InteractiveTravelMap';
import { TravelMoodboard } from '../components/home/TravelMoodboard';
import { TrendingItineraries } from '../components/home/TrendingItineraries';
import { WanderAIChat } from '../components/home/WanderAIChat';
import { TravelEssentials } from '../components/home/TravelEssentials';
import { CommunityDiary } from '../components/home/CommunityDiary';
import { DynamicQuoteBanner } from '../components/home/DynamicQuoteBanner';
import { CTASection } from '../components/home/CTASection';
import { StickyBottomBar } from '../components/home/StickyBottomBar';
import { Testimonials } from '../components/home/Testimonials';
import { NextWeekendPlanner } from '../components/home/NextWeekendPlanner';
import { SEOContent } from '../components/home/SEOContent';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Wanderlust - Plan Socially. Travel Smarter. Explore Beautifully.';
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Wanderlust",
      "description": "AI-powered trip planner, real traveler itineraries, and seamless booking — all in one place.",
      "url": "https://wanderlust.com",
      "applicationCategory": "TravelApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2847"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <CinematicHero />
      <MultilingualGreeting />
      <InteractiveTravelMap />
      <TravelMoodboard />
      <TrendingItineraries />
      <WanderAIChat />
      <NextWeekendPlanner />
      <TravelEssentials />
      <CommunityDiary />
      <Testimonials />
      <DynamicQuoteBanner />
      <SEOContent />
      <CTASection />
      <StickyBottomBar />
    </>
  );
};

export default HomePage;