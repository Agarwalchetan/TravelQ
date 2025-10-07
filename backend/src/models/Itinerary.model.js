import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  time: String,
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  cost: {
    type: Number,
    min: 0,
  },
  duration: String,
  category: {
    type: String,
    enum: ['sightseeing', 'food', 'adventure', 'relaxation', 'culture', 'shopping', 'other'],
  },
});

const dayPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  date: Date,
  activities: [activitySchema],
});

const itinerarySchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  days: [dayPlanSchema],
  notes: String,
  totalCost: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;
