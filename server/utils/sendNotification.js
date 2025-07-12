import Notification from '../models/Notification.js';

const sendNotification = async ({ toUser, type, message, link, app }) => {
  // Create notification in DB
  const notif = await Notification.create({
    toUser,
    type,
    message,
    link,
  });

  // Real-time Socket.IO notification
  const io = app.get('io');
  const onlineUsers = app.get('onlineUsers');

  if (io && onlineUsers && onlineUsers[toUser.toString()]) {
    io.to(onlineUsers[toUser.toString()]).emit('notification', notif);
  }
};

export default sendNotification;
