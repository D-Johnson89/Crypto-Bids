const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		hash: { type: String, required: true },
		fiatBal: { type: Number, required: true, default: 0 },
		tetherBal: { type: Number, required: true, default: 0 },
		bids: {
			bType: { type: String, required: true },
			amount: { type: Number, required: true },
			win: { type: Boolean, required: true },
			crypto: { type: String, required: true },
		},
		transacions: {
			tType: { type: String, required: true },
			amount: { type: Number, required: true },
		},
	},
	{ collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
