
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');

const swagger = {
    plugin:require('hapi-swagger'),
    'options':{
        grouping:'tags',
        payloadType:'form',
        schemes:["http","https"]
    }
}

module.exports = { inert, vision, swagger };
