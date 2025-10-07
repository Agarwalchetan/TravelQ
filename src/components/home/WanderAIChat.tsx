import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Sparkles, MapPin, Calendar, DollarSign, Users, X, Mic, MicOff } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const examplePrompts = [
  "Plan a romantic trip to Udaipur for 3 days with ₹20k",
  "Weekend getaway from Mumbai under ₹10k",
  "Solo adventure in Himachal for 7 days",
  "Group trip to Goa with 6 friends",
  "Budget backpacking through Kerala",
  "Luxury honeymoon in Andaman"
];

const aiResponses = [
  {
    type: 'thinking',
    message: 'Let me plan the perfect trip for you...'
  },
  {
    type: 'response',
    message: "I've found some amazing options for your Udaipur trip! Here's a romantic 3-day itinerary:",
    itinerary: {
      title: "Romantic Udaipur Getaway",
      duration: "3 days, 2 nights",
      budget: "₹18,500",
      highlights: ["City Palace", "Lake Pichola Boat Ride", "Sunset at Sajjangarh Palace"],
      accommodation: "Heritage Hotel near Lake Pichola",
      activities: [
        { day: 1, activity: "Arrival & City Palace Tour", cost: "₹2,000" },
        { day: 2, activity: "Lake Pichola & Jag Mandir", cost: "₹3,500" },
        { day: 3, activity: "Sajjangarh Palace & Shopping", cost: "₹2,000" }
      ]
    }
  }
];

export const WanderAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const thinkingMessage = {
        id: Date.now() + 1,
        type: 'ai-thinking',
        message: 'Analyzing your preferences...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, thinkingMessage]);
    }, 500);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => prev.filter(msg => msg.type !== 'ai-thinking'));
      
      const aiMessage = {
        id: Date.now() + 2,
        type: 'ai',
        message: "I've found some amazing options for your trip! Here's what I recommend:",
        itinerary: {
          title: "Perfect Trip Plan",
          duration: "3 days, 2 nights",
          budget: "₹18,500",
          highlights: ["Amazing destinations", "Local experiences", "Hidden gems"],
          accommodation: "Curated stays",
          activities: [
            { day: 1, activity: "Arrival & Exploration", cost: "₹2,000" },
            { day: 2, activity: "Main Attractions", cost: "₹3,500" },
            { day: 3, activity: "Local Culture & Departure", cost: "₹2,000" }
          ]
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 2500);
  };

  const handleExamplePrompt = (prompt: string) => {
    setInputValue(prompt);
    handleSendMessage(prompt);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, implement speech recognition here
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-dark-primary/5 dark:to-dark-accent/5">
      <Container maxWidth="full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">AI-Powered Planning</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Ask WanderAI Anything
          </h2>
          <p className="mt-4 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Your personal travel assistant powered by advanced AI. Get instant, personalized trip recommendations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Interface Preview */}
          <motion.div
            className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl overflow-hidden border border-border dark:border-dark-border"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">WanderAI</h3>
                  <p className="text-white/90 text-sm">Your AI Travel Planner • Online</p>
                </div>
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="p-6 border-b border-border dark:border-dark-border">
              <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-4">Try asking:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examplePrompts.slice(0, 4).map((prompt, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleExamplePrompt(prompt)}
                    className="text-left p-3 bg-surface dark:bg-dark-surface/50 rounded-xl border border-border dark:border-dark-border hover:border-primary dark:hover:border-dark-primary transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-4 w-4 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-text-secondary dark:text-dark-text-secondary group-hover:text-primary dark:group-hover:text-dark-primary">
                        "{prompt}"
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.length === 0 ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">
                      Ready to plan your next adventure?
                    </h4>
                    <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                      Ask me anything about travel planning, destinations, or budgets!
                    </p>
                  </motion.div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : message.type === 'ai-thinking'
                          ? 'bg-surface dark:bg-dark-surface border border-border dark:border-dark-border'
                          : 'bg-surface dark:bg-dark-surface border border-border dark:border-dark-border'
                      }`}>
                        {message.type === 'ai-thinking' ? (
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary animate-spin" />
                            <span className="text-text-secondary dark:text-dark-text-secondary text-sm">
                              {message.message}
                            </span>
                          </div>
                        ) : message.type === 'ai' && message.itinerary ? (
                          <div className="space-y-3">
                            <p className="text-text-primary dark:text-dark-text-primary text-sm">
                              {message.message}
                            </p>
                            <div className="bg-white dark:bg-dark-background rounded-lg p-3 border border-border dark:border-dark-border">
                              <h5 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">
                                {message.itinerary.title}
                              </h5>
                              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-primary" />
                                  <span className="text-text-secondary dark:text-dark-text-secondary">
                                    {message.itinerary.duration}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3 text-success" />
                                  <span className="text-success font-medium">
                                    {message.itinerary.budget}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                {message.itinerary.activities.map((activity: any, idx: number) => (
                                  <div key={idx} className="flex justify-between text-xs">
                                    <span className="text-text-secondary dark:text-dark-text-secondary">
                                      Day {activity.day}: {activity.activity}
                                    </span>
                                    <span className="text-success font-medium">{activity.cost}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" className="flex-1 text-xs">
                                  Save Plan
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className={`text-sm ${
                            message.type === 'user' ? 'text-white' : 'text-text-primary dark:text-dark-text-primary'
                          }`}>
                            {message.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-border dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask me anything about travel..."
                    className="w-full px-4 py-3 pr-12 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary text-text-primary dark:text-dark-text-primary"
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                      isListening 
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary'
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                </div>
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2 text-center">
                WanderAI can make mistakes. Please verify important information.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center p-6 bg-white dark:bg-dark-surface rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">Smart Recommendations</h4>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                AI analyzes millions of travel data points to suggest perfect destinations
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-surface rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">Budget Optimization</h4>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                Get the best value for your money with real-time price comparisons
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-dark-surface rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">Instant Itineraries</h4>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                Complete day-by-day plans generated in seconds, ready to book
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};