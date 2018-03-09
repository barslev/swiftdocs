import cuid from 'cuid'
import { findPage } from './pages'
import {copyStylesToContent} from './styles'
import {isDocumentAlterable} from './session'

/* ============ Content Basics ============ */

export function findContent(id) {
    return _.find(store.getState().contents, { id })
}

export function getContentIndex(id)
{
    return _.findIndex(store.getState().contents, {id: id})
}

/* ============ Content Insert, Duplicate and Move ============ */

export function insertContent(element, containerId, beforeId = null) {
    
    const index = beforeId
        ? getContentIndex(beforeId)
        : store.getState().contents.length

    return insertContentAtIndex(element, containerId, index)
}

export function insertContentAtIndex(element, container_id, index) {

    if (!isDocumentAlterable()) {
        return
    }    
    
    const state = _swd.registry.defaultState(element)

    const content = {
        id: cuid(),
        container_id,
        element,
        state,
    }    

    store.dispatch({
        type: 'CONTENT_INSERT',
        payload: {
            index,
            content,
        }
    })

    return content.id
}

export function moveContent(id, containerId, beforeId) {

    if (!isDocumentAlterable()) {
        return
    }

    const state = store.getState()

    const oldIndex = _.findIndex(state.contents, {id})
    const newIndex = beforeId
        ? _.findIndex(state.contents, {id: beforeId})
        : state.contents.length

    const content = Object.assign({}, state.contents[oldIndex], {
        container_id: containerId
    })

    store.dispatch({
        type: 'CONTENT_MOVE',
        payload: {
            oldIndex,
            newIndex,
            content,
        }
    })
}

function cloneChildren(clone, children) {
    children.forEach((child) => {
        const copy = { ...child }
        copy.container_id = clone.id
        duplicateContent(copy)
    })
}

export function duplicateContent(content) {
    
    if ( ! isDocumentAlterable()) {
        return
    }

    const clone = {...content}
    clone.id = cuid()

    const originalIndex = getContentIndex(content.id)
    
    store.dispatch({
        type: 'CONTENT_INSERT',
        payload: {
            index: originalIndex + 1,
            content: clone,
        }
    })

    copyStylesToContent(content.id, clone.id)
    cloneChildren(clone, childrenContent(content.id))
}

/* ============ Content Removal ============ */

 function dispatchRemoval(id) {
    store.dispatch({
        type: 'CONTENT_REMOVE',
        payload: {
            id
        }
    })
}

/**
 * Returns the children content by container id
 */
export function childrenContent(id) {
    return _.filter(
        store.getState().contents,
        { container_id: id }
    )
}

export function removeContentById(id) {

    if (!isDocumentAlterable()) {
        return
    }

    store.getState().contents
        .filter((content) => {
            return content.container_id == id
        })
        .forEach((content) => {
            removeContentById(content.id)
        })

    dispatchRemoval(id)
}

export function removeContent(content) {
    return removeContentById(content.id)
}

/* ============ Content State Management ============ */

export function getContentState(id, defaultState) {
    // Get the state
    const state = _.get(
        findContent(id),
        'state',
        defaultState
    )
    // Return a copy of the state
    return {
        ...state
    }
}

export function updateContentState(id, fragment) {

    const originalState = getContentState(id, {})
    const modifiedState = {
        ...originalState,
        ...fragment
    }

    store.dispatch({
        type: 'CONTENT_UPDATE_STATE',
        payload: { id, state: modifiedState }
    })

    // Return the modified state
    return modifiedState
}
