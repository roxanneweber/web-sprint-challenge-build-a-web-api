const express = require('express')
const { validateActionId } = require("./actions-middlware")
const router = express.Router()

const Actions = require('./actions-model')

router.get('/', (req, res, next) => {
  Actions.get()
  .then(actions => {
    res.json(actions)
  })
  .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action)
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    custom: 'something is not working',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;