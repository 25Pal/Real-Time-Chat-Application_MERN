const router = require ("express").Router();

const {register,login,setAvatar,getAllUsers,updateAvatar}= require("../controller/userController")
const {addMsg,getAllMsg}= require("../controller/msgController")

router.post("/register",register);
router.post("/login",login);
router.post("/avatr/:id",setAvatar);
router.post("/updateProfile/:id",updateAvatar)
router.get("/allusers/:id",getAllUsers);


router.post("/addmsg/",addMsg);
router.post("/getmsg/",getAllMsg);

module.exports=router;