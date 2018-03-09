// As of v0.2.4, no css rules are needed for group and page elements.
// This method cleans these up.
function deletePageAndGroupStyles(state) {

    state.contents
        .filter(content => (
            content.element === 'page' || content.element === 'group')
        )
        .forEach(content => {
            delete state.styles[content.id]
        })

    return state
}

module.exports = {
    
    before: '0.2.4',
    
    up: function(state) {
    
        return deletePageAndGroupStyles({...state})

    }
}