module.exports = {
    id: 'd-image',
    icon: 'crop_original',
    label: 'Image',
    renderer: require('./renderer.vue').default,
    menu: require('./menu.vue').default,

    defaultState: {
        src: null,
        align: 'left',
        width: 120,
        height: null,
    },
}