import express from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getPublicTrips,
} from '../controllers/trip.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/public', getPublicTrips);

router.use(protect);

router.route('/')
  .get(getTrips)
  .post(createTrip);

router.route('/:id')
  .get(getTripById)
  .put(updateTrip)
  .delete(deleteTrip);

export default router;
