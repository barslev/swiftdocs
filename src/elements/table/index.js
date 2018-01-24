module.exports = [
    {
        id: 'd-table',
        icon: 'grid_on',
        label: 'Table',
        renderer: require('./table.vue').default,
        menu: require('./table-menu.vue').default,
    },
    {
        id: 'd-table-row',
        hidden: true,
        icon: 'label_outline',
        label: 'Table Row',
        renderer: require('./row.vue').default,
        menu: require('./row-menu.vue').default,
    },
    {
        id: 'd-table-section',
        hidden: true,
        icon: 'label_outline',
        label: 'Table Section',
        renderer: require('./section.vue').default
    },
    {
        id: 'd-table-cell',
        hidden: true,
        icon: 'label_outline',
        label: 'Table Cell',
        renderer: require('./cell.vue').default,
        menu: require('./cell-menu.vue').default,
        defaultStyle: {
            borderWidth: 1,
            borderTop: true,
            borderLeft: true,
            borderRight: true,
            borderBottom: true,
            borderColor: '#333333',
            backgroundColor: null,
            paddingTop: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 5,
        }        
    }
]
