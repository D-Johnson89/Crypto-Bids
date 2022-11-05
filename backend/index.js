// Start express server
const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 5000


// Execute database
const mongoose = require('mongoose')
const db = mongoose.connect("mongodb+srv://djohnson3009:Fy6bCReTINpXOKjc@users.xbb0hed.mongodb.net/test")

const app = express()
const cors = require('cors')

// Parse body data to json
app.use(express.json())

app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Mount app
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', `http://localhost:5173`)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authentication')
    next()
})

// Routes
app.use('/api/users', require('./routes/users'))

app.listen(port, () => console.log(`Server started on port ${port}`))
