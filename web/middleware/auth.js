// const Promise = require('bluebird');
const joi = require('@hapi/validate');
const rp = require('request-promise');
const boom = require("@hapi/boom")

const internals = {};

exports.register = {
        name: 'hapi-jwt-jwe',
        version: '1.0.0',
        register: async (server, options, next) => {
                server.auth.scheme('3Embed', internals.implementation); // hapijs.com/api#serverauthapi
                // add routing swagger json
                server.route([
                        {
                                method: 'GET',
                                path: '/krakend.json',
                                config: {
                                        auth: false,
                                },
                                handler: async (request, reply) => {
                                        var  routes = request.server.table();
                                        const krakendData = [];
//routes[0].table.forEach((route) => {
//console.log("=======>>>",routes[20].public.settings.validate.query._ids)
routes = routes.slice(15,routes.length-1)


                                        routes.forEach((route) => {
if(route.public.settings.validate.query != null &&route.public.settings.validate.query._ids != null){
console.log("aaaa    ",Array.from(new Map(route.public.settings.validate.query._ids._byKey).keys()))
}
                                                // eslint-disable-next-line max-len
//                                              const query = route.settings.validate.query != null ?convert(route.settings.validate.query) : [];
       var query = (route.public.settings.validate.query != null &&route.public.settings.validate.query._ids != null)
? Array.from(new Map(route.public.settings.validate.query._ids._byKey).keys())
:[];

                                                // eslint-disable-next-line max-len
//                                              const headers = route.settings.validate.headers != null ? route.settings.validate.headers : [];
                      const headers = (route.public.settings.validate.headers != null &&route.public.settings.validate.headers._ids != null)
?Array.from(new Map(route.public.settings.validate.headers._ids._byKey).keys())
:[];



                                                if (route.settings.tags != null && route.settings.tags.indexOf('api') !== -1) {
                                                        krakendData.push({
                                                                endpoint: route.path,
                                                                method: route.method.toUpperCase(),
//                                                              querystring_params: query.properties ? Object.keys(query.properties) : [],
//                                                              headers_to_pass: headers.properties ? Object.keys(headers.properties) : [],
                                                                querystring_params: query,
                                                                headers_to_pass: headers,

                                                                backend: [
                                                                        {
                                                                                url_pattern: route.path,
                                                                                encoding: 'no-op',
                                                                                host: [
                                                                                        process.env.APP_IP || '',
                                                                                ],
                                                                                extra_config: {
                                                                                        auth: (route.settings.auth) ? route.settings.auth.strategies : false,
                                                                                        'github.com/devopsfaith/krakend-ratelimit/juju/proxy': {
                                                                                                maxRate: 0,
                                                                                                capacity: 0,
                                                                                                strategy: 'ip',
                                                                                        },
                                                                                },
                                                                        },
                                                                ],
                                                                output_encoding: 'no-op',
                                                        });
                                                }
                                        });
                                        return reply.response(krakendData).code(200);
                                },
                        },
                ]);
                // return next();
        }
}




exports.register.attributes = { // hapi requires attributes for a plugin.
        name: 'hapi-jwt-jwe',
        version: '1.0.0'                      // also see: http://hapijs.com/tutorials/plugins
};


/**
 * implementation is the "main" interface to the plugin and contains all the
 * "implementation details" (methods) such as authenicate, response & raiseError
 * @param {Object} server - the Hapi.js server object we are attaching the
 * the hapi-auth-jwt2 plugin to.
 * @param {Object} options - any configuration options passed in.
 * @returns {Function} authenicate - we return the authenticate method after
 * registering the plugin as that's the method that gets called for each route.
 */
