import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

//Route imports
import authRoutes from './routes/authRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';

// // Middleware
import { notFound, errorHandler } from './middlewares/errorHandler.js';

// // DB config
import connectDB from './config/db.js';

// Socket logic
// import setupNotificationSocket from './sockets/notificationSocket.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// // Socket.IO Setup
// setupNotificationSocket(io);

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

 // Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/tags', tagRoutes);
// app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Server listen
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

