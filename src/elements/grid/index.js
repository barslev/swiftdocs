module.exports = [
    {
        id: 'd-grid',
        icon: 'view_column',
        label: 'Grid',
        menu: require('./grid-menu.vue').default,
        renderer: require('./renderer.vue').default,

        defaultState: {
            justify: 'justify-start',
        },
    },
    {
        id: 'd-grid-pane',
        icon: 'view_column',
        label: 'Grid Pane',
        hidden: true,
        renderer: require('./pane.vue').default,
        menu: require('./pane-menu.vue').default,
        defaultStyle: {
            borderWidth: 1,
            borderTop: true,
            borderLeft: true,
            borderRight: true,
            borderBottom: true,
            borderColor: '#ebebeb',
            backgroundColor: '#f4f4f4',
            paddingTop: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 5,
            marginTop: 0,
            marginBottom: 0,
            marginRight: 5,
            marginLeft: 5,
        },
        defaultState: {
            weight: 10
        }
    },
]