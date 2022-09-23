const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        default: true,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;