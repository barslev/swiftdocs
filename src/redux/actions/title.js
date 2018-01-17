export function changeTitle(newTitle) {
    store.dispatch({
        type: 'TITLE_CHANGE',
        payload: newTitle
    })
}