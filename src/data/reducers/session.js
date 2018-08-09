import Immutable from 'seamless-immutable'
import { createActions } from 'reduxsauce'

import {ContentsReduxTypes} from './contents'

const MODE_EDIT = 0
const MODE_RENDER = 1

const INITIAL_STATE = Immutable({
    // Mode of the designer: edit or render
    mode: MODE_EDIT,
    // Read only mode makes it impossible to make changes to the document
    readonly: false,
    // Currently selected element id
    selectedId: null,
    // Is the document currently being saved?
    saving: false,
    // Was the document changed since last open?
    changed: false,
    // Translation language
    translation: 'en',
})

const { Types, Creators } = createActions({
    sessionModeSet: ['mode'],
    sessionContentSelect: ['id'],
    sessionContentDeselect: null,
    sessionSetTranslation: ['language'],
    sessionSaved: null,
    sessionMakeReadonly: null,
    sessionSetSaving: ['saving'],
})

export const SessionReduxTypes = Types
export default Creators

/**
 * This array keeps ignored actions that have no side effects on the document.
 * We test each action type against these regexes.
 * If any of these tests pass, we assume that the action has no side effect.
 */
const nonModifyingActions = [
    /SESSION.*/,
    /@@.*/,
    /ATTACHMENTS_MARK_UPLOADED/,
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

export const reducer = (state = INITIAL_STATE, action) => {

    if (isActionModifying(action.type)) {
        state = state.merge({
            changed: true
        })
    }

    switch (action.type) {

        case Types.SESSION_MODE_SET:
            return state.merge({ mode: action.mode })

        case Types.SESSION_CONTENT_SELECT:
            return state.merge({
                selectedId: action.id
            })

        case Types.SESSION_CONTENT_DESELECT:
            return state.merge({
                selectedId: null
            })

        case ContentsReduxTypes.CONTENT_REMOVE:
            if (state.selectedId === action.id) {
                return state.merge({selectedId: null})
            }
            return state

        case Types.SESSION_SET_TRANSLATION:
            return state.merge({translation: action.language})

        case Types.SESSION_SET_SAVING:
            return state.merge({saving: action.saving})

        case Types.SESSION_SAVED:
            return state.merge({
                saving: false,
                changed: false,
            })

        case Types.SESSION_MAKE_READONLY:
            return state.merge({
                mode: MODE_RENDER,
                readonly: true,
            })

        default:
            return state
    }
}