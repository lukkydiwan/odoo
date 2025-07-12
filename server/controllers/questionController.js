import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

// @desc    Ask a new question
export const askQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  const question = await Question.create({
    title,
    description,
    tags,
    author: req.user._id,
  });
  res.status(201).json(question);
};

// @desc    Get all questions (with optional tag filter)
export const getQuestions = async (req, res) => {
  const { tag } = req.query;
  const filter = tag ? { tags: tag } : {};
  const questions = await Question.find(filter)
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(questions);
};

// @desc    Get single question (with answers)
export const getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate('author', 'username')
    .populate({
      path: 'answers',
      populate: { path: 'author', select: 'username' },
    });
  if (!question) return res.status(404).json({ message: 'Question not found' });
  res.json(question);
};

// @desc    Upvote a question
export const upvoteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: 'Question not found' });

  // Remove from downvotes if exists
  question.downvotes = question.downvotes.filter(
    userId => userId.toString() !== req.user._id.toString()
  );
  // Add to upvotes if not already
  if (!question.upvotes.includes(req.user._id)) {
    question.upvotes.push(req.user._id);
  }
  await question.save();
  res.json({ upvotes: question.upvotes.length });
};

// @desc    Downvote a question
export const downvoteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: 'Question not found' });

  // Remove from upvotes if exists
  question.upvotes = question.upvotes.filter(
    userId => userId.toString() !== req.user._id.toString()
  );
  // Add to downvotes if not already
  if (!question.downvotes.includes(req.user._id)) {
    question.downvotes.push(req.user._id);
  }
  await question.save();
  res.json({ downvotes: question.downvotes.length });
};

// @desc    Delete a question (author or admin only)
export const deleteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: 'Question not found' });

  if (
    question.author.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await question.deleteOne();
  res.json({ message: 'Question deleted' });
};
