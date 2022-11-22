
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
	let film = new Location();
	await film.save(data)
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
module.exports.findOneSource = findOneSource;
