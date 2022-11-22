const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
	filmType: String,
	filmProducerName: String,
	endDate: Date,
	filmName: String,
	district: Number,
	geolocation: {
		coordinates: [Number],
		type: { type: String },
	},
	sourceLocationId: String,
	filmDirectorName: String,
	address: String,
	startDate: Date,
	year: Number,
})

const Location = mongoose.model('Location', filmSchema)

// Dans un autre fichier on pourra donc écrire :
// import Location from 'locations.model.js';
module.exports = Location

