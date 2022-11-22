const User = require("../users/users.model");

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
module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.insert = insert;