import { MODE_EDIT } from '../actions/session'

const initialState = {
    // Mode of the designer: edit or render
    mode: MODE_EDIT,
    // Currently selected element id
    selectedId: null, 
    // Is the document currently being saved?
    saving: false,
    // Was the document changed since last open?
    changed: false,
    // Is this document editable, meaning: can anything at all be edited?
    editable: true,
    // Alterable, meaining: adding, removing, or moving contents.
    alterable: true,
}

const ignoredIneffectiveActions = [
    /SESSION.*/,
    /@@.*/,
    /ATTACHMENTS_MARK_UPLOADED/,
]

function inIgnoreList(action) {
    for (let i in ignoredIneffectiveActions) {   
        let regex = ignoredIneffectiveActions[i]
        if (regex.test(action)) {
            return true
        }
    }
    return false
}

export default (state = initialState, action) => {
    
    // Anything done on the document apart from the session
    // Should cause the changed flag to go up. Something must have changed.
    if ( ! inIgnoreList(action.type)) {
        state = { ...state }
        state.changed = true
    }

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
        case 'SESSION_BEGIN_SAVING':
            return {
                ...state,
                saving: true
            }
        case 'SESSION_SAVED':
            return {
                ...state,
                saving: false,
                changed: false
            }
        case 'SESSION_SET_EDITABLE':
            return {
                ...state,
                editable: action.payload
            }
        case 'SESSION_SET_ALTERABLE':
            return {
                ...state,
                alterable: action.payload
            }            
        default:
            return state
    }
}