import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, email, passwordHash: password });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

// @desc    Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

// @desc    Get current logged-in user
export const getProfile = async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
};
