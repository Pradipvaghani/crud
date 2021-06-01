const config = require('../../config');

const defaultLan = config.localization.DEFAULT_LANGUAGE;
const languages = config.localization.LANGUAGES;

const i18n = {
    plugin: require('hapi-i18n'),
    options: {
        locales: "en.de".split(','),
        directory: './locales',
        languageHeaderField: 'lang',
        defaultLocale: "en"
    }
}

module.exports = { i18n, defaultLan, languages };