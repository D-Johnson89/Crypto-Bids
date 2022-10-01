const express = require('express')
const router = express.Router()

router.post(
	'/', async (req, res) => {
		res.status(200).json({ message: "register successful" })
		/*try {
			const user = await User.create({
				username: req.body.username,
				email: req.body.email,
				hash: bcrypt.hashSync(req.body.password, 10)
			})
		} catch (err) {}

		res.json({ status: "error", error: "Duplicate email" })*/
	}
)

module.exports = router