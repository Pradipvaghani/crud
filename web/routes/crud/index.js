const GetAPI = require('./get')
const GetSearchAPI = require('./search/get')
const PostAPI = require('./post');
const PatchAPI = require('./Patch');
const DeleteAPI = require('./Delete');
const validators = require('../../middleware/validator')
const i18n = require('../../../locales');
module.exports = [
    {
        method: 'POST', // Http method 
        path: `/language`, // path of the Http Method Get
        handler: PostAPI.handler, //calling handler functions
        options: {
            tags: ['api','language'], // path for the swagger  
            description: (i18n.__('language').post.description),
            notes: (i18n.__('language').post.notes),
            //auth: "Admin", // auth strategy JWT
            response: PostAPI.responseCode, // validating response with Joi
            validate: {
                //headers: validators.headerAuthValidator, // headers validation with joi
                payload: PostAPI.paramValidator, // query validation with joi
                failAction: validators.failAction // looking over the failed validation
            }
        }
    },
    {
        
        method: 'GET', // Http method 
        path: `/language`, // path of the Http Method Get
        handler: GetAPI.handler, //calling handler functions
        options: {
            tags: ['api','language'], // path for the swagger  
            description: (i18n.__('language').get.description),
            notes: (i18n.__('language').get.notes),
            //auth: "Admin", // auth strategy JWT
            response: GetAPI.responseCode, // validating response with Joi
            validate: {
                //headers: validators.headerAuthValidator, // headers validation with joi
                query: GetAPI.paramValidator, // query validation with joi
                failAction: validators.failAction // looking over the failed validation
            }
        }
    },
    {
        method: 'GET', // Http method 
        path: `/language/search`, // path of the Http Method Get
        handler: GetSearchAPI.handler, //calling handler functions
        options: {
            tags: ['api','language'], // path for the swagger  
            description: (i18n.__('language').getsearch.description),
            notes: (i18n.__('language').getsearch.notes),
            //auth: "Admin", // auth strategy JWT
            response: GetSearchAPI.responseCode, // validating response with Joi
            validate: {
                //headers: validators.headerAuthValidator, // headers validation with joi
                query: GetSearchAPI.paramValidator, // query validation with joi
                failAction: validators.failAction // looking over the failed validation
            }
        }
    },
    
    {
        method: 'Patch', // Http method 
        path: `/language`, // path of the Http Method Get
        handler: PatchAPI.handler, //calling handler functions
        options: {
            tags: ['api','language'], // path for the swagger  
            description: (i18n.__('language').put.description),
            notes: (i18n.__('language').put.notes),
            //auth: "Admin", // auth strategy JWT
            response: PatchAPI.responseCode, // validating response with Joi
            validate: {
                headers: validators.headerAuthValidator, // headers validation with joi
                payload: PatchAPI.paramValidator, // query validation with joi
                failAction: validators.failAction // looking over the failed validation
            }
        }
    },
    {
        method: 'Delete', // Http method 
        path: `/language`, // path of the Http Method Get
        handler: DeleteAPI.handler, //calling handler functions
        options: {
            tags: ['api','language'], // path for the swagger  
            description: (i18n.__('language').delete.description),
            notes: (i18n.__('language').delete.notes),
            //auth: "Admin", // auth strategy JWT
            response: DeleteAPI.responseCode, // validating response with Joi
            validate: {
                //headers: validators.headerAuthValidator, // headers validation with joi
                query: DeleteAPI.paramValidator, // query validation with joi
                failAction: validators.failAction // looking over the failed validation
            }
        }
    }
]