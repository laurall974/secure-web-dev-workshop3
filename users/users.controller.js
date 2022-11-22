const userService = require("../users/users.service");
const router = require('express').Router()

router.post('/register', async (req, res, next) => {
    try {
        /*const loc = await userService.findOne(req.username)
        // User already exists
        if (loc) {
            res.status(409); // conflict error
            const error = new Error('Account already exists');
            return next(error);
        }*/
        console.log(req.body)

        const newUser = await userService.insert(req.body);
        console.log('New user has been created');
        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const loc = await userService.findOne(req.username)
        // User does not exists
        if (!loc) {
            res.status(409); // conflict error
            const error = new Error('Account does not exists');
            return next(error);
        }
        const newUser = await userService.insert(req.body);
        console.log('Login successful');
        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
});
module.exports = router