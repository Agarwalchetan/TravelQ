import express from 'express';
import {
  createItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
} from '../controllers/itinerary.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getItineraries)
  .post(createItinerary);

router.route('/:id')
  .get(getItineraryById)
  .put(updateItinerary)
  .delete(deleteItinerary);

export default router;
