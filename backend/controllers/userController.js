const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'MY_S3CR3T_K3Y'

/*
  @ desc Creates User
  @ route POST api/register
  @ params (req, res)
  @ returns {Promise<void>}
*/
async function setUser (req, res) {
    // Try to create new user
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            hash: bcrypt.hashSync(req.body.password, 10)
        })

        // Create token
        const jwtToken = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email, secret
            }
        )

        return res
            .status(201)
            .json({ message: "Registered Successfully", token: jwtToken, email: newUser.email, username: newUser.username })

    // Catch errors
    } catch (err) {
        console.error(err)
        return res
            .status(409)
            .json({ error: "Email or username already exist" })
    }
}

/*
  @ desc Get User
  @ route POST api/login
  @ params (req, res)
  @ returns {Promis<any>}
*/
async function getUser(req, res) {
    // Put form data into variables
    const { email, password } = req.body
    console.log(`Email: ${email}, Password: ${password}`)
    // Try to find user data
    try {
        // Create user variable if user found
        const user = await User.findOne({ email }).catch(
            (err) => {
                console.error(err)
                return res
                    .status(400)
                    .json({ message: 'Email does not exist' })
            }
        )

        // Check password
        if(!bcrypt.compareSync(password, user.hash)) {
            return res
                .status(400)
                .json({ message: 'Email or password does not match', user: false })
        }

        // Create token for user
        const jwtToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
            },
            secret,
            { expiresIn: '24h' },
        )

        return res
            .status(200)
            .json({ message: 'Welcome Back!', token: jwtToken, email: email, username: user.username, balance: user.tetherBal })
        
    // Catch Errors
    } catch (err) {
        console.error(err)
        return res
            .status(400)
            .json({ name: err.name, message: err.message })
    }
}

/*
  @ desc Get UserCard
  @ route GET api/authCard
  @ params (req, res)
  @ returns {Promis<void>}
*/
async function getCard(req, res) {
    // Create variable from req data
}

// @desc Update User
// @route PUT api/login/:id
// @ access Private
const changePW = (req, res) => {
    res.status(200).json({ message: `Update User ${req.params.id}` })
}

// @desc Delete User
// @route DeLETE api/login/:id
// @ access Private
const deleteUser = (req, res) => {
    res.status(200).json({ message: `Delete User ${req.params.id}` })
}

module.exports = {
    getUser,
    setUser,
    //updateUser,
    deleteUser
}