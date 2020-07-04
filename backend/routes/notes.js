const router = require('express').Router()
let Note = require('../models/note.model')
const auth = require('../middleware/auth')

router.route('/').get(auth, (req, res) => { // get all notes
    Note.find().sort({ updatedAt: -1})
        .then(notes => {
            res.json(notes.filter(note => note.userId === req.user.id))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(auth, (req, res) => { // add new note
    const note = new Note({
        title: req.body.title,
        text: req.body.text,
        isStarred: req.body.isStarred,
        tags: req.body.tags,
        userId: req.body.userId
    })
    note.save()
        .then(() => res.json('Note is added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post(auth, (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.title = req.body.title
            note.text = req.body.text
            note.isStarred = req.body.isStarred
            note.tags = req.body.tags
            note.save()
                .then(() => res.json('Note is updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
})

router.route('/delete/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router