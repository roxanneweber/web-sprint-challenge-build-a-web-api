const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

router.get('/', (req, res, next) => {
  Projects.get()
  .then(actions => {
    res.json(actions)
  })
  .catch(next)
})


router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    custom: 'something is not working',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
