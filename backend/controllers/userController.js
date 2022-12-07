const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'MY_S3CR3T_K3Y'

/*
  Set user object
*/
function createUserObject (member) {
    const isAddresses = () => member.addresses ? member.addresses : []

    const isBids = () => member.bids ? member.bids : []

    const isTransactions = () => member.transactions ? member.transactions : []
    
    const user = {
        environment: member.environment,
        username: member.username,
        email: member.email,
        balances: {fiat: member.fiatBal, tether: member.tetherBal, test: member.testBal},
        invites: member.invites,
        addresses: isAddresses(),
        bids: isBids(),
        transactions: isTransactions(),
    }

    return user
}
/*
  @ desc Creates User
  @ route POST api/register
  @ params (req, res)
  @ returns {Promise<void>}
*/
async function setUser (req, res) {

    /*
      Try to create new user
    */
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            hash: bcrypt.hashSync(req.body.password, 10)
        })

        /*
          Create token
        */
        const jwtToken = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            secret,
            { expiresIn: '24h' },
        )
        
        /*
          Create user variable to pass back to front end
        */
        const user = createUserObject(newUser)

        /*
          Send response to frontend
        */
        return res
            .status(201)
            .json({ message: "Registered Successfully", token: jwtToken, user: user })

    /*
      Catch errors
    */
    } catch (err) {
        console.error('Error: ', err)
        return res
            .status(409)
            .json({ error: 'Duplicate key', message: "Email or username already exist" })
    }
}


/*
  @ desc Get User
  @ route POST api/login
  @ params (req, res)
  @ returns {Promis<any>}
*/
async function getUser(req, res) {

    /*
      Put form data into variables
    */
    const { email, password } = req.body
    
    /*
     Try to find user data
    */
    try {

        /*
          Create user variable if user found
        */
        const member = await User.findOne({ email }).catch(
            (err) => {
                /*
                  Catch errors finding user
                */
                console.error(err)
                return res
                    .status(400)
                    .json({ message: 'Email does not exist' })
            }
        )

        /*
          Check password, if it doesn't match return as such
        */
        if(!bcrypt.compareSync(password, member.hash)) {
            return res
                .status(400)
                .json({ message: 'Email or password does not match', user: false })
        }

        /*
          Create token for user
        */
        const jwtToken = jwt.sign(
            {
                userId: member._id,
                username: member.username,
                email: member.email,
            },
            secret,
            { expiresIn: '24h' },
        )

        /*
          Create user variable to pass back to front end
        */
        const user = createUserObject(member)

        /*
          Return response to frontend
        */
        return res
            .status(200)
            .json({ message: 'Welcome Back!', token: jwtToken, user: user })
        
    /*
      Catch Errors
    */
    } catch (err) {
        console.error(err)
        return res
            .status(400)
            .json({ name: err.name, message: err.message })
    }
}


/*
  @ desc Add Withdrawal Address
  @ route POSR api/users/addAddress
  @ params (req, res)
  @ returns {Promise<void>}
*/
async function addAddress(req, res) {

    /*
      Create variables from req data
    */
    const { id, institute, address } = req.body
    const wdAddress = {
        id: id,
        institute: institute,
        address: address,
        withdrawn: 0,
    }

    /*
      Get user email
    */
    const token = req.headers.authentication
    const email = jwt.verify(token, secret).email

    /*
      Try to find and update user in database
    */
    try {

        /*
          Member variable to create token and user object
        */
        const member = await User.findOneAndUpdate({ email }, { $push: { addresses: wdAddress } }).catch(
            (err) => {
                console.error(err)
                return res
                    .status(400)
                    .json({ message: 'Something went wrong' })
            }
        )

        console.log(member)
        const jwtToken = jwt.sign(
            {
                userId: member._id,
                username: member.username,
                email: member.email,
            },
            secret,
            { expiresIn: '24h' },
        )

        const user = createUserObject(member)

        console.log(user)
        return res
            .status(201)
            .json({ message: 'Address Saved', token: jwtToken, user: user })
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Address not saved' })
    }
}



/*
  @ desc Delete Withdrawal Address
  @ route POST api/users/addressBook
  @ params (req, res)
  @ returns {Promise<void>}
*/
async function deleteAddress(req, res) {
    // Create variables from req data
    const token = req.headers.authentication
    const address = req.headers.addressid
    const email = jwt.verify(token, secret).email


    try {
        const member = await User.updateOne(
            { email: email }, { $pull: { addresses: { id: address }}}
        ).catch(
            (err) => {
                console.error(err)
                return res
                    .status(400)
                    .json({ message: 'Something went wrong' })
            }
        )

        const jwtToken = jwt.sign(
            {
                userId: member._id,
                username: member.username,
                email: member.email,
            },
            secret,
            { expiresIn: '24h' },
        )

        const user = createUserObject(member)

        return res
            .status(201)
            .json({ message: 'Address deleted', token: jwtToken, user: user })
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Something went wrong!' })
    }
}

// @desc Update User
// @route PUT api/login/:id
// @ access Private
async function changePW(req, res) {
    // Create variables from req data
    const { oldPW, newPW } = req.body

    const token = req.headers.authentication
    const email = jwt.verify(token, secret).email

    try {
        const member = await User.findOne({ email })

        if(!bcrypt.compareSync(oldPW, member.hash)) {
            return res
                .status(400)
                .json({ message: 'Failed to change password!' })
        } else {

            member.hash = bcrypt.hashSync(newPW, 10)

            await member.save()

            return res
                .status(201)
                .json({ message: 'Password Changed' })
        }
        
    } catch {
        return res
            .status(400)
            .json({ message: 'Failed to change password!' })
    }
}

// @desc Delete User
// @route DeLETE api/login/:id
// @ access Private
async function deleteAcc(req, res) {
    const token = req.headers.authentication
    const {password} = req.body
    const email = jwt.verify(token, secret).email
    try {
        const member = await User.findOne({ email })

        if(!bcrypt.compareSync(password, member.hash)) {
            return res
                .status(400)
                .json({ message: 'Incorrect Password'})
        }
        await member.deleteOne({ email: { email } })

        return res
            .status(201)
            .json({ message: 'Account deleted' })
    } catch {
        return res
            .status(400)
            .json({ message: 'Failed to delete account' })
    }
}

module.exports = {
    getUser,
    setUser,
    addAddress,
    deleteAddress,
    changePW,
    deleteAcc
}