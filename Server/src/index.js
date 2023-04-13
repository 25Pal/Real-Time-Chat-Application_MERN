const express=  require("express");
const cors= require("cors");
const mongoose = require('mongoose')
const app = express();
require("dotenv").config();

const PORT= process.env.PORT || 5000;
const userRoutes= require("./routes/userRoutes");


const socket = require("socket.io");

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",userRoutes);

mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology:true}
).then(()=>{
    console.log("DataBase Connected Succesfully !");
}).catch((err)=>{
    console.log(err);
})

const server = app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})

const io= socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;

    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId ,socket.id);
    });

    socket.on("send-msg",(data)=>{
       
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve",data.message);
    }
});
});
