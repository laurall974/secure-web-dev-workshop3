const usersService = require("../users/users.service");
const router = require('express').Router()
const passport = require('passport');
require('../passportStrategy/local');
require('../passportStrategy/jwt.strategy');


// Register route
router.post('/register', async (req, res) => {
    console.log(req.body);
    if (req.body?.username && req.body?.password) {
        const {username, password} = req.body;
        const user = await usersService.register(username, password);
        if (user) return res.status(200).send(user);
        else return res.status(400).send("An error occurred, bad request");
    } else return res.status(400).send("Please send the right format : {\"username\":$USERNAME,\"password\":\"$PASSWORD\"}");
});


// Login route

router.post('/login',
    passport.authenticate('local', {
        session: false,
    }),
    async (req, res) => {
        const userId = req.user?._id;
        const token = await usersService.generateJWT(userId);
        return res.status(200).send({token});
    });

// router.post('/login/password',
//     passport.authenticate('local', {failureRedirect : '/login', failureMessage : true}),
//     async function (req ,res) {
//     const jwt = userService.signJwt(req.body.user);
//     res.status(200).send({token : jwt});
// });


/**JWT middleware**/
router.use('/me',passport.authenticate('jwt', {
    session:false, failureRedirect:'/users/login'
}));

// Get self
router.route('/me')
    .get(async (req, res) => {
        return res.status(200).send(await usersService.getUser(req.user));
    })
    .patch(async (req, res) => {
        return res.status(200).send(await usersService.update(req.user, req.body));
    })
    .delete(async (req, res) => {
        return res.status(200).send(await(usersService.deleteUser(req.user)));
    });

// Get all users
router.get('/', async (req, res) => {
    return res.status(200).send({users:usersService.findAll()});
});


module.exports = router