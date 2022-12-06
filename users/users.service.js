const User = require("../users/users.model");
const e = require("express");

function findAll () {
    return User.find();
}
function findOne(id) {
    return User.findOne({'_id':id});

}
async function insert(data) {
    let user = new User(data);
    await user.save();
}

function signJwt (data){

}
module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.insert = insert;
module.exports.signJwt = signJwt;