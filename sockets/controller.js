const TicketControl = require("../models/ticketcontrol");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("lastTicket", ticketControl.last);
  socket.emit("currentState", ticketControl.last4);
  socket.emit("ticketsPending", ticketControl.tickets.length)

  socket.on("nextTicket", (_, callback) => {
    const next = ticketControl.next();
    callback(next);

    socket.broadcast.emit("ticketsPending", ticketControl.tickets.length);
  });

  socket.on("attendTicket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        message: "Please send a desktop"
      });
    }
    const ticket = ticketControl.handleTicket(desktop);
    socket.broadcast.emit("currentState", ticketControl.last4);
    socket.broadcast.emit("ticketsPending", ticketControl.tickets.length);
    socket.emit("ticketsPending", ticketControl.tickets.length);

    callback({
      ok: !!ticket,
      ...(!!ticket ? { ticket } : { msg: "Has not pending tickets!" })
    });
  });
};

module.exports = {
  socketController
};
