import express from 'express';
import { body } from 'express-validator';
import {
  getTags,
  createTag,
  getQuestionsByTag
} from '../controllers/tagController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

router.get('/', getTags);

router.post(
  '/',
  protect,
  [
    body('name').isLength({ min: 2, max: 20 }).withMessage('Tag name 2-20 chars'),
    body('description').optional().isLength({ max: 80 }).withMessage('Description max 80 chars')
  ],
  validateRequest,
  createTag
);

router.get('/:name/questions', getQuestionsByTag);

export default router;
