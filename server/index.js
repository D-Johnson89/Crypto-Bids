// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

//MEN

// E - Express

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require('./models/user.model');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/");

app.post(
	"/api/register", async (req, res) => {
		console.log(req.body);
		try {
			const user = await User.create({
				username: req.body.username,
				email: req.body.email,
				hash: bcrypt.hashSync(req.body.password, 10),
			});
			res.json({ status: "ok" });
		} catch (err) {}

		res.json({ status: "error", error: "Duplicate email" });
	}
);

app.post(
	"/api/login",
	/*middleware function goes here*/ async (req, res) => {
		console.log(req.body);
		const user = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		});

		if(user) {
			return res.json({ status: "ok", user: true });
		} else {
			return res.json({ status: "error", user: false});
		}
	}
);

app.listen(1337, () => {
	console.log("Server started on 1337");
});
