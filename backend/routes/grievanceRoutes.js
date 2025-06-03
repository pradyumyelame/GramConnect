// routes/grievanceRoutes.js
import express from 'express';
import {
  submitGrievance,
  getGrievancesByPhone,
  getAllGrievances,
  updateGrievanceStatus,
  getGrievanceCounts
} from '../controllers/grievanceController.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.js';
const router = express.Router();

// === USER ROUTES ===
router.post('/', submitGrievance);
router.get('/user', getGrievancesByPhone);  // query: ?phone=

// === ADMIN ROUTES ===
router.get('/admin', getAllGrievances);
router.put('/admin/:id', updateGrievanceStatus);
router.get('/counts', authMiddleware, isAdmin, getGrievanceCounts);
export default router;
