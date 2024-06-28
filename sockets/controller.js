const socketController = (socket) => {
  console.info("Client connected ", socket.id);

  socket.on("disconnect", () => {
    console.info("Client disconnected ", socket.id);
  });

  socket.on("sendMessage", (payload, callback) => {
    const id = 12345678;
    callback({ id, date: new Date() });
    socket.broadcast.emit("sendMessage", payload);
  });
};

module.exports = {
  socketController
};
