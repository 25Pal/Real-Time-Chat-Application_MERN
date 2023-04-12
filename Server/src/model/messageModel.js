const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("msg", msgSchema);

