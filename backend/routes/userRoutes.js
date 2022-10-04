const express = require('express')
const router = express.Router()
const { getUser, setUser, updateUser, deleteUser } = require('../controllers/userController')

router.route('/').get(getUser).post('setUser')
router.router('/:id').put(updateUser).delete(deleteUser)

/*router.get('/', getUser)

router.post("/", setUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)*/

module.exports = router