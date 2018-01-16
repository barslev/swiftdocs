export function addPageLoop(pageId, array, as) {
    store.dispatch({
        type: 'LOGIC_ADD_LOOP',
        payload: {
            id: pageId,
            loop: {array, as}
        }
    })
}

export function findLoopById(id) {
    return _.get(store.state.logic.loops, id, null)
}