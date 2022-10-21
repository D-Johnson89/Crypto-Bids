const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'MY_S3CR3T_K3Y'

// Call for every request
router.use((req, res, next) => {
    let token = req.get('Authentication')
    if (token) {
        token = token.replace('Bearer ', '')
        jwt.verify(token, secret, (error, decode) => {
            if (error) next(error)
            else {
                // Token is verified
                req.username = decoded.username
                req._id = decoded._id
                req.email = decoded.email
                // Next controller function
                next()
            }
        })
    } else {
        next()
    }
})

// Check for authentication
const authenticated = (req, res, next) => {
    if (!req.username) {
        res.status(403).json({ message: 'User not authenticated' })
    } else {
        next()
    }
}

// Unsecure routes
router.post('/api/register', userCtrl.setUser)
router.post('/api/login', userCtrl.getUser)


// Secure routes
//router.get('/authCard', userCtrl.getCard)
/*
    @AuthCard
    @ChangePW
    @DeleteAcc
*/

module.exports = router