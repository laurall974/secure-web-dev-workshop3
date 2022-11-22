
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

async function remove(id) {
	try {
		const query = await Location.deleteOne({'_id':id})
		console.log(query);
	} catch (error) {
		//console.error(error);
		console.error('ID does not exist');
	}

}

async function update(id, option, newValue){
	try {
		const loc = await Location.findById(id)
		loc[option] = newValue;
		await loc.save();
		console.log('Updated')
	}
	catch (error){
		console.error(error)
	}
}


module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.insert = insert;
module.exports.remove = remove;
module.exports.update = update;
