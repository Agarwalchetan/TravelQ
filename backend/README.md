# Wanderlust Backend API

Express.js REST API with MongoDB and JWT/Clerk authentication.

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Copy `.env.example` to `.env` and configure:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT signing
   - `CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`: From Clerk dashboard (optional)

3. Install dependencies:
```bash
cd backend
npm install
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Trips
- `GET /api/trips` - Get user's trips (protected)
- `POST /api/trips` - Create new trip (protected)
- `GET /api/trips/:id` - Get trip by ID (protected)
- `PUT /api/trips/:id` - Update trip (protected)
- `DELETE /api/trips/:id` - Delete trip (protected)
- `GET /api/trips/public` - Get public trips

### Itineraries
- `GET /api/itineraries` - Get user's itineraries (protected)
- `POST /api/itineraries` - Create itinerary (protected)
- `GET /api/itineraries/:id` - Get itinerary by ID (protected)
- `PUT /api/itineraries/:id` - Update itinerary (protected)
- `DELETE /api/itineraries/:id` - Delete itinerary (protected)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (protected)
- `DELETE /api/users/:id` - Delete user (admin only)

## Authentication Methods

### JWT Authentication
Include token in header:
```
Authorization: Bearer <token>
```

### Clerk Authentication
Configure Clerk keys in `.env` and use Clerk SDK in frontend.
