'use strict'

const joi = require('@hapi/joi')

const envVarsSchema = joi.object({
    RABBITMQURL: joi.string().required()
}).unknown()
    .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
    RABBITMQ: {
        RABBITMQURL: envVars.RABBITMQURL
    }
}

module.exports = config
