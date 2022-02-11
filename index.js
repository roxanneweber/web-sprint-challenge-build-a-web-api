const server = require('./api/server');
require('dotenv').config();

const port = process.env.PORT || 9000

// server.listen(port, () => {
// 	console.log(`\n** Server Running on http://localhost:${port} ***\n`);
// });

server.listen(port, () => {
	console.log(
		`\n** Server Running on http://localhost:${process.env.PORT} in a ${process.env.NODE_ENV} environment ***\n`
	);
});