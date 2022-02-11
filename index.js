const server = require('./api/server');

require('dotenv').config();

server.listen(process.env.PORT, () => {
	console.log(
		`\n** Server Running on http://localhost:${process.env.PORT} in a ${process.env.NODE_ENV} environment ***\n`
	);
});
