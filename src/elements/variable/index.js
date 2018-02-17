module.exports = {
    id: 'd-variable',
    icon: 'text_fields',
    label: 'Display Variable',
    renderer: require('./renderer.vue').default,
    menu: require('./menu.vue').default,

    defaultState: {
        placeholder: 'variable',
        variable: 'var',
    },

    defaultStyle: {
        fontSize: '12pt',
        color: '#000000',
        fontFamily: 'Helvetica',
        lineHeight: '1.25em',
        textAlign: 'left'
    }
}