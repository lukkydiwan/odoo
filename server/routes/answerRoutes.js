import express from 'express';
import { body } from 'express-validator';
import {
  postAnswer,
  upvoteAnswer,
  downvoteAnswer,
  acceptAnswer,
  deleteAnswer
} from '../controllers/answerController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

// Post an answer
router.post('/:questionId',
  protect,
  [
    body('content').isLength({ min: 5 }).withMessage('Answer too short')
  ],
  validateRequest,
  postAnswer
);

router.put('/:id/upvote', protect, upvoteAnswer);
router.put('/:id/downvote', protect, downvoteAnswer);
router.put('/:id/accept', protect, acceptAnswer);
router.delete('/:id', protect, deleteAnswer);

export default router;
