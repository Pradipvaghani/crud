
const { MongoClient } = require('mongodb');
const logger = require('../../web/commonModels/logger');
const config = require('../../config');


var client = null;
var clientMongo = null;

const connect = async () => {
	if (client != null) return;

	// const clientMongo = await MongoClient.connect(config.mongodb.url, { useUnifiedTopology: true }, { useNewUrlParser: true }).catch((err) => {
	// 	logger.error(`MongoDB error connecting to ${config.mongodb.url}`, err.message);
	// });
	// logger.info('MongoDB connected successfully -------------');
	// // eslint-disable-next-line require-atomic-updates
	// client = clientMongo.db();
	// console.log("config.mongodb  : ",config)
	clientMongo = await MongoClient.connect("mongodb+srv://root_DB:euVZCp4CEMnSkkap@zentap-sb33d.mongodb.net/zentap-email-tool?retryWrites=true&w=majority",{ useUnifiedTopology: true }, { useNewUrlParser: true })
	logger.info('MongoDB connected successfully ----python---------',);
	// eslint-disable-next-line require-atomic-updates
	client = clientMongo.db();

};

const db = {};
db.get = () => {
	if (client != null) return client;
	throw Error('Mongodb is not connected!');
};

connect().then(() => { });

const close = () => {
	clientMongo.close();
}
module.exports = { connect, db, close };
