const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // roles can be : create, read, update, delete
    // admin can have all 4 whereas user can have only read permission
    roles: [ String ] 
});

module.exports = mongoose.model("User", userSchema);