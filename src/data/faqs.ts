import { FAQ } from '../types';

export const faqs: FAQ[] = [
  // Account FAQs
  {
    id: '1',
    question: 'How do I create an account?',
    answer: 'You can sign up for a Wanderlust account by clicking the "Sign Up" button in the top right corner of our website. You can create an account using your email, or sign up with your Google or Facebook account for quicker access.',
    category: 'Account'
  },
  {
    id: '2',
    question: 'Can I have multiple users on one account?',
    answer: 'With our Free plan, you can only plan solo. Our Voyager plan allows collaboration with up to 5 people, while our Globetrotter plan offers unlimited collaborators. Each person will need their own account to collaborate.',
    category: 'Account'
  },
  {
    id: '3',
    question: 'How do I reset my password?',
    answer: 'Click on "Log In," then select "Forgot Password." Enter your email address, and we\'ll send you a link to reset your password. The link expires after 24 hours for security reasons.',
    category: 'Account'
  },
  // Booking FAQs
  {
    id: '4',
    question: 'Does Wanderlust book flights and hotels?',
    answer: 'Wanderlust is primarily a planning tool. While we provide links to our trusted booking partners, the actual reservations are made through those third-party services. This allows you to compare prices and find the best deals.',
    category: 'Booking'
  },
  {
    id: '5',
    question: 'Can I cancel a booking made through Wanderlust?',
    answer: 'Since bookings are made through our partners, cancellation policies vary depending on the service used. You can find the specific cancellation policy in your confirmation email or by logging into the partner\'s website.',
    category: 'Booking'
  },
  {
    id: '6',
    question: 'Do you offer travel insurance?',
    answer: 'We partner with leading travel insurance providers to offer comprehensive coverage options. You can add insurance during the planning phase, and we\'ll help you choose the right coverage for your specific trip and needs.',
    category: 'Booking'
  },
  // Billing FAQs
  {
    id: '7',
    question: 'How does the free trial work?',
    answer: 'Our 14-day free trial gives you full access to either the Voyager or Globetrotter plan features. You won\'t be charged until the trial period ends, and you can downgrade or cancel anytime before then.',
    category: 'Billing'
  },
  {
    id: '8',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely through our payment partners.',
    category: 'Billing'
  },
  {
    id: '9',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription anytime by going to Account Settings > Subscription > Cancel Subscription. Your access will continue until the end of your current billing period.',
    category: 'Billing'
  },
  {
    id: '10',
    question: 'What\'s the difference between monthly and annual billing?',
    answer: 'Annual billing offers a significant discount (approximately 2 months free) compared to monthly billing. You\'ll be charged once per year rather than monthly, but you are committing to a full year of service.',
    category: 'Billing'
  }
];