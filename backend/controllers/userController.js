const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET || "MY_S3CR3T_K3Y"

/*
  Set user object
*/
function createUserObject(member) {

    /*
      Set variable functions for checking existing records
    */
    const isAddresses = () => (member.addresses ? member.addresses : [])

    const isBids = () => (member.bids ? member.bids : [])

    const isTransactions = () => (member.transactions ? member.transactions : [])

    /*
      Create user object to return
    */
    const user = {
        environment: member.environment,
        username: member.username,
        email: member.email,
        balances: {
        fiat: member.fiatBal,
        tether: member.tetherBal,
        test: member.testBal,
        },
        invites: member.invites,
        addresses: isAddresses(),
        bids: isBids(),
        transactions: isTransactions(),
    }

    /*
      Return user
    */
    return user
}


/*
  @ desc Creates User
  @ route POST api/register
  @ params (req, res)
  @ returns {Promise<tokenObj, userObj>}
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
  @ returns {Promise<tokenObj, userObj>}
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
  @ route POST api/users/addAddress
  @ params (req, res)
  @ returns {Promise<tokenObj, userObj>}
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
          Member variable to create token and user object for
        */
        const member = await User.findOneAndUpdate({ email }, { $push: { addresses: wdAddress } }, {
            returnOriginal: false,
        }).catch(
            (err) => {

                /*
                  Catch error and inform user something went wrong while searchin db
                */
                console.error(err)
                return res
                    .status(400)
                    .json({ message: 'Something went wrong' })
            }
        )

        /*
          Create jwt token
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
          Create user object
        */
        const user = createUserObject(member)

        /*
          Return token and user object
        */
        return res
            .status(201)
            .json({ message: 'Address Saved', token: jwtToken, user: user })

    /*
      Catch erros and return address not saved
    */
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
  @ returns {Promise<tokenObj, userObj>}
*/
async function deleteAddress(req, res) {

    /*
      Create variables from req data
    */
    const token = req.headers.authentication
    const address = req.headers.addressid
    const email = jwt.verify(token, secret).email

    /*
      Try to find and update user in database
    */
    try {

        /*
          Member variable to create token and user object for
        */
        const member = await User.findOneAndUpdate({ email }, { $pull: { addresses: { id: address } } }, {
            returnOriginal: false,
        }).catch(
            (err) => {

                /*
                  Catch error and inform user something went wrong while searchin db
                */
                console.error(err);
                return res.status(400).json({ message: "Something went wrong" })
            }
        )

        //console.log('member: ', member)
        /*
          Create jwt token
        */
        const jwtToken = jwt.sign(
        {
            userId: member._id,
            username: member.username,
            email: member.email,
        },
        secret,
        { expiresIn: "24h" }
        )

        /*
          Create user object
        */
        const user = createUserObject(member)

        //console.log(user)
        /*
          Return token and user object
        */
        return res
        .status(201)
        .json({ message: "Address deleted", token: jwtToken, user: user })

    /*
      Catch errors and return something went wrong
    */
    } catch (err) {
        return res.status(400).json({ message: "Something went wrong!" })
    }
}


/*
  @ desc Update User password
  @ route POST api/users/changePW
  @ params (req, res)
  @ returns {Promise<void>}
*/
async function changePW(req, res) {

    /*
        Create variables from req data
    */
    const { oldPW, newPW } = req.body

    const token = req.headers.authentication
    const email = jwt.verify(token, secret).email

    /*
      Try to get user data
    */
    try {

        /*
          Create user variable for user found
        */
        const member = await User.findOne({ email })

        /*
          If input old password doesnt match saved hash comparrison, return failed to change password
        */
        if (!bcrypt.compareSync(oldPW, member.hash)) {
        return res.status(400).json({ message: "Failed to change password!" })

        /*
          Else update hash for current user
        */
        } else {
            member.hash = bcrypt.hashSync(newPW, 10)

            /*
              Save change in db
            */
            await member.save()

            /*
              Return password changed
            */
            return res.status(201).json({ message: "Password Changed" })
        }

    /*
      Catch errors and return failed to change password
    */
    } catch {
        return res.status(400).json({ message: "Failed to change password!" })
    }
}


/*
  @ desc Delete User
  @ route DELETE api/user/deleteAcc
  @ params (req, res)
  @ returns {Promise<null>}
*/
async function deleteAcc(req, res) {

    /*
      Create variables from req data
    */
    const token = req.headers.authentication
    const email = jwt.verify(token, secret).email

    /*
      Set variable from form data
    */
    const { password } = req.body;
    
    /*
      Try to get user data
    */
    try {

        /*
          Variable for user found
        */
        const member = await User.findOne({ email })

        /*
          If password entered is incorrect, return as such
        */
        if (!bcrypt.compareSync(password, member.hash)) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        /*
          Delete user data
        */
        await member.deleteOne({ email: { email } })

        /*
          Return account deleted
        */
        return res.status(201).json({ message: "Account deleted" })

    /*
      Catch errors and return failed to delete account
    */
    } catch {
        return res.status(400).json({ message: "Failed to delete account" })
    }
}

module.exports = {
  getUser,
  setUser,
  addAddress,
  deleteAddress,
  changePW,
  deleteAcc,
}
