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