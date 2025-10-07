import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AtSign, Lock, EyeOff, Eye, Compass, AlertCircle, CheckCircle, Loader2, User, Mail, Chrome, Apple, Facebook } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const travelImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Goa Beaches',
    description: 'Golden sands and endless horizons'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Ladakh Mountains',
    description: 'Majestic peaks and serene valleys'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Kerala Backwaters',
    description: 'Tranquil waters and lush greenery'
  }
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    document.title = 'Welcome Back, Explorer - Wanderlust';
    
    // Image slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % travelImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement OAuth login
  };

  return (
    <div className="min-h-screen flex bg-background dark:bg-dark-background overflow-hidden">
      {/* Left Panel - Travel Slideshow (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={travelImages[currentImageIndex].url}
              alt={travelImages[currentImageIndex].location}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60" />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white z-10">
          <motion.div
            key={`content-${currentImageIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {travelImages[currentImageIndex].location}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {travelImages[currentImageIndex].description}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-white/80">Discover your next adventure</span>
            </div>
          </motion.div>
          
          {/* Image Indicators */}
          <div className="absolute bottom-8 left-12 flex gap-2">
            {travelImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 relative">
        {/* Background Pattern for Mobile */}
        <div className="lg:hidden absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
        </div>
        
        <motion.div
          className="mx-auto w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Compass className="h-10 w-10 text-primary dark:text-dark-primary" />
              </motion.div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Wanderlust
              </span>
            </Link>
          </div>

          {/* Glassmorphic Card */}
          <motion.div
            className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-dark-border/20 p-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Gradient Border Animation */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 animate-pulse"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                  Welcome Back, Explorer
                </h1>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Continue your journey with us
                </p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:border-primary dark:focus:border-dark-primary transition-all duration-300 placeholder-text-secondary/50 dark:placeholder-dark-text-secondary/50"
                      placeholder="explorer@wanderlust.com"
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-12 pr-12 py-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:border-primary dark:focus:border-dark-primary transition-all duration-300 placeholder-text-secondary/50 dark:placeholder-dark-text-secondary/50"
                      placeholder="••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 border-border dark:border-dark-border flex items-center justify-center transition-all duration-200 ${
                      rememberMe 
                        ? 'bg-primary border-primary dark:bg-dark-primary dark:border-dark-primary' 
                        : 'group-hover:border-primary dark:group-hover:border-dark-primary'
                    }`}>
                      {rememberMe && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className="ml-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                      Remember me
                    </span>
                  </label>
                  
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Compass className="h-5 w-5" />
                        </motion.div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">Login to Continue</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="relative my-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border dark:border-dark-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 dark:bg-dark-surface/80 text-text-secondary dark:text-dark-text-secondary">
                      Or continue with
                    </span>
                  </div>
                </motion.div>

                {/* Social Login Buttons */}
                <motion.div
                  className="grid grid-cols-3 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center py-3 px-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-300 group"
                  >
                    <Chrome className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    className="flex items-center justify-center py-3 px-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-300 group"
                  >
                    <Apple className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center py-3 px-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-300 group"
                  >
                    <Facebook className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                  </button>
                </motion.div>

                {/* Sign Up Link */}
                <motion.div
                  className="text-center pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    New here?{' '}
                    <Link 
                      to="/signup" 
                      className="font-semibold text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80 transition-colors"
                    >
                      Join the Wanderlust Tribe →
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;