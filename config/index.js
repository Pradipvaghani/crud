'use strict'
require('dotenv').config({ path: "../.env" });
const processType = process.env.PROCESS_TYPE

console.log("processType : ",processType)
let config
config = require(`./${processType}`)

module.exports = config
