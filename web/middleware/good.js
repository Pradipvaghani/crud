
const good = {
    plugin: require("@hapi/good"),
    options: {
        reporters: {
            myConsoleReporter:
            [
                { module: '@hapi/good-console' },
                'stdout'
            ]
        }
    }
}

module.exports = good;