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

export function copyStylesToElement(sourceId, targetId) {
    if( ! store.state.styles.hasOwnProperty(sourceId)) {
        return
    }
    store.dispatch({
        type: 'STYLE_SET',
        payload: {
            id: targetId,
            style: store.state.styles[sourceId]
        }
    })
}