
// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find();
}
function findOne(id) {
	return Location.findOne({'_id':id});

}
async function insert(filmType, filmProducerName, endDate, filmName, district, sourceLocationId, filmDirectorName, address, startDate, year) {
	let film = new Location();
	film.filmType = filmType;
	film.filmProducerName = filmProducerName;
	film.endDate = endDate;
	film.filmName = filmName;
	film.district = district;
	film.sourceLocationId = sourceLocationId;
	film.filmDirectorName = filmDirectorName;
	film.address = address;
	film.startDate = startDate;
	film.year = year;
	await film.save()
}


module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.insert = insert;
