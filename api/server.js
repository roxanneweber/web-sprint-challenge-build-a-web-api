const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

// middleware
server.use(logger); 
server.use(express.json());

// routers
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to Unit4 Sprint1!`)
})

server.use('*', (req, res) => {
  res.status(404).json({
    message: `Method ${req.method} at Path ${req.url} was not found`
  })
})

module.exports = server;

function logger(req, res, next) {
	const timestamp = new Date().toLocaleString();
	const method = req.method;
	const url = req.originalUrl;
	console.log(`${timestamp}, ${method} request to ${url}`);
	next();
}

module.exports = server;