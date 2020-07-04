const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        res.status(401).json({msg: 'No token, authorization denied '})// unauthorized status
        return
    }
    //Check for token
    try {
        // Verify token
        // Add user from payload
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.status(400).json({msg: 'Token is not valid'})
    }
}

module.exports = auth