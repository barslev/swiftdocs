const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ATTACHMENTS_ADD':
            return {
                ...state,
                [action.payload.id]: {
                    uploaded: false,
                    data: action.payload.data
                }
            }
        
        case 'ATTACHMENTS_MARK_UPLOADED':
            let clone = {...state}
            for (let key in clone) {
                clone[key].uploaded = true
            }
            return clone
        
        default:
            return state
    }    
}