module.exports = {
    id: 'group',
    icon: 'folder',
    label: 'Group',
    hidden: true,
    renderer: require('./renderer.vue').default,

    defaultStyle: {
    },

    defaultState: {
        name: 'Unnamed Group',
    },
}
