module.exports = {
    id: 'd-text',
    icon: 'text_fields',
    label: 'Text',
    renderer: require('./renderer.vue').default,
    menu: require('./menu.vue').default,

    defaultState: {
        text: '',
    },

    defaultStyle: {
        fontSize: '12pt',
        color: '#000000',
        fontFamily: 'Helvetica',
        lineHeight: '1.25em',
        textAlign: 'left'        
    }
}