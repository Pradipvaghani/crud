'use strict'

const joi = require('@hapi/joi')

const envVarsSchema = joi.object({
    ELASTIC_URL: joi.string().required(),
    ELASTIC_USERNAME: joi.string().required(),
    ELASTIC_PASSWORD: joi.string().required()
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error}`)
}

const config = {
    elastic: {
        url: envVars.ELASTIC_URL,
        username: envVars.ELASTIC_USERNAME,
        password: envVars.ELASTIC_PASSWORD
    }
}

module.exports = config