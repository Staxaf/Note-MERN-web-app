const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.route('/').post((req, res) => { // add new note
    const {email, password} = req.body
    // Simple validation
    if (!email || !password) {
        res.status(400).json({msg: "All fields is required"})
    }
    User.findOne({email})
        .then(user => {
            if (!user) return res.status(400).json({msg: 'User does not exist'})
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'})
                    const accessToken = generateAccessToken(user.id)
                    res.json({accessToken})
                })
        }).catch(err => res.status(400).json('Error: ' + err))
})

const generateAccessToken = (userId) => {
    return jwt.sign({id: userId, type: 'access'}, process.env.JWT_SECRET)
}


module.exports = router