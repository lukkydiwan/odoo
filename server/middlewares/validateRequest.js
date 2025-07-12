import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send only first error for simplicity, or return all errors as array
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
