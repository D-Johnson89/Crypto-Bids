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
                req.username = decode.username
                req._id = decode._id
                req.email = decode.email
                // Next controller function
                next()
            }
        })
    } else {
        next()
    }
})

// Unsecure routes
router.post('/register', userCtrl.setUser)
router.post('/login', userCtrl.getUser)


// Secure routes
router.post('/addAddress', userCtrl.addAddress)
router.delete('/addressBook', userCtrl.deleteAddress)
/*
    @AuthCard
    @ChangePW
    @DeleteAcc
*/

module.exports = router