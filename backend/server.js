const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./routes/notes')
const usersRouter = require('./routes/notes')

require('dotenv').config()

const app = express()

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully!')
})

app.use(cors()) // added new middleware
app.use(express.json()) // allows to parse json

app.use('/notes', notesRouter)
app.use('/users', usersRouter)

app.listen(5000, () => {
    console.log('Server is started in port 5000')
})