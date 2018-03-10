export function dataStartedLoading() {
    store.dispatch({
        type: 'DATA_START_LOADING',
        
    })
}

export function dataReceived(data) {
    store.dispatch({
        type: 'DATA_RECEIVED',
        payload: data,
    })
}

export function dataOnFail(error) {
    store.dispatch({
        type: 'DATA_FAIL_LOADING',
        payload: error,
    })
}