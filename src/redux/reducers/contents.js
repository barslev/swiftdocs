const initialState = []

export default (state = initialState, action) => {

    let copy
    
    switch (action.type) {
        // When a page is removed, remove its contents
        case 'PAGE_REMOVE':
            var newState = state.filter((content) => {
                return content.page_id !== action.payload.id
            })
            return newState
        case 'CONTENT_INSERT':
            copy = state.concat([])
            copy.splice(action.payload.index, 0, action.payload.content)
            return copy
        case 'CONTENT_MOVE':
            copy = state.concat([])
            copy.splice(action.payload.oldIndex, 1)
            copy.splice(action.payload.newIndex, 0, action.payload.content)
            return copy
        case 'CONTENT_REMOVE':
            return state.filter((content) => {
                return content.id !== action.payload.id
            })
        case 'CONTENT_SELECT':
            return state.map((content) => {
                if (content.id === action.payload.id) {
                    return {
                        ...content,
                        selected: true
                    }
                }
                return content
            })
        case 'CONTENT_DESELECT':
            return state.map((content) => {
                if (content.id === action.payload.id && 'selected' in content) {
                    delete content.selected
                    return {...content}
                }
                return content
            })
        case 'CONTENT_UPDATE_STATE':
            return state.map((content) => {
                if (content.id === action.payload.id) {
                    return {...content, state: action.payload.state}
                }
                return content
            })
        default:
            return state
    }
}