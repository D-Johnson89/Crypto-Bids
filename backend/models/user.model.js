const mongoose = require("mongoose");

const wdAddress = new mongoose.Schema(
    {
        id: { type: Number },
        institute: { type: String },
        address: { type: String },
        withdrawn: { type: Number },
    }
)

const Bids = new mongoose.Schema(
    {
        bType: { type: String },
		amount: { type: Number },
		win: { type: Boolean },
		crypto: { type: String },
    }
)

const Transactions = new mongoose.Schema(
    {
        tType: { type: String },
		amount: { type: Number },
    }
)

const User = new mongoose.Schema(
	{
        environment: { type: String, default: 'practice' },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		hash: { type: String, required: true },
		fiatBal: { type: Number, required: true, default: 0 },
		tetherBal: { type: Number, required: true, default: 0 },
        testBal: { type: Number, required: true, default: 100000 },
		invites: { type: Number, required: true, default: 0 },
		inviter: { type: String },
        addresses: { type: [wdAddress], unique: false, default: undefined },
		bids: { type: [Bids], default: undefined },
		transacions: { type: [Transactions], default: undefined },
	},
	{ collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
