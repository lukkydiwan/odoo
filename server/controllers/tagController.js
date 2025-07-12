import Tag from '../models/Tag.js';
import Question from '../models/Question.js';

// @desc    Get all tags
export const getTags = async (req, res) => {
  const tags = await Tag.find({}).sort({ name: 1 });
  res.json(tags);
};

// @desc    Create a new tag (admin only)
export const createTag = async (req, res) => {
  const { name, description } = req.body;
  const tagExists = await Tag.findOne({ name: name.toLowerCase() });
  if (tagExists) return res.status(400).json({ message: 'Tag already exists' });

  const tag = await Tag.create({ name: name.toLowerCase(), description });
  res.status(201).json(tag);
};

// @desc    Get questions for a specific tag
export const getQuestionsByTag = async (req, res) => {
  const tagName = req.params.name.toLowerCase();
  const questions = await Question.find({ tags: tagName })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(questions);
};
