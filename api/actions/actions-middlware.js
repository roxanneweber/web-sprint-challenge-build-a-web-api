
const Actions = require('./actions-model')


async function validateActionId(req, res, next) {
	try {
		const user = await Actions.getById(req.params.id);
		if (!user) {
			res.status(404).json({
				message: 'an action with the specified ID was not found',
			});
		} else {
			req.user = user;
			next();
		}
	} catch (err) {
    res.status(500).json({
      message: 'There was a problem accessing the action information',
    })
  }
}

function validateAction(req, res, next) {
  const { name } = req.body 
  if (!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    req.name = name.trim()
    next()
  }
}


module.exports = {
  validateActionId,
  validateAction,
};
