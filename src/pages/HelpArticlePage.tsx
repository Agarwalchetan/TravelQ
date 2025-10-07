import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ThumbsUp, ThumbsDown, Share2, Bookmark, User, Calendar, Tag, Search, MessageCircle, Bot, ChevronRight, Home, HelpCircle, Star, Eye, Heart } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { faqs } from '../data/faqs';

// Related articles suggestions
const getRelatedArticles = (currentCategory: string, currentId: string) => {
  return faqs
    .filter(faq => faq.category === currentCategory && faq.id !== currentId)
    .slice(0, 3);
};

// Popular articles
const popularArticles = [
  { id: 'faq-1', title: 'How to invite friends to a trip?', views: 1240 },
  { id: 'faq-2', title: 'Getting refunds for cancelled bookings', views: 987 },
  { id: 'faq-7', title: 'Understanding our free trial', views: 856 },
];

const HelpArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    if (id) {
      const foundArticle = faqs.find(faq => faq.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
        setRelatedArticles(getRelatedArticles(foundArticle.category, foundArticle.id));
        document.title = `${foundArticle.question} - Help Center | Wanderlust`;
      } else {
        navigate('/help');
      }
    }
  }, [id, navigate]);

  const handleFeedback = (helpful: boolean) => {
    setIsHelpful(helpful);
    // In a real app, send feedback to analytics
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.question,
        text: article?.answer,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-text-secondary dark:text-dark-text-secondary" />
          </div>
          <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
            Article not found
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
            The help article you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/help')}>
            Back to Help Center
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-dark-background min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-surface dark:bg-dark-surface border-b border-border dark:border-dark-border">
        <Container maxWidth="full" className="py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <ChevronRight className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
            <button
              onClick={() => navigate('/help')}
              className="flex items-center gap-1 text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </button>
            <ChevronRight className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
            <span className="text-text-primary dark:text-dark-text-primary font-medium">
              {article.category}
            </span>
          </nav>
        </Container>
      </div>

      <Container maxWidth="full" className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate('/help')}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                >
                  Back to Help Center
                </Button>
              </motion.div>

              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="primary">{article.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <Clock className="h-4 w-4" />
                    <span>2 min read</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4 leading-tight">
                  {article.question}
                </h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Wanderlust Support</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated 2 days ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>1.2k views</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={isBookmarked ? 'text-primary' : 'text-text-secondary dark:text-dark-text-secondary'}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      className="text-text-secondary dark:text-dark-text-secondary"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-8 mb-8">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div className="text-text-primary dark:text-dark-text-primary leading-relaxed whitespace-pre-line">
                      {article.answer}
                    </div>
                    
                    {/* Additional helpful content based on category */}
                    {article.category === 'Account' && (
                      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                          💡 Pro Tip
                        </h3>
                        <p className="text-blue-800 dark:text-blue-200">
                          Keep your account secure by enabling two-factor authentication in your account settings. 
                          This adds an extra layer of protection to your travel plans and personal information.
                        </p>
                      </div>
                    )}
                    
                    {article.category === 'Booking' && (
                      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                          💳 Payment Security
                        </h3>
                        <p className="text-green-800 dark:text-green-200">
                          All payments are processed securely through our certified payment partners. 
                          Your financial information is encrypted and never stored on our servers.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Feedback Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6 mb-8">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                    Was this article helpful?
                  </h3>
                  
                  {isHelpful === null ? (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleFeedback(true)}
                        leftIcon={<ThumbsUp className="h-4 w-4" />}
                        className="hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700"
                      >
                        Yes, helpful
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleFeedback(false)}
                        leftIcon={<ThumbsDown className="h-4 w-4" />}
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700"
                      >
                        No, not helpful
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`flex items-center gap-2 ${isHelpful ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {isHelpful ? <ThumbsUp className="h-5 w-5" /> : <ThumbsDown className="h-5 w-5" />}
                        <span className="font-medium">
                          {isHelpful ? 'Thanks for your feedback!' : 'Sorry this wasn\'t helpful.'}
                        </span>
                      </div>
                      
                      {!isHelpful && (
                        <div className="space-y-3">
                          <p className="text-text-secondary dark:text-dark-text-secondary">
                            How can we improve this article?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => setShowAIChat(true)}
                              leftIcon={<Bot className="h-4 w-4" />}
                            >
                              Ask AI Assistant
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              leftIcon={<MessageCircle className="h-4 w-4" />}
                            >
                              Contact Support
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedArticles.map((relatedArticle) => (
                      <Card
                        key={relatedArticle.id}
                        className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => navigate(`/help/${relatedArticle.id}`)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="h-4 w-4 text-primary dark:text-dark-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors line-clamp-2">
                              {relatedArticle.question}
                            </h4>
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {relatedArticle.category}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                    Need More Help?
                  </h3>
                  <div className="space-y-3">
                    <Button
                      fullWidth
                      variant="outline"
                      leftIcon={<Bot className="h-4 w-4" />}
                      onClick={() => setShowAIChat(true)}
                    >
                      Ask AI Assistant
                    </Button>
                    <Button
                      fullWidth
                      variant="outline"
                      leftIcon={<MessageCircle className="h-4 w-4" />}
                    >
                      Contact Support
                    </Button>
                    <Button
                      fullWidth
                      variant="outline"
                      leftIcon={<Search className="h-4 w-4" />}
                      onClick={() => navigate('/help')}
                    >
                      Search Help Center
                    </Button>
                  </div>
                </Card>

                {/* Popular Articles */}
                <Card className="p-6">
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                    Popular Articles
                  </h3>
                  <div className="space-y-3">
                    {popularArticles.map((popular, index) => (
                      <button
                        key={popular.id}
                        onClick={() => navigate(`/help/${popular.id}`)}
                        className="w-full text-left p-3 rounded-lg hover:bg-surface dark:hover:bg-dark-surface/50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary dark:text-dark-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors line-clamp-2">
                              {popular.title}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Eye className="h-3 w-3 text-text-secondary dark:text-dark-text-secondary" />
                              <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                {popular.views} views
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Contact Card */}
                <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                      Still stuck?
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                      Our support team is here to help you get back to planning your next adventure.
                    </p>
                    <Button fullWidth className="bg-gradient-to-r from-primary to-secondary">
                      Get Personal Help
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpArticlePage;