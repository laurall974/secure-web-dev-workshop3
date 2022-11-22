
// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find();
}
function findOne(id) {
	return Location.findOne({'_id':id});

}
function findOneSource(id) {
	return Location.findOne({'SourceLocationId':id});

}
async function insert(data) {
	let film = new Location(data);
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

async function updateLoc(id, element, newValue){
	try {
		const loc = await Location.findOne({'_id':id})
		loc[element] = newValue;
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
module.exports.updateLoc = updateLoc;
module.exports.findOneSource = findOneSource;
