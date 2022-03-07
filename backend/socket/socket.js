const { Server } = require('socket.io');
const config = require('../config/config.js');
const jwt   = require('jsonwebtoken');

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
            },
        });

        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if(!token) {
                return next(new Error('Authentication Error'));
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if(error) {
                    return next(new Error('Authentication Error'));
                }
                next();
            });
        });

        this.io.on("connection", (socket) => {
            console.log('Socekt client connected');
        })
    }
}

let socket;
function initSocket(server) {
    if (!socket) {
        socket = new Socket(server);
    }
    return socket.io;
}

function getSocketIo() {
    if (!socket) {
        throw new Error('please call inint first')
    }

    return socket.io;
}

module.exports.initSocket = initSocket;
module.exports.getSocketIo = getSocketIo;