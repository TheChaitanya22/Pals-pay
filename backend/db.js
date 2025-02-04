const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const accountSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        requried: true,
    }
})

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accoutns", accountSchema);

module.exports = ({
    User,
    Accounts,
});