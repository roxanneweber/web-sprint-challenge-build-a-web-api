const Projects = require('./projects-model');

async function validateProjects(req, res, next) {
	try {
		const projects = await Projects.get();
		if (!projects) {
			res.status(400).json({
				message: 'There are no projects available',
			});
		} else {
			req.projects = projects;
			next();
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was a problem accessing the project information',
		});
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

function validateProject(req, res, next) {
	const { name, description, complete } = req.body;
	console.log(req.body)
	if (!name || !description) {
		res.status(400).json({
			message: 'missing a required field',
		});
	} else {
		req.name = name.trim();
		req.description = description.trim();
		req.completed = complete;
		next();
	}
}

module.exports = {
	validateProjects,
	validateProjectId,
	validateProject,
};
