const server = require('./api/server');

require('dotenv').config();

const PORT = process.env.PORT || 9000;

server.listen(process.env.PORT, () => {
	console.log(
		`\n** Server Running on http://localhost:${process.env.PORT} in a ${PORT} environment ***\n`
	);
});
