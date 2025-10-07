import Itinerary from '../models/Itinerary.model.js';
import Trip from '../models/Trip.model.js';

export const createItinerary = async (req, res) => {
  try {
    const trip = await Trip.findById(req.body.trip);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create itinerary for this trip',
      });
    }

    const itinerary = await Itinerary.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating itinerary',
      error: error.message,
    });
  }
};

export const getItineraries = async (req, res) => {
  try {
    const { trip } = req.query;
    const query = { user: req.user._id };

    if (trip) query.trip = trip;

    const itineraries = await Itinerary.find(query)
      .populate('trip', 'title destination startDate endDate')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: itineraries.length,
      itineraries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching itineraries',
      error: error.message,
    });
  }
};

export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('trip', 'title destination startDate endDate')
      .populate('user', 'name email');

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    if (itinerary.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this itinerary',
      });
    }

    res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching itinerary',
      error: error.message,
    });
  }
};

export const updateItinerary = async (req, res) => {
  try {
    let itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    if (itinerary.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this itinerary',
      });
    }

    itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating itinerary',
      error: error.message,
    });
  }
};

export const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    if (itinerary.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this itinerary',
      });
    }

    await itinerary.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting itinerary',
      error: error.message,
    });
  }
};
