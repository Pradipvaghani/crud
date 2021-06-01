
'use strict';

const joi = require('@hapi/joi');
const i18n = require('../../../locales');
const ObjectID = require('mongodb').ObjectID;
const languageCollection = require('../../../models/language')
const logger = require('../../commonModels/logger');

// joi param validator for skip, limit,searchText,categoryId query
const paramValidator = joi.object({
    id: joi.string().allow(null,"").default("").description(i18n.__('language').put.field.id),
    name: joi.string().required().default("").description(i18n.__('language').put.field.name),
    dob: joi.string().required().description(i18n.__('language').put.field.dob),
    address: joi.string().required().default("").description(i18n.__('language').put.field.address),
    description: joi.string().required().description(i18n.__('language').put.field.description)
})

// HTTP Get:  New Interview Handler
let handler = async (req, reply) => {

        try {
            console.log(req.payload)
            let { 
                    name,
                    dob,
                    address,
                    description
                } = req.payload;
                
            await languageCollection.Update({
                _id:ObjectID(req.payload.id)
            },{
	            name,
                dob,
                address,
                description
            }).then(res => res);
    
            return reply.response({
                message: "success",
            }).code(200); 
     
        } catch (error) {
      	console.log(error)        
            return reply.response({
                message: "Db error try again later",
                //data: language // requested data 
            }).code(500); 
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
