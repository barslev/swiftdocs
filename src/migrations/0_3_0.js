// As of v0.3.0, no css rules are needed for group and page elements.
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
    
    before: '0.3.0',
    
    up: function(state) {
    
        return deletePageAndGroupStyles({...state})

    }
}