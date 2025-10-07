import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, AtSign, Lock, EyeOff, Eye, Compass, AlertCircle, CheckCircle, Loader2, Chrome, Apple, Facebook, Gift, Zap, Users, Mountain, Waves, Building, Heart, Camera } from 'lucide-react';
import { Button } from '../components/ui/Button';

const travelVibes = [
  { id: 'solo', label: 'Solo Explorer', icon: User, color: 'from-blue-400 to-cyan-500', description: 'Independent adventures' },
  { id: 'group', label: 'Group Adventurer', icon: Users, color: 'from-purple-400 to-pink-500', description: 'Friends & family trips' },
  { id: 'spiritual', label: 'Spiritual Seeker', icon: Heart, color: 'from-orange-400 to-red-500', description: 'Mindful journeys' },
  { id: 'backpacker', label: 'Budget Backpacker', icon: Mountain, color: 'from-green-400 to-emerald-500', description: 'Budget-friendly travels' },
  { id: 'luxury', label: 'Luxury Traveler', icon: Building, color: 'from-yellow-400 to-orange-500', description: 'Premium experiences' },
  { id: 'photographer', label: 'Photo Explorer', icon: Camera, color: 'from-indigo-400 to-purple-500', description: 'Capture moments' }
];

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    travelVibe: '',
    referralCode: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    document.title = 'Join the Wanderlust Tribe - Start Your Journey';
  }, []);

  useEffect(() => {
    // Calculate password strength
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setErrors({ terms: 'Please agree to the terms and conditions' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Success - redirect to onboarding or dashboard
      navigate('/');
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Implement OAuth signup
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background dark:from-dark-background via-dark-surface to-dark-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
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

        {/* Main Card */}
        <motion.div
          className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-dark-border/20 p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute inset-[1px] rounded-3xl bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl"></div>
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                      Join the Wanderlust Tribe
                    </h1>
                    <p className="text-text-secondary dark:text-dark-text-secondary">
                      Start planning your next trip with smart AI and an inspiring community
                    </p>
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-6">
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Full Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className={`block w-full pl-12 pr-4 py-4 border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 transition-all duration-300 ${
                            errors.fullName ? 'border-red-500' : 'border-border dark:border-dark-border focus:border-primary dark:focus:border-dark-primary'
                          }`}
                          placeholder="Your full name"
                        />
                        {formData.fullName && !errors.fullName && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.fullName}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
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
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className={`block w-full pl-12 pr-4 py-4 border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 transition-all duration-300 ${
                            errors.email ? 'border-red-500' : 'border-border dark:border-dark-border focus:border-primary dark:focus:border-dark-primary'
                          }`}
                          placeholder="explorer@wanderlust.com"
                        />
                        {formData.email && !errors.email && /\S+@\S+\.\S+/.test(formData.email) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Create Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          className={`block w-full pl-12 pr-12 py-4 border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 transition-all duration-300 ${
                            errors.password ? 'border-red-500' : 'border-border dark:border-dark-border focus:border-primary dark:focus:border-dark-primary'
                          }`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Meter */}
                      {formData.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3"
                        >
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-secondary dark:text-dark-text-secondary">Password strength</span>
                            <span className={`font-medium ${
                              passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </motion.div>
                      )}
                      
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.password}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={`block w-full pl-12 pr-12 py-4 border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 transition-all duration-300 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-border dark:border-dark-border focus:border-primary dark:focus:border-dark-primary'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-green-500 flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Passwords match
                        </motion.div>
                      )}
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Continue Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Continue</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </motion.div>

                    {/* Social Signup */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border dark:border-dark-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white/90 dark:bg-dark-surface/90 text-text-secondary dark:text-dark-text-secondary">
                            Or sign up with
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => handleSocialSignup('google')}
                          className="flex items-center justify-center py-3 px-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-300 group"
                        >
                          <Chrome className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSocialSignup('apple')}
                          className="flex items-center justify-center py-3 px-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-300 group"
                        >
                          <Apple className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSocialSignup('facebook')}
                          className="flex items-center justify-center py-3 px-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-300 group"
                        >
                          <Facebook className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors" />
                        </button>
                      </div>
                    </motion.div>

                    {/* Login Link */}
                    <motion.div
                      className="text-center pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <p className="text-text-secondary dark:text-dark-text-secondary">
                        Already a member?{' '}
                        <Link 
                          to="/login" 
                          className="font-semibold text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80 transition-colors"
                        >
                          Login instead →
                        </Link>
                      </p>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                      Choose Your Travel Vibe
                    </h1>
                    <p className="text-text-secondary dark:text-dark-text-secondary">
                      Help us personalize your experience
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Travel Vibe Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-4">
                        What's your travel style?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {travelVibes.map((vibe) => {
                          const Icon = vibe.icon;
                          return (
                            <motion.button
                              key={vibe.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, travelVibe: vibe.id }))}
                              className={`relative p-4 border rounded-xl transition-all duration-300 text-left ${
                                formData.travelVibe === vibe.id
                                  ? 'border-primary bg-primary/5 dark:border-dark-primary dark:bg-dark-primary/5'
                                  : 'border-border dark:border-dark-border hover:border-primary/50 dark:hover:border-dark-primary/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${vibe.color} flex items-center justify-center mb-3`}>
                                <Icon className="h-4 w-4 text-white" />
                              </div>
                              <h3 className="font-medium text-text-primary dark:text-dark-text-primary text-sm mb-1">
                                {vibe.label}
                              </h3>
                              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                {vibe.description}
                              </p>
                              {formData.travelVibe === vibe.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-2 right-2"
                                >
                                  <CheckCircle className="h-5 w-5 text-primary dark:text-dark-primary" />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Referral Code */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Referral Code (Optional)
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Gift className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={formData.referralCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, referralCode: e.target.value }))}
                          className="block w-full pl-12 pr-4 py-4 border border-border dark:border-dark-border rounded-xl bg-white/50 dark:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:border-primary dark:focus:border-dark-primary transition-all duration-300"
                          placeholder="Enter referral code"
                        />
                      </div>
                      <p className="mt-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                        Get bonus credits when you use a friend's referral code
                      </p>
                    </motion.div>

                    {/* Terms Agreement */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label className="flex items-start cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 border-border dark:border-dark-border flex items-center justify-center transition-all duration-200 mt-0.5 ${
                          formData.agreeTerms 
                            ? 'bg-primary border-primary dark:bg-dark-primary dark:border-dark-primary' 
                            : 'group-hover:border-primary dark:group-hover:border-dark-primary'
                        }`}>
                          {formData.agreeTerms && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <CheckCircle className="h-3 w-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <span className="ml-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                          I agree to the{' '}
                          <Link to="/terms" className="text-primary dark:text-dark-primary hover:underline">
                            Terms & Conditions
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-primary dark:text-dark-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.terms && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.terms}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {errors.submit && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
                        >
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          <span className="text-red-700 dark:text-red-300 text-sm">{errors.submit}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button
                        type="button"
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Compass className="h-5 w-5" />
                            </motion.div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <>
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;