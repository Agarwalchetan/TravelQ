import Trip from '../models/Trip.model.js';

export const createTrip = async (req, res) => {
  try {
    const tripData = {
      ...req.body,
      user: req.user._id,
    };

    const trip = await Trip.create(tripData);

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating trip',
      error: error.message,
    });
  }
};

export const getTrips = async (req, res) => {
  try {
    const { status, isPublic } = req.query;
    const query = { user: req.user._id };

    if (status) query.status = status;
    if (isPublic !== undefined) query.isPublic = isPublic === 'true';

    const trips = await Trip.find(query)
      .populate('user', 'name email avatar')
      .populate('travelers', 'name email avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trips',
      error: error.message,
    });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('user', 'name email avatar')
      .populate('travelers', 'name email avatar');

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    if (trip.user._id.toString() !== req.user._id.toString() && !trip.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this trip',
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trip',
      error: error.message,
    });
  }
};

export const updateTrip = async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this trip',
      });
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating trip',
      error: error.message,
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this trip',
      });
    }

    await trip.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting trip',
      error: error.message,
    });
  }
};

export const getPublicTrips = async (req, res) => {
  try {
    const { destination, tags } = req.query;
    const query = { isPublic: true };

    if (destination) query.destination = new RegExp(destination, 'i');
    if (tags) query.tags = { $in: tags.split(',') };

    const trips = await Trip.find(query)
      .populate('user', 'name avatar')
      .sort('-createdAt')
      .limit(20);

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching public trips',
      error: error.message,
    });
  }
};
