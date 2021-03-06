import { MODE_EDIT } from '../actions/session'

const initialState = {
    // Mode of the designer: edit or render
    mode: MODE_EDIT,
    // Currently selected element id
    selectedId: '', 
    // Is the document currently being saved?
    saving: false,
    // Was the document changed since last open?
    changed: false,
    // Is this document editable, meaning: can anything at all be edited?
    editable: true,
    // Alterable, meaining: adding, removing, or moving contents.
    alterable: true,
}

/**
 * This array keeps ignored actions that have no side effects on the document.
 * We test each action type against these regexes.
 * If any of these tests pass, we assume that the action has no side effect.
 */
const nonModifyingActions = [
    /SESSION.*/,
    /@@.*/,
    /ATTACHMENTS_MARK_UPLOADED/,
    /DATA_.*/,
    // Add more ignored action.type regexes
]

function isActionModifying(action) {
    for (let i in nonModifyingActions) {   
        let regex = nonModifyingActions[i]
        if (regex.test(action)) {
            return false
        }
    }
    return true
}

export default (state = initialState, action) => {
    
    // Anything done on the document apart from the session
    // Should cause the changed flag to go up. Something must have changed.
    if (isActionModifying(action.type)) {
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
                selectedId: ''
            }
        case 'CONTENT_REMOVE':
            if (state.selectedId === action.payload.id) {
                return {
                    ...state,
                    selectedId: ''
                }
            }
            return state
        case 'SESSION_SET_TRANSLATION':
            return {
                ...state,
                translation: action.payload.language
            }
        case 'SESSION_SET_SAVING':
            return {
                ...state,
                saving: action.payload
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