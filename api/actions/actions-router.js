const express = require('express');
const {
	validateActionId,
	validateAction,
	validateProjectId,
} = require('./actions-middlware');
const router = express.Router();

const Actions = require('./actions-model');

router.get('/', (req, res, next) => {
	Actions.get()
		.then((actions) => {
			res.json(actions);
		})
		.catch(next);
});

router.get('/:id', validateActionId, (req, res) => {
	res.json(req.action);
});

// add new action
router.post('/', validateAction, validateProjectId, (req, res, next) => {
	Actions.insert({
		project_id: req.project_id,
		description: req.description,
		notes: req.notes,
	})
		.then((newAction) => {
			res.status(201).json(newAction);
		})
		.catch(next);
});

// update action
router.put(
	'/:id',
	validateProjectId,
	validateAction,
	validateActionId,
	(req, res, next) => {
		Actions.update(req.params.id, {
			notes: req.notes,
			description: req.description,
			completed: req.complete,
			project_id: req.project_id,
		})
			.then((updatedAction) => {
				res.json(updatedAction);
			})
			.catch(next);
	}
);

// delete specified action id
router.delete('/:id', validateActionId, async (req, res, next) => {
	try {
		await Projects.remove(req.params.id);
		res.json({
			message: 'The specified project has been removed',
		});
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	//eslint-disable-line
	res.status(err.status || 500).json({
		custom: 'something is not working',
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;
