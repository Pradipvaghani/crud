'use strict'

const joi = require('@hapi/joi')

const envVarsSchema = joi.object({
    MONGODB_URL: joi.string()
        .required()
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    mongodb: {
        url: envVars.MONGODB_URL
    }
}

module.exports = config