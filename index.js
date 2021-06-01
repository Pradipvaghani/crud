
// load .env in local development
// require('dotenv').config({ path: './.env' });
const myEnv = require('dotenv').config({ path: './.env' });
for (var k in myEnv['parsed']) {
	process.env[k] = myEnv['parsed'][k]
}

const logger = require('winston');
const semver = require('semver');
const pkg = require('./package.json');

// validate Node version requirement
const runtime = {
	expected: semver.validRange(pkg.engines.node), actual: semver.valid(process.version)
};
const valid = semver.satisfies(runtime.actual, runtime.expected);
if (!valid) {
	throw new Error(`Expected Node.js version ${runtime.expected}, but found v${runtime.actual}. Please update or change your runtime!`);
}
// configure  logger
const type = process.env.PROCESS_TYPE;
logger.info(`Starting ${type} process`, { pid: process.pid });
// eslint-disable-next-line global-require
if (type === 'web') { require('./web'); } else if
// eslint-disable-next-line global-require
(type === 'worker') { require('./worker'); } else { 
    throw new Error(`${type} is an unsupported process type.`); }
