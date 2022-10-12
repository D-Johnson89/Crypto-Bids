const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		hash: { type: String, required: true },
		fiatBal: { type: Number, required: true, default: 0 },
		tetherBal: { type: Number, required: true, default: 0 },
        wdAddresses: [],
		invites: { type: Number, required: true, default: 0 },
		inviter: { type: String },
		bids: {
			bType: { type: String },
			amount: { type: Number },
			win: { type: Boolean },
			crypto: { type: String },
		},
		transacions: {
			tType: { type: String },
			amount: { type: Number },
		},
	},
	{ collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
