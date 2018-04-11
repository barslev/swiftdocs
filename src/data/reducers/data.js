const initialState = {
    data: null,
    loading: true,
    lastError: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'DATA_START_LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'DATA_RECEIVED':
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case 'DATA_FAIL_LOADING':
            return {
                ...state,
                loading: false,
                lastError: action.payload,
            }
        default:
            return state
    }
}