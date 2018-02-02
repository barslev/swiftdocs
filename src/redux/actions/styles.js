export function updateStyle(id, prop, value) {
    store.dispatch({
      type: 'STYLE_UPDATE',
      payload: {
          id,
          prop,
          value
      }
    })
}

export function copyStylesToContent(sourceId, targetId) {
    if( ! store.getState().styles.hasOwnProperty(sourceId)) {
        return
    }
    store.dispatch({
        type: 'STYLE_SET',
        payload: {
            id: targetId,
            style: store.getState().styles[sourceId]
        }
    })
}