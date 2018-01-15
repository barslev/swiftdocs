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
