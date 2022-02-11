const express = require('express');
const router = express.Router();

const {
	validateProjects,
	validateProjectId,
	validateProject,
} = require('./projects-middleware');

const Projects = require('./projects-model');

// get all projects
router.get('/', validateProjects, (req, res, next) => {
	Projects.get()
		.then((users) => {
			res.json(users);
		})
		.catch(next);
});

// get project with specified id
router.get('/:id', validateProjectId, (req, res) => {
	res.json(req.project);
});

// add new project
// router.post('/', validateProject, (req, res, next) => {
// 	Projects.insert({
// 		name: req.name,
// 		description: req.description,
// 	})
// 		.then((newProject) => {
// 			res.status(201).json(newProject);
// 		})
// 		.catch(next);
// });

// add new project
router.post('/', (req, res) => {
	const { name, description, completed } = req.body;
	if (!name || !description) {
		res.status(400).json({
			message: 'Please provide a name and description for the project',
		});
	} else {
		Projects.insert({ name, description, completed })
			.then(({ id }) => {
				console.log(name, description, completed)
				return Projects.get(id);
			})
			.then((newProject) => {
				res.status(201).json(newProject);
				
			})
			.catch((err) => {
				res.status(500).json({
					message: 'There was an error while adding the project to the database',
					err: err.message,
					stack: err.stack,
				});
			});
	}
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
	Projects.update(req.params.id, {
		name: req.name,
		description: req.description,
		completed: req.complete,
	})
		.then((updatedProject) => {
			res.json(updatedProject);
		})
		.catch(next);
});


// delete specified project id
router.delete('/:id', validateProjectId, async (req, res, next) => {
	try {
		await Projects.remove(req.params.id);
		res.json({
			message: 'The specified project has been removed',
		});
	} catch (err) {
		next(err);
	}
});

// get actions for specified project id
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
	try {
		const result = await Projects.getProjectActions(req.params.id);
		res.json(result);
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