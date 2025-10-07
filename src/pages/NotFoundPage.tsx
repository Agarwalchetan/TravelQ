import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Wanderlust';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-dark-background py-12">
      <Container maxWidth="lg">
        <div className="text-center">
          <Compass className="h-20 w-20 text-primary dark:text-dark-primary mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-text-primary dark:text-dark-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Page not found
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back to home
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="outline">
                Visit help center
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 border-t border-border dark:border-dark-border pt-8">
          <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary text-center mb-6">
            Popular destinations you might like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/explore" 
              className="relative rounded-lg overflow-hidden h-32 group"
            >
              <img 
                src="https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Japan"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">Japan</p>
              </div>
            </Link>
            <Link 
              to="/explore" 
              className="relative rounded-lg overflow-hidden h-32 group"
            >
              <img 
                src="https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Greece"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">Greece</p>
              </div>
            </Link>
            <Link 
              to="/explore" 
              className="relative rounded-lg overflow-hidden h-32 group"
            >
              <img 
                src="https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=600" 
                alt="Kenya"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">Kenya</p>
              </div>
            </Link>
            <Link 
              to="/explore" 
              className="relative rounded-lg overflow-hidden h-32 group"
            >
              <img 
                src="https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Iceland"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">Iceland</p>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;