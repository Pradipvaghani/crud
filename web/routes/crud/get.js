const languageCollection = require('../../../models/language');
const i18n = require('../../../locales');
const joi = require("@hapi/joi");
const { languages } = require('../../middleware/localization');


const paramValidator = joi.object({
    name: joi.string().required().description(i18n.__("language").get.field.name)
 });

let handler = async (req, reply) => {

    try {
        const languagecount = await languageCollection.GetCount(condition)
        if(languagecount == 0)
        {
           return reply.response({message: i18n.__('204')}).code(204)
        }
        const result = await languageCollection.SelectWithSort(condition,{},{name: 1})
        return reply.response({message: i18n.__('language').getsearch.success.getdata, data: result}).code(200);
     }
     catch(error){
        logger.err(error)
        return reply.response({message: i18n.__('500')}).code(500);
     }
}

const responseCode = {
    status: {
        200: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('200')).required(),
            data: joi.array().required()
        }),
        204: joi.object({ // response joi validation
            message: joi.string().example(i18n.__('204')).required(),

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