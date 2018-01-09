module.exports = {
    id: 'd-text',
    icon: 'text_fields',
    label: 'Text',
    renderer: require('./renderer.vue').default,
    menus: [
        {
            id: 'typography',
            label: 'Typography',
            renderer: require('./typography.vue').default
        }
    ]
}