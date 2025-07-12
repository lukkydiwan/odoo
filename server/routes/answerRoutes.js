import express from 'express';
import {
  postAnswer,
  upvoteAnswer,
  downvoteAnswer,
  acceptAnswer,
  deleteAnswer
} from '../controllers/answerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/answers/:questionId
router.post('/:questionId', protect, postAnswer);

// PUT /api/answers/:id/upvote
router.put('/:id/upvote', protect, upvoteAnswer);

// PUT /api/answers/:id/downvote
router.put('/:id/downvote', protect, downvoteAnswer);

// PUT /api/answers/:id/accept
router.put('/:id/accept', protect, acceptAnswer);

// DELETE /api/answers/:id
router.delete('/:id', protect, deleteAnswer);

export default router;
