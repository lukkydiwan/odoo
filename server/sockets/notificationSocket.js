// server/sockets/notificationSocket.js

const onlineUsers = {};

const setupNotificationSocket = (io) => {
  io.on('connection', (socket) => {
    // Listen for user join event and map their userId to the socket.id
    socket.on('join', (userId) => {
      onlineUsers[userId] = socket.id;
    });

    // Clean up on disconnect
    socket.on('disconnect', () => {
      for (const [uid, sid] of Object.entries(onlineUsers)) {
        if (sid === socket.id) {
          delete onlineUsers[uid];
          break;
        }
      }
    });
  });
};

export { setupNotificationSocket, onlineUsers };
