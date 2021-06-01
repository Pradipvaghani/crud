'use strict'

const logger = require('./components/logger');
const server = require('./components/server');
const mongodb = require('./components/mongodb');
// const rebitMQ = require('./components/rebitMQ');
const fcm = require('./components/fcm')
const localization = require('./components/localization');
const elasticsearch = require('./components/elasticsearch')


module.exports = Object.assign({}, logger, server, fcm, mongodb, elasticsearch, localization);