import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const greetings = {
  en: { greeting: "Hello", message: "Planning your next adventure?", flag: "🇺🇸" },
  hi: { greeting: "नमस्ते", message: "अपनी अगली यात्रा की योजना बना रहे हैं?", flag: "🇮🇳" },
  bn: { greeting: "নমস্কার", message: "আপনার পরবর্তী অ্যাডভেঞ্চারের পরিকল্পনা করছেন?", flag: "🇧🇩" },
  ta: { greeting: "வணக்கம்", message: "உங்கள் அடுத்த சாகசத்தைத் திட்டமிடுகிறீர்களா?", flag: "🇮🇳" },
  te: { greeting: "నమస్కారం", message: "మీ తదుపరి సాహసయాత్రను ప్లాన్ చేస్తున్నారా?", flag: "🇮🇳" },
  mr: { greeting: "नमस्कार", message: "तुमच्या पुढच्या साहसाची योजना आखत आहात?", flag: "🇮🇳" },
  gu: { greeting: "નમસ્તે", message: "તમારા આગામી સાહસની યોજના બનાવી રહ્યા છો?", flag: "🇮🇳" }
};

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
];

export const MultilingualGreeting: React.FC = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [userName, setUserName] = useState('Traveler');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState('India');

  useEffect(() => {
    // Simulate user detection based on browser language or IP
    const browserLang = navigator.language.split('-')[0];
    if (greetings[browserLang as keyof typeof greetings]) {
      setCurrentLang(browserLang);
    }

    // Simulate getting user's name from localStorage or session
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }

    // Simulate location detection
    // In a real app, you'd use IP geolocation or browser geolocation API
    setDetectedLocation('India');
  }, []);

  const currentGreeting = greetings[currentLang as keyof typeof greetings];
  const currentLanguage = languages.find(lang => lang.code === currentLang);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setShowLanguageDropdown(false);
    localStorage.setItem('preferredLanguage', langCode);
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 py-4 border-b border-border/50 dark:border-dark-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Greeting */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl">{currentGreeting.flag}</div>
            <div>
              <motion.h2
                key={currentLang}
                className="text-lg font-bold text-text-primary dark:text-dark-text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentGreeting.greeting} {userName}!
              </motion.h2>
              <motion.p
                key={`${currentLang}-message`}
                className="text-sm text-text-secondary dark:text-dark-text-secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {currentGreeting.message}
              </motion.p>
            </div>
          </motion.div>

          {/* Language Selector */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg hover:bg-surface dark:hover:bg-dark-surface/70 transition-colors shadow-sm"
            >
              <Globe className="h-4 w-4 text-primary dark:text-dark-primary" />
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                {currentLanguage?.nativeName}
              </span>
              <ChevronDown className={`h-4 w-4 text-text-secondary dark:text-dark-text-secondary transition-transform ${
                showLanguageDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Language Dropdown */}
            {showLanguageDropdown && (
              <motion.div
                className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg shadow-xl z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="py-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface dark:hover:bg-dark-surface/50 transition-colors ${
                        currentLang === language.code
                          ? 'bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                          : 'text-text-primary dark:text-dark-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{language.nativeName}</span>
                        <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                          {language.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-border dark:border-dark-border px-4 py-2">
                  <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    Detected location: {detectedLocation}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Quick Stats for the region */}
        <motion.div
          className="mt-4 flex items-center gap-6 text-sm text-text-secondary dark:text-dark-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-1">
            <span>🌡️</span>
            <span>Perfect weather for travel</span>
          </div>
          <div className="flex items-center gap-1">
            <span>✈️</span>
            <span>156 trips planned today</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🎯</span>
            <span>Top destination: Goa</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};