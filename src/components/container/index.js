module.exports = {
    id: 'container',
    icon: 'crop_din',
    label: 'Container',
    renderer: require('./renderer.vue').default,

    defaultStyle: {
        borderWidth: 1,
        borderTop: true,
        borderLeft: true,
        borderRight: true,
        borderBottom: true,
        borderColor: '#ebebeb',
        backgroundColor: '#f4f4f4',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
    }
}
