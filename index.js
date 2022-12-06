const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!') })
const bodyParser = require('body-parser')

const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')

const port = 3000

app.use(bodyParser.json())
app.use('/locations',locationController)
app.use('/users',userController)

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})


/** Question 5 : Implement a "Hello World" route, on GET / that returns "Hello World" */

/*app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})*/
