import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { Container } from '../ui/Container';

const footerNavigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Help', href: '/help' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/help#faq' },
    { name: 'Security', href: '/security' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 dark:bg-dark-surface/50 backdrop-blur-lg border-t border-border dark:border-dark-border">
      <Container maxWidth="full" className="py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-4 xl:col-span-2">
            <Link to="/" className="flex items-center group">
              <Compass className="h-8 w-auto text-primary dark:text-dark-primary transition-transform group-hover:rotate-180 duration-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent">
                Wanderlust
              </span>
            </Link>
            <p className="text-text-secondary dark:text-dark-text-secondary max-w-md">
              Embark on cosmic journeys and explore the infinite possibilities of space travel. 
              Your gateway to extraordinary adventures awaits.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={item.name}
                    href={item.href}
                    className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Company</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href}
                        className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Support</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href}
                        className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Legal</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href}
                        className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Newsletter</h3>
                <p className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                  Stay updated with the latest cosmic discoveries and travel opportunities.
                </p>
                <div className="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-auto rounded-md border border-border dark:border-dark-border bg-white dark:bg-dark-surface px-3.5 py-2 text-text-primary dark:text-dark-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-primary dark:bg-dark-primary px-3.5 py-2 text-sm font-semibold text-white dark:text-dark-background shadow-sm hover:bg-primary/90 dark:hover:bg-dark-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-dark-primary"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            &copy; {new Date().getFullYear()} Wanderlust, Inc. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center space-x-6">
            {footerNavigation.main.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};