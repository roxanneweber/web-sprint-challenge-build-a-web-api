const express = require('express');
const router = express.Router();

const {
	validateProjects,
  validateProjectId,
	validateProjectName,
	validateProjectDescription,
} = require('./projects-middleware');

const Projects = require('./projects-model');

// get all projects
router.get('/', validateProjects, (req, res, next) => {
  Projects.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
});

// get project with specified id
router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
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
