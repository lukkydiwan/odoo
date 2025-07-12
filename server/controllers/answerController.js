import Answer from '../models/Answer.js';
import Question from '../models/Question.js';

// @desc    Post an answer to a question
export const postAnswer = async (req, res) => {
  const { content } = req.body;
  const { questionId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) return res.status(404).json({ message: 'Question not found' });

  const answer = await Answer.create({
    content,
    questionId,
    author: req.user._id,
  });

  // Add answer to question.answers array
  question.answers.push(answer._id);
  await question.save();

  res.status(201).json(answer);
};

// @desc    Upvote an answer
export const upvoteAnswer = async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404).json({ message: 'Answer not found' });

  // Remove from downvotes if exists
  answer.downvotes = answer.downvotes.filter(
    userId => userId.toString() !== req.user._id.toString()
  );
  // Add to upvotes if not already
  if (!answer.upvotes.includes(req.user._id)) {
    answer.upvotes.push(req.user._id);
  }
  await answer.save();
  res.json({ upvotes: answer.upvotes.length });
};

// @desc    Downvote an answer
export const downvoteAnswer = async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404).json({ message: 'Answer not found' });

  // Remove from upvotes if exists
  answer.upvotes = answer.upvotes.filter(
    userId => userId.toString() !== req.user._id.toString()
  );
  // Add to downvotes if not already
  if (!answer.downvotes.includes(req.user._id)) {
    answer.downvotes.push(req.user._id);
  }
  await answer.save();
  res.json({ downvotes: answer.downvotes.length });
};

// @desc    Mark answer as accepted (only question owner)
export const acceptAnswer = async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404).json({ message: 'Answer not found' });

  const question = await Question.findById(answer.questionId);
  if (!question) return res.status(404).json({ message: 'Question not found' });

  if (question.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Only the question owner can accept an answer' });
  }

  // Set all answers to isAccepted: false first
  await Answer.updateMany(
    { questionId: question._id },
    { $set: { isAccepted: false } }
  );

  answer.isAccepted = true;
  await answer.save();

  res.json({ message: 'Answer accepted', answerId: answer._id });
};

// @desc    Delete an answer (author or admin only)
export const deleteAnswer = async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404).json({ message: 'Answer not found' });

  if (
    answer.author.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // Remove answer from Question.answers array
  await Question.findByIdAndUpdate(answer.questionId, {
    $pull: { answers: answer._id }
  });

  await answer.deleteOne();
  res.json({ message: 'Answer deleted' });
};
