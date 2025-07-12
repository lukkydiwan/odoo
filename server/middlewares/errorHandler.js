// server/middlewares/errorHandler.js

// 404 handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// General error handler
export const errorHandler = (err, req, res, next) => {
  // Use existing status code if set, else 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Only show stack in development mode for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
