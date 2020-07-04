const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false
    },
    isStarred: {
      type: Boolean,
      required: true
    },
    tags: {
        type: Array,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note

