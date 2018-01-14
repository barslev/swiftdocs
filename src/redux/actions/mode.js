export const MODE_EDIT = 0
export const MODE_RENDER = 1

export function beginEditMode() {
    store.dispatch({
        type: 'MODE_SET',
        payload: MODE_EDIT
    })
}

export function beginRenderMode() {
    store.dispatch({
        type: 'MODE_SET',
        payload: MODE_RENDER
    })
}