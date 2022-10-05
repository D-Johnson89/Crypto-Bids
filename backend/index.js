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
		console.log(req.body);
		try {
			await User.create({
				username: req.body.username,
				email: req.body.email,
				hash: bcrypt.hashSync(req.body.password, 10),
			})
			
			const token = jwt.sign(
				{
					userId: user._id,
					username: user.username,
					email: user.email,
				}
			)
			res.json({ status: "ok", user: token})
		} catch (err) {
			console.log(err)
			
			res.json({ status: "error", error: "Duplicate email" })
		}
	}
)

app.post(
	"/api/login", async (req, res) => {
		const user = await User.findOne({
			email: req.body.email,
		})

		if(!bcrypt.compareSync(req.body.password, user.hash)) {
			return res.json({ status: "error", user: false })
		}

		if(user) {

			const token = jwt.sign(
				{
					userId: user._id,
					username: user.username,
					email: user.email,
				},
				secret
			)

			return res.json({ status: "ok", user: token })
		} else {
			return res.json({ status: "error", user: false})
		}
	}
)

app.get(
	"/api/navoptions", async (req, res) => {

		const token = req.headers['x-acces-token']

		try {
			const decoded = jwt.verify(token, secret)
			const username = decoded.username
			const user = await User.findOne({ username: username })

			return { status: 'ok', username: user.username }
		} catch {
			console.log(error)
			res.json({ status: 'error', error: 'invalid token '})
		}
	}
)

app.post(
	"/api/navoptions", async (req, res) => {

		const token = req.headers['x-acces-token']

		try {
			const decoded = jwt.verify(token, secret)
			const username = decoded.username
			await User.updateOne(
				{ username: username },
				{ $set: {username: req.body.username }}
				)

			return res.json({ status: 'ok' })
		} catch {
			console.log(error)
			res.json({ status: 'error', error: 'invalid token '})
		}
	}
)

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
