// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

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
router.post('/', async (req, res, next) => {
	try {
		const loc = await locationsService.findOneSource(req.sourceLocationId)
		// Location already exists
		if (loc) {
			res.status(409); // conflict error
			const error = new Error('Location already exists');
			return next(error);
		}
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
		// Employee does not exist
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
router.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const {option, newValue} = req.body;
		const loc = await locationsService.findOne({
			_id: id
		});
		// Location does not exist
		if(!loc) {
			return next();
		}

		const updatedLoc = await locationsService.update(id, option, newValue);
		res.json(updatedLoc);}

	catch(error) {
		next(error);
	}
});

module.exports = router

