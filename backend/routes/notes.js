const router = require('express').Router()
let Note = require('../models/note.model')

router.route('/').get((req, res) => { // get all notes
    Note.find().sort({ updatedAt: -1})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => { // add new note
    const note = new Note({
        title: req.body.title,
        text: req.body.text,
        isStarred: req.body.isStarred,
        tags: req.body.tags
    })
    note.save()
        .then(() => res.json('Note is added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
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