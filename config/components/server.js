'use strict'

const joi = require('@hapi/joi')

const envVarsSchema = joi.object({
  SERVER_PORT: joi.number().required(),
  AUTH_USER: joi.string().required(),
  AUTH_ADMIN: joi.string().required()
}).unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  server: {
    port: envVars.SERVER_PORT
  },
  auth: {
    userAuth: envVars.AUTH_USER,
    adminAuth: envVars.AUTH_ADMIN
  }
}

module.exports = config