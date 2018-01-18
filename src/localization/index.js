import VueI18n from 'vue-i18n'

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: require('json-loader!./en.yaml'),
        tr: require('json-loader!./tr.yaml'),
        // Add more languages...
    },
})

module.exports = i18n