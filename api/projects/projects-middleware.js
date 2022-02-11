const Projects = require('./projects-model');

async function validateProjects(req, res, next) {
  try {
	const projects = await Projects.get()
      if (!projects) {
        res.status(400).json({
          message: 'There are no projects available'
        })
      } else {
        req.projects = projects;
        next()
      }
		}
    catch (err) {
			res.status(500).json({
				message: 'There was a problem accessing the project information',
			});
    }
}


async function validateProjectId(req, res, next) {
  try {
		const project = await Projects.getById(req.params.id)
				if (!project) {
					res.status(404).json({
						message: 'There is no project with the specified id'
					})
				} else {
					req.project = project;
					next()
				}
			}
			catch (err) {
				res.status(500).json({
					message: 'There was a problem accessing the project information',
				});
			}
	}

	function validateProject(req, res, next) {
		const { name, description } = req.body 
		if (!name || !description) {
			res.status(400).json({
				message: 'missing required name and description fields'
			})
		} else {
			req.name = name.trim()
			req.description = description.trim()
			next()
		}
	}

module.exports = {
	validateProjects,
  validateProjectId,
	validateProject,
}