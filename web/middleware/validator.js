
const joi = require('@hapi/joi');
const lan = require('./localization');
const logger = require('winston');

const headerAuth = joi.object({
    'authorization': joi.string().required().description("authorization token,Eg. Key"),
    lan: joi.string().default(lan.defaultLan).description("Language(English-0),Eg. 0")
}).options({ allowUnknown: true });

const headerAuthValidator = joi.object({
    'authorization': joi.string().required().description("authorization token,Eg. Key"),
    lang: joi.string().default(lan.defaultLan).description("Language(English-0),Eg. 0")
}).options({ allowUnknown: true });

const headerAuthRefresh = joi.object({
    'authorization': joi.string().required().description("authorization token,Eg. Key"),
    'refreshtoken': joi.string().required().description("refresh token,Eg. Key"),
    lang: joi.string().required().default(lan.defaultLan).description("Language(English-0),Eg. 0")
}).options({ allowUnknown: true });

const headerLan = joi.object({
    'lan': joi.string().required().default(lan.defaultLan).description("Language(English-0),Eg. 0")
}).options({ allowUnknown: true });

const faildActionXX = function faildAction(req, reply, source, error) {
    if (error) logger.error("ASASASS : ", JSON.stringify(error));

    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
}

const failAction = (req, h, err) => {
	console.log('Failed ACtion function is called ')
	if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
		logger.debug('JOI error : ', err.details[0]);
		const invalidItem = err.details[0];
		return h.response({
			message: req.i18n.__(req.i18n.__('400'), invalidItem.path.join(',')),
		}).code(400).takeover();
	}
	logger.error('Other Error : ', err);
	return h.response({
		message: req.i18n.__('500'),
	}).code(500).takeover();
};

module.exports = { headerLan, headerAuth, headerAuthRefresh, headerAuthValidator, failAction };