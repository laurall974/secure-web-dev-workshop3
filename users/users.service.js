const User = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

async function register(username, password) {
    try {
        if (username === undefined || password === undefined) throw new Error("undefined username or password");
        const hashedPsw = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username:username,
            password:hashedPsw,
            role:'user'
            //par défaut le role est user
        });
        console.log(`User successfully added : ${username}:${password}`);
        return user;
    } catch (err) {
        console.log("ERROR ! No user created !");
        console.error(err);
        return null;
    }
}

async function generateJWT(username) {
    return jwt.sign({sub:username}, process.env.JWT_SECRET);
}

async function findAll() {
    try {
         return User.find().select('username').select('role');
    } catch (err) {
        console.log("ERROR !");
        console.error(err);
        return false;
    }
}
async function checkUser(username) {
    try {
        return await User.findOne({'username' : username});
    } catch (err) {
        console.log("ERROR !");
        console.error(err);
        return null;
    }
}

async function getUser(id) {
    try {
        return await User.findOne({'_id':id});
    } catch (err) {
        console.log("ERROR !");
        console.error(err);
        return null;
    }
}

async function update(id, property) {
    try {
        //on l'empeche de modofier son role
        if (property.role != null)
        {
            const obj = {
                "username":property.username,
                "password":property.password
            }
            await User.findOneAndUpdate(id, obj);
            return await getUser(id);
        }
        else {
            await User.findOneAndUpdate(id, property);
            return await getUser(id);
        }
    } catch (err) {
        console.log("ERROR !");
        console.error(err);
        return null;
    }
}

async function deleteUser(id) {
    try {
        return await User.findOneAndDelete({'_id':id});
    } catch (err) {
        console.log("ERROR !");
        console.error(err);
        return null;
    }
}

async function verify(username, password) {
    try {
        const user = await User.findOne({'username' : username});
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.log("ERROR !");
        console.error(err);
        return null;
    }
}
async function findOne(value){
    return User.findOne(value);
}

module.exports.register = register;
module.exports.findAll = findAll;
module.exports.getUser = getUser;
module.exports.checkUser = checkUser;
module.exports.verify = verify;
module.exports.generateJWT = generateJWT;
module.exports.update = update;
module.exports.deleteUser = deleteUser;
module.exports.findOne = findOne;
