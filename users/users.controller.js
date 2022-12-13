const usersService = require("../users/users.service");
const router = require('express').Router()
const passport = require('passport');
require('../passportStrategy/local');
require('../passportStrategy/jwt');
const roleMiddleware = require('../jwtMiddleware/middleware');


/** Register route**/

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        if (req.body?.username && req.body?.password)
        {
            const {username, password} = req.body;
            const user = await usersService.register(username, password);
            if (user) {
                return res.status(200).send(user);
            }
            else {
                return res.status(400).send("An error occurred, bad request. Try another username or password");
            }
        }
    }
    catch(error) {
    next(error); }
});


/** Login route**/

router.post('/login',
    passport.authenticate('local',
        {session: false,}),
        async (req, res) => {
        const id = req.user?._id;
        const token = await usersService.generateJWT(id);
        return res.status(200).send({token});
    });

// router.post('/login/password',
//     passport.authenticate('local', {failureRedirect : '/login', failureMessage : true}),
//     async function (req ,res) {
//     const jwt = userService.signJwt(req.body.user);
//     res.status(200).send({token : jwt});
// });


/**JWT middleware**/
router.use('/me',passport.authenticate('jwt', {session:false, failureRedirect:'/login'}));

// Get self
router.get('/me', async (req, res) => {
    return res.status(200).send(await usersService.getUser(req.user));
})

router.patch('/me',
    async (req, res) => {
        const updatedUser = await usersService.update(req.user, req.body);
        return res.status(200).send(updatedUser);
    })

router.delete('/me',
    async (req, res) => {
        return res.status(200).send(await(usersService.deleteUser(req.user)));
    });

// Get all users : remember to not return users passwords on this route
router.get('/', async (req, res) => {
    const allUser = await(usersService.findAll())
    return res.status(200).send(allUser);
});


module.exports = router