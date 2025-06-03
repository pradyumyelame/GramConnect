import express from 'express';
import {
  addScheme,
  updateScheme,
  getAllSchemes,
  getSchemeById,
  checkEligibility,
  deleteScheme
} from '../controllers/schemeController.js';

const router = express.Router();

router.get('/', getAllSchemes); // GET all schemes
router.get('/:id', getSchemeById); // GET one scheme by ID
router.post('/', addScheme); // CREATE new scheme
router.put('/:id', updateScheme); // UPDATE a scheme
router.delete('/:id', deleteScheme); // DELETE a scheme
router.post('/check-eligibility', checkEligibility); // Check eligibility

export default router;
