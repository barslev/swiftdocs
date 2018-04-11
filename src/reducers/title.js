const initialState = ''

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TITLE_CHANGE':
            return action.payload
        default:
            return state
    }
}