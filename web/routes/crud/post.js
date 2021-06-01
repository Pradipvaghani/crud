const languageCollection = require('../../../models/language')
const joi = require('@hapi/joi');
const i18n = require('../../../locales');
const ObjectID = require('mongodb').ObjectID;

const paramValidator = joi.object({
    name: joi.string().required().default("").description(i18n.__('language').post.field.name),
    dob: joi.string().required().description(i18n.__('language').post.field.dob),
    address: joi.string().required().description(i18n.__('language').post.field.address),
    description: joi.string().required().description(i18n.__('language').post.field.description)
})      

let handler = async (req, reply) => {
 try {
        const payload = req.payload 
        payload["Created At"] = new Date().getTime()
        const languageResult = await languageCollection.Insert(payload)
        if(languageResult.result.ok == 1)
        {
            return reply.response({message: i18n.__('language').post.success.register}).code(200);
        }
        else 
        {
            return reply.response({message: i18n.__('204')}).code(204); 
        }
    }
    catch (err)
    {
        logger.err(error)
        return reply.response({message: i18n.__('500')}).code(500);
    }
}

const responseCode = {
    status: {
        200: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('200')).required()
        }),
        204: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('204')).required()
        }),
        400: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('400')).required()
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
