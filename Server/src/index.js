const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const app = express();
require("dotenv").config();
const userModel = require("./model/userModel")
const path = require("path");

const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");

////////////////////// Socket.io Connection \\\\\\\\\\\\\\\\\\\\\\\\\\
const socket = require("socket.io");

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));
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

app.get("*", (req, res) => {
    const file = path.join(__dirname, "../build/index.html");
    res.sendFile(file);
  });

/////////////////////// Socket Operation \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//----> creating connection with server
const io = socket(server, {
    cors: {
        origin: process.env.BASE_URL,
        credentials: true,
    },
});

global.onlineUsers = new Map();

const users = {};
//-->Whenever our server is connected to socket io 

io.on("connection", (socket) => {


    global.chatSocket = socket;
    //-->For online status
    const iD = socket.handshake.auth.token;


    // socket.on("onlinestatus", async (userId) => {
    //     console.log("user connected");
    //      // saving userId to object with socket ID
    // users[socket.id] = userId;
    //     await userModel.findByIdAndUpdate({ _id: userId }, { $set: { Online: true } });
    //     //-->Broadcasting User 
    //     socket.broadcast.emit("getOnlineUser", { user_id: iD });
    // })


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

    socket.on("disconnect", async () => {
        
        if (iD == undefined) {
            return console.log("error")
        }

        await userModel.findByIdAndUpdate({ _id: iD }, { $set: { Online: false } });
        delete users[socket.id];
        console.log("user disconnected");
        //-->Broadcasting Offline User 
        socket.broadcast.emit("getOfflineUser", { user_id: iD });
    })
   

});
