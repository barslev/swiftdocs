import cuid from 'cuid'

export function insertContent(element, pageId, containerId, beforeId = null, style = {}) {

    const content = {
        id: cuid(),
        page_id: pageId,
        container_id: containerId,
        element,
    }

    const index = beforeId
        ? _.findIndex(store.state.contents, {id: beforeId})
        : store.state.contents.length
    
    store.dispatch({
        type: 'CONTENT_INSERT',
        payload: {
            index,
            content,
            style
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

export function removeContent(id)
{
    store.state.contents
        .filter((content) => {
            content.container_id == id
        })
        .forEach((content) => {
            dispatchRemoval(content.id)
        })

    dispatchRemoval(id)
}

export function selectContent(id)
{
    store.dispatch({
        type: 'CONTENT_SELECT',
        payload: {
            id
        }
    })
}

export function deselectContent(id) {
    store.dispatch({
        type: 'CONTENT_DESELECT',
        payload: {
            id
        }
    })
}

export function updateElementState(id, state) {
    store.dispatch({
        type: 'CONTENT_UPDATE_STATE',
        payload: {
            id,
            state
        }
    })
}

export function getElementState(id, defaultState) {
    return _.get(_.find(store.state.contents, {id}), 'state', defaultState)
}