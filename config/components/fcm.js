'use strict'

const joi = require('@hapi/joi')

const envVarsSchema = joi.object({
FCM_SERVER_KEY: joi.any()
.required()
}).unknown()
.required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
throw new Error(`Config validation error: ${error.message}`)
}

const config = {
fcm: {
FCM_SERVER_KEY: envVars.FCM_SERVER_KEY
}
}

module.exports = config