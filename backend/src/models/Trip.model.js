import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a trip title'],
    trim: true,
  },
  destination: {
    type: String,
    required: [true, 'Please provide a destination'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date'],
  },
  budget: {
    type: Number,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['planning', 'upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'planning',
  },
  coverImage: {
    type: String,
    default: '',
  },
  travelers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
