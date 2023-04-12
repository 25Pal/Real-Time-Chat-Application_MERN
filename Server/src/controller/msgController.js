const messageModel = require("../model/messageModel");

const addMsg = async function (req, res) {
    try {

        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) {
            return res.json({ status: true, msg: "Message Recieved!" })
        } else {
            return res.json({ status: false, msg: "Message not Recieved!" })
        }

    } catch (err) {

        return res.json({ msg: err.message })
    }


}

const getAllMsg = async function (req, res) {
    try {

        const { from, to } = req.body;

        const msgs = await messageModel.find({
            users: { $all: [from, to] },
        }).sort({ updatedAt: 1 });


        const projectMessages = msgs.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };

        });
        return res.json(projectMessages)

    } catch (err) {

        return res.json({ msg: err.message })
    }


}

module.exports = { addMsg, getAllMsg }