import express from 'express';
import {
  applyCertificate,
  getMyCertificates,
  getAllApplications,
  approveCertificate,
  rejectCertificate,
} from '../controllers/certificateController.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/apply', authMiddleware, applyCertificate);
router.get('/my', authMiddleware, getMyCertificates);
router.get('/all', authMiddleware, isAdmin, getAllApplications);
router.patch('/approve/:id', authMiddleware, isAdmin, approveCertificate);
router.patch('/reject/:id', authMiddleware, isAdmin, rejectCertificate);

export default router;
