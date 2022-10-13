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
		console.log(req.body)
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
			res
				.status(200)
				.json({ message: "Registered Successfully", token: jwtToken, email: user.email, username: user.username })
			
		} catch (err) {
			console.log(err)
			
			res
                .status(409)
                .json({ error: "Email or username already exist" })
		}
	}
)

app.post(
	"/api/login", async (req, res) => {
		const { email, password } = req.body
        console.log(req.body)

		const user = await User.findOne({ where: { email } }).catch(
			(err) => {
				console.log("Error: ", err)
			}
		)

		if(!user) {
			return res
				.status(400)
				.json({ message: "Email does not exist!" })
		}

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
        //console.log(user)
		return res
			.status(200)
			.json({ message: "Welcome Back!", token: jwtToken, email: email, username: user.username })
	}
)

app.get(
    "/api/addressBook", async (req, res) => {
        const email = req
        console.log(email)
        /*const addresses = await User.where('email').equals(email).select('wdAddresses')
        .catch(
			(err) => {
				console.log("Error: ", err)
			}
		)*/
    }
)

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
