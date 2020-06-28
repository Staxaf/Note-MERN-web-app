const router = require('express').Router()
let User = require('../models/user.model')

router.route('/register').post((req, res) => { // add new note
    res.json('Hello world')
    //    .catch(err => res.status(400).json('Error: ' + err))
})