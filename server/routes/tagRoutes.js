import express from 'express';
import {
  getTags,
  createTag,
  getQuestionsByTag
} from '../controllers/tagController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public: List all tags
router.get('/', getTags);

// Admin only: Create tag
router.post('/', protect, async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can create tags' });
  }
  return createTag(req, res, next);
});

// Public: Get all questions with a specific tag
router.get('/:name/questions', getQuestionsByTag);

export default router;
