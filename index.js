// You define routing using methods of the Express app object that correspond to HTTP methods
// express: It is a minimal and flexible Node.js web application framework.
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// dotenv: It loads environment variables from a .env file.
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!') })

//File loader : Location Controller
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')

const port = 3000

// The app.use() function is used to mount the specified middleware function(s) at the path which is being specified.
// It is mostly used to set up middleware for your application.
// Un middleware permet d'améliorer l'efficacité des développeurs qui créent les applications.
// Il joue le rôle de lien entre les applications, les données et les utilisateurs.
app.use(bodyParser.json())
app.use('/locations',locationController)
app.use('/users',userController)

//app.use(notFound);
//app.use(errorHandler);

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

function notFound(req, res, next) {
	res.status(404);
	const error = new Error('Not Found', req.originalUrl);
	next(error);
}
function errorHandler(err, req, res, next){
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		stack: err.stack
	});
}

module.exports = {
	notFound,
	errorHandler
}


/** Question 5 : Implement a "Hello World" route, on GET / that returns "Hello World" */

/*app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})*/
