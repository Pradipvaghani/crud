
'use strict';

const joi = require('@hapi/joi');
const i18n = require('../../../locales');
const ObjectID = require('mongodb').ObjectID;
const languageCollection = require('../../../models/language')
const logger = require('../../commonModels/logger');


// joi param validator for skip, limit,searchText,categoryId query
const paramValidator = joi.object({
    id: joi.string().required().description(i18n.__('language').delete.field._id),
})

// HTTP Get:  New Interview Handler
let handler = async (req, reply) => {
    try {

        let condition = { _id: new ObjectID(req.query.id) }
        
        // get list of all category
        return languageCollection.Delete(condition).then(() => {
            return reply.response({
                message: "success"
            }).code(200); // status code for the requested response
        })

    } catch (error) {
        logger.error("error : ", error); // log the catch error
        return reply.response({
            message: i18n.__('500')
        }).code(500); // status response for internal server error
    }

};

const responseCode = {
    status: {
        200: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('200')).required()
        }),
        // validation and example for the interval server error with status 500
        500: joi.object({
            message: joi.string().example(i18n.__('500')).required()
        })
    }
}

module.exports = { // exports functions
    handler,
    responseCode,
    paramValidator
};
