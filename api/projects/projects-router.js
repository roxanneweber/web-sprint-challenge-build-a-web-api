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
router.get('/', (req, res, next) => {
	Projects.get()
		.then((projs) => {
      if (!projs) {
        res.status(400).json({
          message: 'There are no projects available'
        })
      } else {
        res.json(projs);
      }
			
		})
		.catch(next);
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
