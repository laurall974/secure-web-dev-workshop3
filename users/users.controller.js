const userService = require("../users/users.service");
const router = require('express').Router()

router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body)
        const newUser = await userService.insert(req.body);
        console.log('New user has been created');
        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
});
router.post('/login/password',
    passort.authenticate('local', {failureRedirect : '/login', failureMessage : true}),
    async function (req ,res) {
    const jwt = userService.signJwt(req.body.user);
    res.status(200).send({token : jwt});
});


module.exports = router