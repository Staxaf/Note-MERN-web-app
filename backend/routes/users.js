const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.route('/register').post((req, res) => { // add new note
    const {name, email, password} = req.body
    // Simple validation
    if (!name || !email || !password) {
        res.status(400).json({msg: "All fields is required"})
    }
    User.findOne({email})
        .then(user => {
            if (user) return res.status(400).json({msg: 'User already exists'})
            const newUser = new User({
                name, email, password,
            })
            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) res.status(400).json({msg: 'Error' + err})
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            res.status(200).json({user})
                        }).catch(err => res.status(400).json({msg: 'Error' + err}))
                })
            })
        }).catch(err => res.status(400).json('Error: ' + err))
})

// Private route, get the user by token
router.route('/user').get(auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => res.status(200).json({user}))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Update user info (not password and email)
router.route('/update-user-info').post(auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const {name, tags} = req.body
            user.name = name
            user.tags = tags
            user.save()
                .then(() => res.json({msg: 'User successfully updated!'}))
                .catch(err => res.status(400).json('Error: ' + err))
        }).catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router