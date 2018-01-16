const initialState = {
    ifs: {},
    loops: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIC_ADD_LOOP':
            return {
                ...state,
                loops: {
                    ...state.loops,
                    [action.payload.id]: action.payload.loop
                }
            }
        case 'LOGIC_ADD_IF':
            return {
                ...state,
                ifs: {
                    ...state.ifs,
                    [action.payload.id]: action.payload.loop
                }
            }
        default:
            return state
    }
}