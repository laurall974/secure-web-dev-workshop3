const passport = require('passport');
const usersService = require('../users/users.service');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async function(token, done) {
            try {
                const user = await usersService.findOne({_id: token.sub})
                console.log('user' + user)
                if (user)   return done(null, user);
                return done(null, false);
            }
            catch(err) {
                if (err) return done(err, false);
            }
        }
    )
);
module.exports = passport;