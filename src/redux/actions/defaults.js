export function updateDefaults(object) {
    store.dispatch({
        type: 'DEFAULTS_UPDATE',
        payload: object
    })
}