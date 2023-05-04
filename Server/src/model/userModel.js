const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    userpassword:{
        type:String,
        required:true,
        min:8,
        trim:true

    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    },
    Online:{
        type:Boolean,
        default : false
    }

},{timestamps:true})

module.exports=mongoose.model("user",userSchema);

