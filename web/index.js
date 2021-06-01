
/* eslint-disable global-require */
const cluster = require('cluster');
const logger = require('./commonModels/logger');
const numCPUs = 1; // require('os').cpus().length;

if (cluster.isMaster) {
	logger.info(`Master ${process.pid} is running`);
	// Fork workers.
	for (let i = 0; i < numCPUs; i += 1) {
		cluster.fork();
		logger.info(`Forking process number ${i}...`);
	}

	// Listen for dying workers
	cluster.on('exit', (worker) => {
		// Replace the dead worker,
		// we're not sentimental
		logger.info(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	// load .env in local development
	require('dotenv').config({ path: "../.env" });
	require('./server').runServer();

}
