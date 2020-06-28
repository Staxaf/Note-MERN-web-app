const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: Array,
        required: false
    },
    profilePhoto: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
