const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    reciever: {
        type: String
    },
    body: {
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Messgae = mongoose.model("message", messageSchema);