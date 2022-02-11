const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function validateActionId(req, res, next) {
	try {
		const action = await Actions.get(req.params.id);
		if (!action) {
			res.status(404).json({
				message: 'an action with the specified ID was not found',
			});
		} else {
			req.action = action;
			next();
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was a problem accessing the action information',
		});
	}
}

function validateAction(req, res, next) {
	const { project_id, description, notes, complete } = req.body;
	console.log(req.body);
	if (!project_id) {
		res.status(400).json({
			message: 'missing required project id field',
		});
	} else {
		(req.project_id = project_id),
			(req.description = description.trim()),
			(req.notes = notes.trim()),
			(req.completed = complete);
		next();
	}
}

async function validateProjectId(req, res, next) {
	try {
		const project = await Projects.get(req.params.id);
		if (!project) {
			res.status(404).json({
				message: 'a project with the specified ID was not found',
			});
		} else {
			req.project = project;
			next();
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was a problem accessing the action information',
		});
	}
}

module.exports = {
	validateActionId,
	validateAction,
	validateProjectId,
};
