import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3, max: 24 }).withMessage('Username 3-24 chars'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
], validateRequest, registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
], validateRequest, loginUser);

router.get('/me', protect, getProfile);

export default router;
