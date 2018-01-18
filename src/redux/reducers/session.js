import { MODE_EDIT } from '../actions/session'

const initialState = {
    // Mode of the designer: edit or render
    mode: MODE_EDIT,
    // Currently selected element id
    selectedId: null, 
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SESSION_MODE_SET':
            return {
                ...state,
                mode: action.payload
            }
        case 'SESSION_CONTENT_SELECT':
            return {
                ...state,
                selectedId: action.payload
            }
        case 'SESSION_CONTENT_DESELECT':
            return {
                ...state,
                selectedId: null
            }
        case 'CONTENT_REMOVE':
            if (state.selectedId === action.payload.id) {
                return {
                    ...state,
                    selectedId: null
                }
            }
        case 'SESSION_SET_TRANSLATION':
            return {
                ...state,
                translation: action.payload.language
            }
        default:
            return state
    }
}