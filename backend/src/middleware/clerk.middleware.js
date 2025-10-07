import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.model.js';

export const clerkAuth = async (req, res, next) => {
  try {
    const sessionToken = req.headers.authorization?.split(' ')[1];

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'No session token provided',
      });
    }

    const session = await clerkClient.sessions.verifySession(sessionToken);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session',
      });
    }

    const clerkUser = await clerkClient.users.getUser(session.userId);

    let user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      user = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        avatar: clerkUser.imageUrl,
        isVerified: true,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};
