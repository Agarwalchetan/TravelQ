import express from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin'), getAllUsers);
router.route('/:id')
  .get(getUserById)
  .delete(authorize('admin'), deleteUser);

export default router;
