const express = require('express');
const app = express();
const server  = require("http").createServer(app);
const io = require("socket.io")(server);
const session = require("express-session")({
    secret: "mysdfadsfadsf-adfadsfadsfasdsecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 30 * 1000
    }
});

let messageID = 0;

const sharedsession = require("express-socket.io-session");
 
// use session
app.use(session);
 
// Share session with io sockets
 
io.use(sharedsession(session));
 
io.on("connection", (socket) => {
    // Accept a login event with user's data

    console.log('connected')
    socket.on("login", (userdata) => {
        socket.handshake.session.user = {...userdata, socketID: socket.id};

        
        socket.handshake.session.save();
        socket.join('chatroom');
    });

    socket.on('get_user', (userdata) => {
        socket.emit('check_user', socket.handshake.session.user);
    });

    socket.on('update_session', (test) => {
        socket.handshake.session.user.test = test
        socket.to(socket.id).emit('check_user', socket.handshake.session.user);
    });
   
    socket.on("message", (messageObj) => {
        //check to see if there is a message  
        io.emit("message", {user: socket.handshake.session.user,  message: messageObj.message, id:  messageID}); 
        messageID++  
        
    });

    socket.on("logout", (userdata) => {
        if (socket.handshake.session.user) {
            delete socket.handshake.session.user;
            socket.handshake.session.save();
        }
    });
    
    socket.on('disconnect', (test)=> {
        console.log('DQd',socket.handshake.session.user)
        socket.leave('chatroom');
    })
});
 
server.listen(4000, () => console.log('connected on port 4000'));