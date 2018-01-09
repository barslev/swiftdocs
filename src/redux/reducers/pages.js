const initialState = []

function updateField(state, action, field) {
	return state.map((page) => {
		if(action.payload.id !== null && page.id !== action.payload.id) {
			return page
        }
		page[field] = action.payload[field]
		return page
	})    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PAGE_ADD':
            return state.concat([action.payload])
        case 'PAGE_REMOVE':
            return state.filter((page) => {
                return page.id !== action.payload.id
            })
        case 'PAGE_UPDATE_MARGINS':
            return updateField(state, action, 'margins')
        case 'PAGE_UPDATE_COLOR':
            return updateField(state, action, 'color')
        case 'PAGE_UPDATE_DIMENSIONS':
            return updateField(state, action, 'dimensions')
        default:
            return state
    }
}