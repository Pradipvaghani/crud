'use strict';

require('dotenv').config({ path: "../.env" });
const Hapi = require('@hapi/hapi');

const config = require('../config');
const db = require('../library/mongodb');
//const redisEventListner = require('../library/Redis/redisEventListner');
const middleware = require('./middleware');
//const rabbitMq = require('../library/rabbitMq');
const logger = require("./commonModels/logger");
//const rabbitMqWorker = require('../library/rabbitMq/worker');

var Server = new Hapi.Server({
    port: config.server.port,
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['lan', 'cache-control', 'x-requested-with', 'authorization', 'refToken', 'token', 'Access-Control-Allow-Origin'],
            // additionalHeaders: ['lan']
        },
        validate: {
            failAction: async (request, h, err) => {
                const response = err;
                console.log('Validation ')
                if (!response.isBoom) {
                    console.log('validation is incorrect')
                    return h.continue;
                }
                if (!response.details) return h.continue;
                if (response.details.length > 1) {
                    var wrongValues = response.details.map(wrongFields => wrongFields.path);
                    wrongValues = wrongValues.join(" ,");
                    return h
                        .response({ message: wrongValues + " fields are missing or invalid !" })
                        .code(412).takeover();
                } else {
                    var wrongValues = response.details.map(wrongFields => wrongFields.path);
                    return h.response({ message: wrongValues.toString() + " field is missing or invalid !" }).code(412).takeover();
                }
            }
        }
    },
});

async function runServer() {
    try {
        require('dotenv').config({ path: "../.env" });
        await db.connect();
        await start();
        await Server.start();
        // await redisEventListner.saveMongoRecordToRedis();
        // rabbitMq.connect(() => {
        //     rabbitMqWorker.startWorker()
        // });
        logger.info(`Server is listening on port ${config.server.port}`);
    } catch (error) {
        // throw error;
        logger.error("==================>>>>> Error Occured while starting the server ======> ", error);
    }
}

const start = async () => {
    try {
        await Server.register(
            [
                middleware.swagger.inert,
                middleware.swagger.vision,
                middleware.swagger.swagger,
                middleware.localization.i18n,
                {
                    "plugin": middleware.auth.register
                },
                middleware.good,
            ]
        );
        Server.auth.strategy('accessToken', '3Embed');
        Server.auth.strategy('userJWT', '3Embed');
        Server.auth.strategy('basic', '3Embed');
        Server.auth.strategy('Admin', '3Embed');
        Server.realm.modifiers.route.prefix = '/v1';
        await Server.route(require('./routes'));
        logger.info('Server running on %s', Server.info.uri);
    } catch (error) {
        logger.error("error ", error)
    }

};
const stop = async () => {
    await Server.stop();
    console.log('Server stopped');
    logger.info('Server stopped');
};
//do something when app is closing
process.on('exit', function (code, signal) {
    logger.error(`exit main process exited with code $ and signal ${signal}`);
    // rabbitMqWorker.exitHandler()
});

//catches ctrl+c event
process.on('SIGINT', function (code, signal) {
    logger.error(`SIGINT main process exited with code $ and signal ${signal}`);
    // rabbitMqWorker.exitHandler();
});

//catches uncaught exceptions
process.on('uncaughtException', function (err, code, signal) {
    logger.error(`uncaughtException ${err} main process exited with code ${code} and signal ${signal}`);
    // rabbitMqWorker.exitHandler();
});

module.exports = {
    runServer,
    Server,
    start,
    stop
}
