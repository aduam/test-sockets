// express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Http server
    this.server = http.createServer(this.app);

    // Socket configs
    this.io = socketio(this.server, { /* configs */ });
  }

  middlewares() {
    // Deploy public directore
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    
    // CORS
    this.app.use(cors());
  }

  sockets() {
    const sockets = new Sockets(this.io);
    sockets.socketEvents();
  }

  execute() {
    // Init middlewares
    this.middlewares();


    // Init sockets
    this.sockets();

    // Init server
    this.server.listen(this.port, () => {
      console.log(`server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
