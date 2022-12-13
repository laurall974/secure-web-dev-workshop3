const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../users/users.model');
const usersService = require('../users/users.service');

passport.use(new Strategy(
    async function (username, password, done) {
        try {
        const user = await User.findOne(username)
            if (!user)  {
                console.log("User not found");
                return done(null, false);
            }
            if (!await usersService.verify(username, password)){
                console.log("Wrong password...");
                return done(null, false);
            }
            return done(null, user);
        }
        catch(err) {
            if (err)    return done(err)
        }
    }
));

module.exports = passport