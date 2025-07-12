import express from 'express';
import { body } from 'express-validator';
import {
  askQuestion,
  getQuestions,
  getQuestionById,
  upvoteQuestion,
  downvoteQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

router
  .route('/')
  .get(getQuestions)
  .post(
    protect,
    [
      body('title').isLength({ min: 10, max: 150 }).withMessage('Title must be 10-150 chars'),
      body('description').isLength({ min: 15 }).withMessage('Description required'),
      body('tags').isArray({ min: 1, max: 5 }).withMessage('1-5 tags required')
    ],
    validateRequest,
    askQuestion
  );

router
  .route('/:id')
  .get(getQuestionById)
  .delete(protect, deleteQuestion);

router.put('/:id/upvote', protect, upvoteQuestion);
router.put('/:id/downvote', protect, downvoteQuestion);

export default router;
