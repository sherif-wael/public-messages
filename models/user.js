const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    provider: {
        type: String,
    },
    providerId: {
        type: String
    },
    photo: {
        type: String
    }
})

module.exports = User = mongoose.model("user", userSchema)