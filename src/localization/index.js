import VueI18n from 'vue-i18n'

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en: require('json-loader!./en.yaml'),
        // Add more languages...
    },
})

module.exports = i18n