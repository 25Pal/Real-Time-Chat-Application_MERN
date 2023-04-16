const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");

////////////////////// Socket.io Connection \\\\\\\\\\\\\\\\\\\\\\\\\\
const socket = require("socket.io");

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", userRoutes);

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("DataBase Connected Succesfully !");
}).catch((err) => {
    console.log(err);
})

const server = app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})

/////////////////////// Socket Operation \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//----> creating connection with server
const io = socket(server, {
    cors: {
        origin: process.env.BASE_URL ,
        credentials: true,
    },
});

global.onlineUsers = new Map();

//-->Whenever our server is connected to socket io 

io.on("connection", (socket) => {

    global.chatSocket = socket;

    //-->Catching custom event "add-user"
    socket.on("add-user", (userId) => {
  
        onlineUsers.set(userId, socket.id);
        
    });
   
    //-->Catching custom event "send-msg"
    socket.on("send-msg", (data) => {
     
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
   
});
