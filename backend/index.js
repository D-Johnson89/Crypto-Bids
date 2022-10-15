const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'MY_S3CR3T_K3Y'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb+srv://djohnson3009:Fy6bCReTINpXOKjc@users.xbb0hed.mongodb.net/test")

app.post(
	'/api/register', async (req, res) => {

		try {
			const user = await User.create({
				username: req.body.username,
				email: req.body.email,
				hash: bcrypt.hashSync(req.body.password, 10),
			})
			
			const jwtToken = jwt.sign(
				{
					userId: user._id,
					username: user.username,
					email: user.email,
				}, secret
			)
			return res
				.status(200)
				.json({ message: "Registered Successfully", token: jwtToken, email: user.email, username: user.username })
			
		} catch (err) {
			console.log(err)
			
			return res
                .status(409)
                .json({ error: "Email or username already exist" })
		}
	}
)

app.post(
	"/api/login", async (req, res) => {
		const { email, password } = req.body

        try {
            const user = await User.findOne({ email }).catch(
                (err) => {
                    console.log("Error: ", err)
                }
            )

            if(!bcrypt.compareSync(password, user.hash)) {
                return res
                    .status(400)
                    .json({ message: "Email or password does not match!", user: false })
            }

            const jwtToken = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                },
                secret
            )
            
            return res
                .status(200)
                .json({ message: "Welcome Back!", token: jwtToken, email: email, username: user.username })
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Email does not exist!" })
        }
    }
)

app.get(
    "/api/addressBook", async (req, res) => {
        const token = req.headers.authentication.split(' ')[1]
        const email = jwt.verify(token, secret).email
        console.log(token, email)

        try{
            const addresses = await User.where('email').equals(email).select('addresses')
            .catch(
			    (err) => {
				    console.log("Error: ", err)
			    }
		    )

        const wdAddresses = addresses[0].addresses
        console.log(wdAddresses)

        return res
            .status(200)
            .json({ addresses: wdAddresses })
        } catch (err) {
            return res
                .status(400)
                .json({ addresses: []})
        }
    }
)

app.post(
    "/api/addAddress", async (req, res) => {
        const { institute, address } = req.body

        const token = req.headers.authentication.split(' ')[1]

        const email = jwt.verify(token, secret).email
        //console.log(`INSTITUTE: ${institute}, ADDRESS: ${address}, EMAIL: ${email}`)

        const wdAddress = {
            institute: institute,
            address: address,
            withdrawn: 0,
        }
        console.log(wdAddress)
        try {
            await User.findOneAndUpdate({ email }, { $push: { addresses: wdAddress } })
            console.log(wdAddress)
            return res
                .status(201)
                .json({ message: 'Address Saved'})
        } catch (err) {
            return res
                .status(400)
                .json({ message: 'Address not saved'})
        }

    }
)

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
