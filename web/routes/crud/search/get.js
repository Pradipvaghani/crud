const languageCollection = require('../../../../models/language');
const i18n = require('../../../../locales');
const joi = require("@hapi/joi");
const { ObjectID } = require('mongodb');

const paramValidator = joi.object({
    _id: joi.string().required().description(i18n.__('language').getsearch.field._id)
})

let handler = async (req, reply) => {
    try {
        const language = await languageCollection.SelectAll({_id:ObjectID(req.query._id)}).then(res => res);
        
        return reply.response({
            message: "success",
            data: language // requested data 
        }).code(200); 
    } catch (error) {
        console.log('Your error ', error)
        return reply.response({
            message: "Db error try again later",
            //data: language // requested data 
        }).code(500); 
    }
}

const responseCode = {
    status: {
        200: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('200')).required(),
            data: joi.array().required()
        }),
        // validation and example for the interval server error with status 500
        500: joi.object({
            message: joi.string().example(i18n.__('500')).required()
        })
    }
}

module.exports = { // exports functions
    handler,
    paramValidator,
    responseCode
};