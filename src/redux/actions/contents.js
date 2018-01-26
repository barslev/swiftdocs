import cuid from 'cuid'
import { findPage } from './pages'
import {copyStylesToContent} from './styles'
import {isDocumentAlterable} from './session'

/* ============ Content Basics ============ */

export function findContent(id) {
    return _.find(store.state.contents, { id })
}

export function getContentIndex(id)
{
    return _.findIndex(store.state.contents, {id: id})
}

/* ============ Content Insert, Duplicate and Move ============ */

export function insertContent(element, containerId, beforeId = null) {
    
    const index = beforeId
        ? getContentIndex(beforeId)
        : store.state.contents.length

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

    const oldIndex = _.findIndex(store.state.contents, {id})
    const newIndex = beforeId
        ? _.findIndex(store.state.contents, {id: beforeId})
        : store.state.contents.length

    const content = Object.assign({}, store.state.contents[oldIndex], {
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

export function duplicateContent(content) {

    if ( ! content) {
        return
    }

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
function childrenContent(id) {
    return _.filter(
        store.state.contents,
        { container_id: id }
    )
}

/**
 * Checks if the content has a parent content or page
 */
function hasNoParent(content) {
    return !findContent(content.container_id) && !findPage(content.container_id)
}

/**
 * If a grid element exists without any panes,
 * It's redundant and should be removed.
 */
function isEmptyGrid(content) {
    if (content.element !== 'd-grid') {
        return false
    }
    return !childrenContent(content.id).length
}

/**
 * Applies filters to contents array. Uses "OR" logic.
 * One satisfying filter means the element will stay.
 */
function applyFilters(contents, filters) {
    return contents.filter((content) => {
        for (let i in filters) {
            // If any of the filters apply, then keep this item
            if (filters[i](content)) {
                return true
            }
        }
        return false
    })
}

function getOrphanedContents() {
    return applyFilters(store.state.contents, [
        hasNoParent,
        isEmptyGrid
    ]);
}

function removeOrphanedContents() {
    // Find orphans
    const orphans = getOrphanedContents()
    // If no orphans found, end iteration
    if (!orphans.length) {
        return
    }
    // Remove each orphan content
    orphans.forEach((orphan) => {
        dispatchRemoval(orphan.id)
    })
    // Go on to detect more orphans
    return removeOrphanedContents()
}

export function removeContentById(id) {

    if (!id) {
        return
    }

    if (!isDocumentAlterable()) {
        return
    }

    store.state.contents
        .filter((content) => {
            return content.container_id == id
        })
        .forEach((content) => {
            dispatchRemoval(content.id)
        })

    dispatchRemoval(id)
    removeOrphanedContents()
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
