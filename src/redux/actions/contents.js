import cuid from 'cuid'

function getContentIndex(id)
{
    return _.findIndex(store.state.contents, {id: id})
}

export function insertContent(element, page_id, container_id, beforeId = null) {

    const state = _swd.registry.defaultState(element)

    const content = {
        id: cuid(),
        page_id,
        container_id,
        element,
        state,
    }

    const index = beforeId
        ? getContentIndex(beforeId)
        : store.state.contents.length

    store.dispatch({
        type: 'CONTENT_INSERT',
        payload: {
            index,
            content,
        }
    })

    return content.id
}

export function moveContent(id, pageId, containerId, beforeId) {

    const oldIndex = _.findIndex(store.state.contents, {id})
    const newIndex = beforeId
        ? _.findIndex(store.state.contents, {id: beforeId})
        : store.state.contents.length

    const content = Object.assign({}, store.state.contents[oldIndex], {
        page_id: pageId,
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

function dispatchRemoval(id)
{
    store.dispatch({
        type: 'CONTENT_REMOVE',
        payload: {
            id
        }
    })
}

export function removeContentById(id)
{
    if (!id) {
        return
    }
    store.state.contents
        .filter((content) => {
            content.container_id == id
        })
        .forEach((content) => {
            dispatchRemoval(content.id)
        })

    dispatchRemoval(id)
}

export function removeContent(content)
{
    return removeContentById(content.id)
}

export function updateElementState(id, fragment) {

    const originalState = getElementState(id, {})
    const modifiedState = {
        ...originalState,
        ...fragment
    }

    store.dispatch({
        type: 'CONTENT_UPDATE_STATE',
        payload: {id, state: modifiedState}
    })
    
    // Return the modified state
    return modifiedState
}

export function findContent(id) {
    return _.find(store.state.contents, {id})
}

export function getElementState(id, defaultState) {
    return _.get(findContent(id), 'state', defaultState)
}

export function duplicateContent(content) {

    if ( ! content) {
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
}