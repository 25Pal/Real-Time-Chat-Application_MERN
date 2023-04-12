const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const validator = require('validator');

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Creating User ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const register = async function (req, res) {
    try {
        const data = req.body;
        let newObj = {};

        if (data.email) {
            if (!validator.isEmail(data.email))
                return res.json({ status: false, msg: "Enter a valid email-id" })
        };

        if (data.userpassword) {
            if (!validator.isStrongPassword(data.userpassword)) {
                return res.json({ status: false, msg: `Password must contain Atleast One special character , 0-9 , #,@,!,$,%,* and length must be >=8 ` })
            }
        };

        if (data.username) {
            if (!validator.isAlphanumeric(data.username, "en-US", { ignore: '  _ - @' })) {
                return res.json({ status: false, msg: "Invalid Username !" });
            }
        };

        let checkDublicateUser = await userModel.findOne({ username: data.username });
        if (checkDublicateUser) {
            return res.json({ status: false, msg: "UserName already exists !" });
        }

        let checkEmail = await userModel.findOne({ email: data.email });
        if (checkEmail) {
            return res.json({ status: false, msg: "Email already exists !" })
        }

        newObj = {
            username: data.username,
            email: data.email
        }

        const hashPass = await bcrypt.hash(data.userpassword, 10);
        newObj.userpassword = hashPass;

        const createUser = await userModel.create(newObj);
        return res.json({ status: true, createUser });

    } catch (err) {
        return res.json({ status: false, msg: err.message });
    }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Verifying User ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const login = async function (req, res) {
    try {
        const data = req.body;

        let checkUser = await userModel.findOne({ username: data.username });

        if (!checkUser) {
            return res.json({ status: false, msg: "Invalid Username !" })
        }

        let checkPassword = await bcrypt.compare(data.userpassword, checkUser.userpassword)
        if (!checkPassword) {
            return res.json({ status: false, msg: "Wrong Passsword !" })
        }

        return res.json({ status: true, checkUser });

    } catch (err) {
        return res.json({ status: false, msg: err.message });
    }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Setting Avatar / Profile ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const setAvatar = async function (req, res) {
    try {

        const userId = req.params.id;
        const avatarImage = req.body.image;

        const userData = await userModel.findByIdAndUpdate(userId, { isAvatarImageSet: true, avatarImage });

        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });

    } catch (err) {
        return res.json({ status:false, msg: err.message })
    }
}

////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Getting list of Users ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const getAllUsers = async function (req, res) {
    try {
        let currentUserId = req.params.id;

        const users = await userModel.find({ _id: { $ne: currentUserId } }).select([
            "email", "username", "avatarImage", "_id",
        ]).sort({ updatedAt: -1 });

        return res.json(users);

    } catch (err) {
        return res.json({ msg: err.message });
    }
};



module.exports = { register, login, setAvatar, getAllUsers }