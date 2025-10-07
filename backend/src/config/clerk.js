import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const clerkMiddleware = ClerkExpressRequireAuth({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});
