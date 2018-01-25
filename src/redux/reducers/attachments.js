const initialState = {}

export default (state = initialState, action) => {

    let copy
    
    switch (action.type) {
        case 'ATTACHMENTS_ADD':
            return {
                ...state,
                [action.payload.id]: {
                    uploaded: false,
                    data: action.payload.data
                }
            }
        
        case 'ATTACHMENT_REMOVE':
            copy = {...state}
            delete copy[action.payload.id]
            return copy
        
        case 'ATTACHMENTS_MARK_UPLOADED':
            copy = {...state}
            for (let key in copy) {
                copy[key].uploaded = true
            }
            return copy
        
        default:
            return state
    }    
}