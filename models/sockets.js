class Sockets {
  constructor(io) {
    this.io = io;
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      socket.on('message-to-server', (data) => {
        this.io.emit('messages', data);
      })
    });
  }
}

module.exports = Sockets;
