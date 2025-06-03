import express from 'express';
import { logout,adminRegister, adminLogin, citizenRegister, citizenLogin } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register/admin', adminRegister);
router.post('/login/admin', adminLogin);

router.post('/register/citizen', citizenRegister);
router.post('/login/citizen', citizenLogin);
router.post('/logout', authMiddleware, logout);
export default router;
