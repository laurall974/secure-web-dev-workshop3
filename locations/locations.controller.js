const router = require('express').Router()
const locationsService = require('./locations.service')

/** Get all Locations **/
router.get('/', async (req, res, next) => {
	try {
		const allLocations = await locationsService.findAll();
		res.json(allLocations);
	} catch(error) {
		next(error);
	}
});

/** Get a specific Location **/
router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const loc = await locationsService.findOne(id);
		if(!loc) {
			const error = new Error('Location does not exist');
			return next(error);
		}

		res.json(loc);
	} catch(error) {
		next(error);
	}
});

/** Create a new location **/
router.post('/',
	passort.authenticate('local', {failureRedirect : '/login', failureMessage : true}),
	async (req, res, next) => {
	try {
		const newloc = await locationsService.insert({...req.body});
		console.log('New location has been created');
		res.status(201).json(newloc);
	} catch(error) {
		next(error);
	}
});

/** Delete a specific location */
router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const loc = await locationsService.findOne(id);
		// Location does not exist
		if(!loc) {
			return next();
		}
		await locationsService.remove(id);
		res.json({
			message: 'Success'
		});
	} catch(error) {
		next(error);
	}
});

/** Update a specific location */
router.patch('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const loc = await locationsService.findOne(id);
		// Location does not exist
		if(!loc) {
			return next();
		}

		const updatedLoc = await locationsService.updateLoc(id, req.body.element, req.body.newValue);
		res.json(updatedLoc);
		res.json({
			message: 'Success'
		});}

	catch(error) {
		next(error);
	}
});

module.exports = router

