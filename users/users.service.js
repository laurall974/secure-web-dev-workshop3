const User = require("../users/users.model");
const e = require("express");
const bcrypt = require("bcrypt")

function register (username, password){
    const salt = bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, function(err, hash) {
            // Store hash in your password DB.
        });
    });
}

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

module.exports.register = register;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.insert = insert;
module.exports.signJwt = signJwt;
