// @desc Get User
// @route Get api/login
// @ access Private
const getUser = (req, res) => {
    res.status(200).json({ message: 'Get User' })
}

// @desc Set User
// @route Post api/login
// @ access Private
const setUser = (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: 'Set User' })
}

// @desc Update User
// @route PUT api/login/:id
// @ access Private
const updateUser = (req, res) => {
    res.status(200).json({ message: `Update User ${req.params.id}` })
}

// @desc Delete User
// @route DeLETE api/login/:id
// @ access Private
const deleteUser = (req, res) => {
    res.status(200).json({ message: `Delete User ${req.params.id}` })
}

module.exports = {
    getUser,
    setUser,
    updateUser,
    deleteUser
}