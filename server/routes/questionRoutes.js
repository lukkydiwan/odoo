import express from 'express';
import {
  askQuestion,
  getQuestions,
  getQuestionById,
  upvoteQuestion,
  downvoteQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getQuestions)       // Public: list all questions
  .post(protect, askQuestion); // Auth: ask new question

router
  .route('/:id')
  .get(getQuestionById)    // Public: get question + answers
  .delete(protect, deleteQuestion); // Auth: delete (owner/admin)

router.put('/:id/upvote', protect, upvoteQuestion);
router.put('/:id/downvote', protect, downvoteQuestion);

export default router;
