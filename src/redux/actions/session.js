export const MODE_EDIT = 0
export const MODE_RENDER = 1

export function beginEditMode() {
    store.dispatch({
        type: 'SESSION_MODE_SET',
        payload: MODE_EDIT
    })
}

export function beginRenderMode() {
    store.dispatch({
        type: 'SESSION_MODE_SET',
        payload: MODE_RENDER
    })
    // Deselect any content currently selected
    deselectContent()
}

export function getCurrentMode() {
    return store.state.session.mode
}

export function selectContent(id) {
    store.dispatch({
        type: 'SESSION_CONTENT_SELECT',
        payload: id
    })
}

export function deselectContent() {
    store.dispatch({
        type: 'SESSION_CONTENT_DESELECT'
    })
}

export function getSelectedContentId() {
    return store.state.session.selectedId
}

export function getSelectedContent() {
    const id = getSelectedContentId()
    return id ? _.find(store.state.contents, {id}) : null
}

export function setTranslation(language) {
    store.dispatch({
        type: 'SESSION_SET_TRANSLATION',
        payload: {
            language
        }
    })
}