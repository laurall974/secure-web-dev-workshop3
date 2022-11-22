
// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find();
}
function findOne(id) {
	return Location.findOne({'_id':id});

}


module.exports.findAll = findAll
module.exports.findOne = findOne;
