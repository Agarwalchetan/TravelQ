import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, LogIn, Home, Map, CreditCard, BookOpen, Users, HelpCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Map },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-background/95 backdrop-blur-md border-b border-border dark:border-dark-border shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center group">
            <Compass className="h-8 w-auto text-primary dark:text-dark-primary transition-transform group-hover:rotate-180 duration-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent">
              Wanderlust
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle className="mr-2" />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-primary dark:text-dark-text-primary hover:bg-surface dark:hover:bg-dark-surface transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm font-medium py-2 px-3 rounded-lg flex items-center gap-2 relative group transition-all duration-200',
                isActive(item.href)
                  ? 'text-primary dark:text-dark-primary bg-primary/10 dark:bg-dark-primary/10'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary hover:bg-surface dark:hover:bg-dark-surface'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary dark:bg-dark-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>
        
        {/* Desktop auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<LogIn className="h-4 w-4" />}
                className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-sm"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/40">
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-dark-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border/10 dark:ring-dark-border/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <Compass className="h-8 w-auto text-primary dark:text-dark-primary" />
                  <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent">
                    Wanderlust
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-text-primary dark:text-dark-text-primary hover:bg-surface dark:hover:bg-dark-surface transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border dark:divide-dark-border">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            'flex items-center -mx-3 rounded-xl px-3 py-3 text-base font-medium transition-all',
                            isActive(item.href)
                              ? 'bg-primary/10 dark:bg-dark-primary/10 text-primary dark:text-dark-primary'
                              : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface dark:hover:bg-dark-surface hover:text-primary dark:hover:text-dark-primary'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="py-6 space-y-4">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        fullWidth 
                        leftIcon={<LogIn className="h-4 w-4" />}
                        className="justify-center"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        fullWidth
                        className="bg-gradient-to-r from-primary to-secondary justify-center"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};