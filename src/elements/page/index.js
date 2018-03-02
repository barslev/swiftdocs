module.exports = {
    id: 'page',
    icon: 'queue',
    label: 'Page',
    hidden: true,
    menu: require('./menu.vue').default,    
    renderer: require('./renderer.vue').default,

    defaultStyle: {
    },

    defaultState: {
    },
}