internals.implementation = () => ({
        /**
         * authenticate is the "work horse" of the plugin. it's the method that gets
         * called every time a route is requested and needs to validate/verify a JWT
         * @param {Object} request - the standard route handler request object
         * @param {Object} reply - the standard hapi reply interface
         * @returns {Boolean} if the JWT is valid we return a credentials object
         * otherwise throw an error to inform the app & client of unauthorized req.
         */
        authenticate(req, h) {
                var token = req.headers.authorization;
                const unAuth = { message: 'Unauthorised' };
                // console.log("req.headers : ", req.headers);
                // token = Buffer.from(token, 'base64').toString('utf8');
                try {
                        if (token === '') {
                                // return reply(unAuth).code(401);
                                return h.unauthenticated(unAuth)
                        }

                        const tokenData = JSON.parse(token);
                        const id = tokenData.userId;

                        const credentials = {
                                _id: id,
                                sub: tokenData.userType,
                                metaData: tokenData.metaData,
                        };

                        if (tokenData.type == "Basic") {
                                // return reply.continue({
                                //      credentials,
                                //      artifacts: token
                                // });
                                return h.authenticated({ credentials, artifacts: token })
                        } else {
                                // return reply({
                                //      credentials,
                                //      artifacts: token,
                                // });
                                return h.authenticated({ credentials, artifacts: token })
                        }

                }
                catch (error) {
                        // console.log(error);
                        return h.authenticated(unAuth)
                }
        },
        /**
         * response is an Optional method called if an options.responseFunc is set.
         * @param {Object} request - the standard route handler request object
         * @param {Object} reply - the standard hapi reply interface ...
         * after we run the custom options.responseFunc we reply.continue to execute
         * the next plugin in the list.
         * @returns {Boolean} true. always return true (unless there's an error...)
         */
        response(req, h) {
                return h.continue;
        },
});

const genTokenSchema = joi.object({
        userId: joi.string().required(),
        userType: joi.string().required(),
        multiLogin: joi.string().allow('true', 'false').required(),
        allowedMax: joi.string().optional(),
        immediateRevoke: joi.string().allow('true', 'false').required(),
        metaData: joi.object().required(),
        accessTTL: joi.string().optional(),
        refreshTTL: joi.string().optional(),
}).unknown().required();
// {
//      userId: '1',
//      userType: 'admin',
//      multiLogin: 'true',
//      allowedMax: '5', // optional
//      immediateRevoke: 'false',
//      metaData: {}, // if you want to store any other info of the user
//      accessTTL: '48h', // optional
//      refreshTTL: '180h', // optional
// }
/** generateTokens - create a new refresh and access token for user
 * @param {Object} user - user data
 * @param {String} user.userId - user id
 * @param {String} user.userType - type of the user
 * @param {String} user.multiLogin - multi login allowed or not - true, false
 * @param {String} user.allowedMax Optional - maximum allowed logins if multi login is true
 * @param {String} user.immediateRevoke - immediate revoke on blacklisted - true, false
 * @param {Object} user.metaData - metadata if anything want to add in token
 * @param {String} user.accessTTL Optional - TTL for Access token ex. 1h, 1m, 1s,etc
 * @param {String} user.refreshTTL Optional - TTL for refresh token ex. 1h, 1m, 1s,etc
 */
exports.generateTokens = (user) => new Promise((resolve, reject) => {
        const { error, value } = joi.validate(user, genTokenSchema);
        if (error) {
                return reject(error);
        }
        const options = {
                method: 'POST',
                url: process.env.AUTH_SERVER,
                headers: {
                        lan: 'en',
                        'content-type': 'application/json',
                },
                body: value,
                json: true,
        };
        rp(options)
                .then((body) => resolve(body.data))
                .catch((err) => reject(err));
});

const blockTokenSchema = joi.object({
        userId: joi.string().required(),
        userType: joi.string().required(),
        refreshToken: joi.string().required(),
        time: joi.string().optional(),
}).unknown().required();
/** blockTokens - blacklisting refresh token
 * @param {Object} user - user data
 * @param {String} user.userId - user mongoid
 * @param {String} user.userType - type of the user
 * @param {String} user.refreshToken - refresh token for blacklist all for user *
 * @param {String} user.time Optional - TTL for blocking token ex. 1h, 1m, 1s,etc
 * @returns {object} success (unless there's an error...)
 */
exports.blockTokens = (user) => new Promise((resolve, reject) => {
        const { error, value } = joi.validate(user, blockTokenSchema);
        if (error) {
                return reject(error);
        }
        const options = {
                method: 'DELETE',
                url: process.env.AUTH_SERVER,
                headers: {
                        lan: 'en',
                        'content-type': 'application/json',
                },
                body: value,
                json: true,
        };
        rp(options)
                .then((body) => resolve(body.data))
                .catch((err) => reject(err));
});

/**
 * @param {string} accessToken - access token
 * @param {string} refreshToken - refresh token
 * @returns {object} success (unless there's an error...)
 */
exports.refreshAuthToken = (accessToken, refreshToken) => new Promise((resolve, reject) => {
        const options = {
                method: 'GET',
                url: process.env.AUTH_SERVER,
                headers: {
                        lan: 'en',
                        'content-type': 'application/json',
                        authorization: accessToken,
                        refreshtoken: refreshToken,
                },
        };
        rp(options)
                .then((body) => resolve(body.data))
                .catch((err) => reject(err));
});
